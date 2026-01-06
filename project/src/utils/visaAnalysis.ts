import { VisaRejection, FamilyLegalHistory } from '../components/ProfileForm';

export type VisaRiskAssessment = {
  country: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  recommendation: 'highly_recommended' | 'proceed_with_caution' | 'reconsider' | 'avoid';
  reasoning: string;
  action_items: string[];
  time_recommendation?: string;
  family_issues_warning?: string;
};

const rejectionReasonAnalysis: Record<string, { severity: number; pattern: string }> = {
  insufficient_funds: {
    severity: 60,
    pattern: 'financial',
  },
  incomplete_documentation: {
    severity: 40,
    pattern: 'documentation',
  },
  weak_ties: {
    severity: 75,
    pattern: 'ties',
  },
  intent_not_clear: {
    severity: 65,
    pattern: 'intent',
  },
  previous_violation: {
    severity: 90,
    pattern: 'violation',
  },
  security_concerns: {
    severity: 95,
    pattern: 'security',
  },
  false_information: {
    severity: 100,
    pattern: 'fraud',
  },
  other: {
    severity: 50,
    pattern: 'unknown',
  },
};

function calculateTimeSinceRejection(rejectionDate: string): number {
  const rejection = new Date(rejectionDate);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - rejection.getTime());
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  return diffMonths;
}

function analyzeRejectionSeverity(rejection: VisaRejection): number {
  const reasonData = rejectionReasonAnalysis[rejection.rejection_reason] || rejectionReasonAnalysis.other;
  let severity = reasonData.severity;

  const monthsSince = calculateTimeSinceRejection(rejection.rejection_date);

  if (monthsSince > 36) {
    severity *= 0.5;
  } else if (monthsSince > 24) {
    severity *= 0.65;
  } else if (monthsSince > 12) {
    severity *= 0.8;
  }

  return severity;
}

function generateRecommendation(
  country: string,
  rejections: VisaRejection[],
  totalSeverity: number,
  mostRecentMonths: number
): VisaRiskAssessment {
  const countryRejections = rejections.filter(r => r.country === country);

  if (countryRejections.length === 0) {
    return {
      country,
      risk_level: 'low',
      recommendation: 'highly_recommended',
      reasoning: 'Bu ülkeden hiç vize reddi almadınız. Başvurunuz için uygun bir seçenek.',
      action_items: [
        'Tüm belgeleri eksiksiz hazırlayın',
        'Mali durumunuzu net şekilde belgelendirin',
        'Ülkenizle bağlarınızı güçlü gösterin',
      ],
    };
  }

  const hasMultipleRejections = countryRejections.length > 1;
  const hasFraudHistory = countryRejections.some(r => r.rejection_reason === 'false_information');
  const hasViolation = countryRejections.some(r => r.rejection_reason === 'previous_violation');
  const hasSecurity = countryRejections.some(r => r.rejection_reason === 'security_concerns');

  if (hasFraudHistory || hasViolation || hasSecurity) {
    return {
      country,
      risk_level: 'critical',
      recommendation: 'avoid',
      reasoning: `${country} için ciddi bir red geçmişiniz var (${
        hasFraudHistory ? 'Yanlış Bilgi' : hasViolation ? 'Geçmiş İhlal' : 'Güvenlik Endişesi'
      }). Bu tür redler, gelecekteki başvuruları ciddi şekilde etkiler.`,
      action_items: [
        'Alternatif ülkelere odaklanın',
        'Gerekirse göçmenlik avukatına danışın',
        'En az 5 yıl bekleyin ve durumunuzu düzeltin',
      ],
      time_recommendation: mostRecentMonths < 60 ? `En az ${60 - mostRecentMonths} ay daha bekleyin` : undefined,
    };
  }

  if (hasMultipleRejections && mostRecentMonths < 24) {
    return {
      country,
      risk_level: 'high',
      recommendation: 'reconsider',
      reasoning: `${country}'den birden fazla red aldınız ve son reddiniz yakın zamanda gerçekleşti. Bu, vize memurlarının profilinize olumsuz bakmasına neden olabilir.`,
      action_items: [
        'En az 2 yıl daha bekleyin',
        'Bu sürede profilinizi güçlendirin (akademik/kariyer)',
        'Alternatif ülkeleri değerlendirin',
        'Red sebeplerini tam olarak çözdüğünüzden emin olun',
      ],
      time_recommendation: `${24 - mostRecentMonths} ay daha bekleyin`,
    };
  }

  const mostCommonReason = countryRejections[0].rejection_reason;
  const reasonData = rejectionReasonAnalysis[mostCommonReason];

  if (reasonData.pattern === 'financial' && mostRecentMonths > 12) {
    return {
      country,
      risk_level: 'medium',
      recommendation: 'proceed_with_caution',
      reasoning: `${country}'den maddi yetersizlik sebebiyle red aldınız. Bu düzeltilebilir bir durum. Eğer mali durumunuz iyileştiyse, tekrar deneyebilirsiniz.`,
      action_items: [
        'Güncel banka hesap özetleri hazırlayın',
        'Sponsor mektupları ekleyin',
        'Burs teklifi varsa vurgulayın',
        'Ailenizin mali durumunu belgelendirin',
      ],
    };
  }

  if (reasonData.pattern === 'documentation' && mostRecentMonths > 6) {
    return {
      country,
      risk_level: 'low',
      recommendation: 'proceed_with_caution',
      reasoning: `${country}'den döküman eksikliği sebebiyle red aldınız. Bu en kolay çözülebilir red türüdür.`,
      action_items: [
        'Tüm gerekli dökümanları kontrol edin',
        'Bir danışman ile dökümanlarınızı gözden geçirin',
        'Hiçbir belgeyi eksik bırakmayın',
        'Çevirileri onaylı yaptırın',
      ],
    };
  }

  if (reasonData.pattern === 'ties' && mostRecentMonths > 18) {
    return {
      country,
      risk_level: 'medium',
      recommendation: 'proceed_with_caution',
      reasoning: `${country}'den ülke bağlılığı zayıf sebebiyle red aldınız. Mezuniyet sonrası dönüş niyetinizi daha güçlü göstermelisiniz.`,
      action_items: [
        'Ülkenizdeki iş tekliflerinizi belgelendirin',
        'Aile bağlarınızı vurgulayın',
        'Gayrimenkul/yatırım belgelerinizi ekleyin',
        'Kariyer planınızın ülkenizde olduğunu gösterin',
      ],
    };
  }

  return {
    country,
    risk_level: 'medium',
    recommendation: 'proceed_with_caution',
    reasoning: `${country}'den daha önce red aldınız, ancak ${mostRecentMonths} ay geçti. Durumunuzu iyileştirdiyseniz tekrar başvurabilirsiniz.`,
    action_items: [
      'Red sebebini tam olarak anlayın',
      'O sorunu çözdüğünüzü belgelendirin',
      'Profilinizi güçlendirin',
      'Başvuru mektubunuzda durumu açıklayın',
    ],
  };
}

function analyzeFamilyLegalHistory(familyHistory: FamilyLegalHistory): {
  hasCriticalIssues: boolean;
  severity: number;
  warnings: string[];
} {
  const warnings: string[] = [];
  let severity = 0;

  if (familyHistory.criminal_record) {
    severity += 40;
    warnings.push('Aile üyelerinde suç geçmişi vize başvurularını olumsuz etkiler');
  }

  if (familyHistory.immigration_violation) {
    severity += 50;
    warnings.push('Göçmenlik kuralları ihlali çok ciddi bir durumdur ve vize reddi ihtimalini önemli ölçüde artırır');
  }

  if (familyHistory.deportation_history) {
    severity += 60;
    warnings.push('Sınır dışı geçmişi vizelerinizi ciddi şekilde etkileyecektir');
  }

  if (familyHistory.overstay_history) {
    severity += 45;
    warnings.push('Vize süresi aşımı geçmişi gelecek başvurularda sorun yaratabilir');
  }

  if (familyHistory.asylum_application) {
    severity += 35;
    warnings.push('İltica başvurusu geçmişi öğrenci vizesi başvurularında göç niyeti endişesi yaratabilir');
  }

  const hasCriticalIssues = familyHistory.deportation_history || familyHistory.immigration_violation;

  return { hasCriticalIssues, severity, warnings };
}

export function analyzeVisaHistory(
  rejections: VisaRejection[],
  familyHistory?: FamilyLegalHistory
): Map<string, VisaRiskAssessment> {
  const assessments = new Map<string, VisaRiskAssessment>();

  const familyAnalysis = familyHistory ? analyzeFamilyLegalHistory(familyHistory) : null;

  if (!rejections || rejections.length === 0) {
    if (familyAnalysis && familyAnalysis.severity > 0) {
      const baseAssessment: VisaRiskAssessment = {
        country: 'ALL',
        risk_level: familyAnalysis.hasCriticalIssues ? 'critical' : familyAnalysis.severity > 60 ? 'high' : 'medium',
        recommendation: familyAnalysis.hasCriticalIssues ? 'reconsider' : 'proceed_with_caution',
        reasoning: 'Aile yasal geçmişiniz vize başvurularınızı etkileyebilir.',
        action_items: [
          'Göçmenlik avukatına danışın',
          'Tüm dökümanları eksiksiz hazırlayın',
          'Durumunuzu açık ve dürüstçe belgelendirin',
          'Alternatif eğitim seçeneklerini de değerlendirin',
        ],
        family_issues_warning: familyAnalysis.warnings.join('. '),
      };
    }
    return assessments;
  }

  const countriesWithRejections = new Set(rejections.map(r => r.country));

  countriesWithRejections.forEach(country => {
    const countryRejections = rejections.filter(r => r.country === country);
    const totalSeverity = countryRejections.reduce((sum, r) => sum + analyzeRejectionSeverity(r), 0);

    const mostRecentRejection = countryRejections.sort((a, b) =>
      new Date(b.rejection_date).getTime() - new Date(a.rejection_date).getTime()
    )[0];

    const mostRecentMonths = calculateTimeSinceRejection(mostRecentRejection.rejection_date);

    const assessment = generateRecommendation(country, rejections, totalSeverity, mostRecentMonths);

    if (familyAnalysis && familyAnalysis.severity > 0) {
      if (familyAnalysis.hasCriticalIssues) {
        assessment.risk_level = 'critical';
        assessment.recommendation = 'avoid';
      } else if (assessment.risk_level === 'low') {
        assessment.risk_level = 'medium';
      } else if (assessment.risk_level === 'medium') {
        assessment.risk_level = 'high';
      }

      assessment.family_issues_warning = familyAnalysis.warnings.join('. ');
      assessment.action_items.unshift('Aile yasal geçmişiniz bu ülke için ek zorluk yaratıyor');
    }

    assessments.set(country, assessment);
  });

  return assessments;
}

export function getCountryRiskScore(country: string, visaAssessments: Map<string, VisaRiskAssessment>): number {
  const assessment = visaAssessments.get(country);

  if (!assessment) {
    return 0;
  }

  const riskPenalty: Record<string, number> = {
    low: -5,
    medium: -15,
    high: -35,
    critical: -60,
  };

  return riskPenalty[assessment.risk_level];
}

export function shouldShowCountry(country: string, visaAssessments: Map<string, VisaRiskAssessment>): boolean {
  const assessment = visaAssessments.get(country);

  if (!assessment) {
    return true;
  }

  return assessment.recommendation !== 'avoid';
}
