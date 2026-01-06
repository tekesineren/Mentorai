import { GraduationCap, DollarSign, Globe, Award, TrendingUp, MapPin, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { Professor } from '../utils/professorDatabase';
import { VisaRiskAssessment } from '../utils/visaAnalysis';

export type UniversityMatch = {
  university: {
    id: string;
    name: string;
    country: string;
    city: string;
    ranking_global?: number;
    website?: string;
  };
  match: {
    overall_match_score: number;
    academic_match_score: number;
    financial_match_score: number;
    visa_match_score: number;
    scholarship_potential_score: number;
    post_graduation_score: number;
    estimated_total_cost: number;
    estimated_scholarship_amount: number;
    visa_difficulty_assessment: string;
    post_graduation_opportunities: string;
    match_reasoning: string;
    degree_info?: {
      degree_type: string;
      duration_years: number;
      estimated_tuition_min: number;
      estimated_tuition_max: number;
    };
    notable_professors?: Professor[];
    visa_risk_assessment?: VisaRiskAssessment;
  };
  scholarships: Array<{
    name: string;
    type: string;
    amount_max: number;
    why_eligible: string;
  }>;
};

type MatchResultsProps = {
  matches: UniversityMatch[];
  onBack: () => void;
  programType?: string;
};

export default function MatchResults({ matches, onBack, programType }: MatchResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-blue-600';
    if (score >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-700 mb-4"
        >
          ← Profili Düzenle
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Sizin İçin En Uygun {programType === 'high_school' ? 'Liseler' : programType === 'language_school' ? 'Dil Okulları' : 'Üniversiteler'}
        </h1>
        <p className="text-gray-600">
          {matches.length} {programType === 'high_school' ? 'lise' : programType === 'language_school' ? 'dil okulu' : 'üniversite'} profilinizle eşleştirildi
        </p>
      </div>

      <div className="space-y-6">
        {matches.map((item, index) => {
          const school = (item as any).school || item.university;
          const isHighSchool = programType === 'high_school';
          const isLanguageSchool = programType === 'language_school';
          const matchScore = (item as any).matchScore !== undefined ? (item as any).matchScore : item.match.overall_match_score;

          return (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-gray-400">#{index + 1}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{school.name}</h2>
                      <div className="flex items-center gap-2 text-gray-600 mt-1">
                        <MapPin size={16} />
                        <span>{school.city}, {school.country}</span>
                        {school.ranking_global && (
                          <span className="ml-4 text-sm bg-gray-100 px-2 py-1 rounded">
                            Dünya Sıralaması: #{school.ranking_global}
                          </span>
                        )}
                        {school.ranking_national && (
                          <span className="ml-4 text-sm bg-gray-100 px-2 py-1 rounded">
                            Ulusal Sıralama: #{school.ranking_national}
                          </span>
                        )}
                        {school.rating && (
                          <span className="ml-4 text-sm bg-yellow-100 px-2 py-1 rounded">
                            ⭐ {school.rating}/5
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(matchScore).split(' ')[0]}`}>
                    {Math.round(matchScore)}%
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Genel Uyum</div>
                </div>
              </div>

              {isLanguageSchool && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-blue-900">Önerilen Süre</span>
                      <span className="text-blue-700 ml-2">
                        • {(item as any).recommendedDuration} hafta ({Math.round((item as any).recommendedDuration / 4)} ay)
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-700">Haftalık Ücret</div>
                      <div className="font-bold text-blue-900">
                        ${school.weekly_cost} (eğitim)
                        {school.accommodation_weekly && ` + $${school.accommodation_weekly} (konaklama)`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.match?.degree_info && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-blue-900">
                        {item.match.degree_info.degree_type === 'bachelor' && 'Lisans'}
                        {item.match.degree_info.degree_type === 'master' && 'Yüksek Lisans'}
                        {item.match.degree_info.degree_type === 'doctorate' && 'Doktora'}
                      </span>
                      <span className="text-blue-700 ml-2">
                        • {item.match.degree_info.duration_years} yıl
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-700">Tahmini Yıllık Ücret</div>
                      <div className="font-bold text-blue-900">
                        ${item.match.degree_info.estimated_tuition_min.toLocaleString()} - ${item.match.degree_info.estimated_tuition_max.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!isLanguageSchool && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <GraduationCap size={20} className="text-gray-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{item.match.academic_match_score}%</div>
                  <div className="text-xs text-gray-600">Akademik</div>
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign size={20} className="text-gray-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{item.match.financial_match_score}%</div>
                  <div className="text-xs text-gray-600">Mali Uyum</div>
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Globe size={20} className="text-gray-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{item.match.visa_match_score}%</div>
                  <div className="text-xs text-gray-600">Vize Kolaylığı</div>
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Award size={20} className="text-gray-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{item.match.scholarship_potential_score}%</div>
                  <div className="text-xs text-gray-600">Burs Potansiyeli</div>
                </div>

                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <TrendingUp size={20} className="text-gray-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{item.match.post_graduation_score}%</div>
                  <div className="text-xs text-gray-600">Mezuniyet Sonrası</div>
                </div>
              </div>
              )}

              {isLanguageSchool && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Programlar</h3>
                  <div className="flex flex-wrap gap-2">
                    {school.programs.map((program: string, idx: number) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!isLanguageSchool && (
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Tahmini Yıllık Maliyet</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ${item.match.estimated_total_cost.toLocaleString()}
                  </div>
                </div>

                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="text-sm text-green-700 mb-1">Tahmini Burs Tutarı</div>
                  <div className="text-2xl font-bold text-green-700">
                    ${item.match.estimated_scholarship_amount.toLocaleString()}
                  </div>
                </div>

                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="text-sm text-blue-700 mb-1">Net Maliyet</div>
                  <div className="text-2xl font-bold text-blue-700">
                    ${(item.match.estimated_total_cost - item.match.estimated_scholarship_amount).toLocaleString()}
                  </div>
                </div>
              </div>
              )}

              {isLanguageSchool && (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Toplam Maliyet ({(item as any).recommendedDuration} hafta)</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${(item as any).estimatedTotalCost.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Eğitim + Konaklama
                    </div>
                  </div>

                  <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                    <div className="text-sm text-blue-700 mb-1">Sınıf Mevcudu</div>
                    <div className="text-2xl font-bold text-blue-700">
                      Maks. {school.class_size_max} kişi
                    </div>
                  </div>
                </div>
              )}

              {item.match.notable_professors && item.match.notable_professors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <User size={20} className="text-blue-600" />
                    Araştırma Alanınızla İlgili Dünyaca Ünlü Hocalar
                  </h3>
                  <div className="space-y-3">
                    {item.match.notable_professors.map((professor) => (
                      <div key={professor.id} className="border-2 border-blue-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-white">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="font-bold text-lg text-gray-900">{professor.name}</div>
                              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                h-index: {professor.h_index}
                              </span>
                              {professor.accepting_students && (
                                <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                                  ✓ Öğrenci Kabul Ediyor
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-700 mb-2">{professor.title}</div>
                            <div className="text-sm text-gray-600 mb-2">{professor.notable_work}</div>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {professor.research_areas.map((area, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {area}
                                </span>
                              ))}
                            </div>
                            {professor.website && (
                              <a
                                href={professor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-700"
                              >
                                Website →
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {isLanguageSchool && (item as any).pros && (
                <div className="mb-6 grid md:grid-cols-2 gap-4">
                  {(item as any).pros.length > 0 && (
                    <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                      <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600" />
                        Avantajlar
                      </h4>
                      <ul className="space-y-1">
                        {(item as any).pros.map((pro: string, idx: number) => (
                          <li key={idx} className="text-sm text-green-800 flex items-start gap-2">
                            <span className="text-green-600">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(item as any).cons.length > 0 && (
                    <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                      <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-orange-600" />
                        Dikkat Edilmesi Gerekenler
                      </h4>
                      <ul className="space-y-1">
                        {(item as any).cons.map((con: string, idx: number) => (
                          <li key={idx} className="text-sm text-orange-800 flex items-start gap-2">
                            <span className="text-orange-600">!</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {item.scholarships && item.scholarships.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Uygun Burs Fırsatları</h3>
                  <div className="space-y-3">
                    {item.scholarships.map((scholarship, idx) => (
                      <div key={idx} className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-semibold text-gray-900 text-lg">{scholarship.name}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded">
                                {scholarship.type === 'academic' && 'Akademik Burs'}
                                {scholarship.type === 'athletic' && 'Spor Bursu'}
                                {scholarship.type === 'artistic' && 'Sanat Bursu'}
                                {scholarship.type === 'need-based' && 'İhtiyaç Bazlı'}
                                {scholarship.type === 'country-specific' && 'Ülke Özel'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${scholarship.amount_max.toLocaleString()}
                            </div>
                            <div className="text-xs text-green-700">Max. Burs Tutarı</div>
                          </div>
                        </div>
                        <div className="bg-white border border-green-200 rounded-lg p-3">
                          <div className="text-sm font-medium text-green-900 mb-1">
                            Profiliniz Neden Uygun:
                          </div>
                          <p className="text-sm text-gray-700">
                            {scholarship.why_eligible}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {item.match?.visa_risk_assessment && (
                  <div className={`border-2 rounded-lg p-4 ${
                    item.match.visa_risk_assessment.risk_level === 'low' ? 'bg-green-50 border-green-300' :
                    item.match.visa_risk_assessment.risk_level === 'medium' ? 'bg-yellow-50 border-yellow-300' :
                    item.match.visa_risk_assessment.risk_level === 'high' ? 'bg-orange-50 border-orange-300' :
                    'bg-red-50 border-red-300'
                  }`}>
                    <div className="flex items-start gap-3">
                      {item.match.visa_risk_assessment.recommendation === 'highly_recommended' ? (
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                      ) : (
                        <AlertTriangle className={`flex-shrink-0 mt-1 ${
                          item.match.visa_risk_assessment.risk_level === 'medium' ? 'text-yellow-600' :
                          item.match.visa_risk_assessment.risk_level === 'high' ? 'text-orange-600' :
                          'text-red-600'
                        }`} size={24} />
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          🛂 Vize Geçmişinize Özel AI Analizi
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.match.visa_risk_assessment.risk_level === 'low' ? 'bg-green-200 text-green-800' :
                            item.match.visa_risk_assessment.risk_level === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                            item.match.visa_risk_assessment.risk_level === 'high' ? 'bg-orange-200 text-orange-800' :
                            'bg-red-200 text-red-800'
                          }`}>
                            {item.match.visa_risk_assessment.risk_level === 'low' ? 'Düşük Risk' :
                             item.match.visa_risk_assessment.risk_level === 'medium' ? 'Orta Risk' :
                             item.match.visa_risk_assessment.risk_level === 'high' ? 'Yüksek Risk' : 'Kritik Risk'}
                          </span>
                        </h4>
                        <p className="text-sm text-gray-700 mb-3">
                          {item.match.visa_risk_assessment.reasoning}
                        </p>
                        {item.match.visa_risk_assessment.time_recommendation && (
                          <div className="bg-white border border-gray-200 rounded p-3 mb-3">
                            <p className="text-sm font-medium text-gray-900">
                              ⏰ Zaman Önerisi: {item.match.visa_risk_assessment.time_recommendation}
                            </p>
                          </div>
                        )}
                        {item.match.visa_risk_assessment.family_issues_warning && (
                          <div className="bg-red-100 border border-red-300 rounded p-3 mb-3">
                            <p className="text-sm font-semibold text-red-900 mb-1">⚠️ Aile Yasal Geçmiş Uyarısı</p>
                            <p className="text-sm text-red-800">
                              {item.match.visa_risk_assessment.family_issues_warning}
                            </p>
                          </div>
                        )}
                        <div className="bg-white rounded-lg p-3">
                          <h5 className="font-semibold text-gray-900 mb-2 text-sm">Önerilen Aksiyonlar:</h5>
                          <ul className="space-y-1">
                            {item.match.visa_risk_assessment.action_items.map((action, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!isLanguageSchool && item.match && (
                  <>
                    <div className={`border rounded-lg p-4 ${getScoreColor(item.match.visa_match_score)}`}>
                      <h4 className="font-semibold mb-1">Vize Değerlendirmesi</h4>
                      <p className="text-sm">{item.match.visa_difficulty_assessment}</p>
                    </div>

                    <div className={`border rounded-lg p-4 ${getScoreColor(item.match.post_graduation_score)}`}>
                      <h4 className="font-semibold mb-1">Mezuniyet Sonrası Fırsatlar</h4>
                      <p className="text-sm">{item.match.post_graduation_opportunities}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">Eşleşme Analizi</h4>
                      <p className="text-sm text-gray-700">{item.match.match_reasoning}</p>
                    </div>
                  </>
                )}

                {isLanguageSchool && school.accreditations && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Akreditasyonlar</h4>
                    <div className="flex flex-wrap gap-2">
                      {school.accreditations.map((acc: string, idx: number) => (
                        <span key={idx} className="text-sm bg-white border border-gray-300 px-3 py-1 rounded-full">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {isLanguageSchool && school.facilities && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Tesisler</h4>
                    <div className="flex flex-wrap gap-2">
                      {school.facilities.map((facility: string, idx: number) => (
                        <span key={idx} className="text-sm bg-white text-blue-800 px-3 py-1 rounded-full">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {item.university?.website && (
                <div className="mt-6 pt-4 border-t">
                  <a
                    href={item.university.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Üniversite Web Sitesini Ziyaret Et →
                  </a>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t">
              <div className="text-sm text-gray-600">
                Eşleşme Skoru: {item.match.overall_match_score}%
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getScoreBgColor(item.match.overall_match_score)} transition-all`}
                    style={{ width: `${item.match.overall_match_score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}