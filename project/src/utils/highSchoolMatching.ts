import { ProfileFormData } from '../components/ProfileForm';
import { supabase } from '../lib/supabase';

export type HighSchoolMatch = {
  school: {
    id: string;
    name: string;
    country: string;
    city: string;
    type: string;
    curriculum: string[];
    languages: string[];
    tuition_annual_usd: number;
    boarding_available: boolean;
    boarding_cost_annual_usd: number;
    student_capacity: number;
    international_student_percentage: number;
    age_range_min: number;
    age_range_max: number;
    application_deadline: string;
    website: string;
    email: string;
    ranking_national: number;
    accreditations: string[];
    special_programs: string[];
    scholarship_available: boolean;
  };
  match: {
    overall_match_score: number;
    academic_match_score: number;
    financial_match_score: number;
    visa_match_score: number;
    culture_match_score: number;
    acceptance_probability: number;
    match_reasons: string[];
    concerns: string[];
  };
  admissions: {
    academic_requirements: any;
    language_requirements: any;
    required_documents: string[];
    interview_required: boolean;
    entrance_exam_required: boolean;
    acceptance_rate: number;
  } | null;
  scholarships: Array<{
    name: string;
    type: string;
    amount_usd: number | null;
    coverage_percentage: number;
    requirements: string[];
    deadline: string;
    renewable: boolean;
  }>;
  preparation_guide: {
    timeline: string;
    academic_focus: string[];
    test_preparation: string[];
    application_strategy: string[];
    visa_preparation: string[];
  };
};

export async function calculateHighSchoolMatches(
  profile: ProfileFormData
): Promise<HighSchoolMatch[]> {
  try {
    // Fetch high schools from Supabase
    const { data: schools, error: schoolsError } = await supabase
      .from('high_schools')
      .select('*')
      .eq('accepts_foreign_students', true);

    if (schoolsError) throw schoolsError;
    if (!schools || schools.length === 0) return [];

    // Fetch all admissions data
    const { data: admissions } = await supabase
      .from('high_school_admissions')
      .select('*');

    // Fetch all scholarships
    const { data: scholarships } = await supabase
      .from('high_school_scholarships')
      .select('*');

    const matches: HighSchoolMatch[] = schools.map((school) => {
      const schoolAdmissions = admissions?.find((a) => a.school_id === school.id) || null;
      const schoolScholarships = scholarships?.filter((s) => s.school_id === school.id) || [];

      // Calculate match scores
      const academicScore = calculateAcademicMatch(profile, school, schoolAdmissions);
      const financialScore = calculateFinancialMatch(profile, school, schoolScholarships);
      const visaScore = calculateVisaMatch(profile, school);
      const cultureScore = calculateCultureMatch(profile, school);

      const overallScore = Math.round(
        academicScore * 0.35 +
        financialScore * 0.25 +
        visaScore * 0.25 +
        cultureScore * 0.15
      );

      const acceptanceProbability = calculateAcceptanceProbability(
        profile,
        school,
        schoolAdmissions
      );

      const matchReasons = generateMatchReasons(
        profile,
        school,
        academicScore,
        financialScore,
        visaScore,
        schoolScholarships
      );

      const concerns = generateConcerns(
        profile,
        school,
        academicScore,
        financialScore,
        visaScore
      );

      const preparationGuide = generatePreparationGuide(profile, school, schoolAdmissions);

      return {
        school,
        match: {
          overall_match_score: overallScore,
          academic_match_score: academicScore,
          financial_match_score: financialScore,
          visa_match_score: visaScore,
          culture_match_score: cultureScore,
          acceptance_probability: acceptanceProbability,
          match_reasons: matchReasons,
          concerns: concerns,
        },
        admissions: schoolAdmissions,
        scholarships: schoolScholarships,
        preparation_guide: preparationGuide,
      };
    });

    return matches.sort((a, b) => b.match.academic_match_score - a.match.academic_match_score);
  } catch (error) {
    console.error('Error calculating high school matches:', error);
    return [];
  }
}

function calculateAcademicMatch(
  profile: ProfileFormData,
  school: any,
  admissions: any
): number {
  let score = 70;

  const gpa = parseFloat(profile.gpa) || 0;

  if (admissions?.academic_requirements?.min_gpa) {
    const minGpa = parseFloat(admissions.academic_requirements.min_gpa);
    if (gpa >= minGpa + 0.3) score += 20;
    else if (gpa >= minGpa) score += 10;
    else score -= 20;
  } else {
    if (gpa >= 3.5) score += 15;
    else if (gpa >= 3.0) score += 10;
  }

  if (profile.test_scores.toefl || profile.test_scores.ielts) {
    score += 10;
  }

  if (profile.achievements.length > 3) score += 5;
  if (profile.sports_detailed.length > 0) score += 5;

  return Math.min(Math.max(score, 0), 100);
}

function calculateFinancialMatch(
  profile: ProfileFormData,
  school: any,
  scholarships: any[]
): number {
  let score = 50;

  const budget = parseInt(profile.annual_budget) || 0;
  const totalCost = (school.tuition_annual_usd || 0) + (school.boarding_cost_annual_usd || 0);

  if (budget >= totalCost) {
    score = 100;
  } else if (school.scholarship_available && scholarships.length > 0) {
    const maxScholarshipCoverage = Math.max(
      ...scholarships.map((s) => s.coverage_percentage || 0)
    );
    const costAfterScholarship = totalCost * (1 - maxScholarshipCoverage / 100);

    if (budget >= costAfterScholarship) {
      score = 85;
    } else {
      const coverageRatio = budget / totalCost;
      score = Math.round(50 + coverageRatio * 40);
    }
  } else {
    const affordabilityRatio = budget / totalCost;
    score = Math.round(affordabilityRatio * 70);
  }

  return Math.min(Math.max(score, 0), 100);
}

function calculateVisaMatch(profile: ProfileFormData, school: any): number {
  let score = 75;

  const country = school.country;
  const nationality = profile.nationality;

  const hasRejection = profile.visa_history.has_rejections;
  const rejectedCountries = profile.visa_history.rejections.map((r) => r.country);

  if (hasRejection && rejectedCountries.includes(country)) {
    score -= 40;
  } else if (hasRejection) {
    score -= 15;
  }

  if (profile.visa_history.family_legal_history.criminal_record) score -= 20;
  if (profile.visa_history.family_legal_history.immigration_violation) score -= 25;
  if (profile.visa_history.family_legal_history.deportation_history) score -= 30;

  const easyVisaCountries = ['Kanada', 'İngiltere', 'Avustralya', 'Yeni Zelanda', 'İsviçre'];
  if (easyVisaCountries.includes(country)) {
    score += 15;
  }

  return Math.min(Math.max(score, 0), 100);
}

function calculateCultureMatch(profile: ProfileFormData, school: any): number {
  let score = 60;

  const preferredCountries = profile.preferred_countries;
  if (preferredCountries.includes(school.country)) {
    score += 25;
  }

  const userLanguages = profile.languages.map((l) => l.language.toLowerCase());
  const schoolLanguages = school.languages.map((l: string) => l.toLowerCase());

  const languageMatch = schoolLanguages.some((sl: string) =>
    userLanguages.some((ul) => sl.includes(ul) || ul.includes(sl))
  );

  if (languageMatch) score += 15;

  return Math.min(score, 100);
}

function calculateAcceptanceProbability(
  profile: ProfileFormData,
  school: any,
  admissions: any
): number {
  let probability = 50;

  const gpa = parseFloat(profile.gpa) || 0;

  if (admissions?.academic_requirements?.min_gpa) {
    const minGpa = parseFloat(admissions.academic_requirements.min_gpa);
    if (gpa >= minGpa + 0.5) probability += 30;
    else if (gpa >= minGpa + 0.2) probability += 20;
    else if (gpa >= minGpa) probability += 10;
    else probability -= 20;
  }

  if (admissions?.acceptance_rate) {
    const acceptanceRate = admissions.acceptance_rate;
    if (acceptanceRate > 30) probability += 15;
    else if (acceptanceRate > 20) probability += 10;
    else probability += 5;
  }

  if (profile.achievements.length > 2) probability += 10;
  if (profile.sports_detailed.length > 0) probability += 10;

  return Math.min(Math.max(probability, 5), 95);
}

function generateMatchReasons(
  profile: ProfileFormData,
  school: any,
  academicScore: number,
  financialScore: number,
  visaScore: number,
  scholarships: any[]
): string[] {
  const reasons: string[] = [];

  if (academicScore >= 80) {
    reasons.push('Akademik profiliniz bu okulun standartlarına çok uygun');
  }

  if (financialScore >= 80) {
    reasons.push('Bütçeniz okul masraflarını rahatça karşılayabilir');
  } else if (scholarships.length > 0 && financialScore >= 60) {
    reasons.push('Burs fırsatlarıyla mali açıdan uygun');
  }

  if (visaScore >= 80) {
    reasons.push('Vize başarı şansınız yüksek');
  }

  if (profile.preferred_countries.includes(school.country)) {
    reasons.push('Tercih ettiğiniz ülkelerden biri');
  }

  if (school.scholarship_available) {
    reasons.push('Uluslararası öğrencilere burs imkanı sunuyor');
  }

  if (school.special_programs && school.special_programs.length > 0) {
    reasons.push(`Özel programlar: ${school.special_programs.slice(0, 3).join(', ')}`);
  }

  return reasons;
}

function generateConcerns(
  profile: ProfileFormData,
  school: any,
  academicScore: number,
  financialScore: number,
  visaScore: number
): string[] {
  const concerns: string[] = [];

  if (academicScore < 60) {
    concerns.push('Akademik profilinizi güçlendirmeniz gerekebilir');
  }

  if (financialScore < 50) {
    concerns.push('Mali açıdan zorlayıcı olabilir, burs başvurusu önemli');
  }

  if (visaScore < 60) {
    concerns.push('Vize sürecinde ekstra dikkat ve hazırlık gerekli');
  }

  const totalCost = (school.tuition_annual_usd || 0) + (school.boarding_cost_annual_usd || 0);
  if (totalCost > 100000) {
    concerns.push('Yüksek maliyet - detaylı finansal planlama yapın');
  }

  return concerns;
}

function generatePreparationGuide(
  profile: ProfileFormData,
  school: any,
  admissions: any
): {
  timeline: string;
  academic_focus: string[];
  test_preparation: string[];
  application_strategy: string[];
  visa_preparation: string[];
} {
  const academicFocus: string[] = [];
  const testPrep: string[] = [];
  const applicationStrategy: string[] = [];
  const visaPrep: string[] = [];

  const gpa = parseFloat(profile.gpa) || 0;
  if (gpa < 3.5) {
    academicFocus.push('Not ortalamanızı yükseltmeye odaklanın');
    academicFocus.push('Zor derslerden yüksek notlar almaya çalışın');
  }

  if (school.curriculum.includes('IB')) {
    academicFocus.push('IB programı için hazırlık yapın (Extended Essay, TOK, CAS)');
  }
  if (school.curriculum.includes('AP')) {
    academicFocus.push('AP derslerine kayıt olun ve yüksek skorlar hedefleyin');
  }
  if (school.curriculum.includes('A-Level')) {
    academicFocus.push('A-Level sınavlarına hazırlanın');
  }

  if (admissions?.entrance_exam_required) {
    testPrep.push('Giriş sınavına hazırlanın (SSAT, ISEE, UKiset vb.)');
    testPrep.push('Pratik testler çözün ve zayıf alanlarınızı güçlendirin');
  }

  if (admissions?.language_requirements) {
    const langReq = admissions.language_requirements;
    if (langReq.english) {
      if (langReq.english.toefl_min) {
        testPrep.push(`TOEFL hedefi: ${langReq.english.toefl_min}+`);
      }
      if (langReq.english.ielts_min) {
        testPrep.push(`IELTS hedefi: ${langReq.english.ielts_min}+`);
      }
    }
  }

  applicationStrategy.push('Başvuru tarihlerini takip edin ve erken başlayın');
  applicationStrategy.push('Güçlü bir kişisel ifade yazın');
  applicationStrategy.push('Öğretmenlerden referans mektupları isteyin');

  if (admissions?.interview_required) {
    applicationStrategy.push('Mülakat pratiği yapın');
    applicationStrategy.push('Okul hakkında araştırma yapın ve sorular hazırlayın');
  }

  if (profile.sports_detailed.length > 0) {
    applicationStrategy.push('Spor başarılarınızı ve video kayıtlarınızı hazırlayın');
  }

  visaPrep.push('Öğrenci vizesi gerekliliklerini öğrenin');
  visaPrep.push('Mali yeterlilik belgelerini hazırlayın');
  visaPrep.push('Velayetname ve diğer yasal belgeleri temin edin');

  if (profile.visa_history.has_rejections) {
    visaPrep.push('Önceki vize reddini açıklayacak belgeler hazırlayın');
    visaPrep.push('Göçmenlik avukatına danışmayı düşünün');
  }

  return {
    timeline: 'Başvuru 12-18 ay önceden başlamalı',
    academic_focus: academicFocus,
    test_preparation: testPrep,
    application_strategy: applicationStrategy,
    visa_preparation: visaPrep,
  };
}
