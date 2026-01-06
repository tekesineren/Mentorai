import { useState } from 'react';
import { User, GraduationCap, Globe, DollarSign, Award, Briefcase, Languages, Target, ShieldAlert } from 'lucide-react';

export type ScholarshipInterest = {
  type: 'none' | 'sports' | 'arts' | '';
  sports?: {
    gender: string;
    sport: string;
    position?: string;
    years_playing: string;
    level: string;
    achievements: string;
    team_name?: string;
    highlight_video?: string;
    is_licensed_in_turkey: boolean;
  }[];
  arts?: {
    field: string;
    portfolio_url?: string;
    years_experience: string;
    achievements: string;
    preferred_major?: string;
  }[];
};

export type SportActivity = {
  sport: string;
  position?: string;
  years_playing: string;
  level: string;
  achievements: string;
  team_name?: string;
  highlight_video?: string;
};

export type VisaRejection = {
  country: string;
  visa_type: string;
  rejection_date: string;
  rejection_reason: string;
  additional_details?: string;
};

export type FamilyLegalHistory = {
  criminal_record: boolean;
  criminal_record_details?: string;
  immigration_violation: boolean;
  immigration_violation_details?: string;
  deportation_history: boolean;
  deportation_details?: string;
  asylum_application: boolean;
  asylum_details?: string;
  overstay_history: boolean;
  overstay_details?: string;
};

export type AcademicHistory = {
  high_school: {
    name?: string;
    grade_level?: string;
    diploma_grade?: string;
    grade_9_math?: string;
    grade_9_science?: string;
    grade_9_english?: string;
    grade_9_social?: string;
    grade_10_math?: string;
    grade_10_science?: string;
    grade_10_english?: string;
    grade_10_social?: string;
    grade_11_math?: string;
    grade_11_science?: string;
    grade_11_english?: string;
    grade_11_social?: string;
    grade_12_math?: string;
    grade_12_science?: string;
    grade_12_english?: string;
    grade_12_social?: string;
    repeated_grade: boolean;
    repeated_grade_details?: string;
  };
  bachelor: {
    university_name?: string;
    major?: string;
    gpa?: string;
    graduation_year?: string;
    repeated_grade: boolean;
    repeated_grade_details?: string;
    double_major: boolean;
    double_major_field?: string;
    minor: boolean;
    minor_field?: string;
  };
  master?: {
    university_name?: string;
    major?: string;
    gpa?: string;
    graduation_year?: string;
    thesis_topic?: string;
  };
};

export type ProfileFormData = {
  program_type: 'high_school' | 'bachelor' | 'language_school' | 'master' | 'doctorate' | '';
  full_name: string;
  email: string;
  date_of_birth: string;
  nationality: string;
  current_education_level: string;
  target_degree_level: string;
  field_of_study: string;
  gpa: string;
  academic_history: AcademicHistory;
  career_goals: {
    primary_goal: string;
    research_interests: string[];
    dream_career: string;
  };
  visa_history: {
    has_rejections: boolean;
    rejections: VisaRejection[];
    family_legal_history: FamilyLegalHistory;
  };
  test_scores: {
    sat?: string;
    toefl?: string;
    ielts?: string;
    gre?: string;
  };
  languages: Array<{ language: string; proficiency: string }>;
  work_experience: Array<{ title: string; company: string; duration: string }>;
  sports_detailed: SportActivity[];
  scholarship_interest: ScholarshipInterest;
  extracurricular: {
    arts: string[];
    volunteer: string[];
  };
  achievements: Array<{ title: string; description: string }>;
  annual_budget: string;
  preferred_countries: string[];
  preferred_fields: string[];
};

type ProfileFormProps = {
  onSubmit: (data: ProfileFormData) => void;
  initialData?: ProfileFormData;
};

const emptyForm: ProfileFormData = {
  program_type: '',
  full_name: '',
  email: '',
  date_of_birth: '',
  nationality: '',
  current_education_level: '',
  target_degree_level: '',
  field_of_study: '',
  gpa: '',
  academic_history: {
    high_school: {
      repeated_grade: false,
    },
    bachelor: {
      repeated_grade: false,
      double_major: false,
      minor: false,
    },
  },
  career_goals: {
    primary_goal: '',
    research_interests: [],
    dream_career: '',
  },
  visa_history: {
    has_rejections: false,
    rejections: [],
    family_legal_history: {
      criminal_record: false,
      immigration_violation: false,
      deportation_history: false,
      asylum_application: false,
      overstay_history: false,
    },
  },
  test_scores: {},
  languages: [{ language: '', proficiency: '' }],
  work_experience: [],
  sports_detailed: [{ sport: '', years_playing: '', level: '', achievements: '' }],
  scholarship_interest: { type: '' },
  extracurricular: { arts: [], volunteer: [] },
  achievements: [{ title: '', description: '' }],
  annual_budget: '',
  preferred_countries: [],
  preferred_fields: [],
};

export default function ProfileForm({ onSubmit, initialData }: ProfileFormProps) {
  const [formData, setFormData] = useState<ProfileFormData>(initialData || emptyForm);
  const [currentStep, setCurrentStep] = useState(-1);

  const steps = [
    { title: 'Program Tipi', icon: Target },
    { title: 'Temel & Akademik Bilgiler', icon: User },
    { title: 'Kariyer Hedefleri', icon: Target },
    { title: 'Vize Geçmişi', icon: ShieldAlert },
    { title: 'Dil & Test Skorları', icon: Languages },
    { title: 'Deneyim, Aktiviteler & Başarılar', icon: Briefcase },
    { title: 'Bütçe & Tercihler', icon: DollarSign },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { language: '', proficiency: '' }],
    });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      work_experience: [...formData.work_experience, { title: '', company: '', duration: '' }],
    });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { title: '', description: '' }],
    });
  };

  const addSport = () => {
    setFormData({
      ...formData,
      sports_detailed: [...formData.sports_detailed, { sport: '', years_playing: '', level: '', achievements: '' }],
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case -1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-bold text-blue-900 mb-3">Ventora'ya Hoş Geldiniz!</h3>
              <p className="text-blue-800 mb-4">
                Size en uygun eğitim yolunu çizmek için hangi seviyede eğitim arıyorsunuz?
              </p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="high_school"
                  checked={formData.program_type === 'high_school'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as any })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">🏫 Lise Eğitimi</h4>
                      <p className="text-sm text-gray-600">
                        Yurtdışında lise okumak istiyorum. Boarding school ve uluslararası lise programları arıyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="language_school"
                  checked={formData.program_type === 'language_school'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as any })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">🗣️ Dil Okulu</h4>
                      <p className="text-sm text-gray-600">
                        Yabancı dil öğrenmek ve geliştirmek için dil okulu programları arıyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="bachelor"
                  checked={formData.program_type === 'bachelor'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as any })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">🎓 Lisans (Bachelor's Degree)</h4>
                      <p className="text-sm text-gray-600">
                        Üniversite lisans programı arıyorum. İlk üniversite diplomamı almak istiyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="master"
                  checked={formData.program_type === 'master'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as any })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">📚 Yüksek Lisans (Master's Degree)</h4>
                      <p className="text-sm text-gray-600">
                        Lisans sonrası uzmanlık yapmak istiyorum. Master programları ve araştırma fırsatları arıyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>

              <label className="block">
                <input
                  type="radio"
                  name="program_type"
                  value="doctorate"
                  checked={formData.program_type === 'doctorate'}
                  onChange={(e) => setFormData({ ...formData, program_type: e.target.value as any })}
                  className="sr-only peer"
                />
                <div className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">🔬 Doktora (PhD)</h4>
                      <p className="text-sm text-gray-600">
                        Akademik kariyer ve araştırma yapmak istiyorum. Doktora programları ve tam burslu fırsatlar arıyorum.
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {formData.program_type && (
              <div className="bg-green-50 border border-green-300 rounded-lg p-4 mt-6">
                <p className="text-sm text-green-800">
                  <strong>Harika!</strong> Seçiminize göre size özel bir yol haritası oluşturacağız.
                  Devam ederek profilinizi tamamlayın.
                </p>
              </div>
            )}
          </div>
        );

      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Doğum Tarihi</label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Uyruk</label>
              <input
                type="text"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Türkiye"
              />
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap size={20} className="text-blue-600" />
              Akademik Bilgiler
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mevcut Eğitim Seviyesi</label>
              <select
                value={formData.current_education_level}
                onChange={(e) => setFormData({ ...formData, current_education_level: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seçiniz</option>
                <option value="high_school">Lise</option>
                <option value="bachelor">Lisans</option>
                <option value="master">Yüksek Lisans</option>
                <option value="doctorate">Doktora</option>
              </select>
            </div>

            {formData.current_education_level === 'high_school' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lise Kaçıncı Sınıf?</label>
                <select
                  value={formData.academic_history.high_school.grade_level || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    academic_history: {
                      ...formData.academic_history,
                      high_school: {
                        ...formData.academic_history.high_school,
                        grade_level: e.target.value
                      }
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Seçiniz</option>
                  <option value="9">9. Sınıf</option>
                  <option value="10">10. Sınıf</option>
                  <option value="11">11. Sınıf</option>
                  <option value="12">12. Sınıf</option>
                  <option value="graduated">Mezun</option>
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hedef Eğitim Seviyesi</label>
              <select
                value={formData.target_degree_level}
                onChange={(e) => setFormData({ ...formData, target_degree_level: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Seçiniz</option>
                <option value="high_school_transfer">Lise Transfer</option>
                <option value="bachelor">Lisans</option>
                <option value="master">Yüksek Lisans</option>
                <option value="doctorate">Doktora</option>
              </select>
              <p className="mt-2 text-sm text-gray-500">
                Hangi seviyede eğitim almak istiyorsunuz?
              </p>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 Detaylı Eğitim Geçmişi</h3>

            <div className="space-y-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900">Lise</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lise Adı</label>
                <input
                  type="text"
                  value={formData.academic_history.high_school.name || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    academic_history: {
                      ...formData.academic_history,
                      high_school: { ...formData.academic_history.high_school, name: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="İstanbul Anadolu Lisesi"
                />
              </div>

              {formData.program_type === 'bachelor' || formData.program_type === 'language_school' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Diploma Notu</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.academic_history.high_school.diploma_grade || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        high_school: { ...formData.academic_history.high_school, diploma_grade: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="85"
                  />
                  <p className="text-xs text-gray-500 mt-1">100 üzerinden diploma notunuzu giriniz</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-800 mt-4">Yıl Sonu Notları</h5>
                  <p className="text-sm text-gray-600">Ana derslerin yıl sonu notlarını giriniz (100 üzerinden)</p>

                {/* 9. Sınıf */}
                <div className="border-t pt-3">
                  <h6 className="font-medium text-gray-700 mb-3">9. Sınıf</h6>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Matematik</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_9_math || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_9_math: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Fen Bilgisi</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_9_science || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_9_science: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">İngilizce</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_9_english || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_9_english: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="88"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Sosyal Bilgiler</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_9_social || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_9_social: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="92"
                      />
                    </div>
                  </div>
                </div>

                {/* 10. Sınıf */}
                <div className="border-t pt-3">
                  <h6 className="font-medium text-gray-700 mb-3">10. Sınıf</h6>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Matematik</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_10_math || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_10_math: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Fen Bilgisi</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_10_science || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_10_science: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">İngilizce</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_10_english || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_10_english: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="88"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Sosyal Bilgiler</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_10_social || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_10_social: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="92"
                      />
                    </div>
                  </div>
                </div>

                {/* 11. Sınıf */}
                <div className="border-t pt-3">
                  <h6 className="font-medium text-gray-700 mb-3">11. Sınıf</h6>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Matematik</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_11_math || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_11_math: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Fen Bilgisi</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_11_science || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_11_science: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">İngilizce</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_11_english || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_11_english: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="88"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Sosyal Bilgiler</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_11_social || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_11_social: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="92"
                      />
                    </div>
                  </div>
                </div>

                {/* 12. Sınıf */}
                <div className="border-t pt-3">
                  <h6 className="font-medium text-gray-700 mb-3">12. Sınıf</h6>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Matematik</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_12_math || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_12_math: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="85"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Fen Bilgisi</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_12_science || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_12_science: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="90"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">İngilizce</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_12_english || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_12_english: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="88"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Sosyal Bilgiler</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.academic_history.high_school.grade_12_social || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          academic_history: {
                            ...formData.academic_history,
                            high_school: { ...formData.academic_history.high_school, grade_12_social: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="92"
                      />
                    </div>
                  </div>
                </div>
              </div>
              )}

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.academic_history.high_school.repeated_grade}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        high_school: {
                          ...formData.academic_history.high_school,
                          repeated_grade: e.target.checked,
                          repeated_grade_details: e.target.checked ? formData.academic_history.high_school.repeated_grade_details : undefined
                        }
                      }
                    })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">Sınıf tekrarı yaptım</span>
                </label>
                {formData.academic_history.high_school.repeated_grade && (
                  <textarea
                    value={formData.academic_history.high_school.repeated_grade_details || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        high_school: {
                          ...formData.academic_history.high_school,
                          repeated_grade_details: e.target.value
                        }
                      }
                    })}
                    rows={2}
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Hangi sınıf, sebep neydi?"
                  />
                )}
              </div>
            </div>

            {formData.program_type !== 'high_school' && (
              <div className="space-y-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Lisans (Üniversite)</h4>
                  <label className="flex items-center gap-2 cursor-pointer bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={!formData.academic_history.bachelor.university_name && formData.academic_history.bachelor.major === 'not_started'}
                      onChange={(e) => setFormData({
                        ...formData,
                        academic_history: {
                          ...formData.academic_history,
                          bachelor: e.target.checked
                            ? { ...formData.academic_history.bachelor, university_name: '', major: 'not_started', gpa: '', graduation_year: '' }
                            : { ...formData.academic_history.bachelor, major: '' }
                        }
                      })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-blue-900">Lisans henüz okumadım</span>
                  </label>
                </div>

              {formData.academic_history.bachelor.major !== 'not_started' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Üniversite Adı</label>
                    <input
                      type="text"
                      value={formData.academic_history.bachelor.university_name || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        academic_history: {
                          ...formData.academic_history,
                          bachelor: { ...formData.academic_history.bachelor, university_name: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Boğaziçi Üniversitesi"
                    />
                  </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bölüm</label>
                <input
                  type="text"
                  value={formData.academic_history.bachelor.major || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    academic_history: {
                      ...formData.academic_history,
                      bachelor: { ...formData.academic_history.bachelor, major: e.target.value }
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Bilgisayar Mühendisliği"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                  <input
                    type="text"
                    value={formData.academic_history.bachelor.gpa || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: { ...formData.academic_history.bachelor, gpa: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="3.50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mezuniyet Yılı</label>
                  <input
                    type="text"
                    value={formData.academic_history.bachelor.graduation_year || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: { ...formData.academic_history.bachelor, graduation_year: e.target.value }
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="2024"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.academic_history.bachelor.repeated_grade}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: {
                          ...formData.academic_history.bachelor,
                          repeated_grade: e.target.checked,
                          repeated_grade_details: e.target.checked ? formData.academic_history.bachelor.repeated_grade_details : undefined
                        }
                      }
                    })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">Sınıf tekrarı yaptım</span>
                </label>
                {formData.academic_history.bachelor.repeated_grade && (
                  <textarea
                    value={formData.academic_history.bachelor.repeated_grade_details || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: {
                          ...formData.academic_history.bachelor,
                          repeated_grade_details: e.target.value
                        }
                      }
                    })}
                    rows={2}
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Hangi sınıf, sebep neydi?"
                  />
                )}
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.academic_history.bachelor.double_major}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: {
                          ...formData.academic_history.bachelor,
                          double_major: e.target.checked,
                          double_major_field: e.target.checked ? formData.academic_history.bachelor.double_major_field : undefined
                        }
                      }
                    })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">Çift anadal yaptım</span>
                </label>
                {formData.academic_history.bachelor.double_major && (
                  <input
                    type="text"
                    value={formData.academic_history.bachelor.double_major_field || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: {
                          ...formData.academic_history.bachelor,
                          double_major_field: e.target.value
                        }
                      }
                    })}
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="İkinci bölüm adı"
                  />
                )}
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.academic_history.bachelor.minor}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: {
                          ...formData.academic_history.bachelor,
                          minor: e.target.checked,
                          minor_field: e.target.checked ? formData.academic_history.bachelor.minor_field : undefined
                        }
                      }
                    })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm font-medium text-gray-700">Yan dal yaptım</span>
                </label>
                {formData.academic_history.bachelor.minor && (
                  <input
                    type="text"
                    value={formData.academic_history.bachelor.minor_field || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      academic_history: {
                        ...formData.academic_history,
                        bachelor: {
                          ...formData.academic_history.bachelor,
                          minor_field: e.target.value
                        }
                      }
                    })}
                    className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Yan dal alanı"
                  />
                )}
              </div>
                </>
              )}
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">🎯 Kariyer Hedeflerinizi Belirleyin</h3>
              <p className="text-sm text-blue-700">
                Hedeflerinize göre, dünyadaki önde gelen akademisyenleri ve araştırma merkezlerini size öneriyoruz.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Birincil Hedef</label>
              <select
                value={formData.career_goals.primary_goal}
                onChange={(e) => setFormData({
                  ...formData,
                  career_goals: { ...formData.career_goals, primary_goal: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seçiniz</option>
                <option value="academic_research">Akademik Araştırma / Profesör</option>
                <option value="industry_expert">Sektörde Uzman / Mühendis</option>
                <option value="entrepreneur">Girişimci / Startup Kurucusu</option>
                <option value="public_sector">Kamu Sektörü / Politika Yapıcı</option>
                <option value="consulting">Danışmanlık / Stratejik Planlama</option>
                <option value="ngo_social">STK / Sosyal Etki</option>
              </select>
            </div>

            {(formData.program_type === 'master' || formData.program_type === 'doctorate') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Araştırma İlgi Alanları</label>
                <input
                  type="text"
                  value={formData.career_goals.research_interests.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData,
                    career_goals: {
                      ...formData.career_goals,
                      research_interests: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yapay Zeka, Makine Öğrenmesi, İklim Değişikliği (virgülle ayırın)"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Bu alanlarda çalışan dünyaca ünlü hocaları size eşleştireceğiz
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hayalinizdeki Kariyer</label>
              <input
                type="text"
                value={formData.career_goals.dream_career}
                onChange={(e) => setFormData({
                  ...formData,
                  career_goals: { ...formData.career_goals, dream_career: e.target.value }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn: AI Araştırmacısı, Sürdürülebilirlik Danışmanı, Fintech Girişimcisi"
              />
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-blue-600" />
              İş Deneyimi
            </h3>

            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, work_experience: [] })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.work_experience.length === 0
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">İş Deneyimim Yok</div>
                  <div className="text-xs opacity-75">Henüz çalışma deneyimim olmadı</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (formData.work_experience.length === 0) {
                      addWorkExperience();
                    }
                  }}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.work_experience.length > 0
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">İş Deneyimim Var</div>
                  <div className="text-xs opacity-75">Eklemek istiyorum</div>
                </button>
              </div>

              {formData.work_experience.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">İş Deneyimleriniz</label>
                    <button
                      type="button"
                      onClick={addWorkExperience}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      + Deneyim Ekle
                    </button>
                  </div>
                  {formData.work_experience.map((exp, index) => (
                    <div key={index} className="space-y-3 mb-4 p-4 border border-gray-200 rounded-lg">
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => {
                          const newExp = [...formData.work_experience];
                          newExp[index].title = e.target.value;
                          setFormData({ ...formData, work_experience: newExp });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Pozisyon"
                      />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...formData.work_experience];
                          newExp[index].company = e.target.value;
                          setFormData({ ...formData, work_experience: newExp });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Şirket"
                      />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...formData.work_experience];
                          newExp[index].duration = e.target.value;
                          setFormData({ ...formData, work_experience: newExp });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Süre (örn. 2 yıl)"
                      />
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">🎓 Profesör Eşleştirme</h4>
              <p className="text-sm text-green-700">
                Araştırma alanlarınıza göre, dünyanın önde gelen akademisyenlerinin olduğu üniversiteleri size öneriyoruz.
                Bu sayede doğru hoca ile doğru üniversitede eğitim alma şansınız artıyor.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-orange-900 mb-2">🛂 Vize Geçmişiniz</h3>
              <p className="text-sm text-orange-700">
                Geçmiş vize red durumlarınızı paylaşın. AI sistemimiz, hangi ülkelerin sizin için daha uygun olduğunu analiz edecek.
              </p>
            </div>

            <div>
              <label className="flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <input
                  type="checkbox"
                  checked={formData.visa_history.has_rejections}
                  onChange={(e) => setFormData({
                    ...formData,
                    visa_history: {
                      ...formData.visa_history,
                      has_rejections: e.target.checked,
                      rejections: e.target.checked ? formData.visa_history.rejections : []
                    }
                  })}
                  className="w-5 h-5"
                />
                <div>
                  <div className="font-medium text-gray-900">Daha önce vize reddi aldım</div>
                  <div className="text-sm text-gray-600">Geçmiş vize red durumlarınızı ekleyin</div>
                </div>
              </label>
            </div>

            {formData.visa_history.has_rejections && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-medium text-gray-700">Vize Red Geçmişi</label>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        visa_history: {
                          ...formData.visa_history,
                          rejections: [...formData.visa_history.rejections, {
                            country: '',
                            visa_type: '',
                            rejection_date: '',
                            rejection_reason: '',
                            additional_details: ''
                          }]
                        }
                      });
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    + Red Ekle
                  </button>
                </div>

                {formData.visa_history.rejections.map((rejection, index) => (
                  <div key={index} className="border-2 border-orange-200 rounded-lg p-4 bg-orange-50 space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">Red #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const newRejections = formData.visa_history.rejections.filter((_, i) => i !== index);
                          setFormData({
                            ...formData,
                            visa_history: {
                              ...formData.visa_history,
                              rejections: newRejections
                            }
                          });
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Sil
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ülke</label>
                        <select
                          value={rejection.country}
                          onChange={(e) => {
                            const newRejections = [...formData.visa_history.rejections];
                            newRejections[index].country = e.target.value;
                            setFormData({
                              ...formData,
                              visa_history: { ...formData.visa_history, rejections: newRejections }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          <option value="USA">ABD</option>
                          <option value="UK">İngiltere</option>
                          <option value="Canada">Kanada</option>
                          <option value="Australia">Avustralya</option>
                          <option value="Germany">Almanya</option>
                          <option value="France">Fransa</option>
                          <option value="Netherlands">Hollanda</option>
                          <option value="Switzerland">İsviçre</option>
                          <option value="Sweden">İsveç</option>
                          <option value="Denmark">Danimarka</option>
                          <option value="Other">Diğer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vize Türü</label>
                        <select
                          value={rejection.visa_type}
                          onChange={(e) => {
                            const newRejections = [...formData.visa_history.rejections];
                            newRejections[index].visa_type = e.target.value;
                            setFormData({
                              ...formData,
                              visa_history: { ...formData.visa_history, rejections: newRejections }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seçiniz</option>
                          <option value="student">Öğrenci Vizesi</option>
                          <option value="tourist">Turist Vizesi</option>
                          <option value="work">İş Vizesi</option>
                          <option value="visitor">Ziyaretçi Vizesi</option>
                          <option value="other">Diğer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Red Tarihi</label>
                      <input
                        type="date"
                        value={rejection.rejection_date}
                        onChange={(e) => {
                          const newRejections = [...formData.visa_history.rejections];
                          newRejections[index].rejection_date = e.target.value;
                          setFormData({
                            ...formData,
                            visa_history: { ...formData.visa_history, rejections: newRejections }
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Red Sebebi</label>
                      <select
                        value={rejection.rejection_reason}
                        onChange={(e) => {
                          const newRejections = [...formData.visa_history.rejections];
                          newRejections[index].rejection_reason = e.target.value;
                          setFormData({
                            ...formData,
                            visa_history: { ...formData.visa_history, rejections: newRejections }
                          });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Seçiniz</option>
                        <option value="insufficient_funds">Yetersiz Maddi Durum</option>
                        <option value="incomplete_documentation">Eksik Döküman</option>
                        <option value="weak_ties">Ülkeye Bağlılık Zayıf</option>
                        <option value="intent_not_clear">Gidiş Amacı Net Değil</option>
                        <option value="previous_violation">Geçmiş İhlal</option>
                        <option value="security_concerns">Güvenlik Endişesi</option>
                        <option value="false_information">Yanlış Bilgi</option>
                        <option value="other">Diğer</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ek Detaylar (Opsiyonel)</label>
                      <textarea
                        value={rejection.additional_details}
                        onChange={(e) => {
                          const newRejections = [...formData.visa_history.rejections];
                          newRejections[index].additional_details = e.target.value;
                          setFormData({
                            ...formData,
                            visa_history: { ...formData.visa_history, rejections: newRejections }
                          });
                        }}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Red hakkında bildiğiniz ek detayları yazın..."
                      />
                    </div>
                  </div>
                ))}

                {formData.visa_history.rejections.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    "+ Red Ekle" butonuna tıklayarak vize red geçmişinizi ekleyin
                  </div>
                )}
              </div>
            )}

            {!formData.visa_history.has_rejections && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  ✓ Harika! Vize red geçmişiniz olmadığı için daha geniş bir ülke yelpazesi sizin için uygun olacak.
                </p>
              </div>
            )}

            <div className="border-t border-gray-200 my-6"></div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-red-900 mb-2">⚠️ Aile ve Yasal Geçmiş</h3>
              <p className="text-sm text-red-700">
                Vize başvurularında sizin veya yakın aile üyelerinizin (anne, baba, kardeş, eş) yasal geçmişi önemli rol oynar.
                Lütfen dürüstçe cevaplayın - bu bilgiler doğru strateji belirlememize yardımcı olacak.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-gray-300 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visa_history.family_legal_history.criminal_record}
                    onChange={(e) => setFormData({
                      ...formData,
                      visa_history: {
                        ...formData.visa_history,
                        family_legal_history: {
                          ...formData.visa_history.family_legal_history,
                          criminal_record: e.target.checked,
                          criminal_record_details: e.target.checked ? formData.visa_history.family_legal_history.criminal_record_details : undefined
                        }
                      }
                    })}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Suç Geçmişi</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Siz veya yakın aile üyelerinizden herhangi biri cezai bir suçtan mahkum oldu mu?
                    </div>
                  </div>
                </label>
                {formData.visa_history.family_legal_history.criminal_record && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                    <textarea
                      value={formData.visa_history.family_legal_history.criminal_record_details || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        visa_history: {
                          ...formData.visa_history,
                          family_legal_history: {
                            ...formData.visa_history.family_legal_history,
                            criminal_record_details: e.target.value
                          }
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Kim, ne zaman, hangi suç, sonuç ne oldu?"
                    />
                  </div>
                )}
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visa_history.family_legal_history.immigration_violation}
                    onChange={(e) => setFormData({
                      ...formData,
                      visa_history: {
                        ...formData.visa_history,
                        family_legal_history: {
                          ...formData.visa_history.family_legal_history,
                          immigration_violation: e.target.checked,
                          immigration_violation_details: e.target.checked ? formData.visa_history.family_legal_history.immigration_violation_details : undefined
                        }
                      }
                    })}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Göçmenlik Kuralları İhlali</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Siz veya ailenizden biri kaçak göçmenlik veya göçmenlik kurallarını ihlal etti mi?
                    </div>
                  </div>
                </label>
                {formData.visa_history.family_legal_history.immigration_violation && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                    <textarea
                      value={formData.visa_history.family_legal_history.immigration_violation_details || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        visa_history: {
                          ...formData.visa_history,
                          family_legal_history: {
                            ...formData.visa_history.family_legal_history,
                            immigration_violation_details: e.target.value
                          }
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Hangi ülke, ne zaman, ne oldu?"
                    />
                  </div>
                )}
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visa_history.family_legal_history.deportation_history}
                    onChange={(e) => setFormData({
                      ...formData,
                      visa_history: {
                        ...formData.visa_history,
                        family_legal_history: {
                          ...formData.visa_history.family_legal_history,
                          deportation_history: e.target.checked,
                          deportation_details: e.target.checked ? formData.visa_history.family_legal_history.deportation_details : undefined
                        }
                      }
                    })}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Sınır Dışı (Deportasyon) Geçmişi</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Siz veya ailenizden biri herhangi bir ülkeden sınır dışı edildi mi?
                    </div>
                  </div>
                </label>
                {formData.visa_history.family_legal_history.deportation_history && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                    <textarea
                      value={formData.visa_history.family_legal_history.deportation_details || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        visa_history: {
                          ...formData.visa_history,
                          family_legal_history: {
                            ...formData.visa_history.family_legal_history,
                            deportation_details: e.target.value
                          }
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Hangi ülke, ne zaman, sebep neydi?"
                    />
                  </div>
                )}
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visa_history.family_legal_history.overstay_history}
                    onChange={(e) => setFormData({
                      ...formData,
                      visa_history: {
                        ...formData.visa_history,
                        family_legal_history: {
                          ...formData.visa_history.family_legal_history,
                          overstay_history: e.target.checked,
                          overstay_details: e.target.checked ? formData.visa_history.family_legal_history.overstay_details : undefined
                        }
                      }
                    })}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Vize Süresi Aşımı (Overstay)</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Siz veya ailenizden biri vize süresini aşarak bir ülkede kaldı mı?
                    </div>
                  </div>
                </label>
                {formData.visa_history.family_legal_history.overstay_history && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                    <textarea
                      value={formData.visa_history.family_legal_history.overstay_details || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        visa_history: {
                          ...formData.visa_history,
                          family_legal_history: {
                            ...formData.visa_history.family_legal_history,
                            overstay_details: e.target.value
                          }
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Hangi ülke, ne kadar süre aşıldı?"
                    />
                  </div>
                )}
              </div>

              <div className="border-2 border-gray-300 rounded-lg p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.visa_history.family_legal_history.asylum_application}
                    onChange={(e) => setFormData({
                      ...formData,
                      visa_history: {
                        ...formData.visa_history,
                        family_legal_history: {
                          ...formData.visa_history.family_legal_history,
                          asylum_application: e.target.checked,
                          asylum_details: e.target.checked ? formData.visa_history.family_legal_history.asylum_details : undefined
                        }
                      }
                    })}
                    className="w-5 h-5 mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">İltica Başvurusu</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Siz veya ailenizden biri herhangi bir ülkeye iltica başvurusunda bulundu mu?
                    </div>
                  </div>
                </label>
                {formData.visa_history.family_legal_history.asylum_application && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Detaylar</label>
                    <textarea
                      value={formData.visa_history.family_legal_history.asylum_details || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        visa_history: {
                          ...formData.visa_history,
                          family_legal_history: {
                            ...formData.visa_history.family_legal_history,
                            asylum_details: e.target.value
                          }
                        }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Hangi ülke, ne zaman, sonuç ne oldu?"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-700">
                <strong>Neden bu bilgileri soruyoruz?</strong> Vize memurları aile geçmişini de dikkate alır.
                Bu bilgiler sayesinde size en uygun ülkeleri ve stratejiyi önerebiliriz. Tüm bilgileriniz gizli tutulur.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SAT Skoru</label>
                <input
                  type="number"
                  value={formData.test_scores.sat || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    test_scores: { ...formData.test_scores, sat: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TOEFL Skoru</label>
                <input
                  type="number"
                  value={formData.test_scores.toefl || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    test_scores: { ...formData.test_scores, toefl: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IELTS Skoru</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.test_scores.ielts || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    test_scores: { ...formData.test_scores, ielts: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GRE Skoru</label>
                <input
                  type="number"
                  value={formData.test_scores.gre || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    test_scores: { ...formData.test_scores, gre: e.target.value }
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="320"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Diller</label>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Dil Ekle
                </button>
              </div>
              {formData.languages.map((lang, index) => (
                <div key={index} className="grid grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => {
                      const newLangs = [...formData.languages];
                      newLangs[index].language = e.target.value;
                      setFormData({ ...formData, languages: newLangs });
                    }}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="İngilizce"
                  />
                  <select
                    value={lang.proficiency}
                    onChange={(e) => {
                      const newLangs = [...formData.languages];
                      newLangs[index].proficiency = e.target.value;
                      setFormData({ ...formData, languages: newLangs });
                    }}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seviye</option>
                    <option value="beginner">Başlangıç</option>
                    <option value="intermediate">Orta</option>
                    <option value="advanced">İleri</option>
                    <option value="native">Ana dil</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-purple-900 mb-2">🎓 Burs Fırsatları</h3>
              <p className="text-sm text-purple-700">
                İlgilendiğiniz spor veya sanat bursları hakkında bilgi almak için aşağıdaki seçenekleri doldurun.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Spor veya Sanat Burslarıyla İlgileniyor Musunuz?</label>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, scholarship_interest: { type: 'none' } })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.scholarship_interest.type === 'none'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">İlgilenmiyorum</div>
                  <div className="text-xs opacity-75">Akademik burslar yeterli</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, scholarship_interest: { type: 'sports', sports: [] } })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.scholarship_interest.type === 'sports'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">Spor Bursları</div>
                  <div className="text-xs opacity-75">Sporcu olarak başvurmak istiyorum</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, scholarship_interest: { type: 'arts', arts: [] } })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.scholarship_interest.type === 'arts'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">Sanat Bursları</div>
                  <div className="text-xs opacity-75">Sanatsal yeteneklerimle başvurmak istiyorum</div>
                </button>
              </div>
              {formData.scholarship_interest.type === 'sports' && (
                <>
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">⚠️ D1 Bursları İçin Önemli Uyarı</h4>
                    <p className="text-sm text-yellow-800">
                      Eğer NCAA Division 1 (D1) burslarıyla ilgileniyorsanız, Türkiye'de lisanslı sporcu olmanız gerekmektedir.
                      Aksi takdirde sistemimiz sizi D1 spor bursları için değerlendirmeyecektir.
                    </p>
                  </div>

                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">Spor Bilgileriniz</label>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          scholarship_interest: {
                            ...formData.scholarship_interest,
                            sports: [
                              ...(formData.scholarship_interest.sports || []),
                              { gender: '', sport: '', years_playing: '', level: '', achievements: '', is_licensed_in_turkey: false }
                            ]
                          }
                        });
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      + Spor Ekle
                    </button>
                  </div>

                  {(formData.scholarship_interest.sports || []).map((sport, index) => (
                    <div key={index} className="space-y-4 mb-4 p-5 border-2 border-blue-100 rounded-lg bg-blue-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">Spor #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newSports = (formData.scholarship_interest.sports || []).filter((_, i) => i !== index);
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                sports: newSports
                              }
                            });
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Sil
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Cinsiyet</label>
                        <select
                          value={sport.gender}
                          onChange={(e) => {
                            const newSports = [...(formData.scholarship_interest.sports || [])];
                            newSports[index].gender = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                sports: newSports
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Seçiniz</option>
                          <option value="male">Erkek</option>
                          <option value="female">Kadın</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Spor Dalı</label>
                          <input
                            type="text"
                            value={sport.sport}
                            onChange={(e) => {
                              const newSports = [...(formData.scholarship_interest.sports || [])];
                              newSports[index].sport = e.target.value;
                              setFormData({
                                ...formData,
                                scholarship_interest: {
                                  ...formData.scholarship_interest,
                                  sports: newSports
                                }
                              });
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            placeholder="Basketbol, Futbol, Voleybol..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Pozisyon</label>
                          <input
                            type="text"
                            value={sport.position || ''}
                            onChange={(e) => {
                              const newSports = [...(formData.scholarship_interest.sports || [])];
                              newSports[index].position = e.target.value;
                              setFormData({
                                ...formData,
                                scholarship_interest: {
                                  ...formData.scholarship_interest,
                                  sports: newSports
                                }
                              });
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            placeholder="Point Guard, Forvet..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Kaç yıldır oynuyorsunuz?</label>
                          <input
                            type="text"
                            value={sport.years_playing}
                            onChange={(e) => {
                              const newSports = [...(formData.scholarship_interest.sports || [])];
                              newSports[index].years_playing = e.target.value;
                              setFormData({
                                ...formData,
                                scholarship_interest: {
                                  ...formData.scholarship_interest,
                                  sports: newSports
                                }
                              });
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            placeholder="5 yıl"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Seviye</label>
                          <select
                            value={sport.level}
                            onChange={(e) => {
                              const newSports = [...(formData.scholarship_interest.sports || [])];
                              newSports[index].level = e.target.value;
                              setFormData({
                                ...formData,
                                scholarship_interest: {
                                  ...formData.scholarship_interest,
                                  sports: newSports
                                }
                              });
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="">Seviye Seçin</option>
                            <option value="recreational">Amatör</option>
                            <option value="club">Kulüp</option>
                            <option value="high_school">Lise Takımı</option>
                            <option value="varsity">Okul Takımı (Varsity)</option>
                            <option value="regional">Bölgesel</option>
                            <option value="national">Ulusal</option>
                            <option value="international">Uluslararası</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Takım Adı (Opsiyonel)</label>
                        <input
                          type="text"
                          value={sport.team_name || ''}
                          onChange={(e) => {
                            const newSports = [...(formData.scholarship_interest.sports || [])];
                            newSports[index].team_name = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                sports: newSports
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="Takım veya kulüp adı"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Başarılar & Ödüller</label>
                        <textarea
                          value={sport.achievements}
                          onChange={(e) => {
                            const newSports = [...(formData.scholarship_interest.sports || [])];
                            newSports[index].achievements = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                sports: newSports
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="Şampiyonluklar, ödüller, rekorlar..."
                          rows={2}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Highlight Video Linki (Opsiyonel)</label>
                        <input
                          type="url"
                          value={sport.highlight_video || ''}
                          onChange={(e) => {
                            const newSports = [...(formData.scholarship_interest.sports || [])];
                            newSports[index].highlight_video = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                sports: newSports
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="https://youtube.com/watch?v=..."
                        />
                        <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo veya başka bir video platformu linki</p>
                      </div>

                      <div>
                        <label className="flex items-center gap-3 cursor-pointer p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition">
                          <input
                            type="checkbox"
                            checked={sport.is_licensed_in_turkey}
                            onChange={(e) => {
                              const newSports = [...(formData.scholarship_interest.sports || [])];
                              newSports[index].is_licensed_in_turkey = e.target.checked;
                              setFormData({
                                ...formData,
                                scholarship_interest: {
                                  ...formData.scholarship_interest,
                                  sports: newSports
                                }
                              });
                            }}
                            className="w-5 h-5"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Türkiye'de lisanslı sporcuyum</div>
                            <div className="text-xs text-gray-600">D1 bursları için gereklidir</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}

                  {(formData.scholarship_interest.sports || []).length === 0 && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      "+ Spor Ekle" butonuna tıklayarak spor bilgilerinizi ekleyin
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 NCAA Burs İpuçları</h4>
                    <p className="text-sm text-blue-700 mb-2">
                      Spor bursları için önemli faktörler:
                    </p>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Kaç yıldır oynadığınız (süreklilik önemli)</li>
                      <li>• Takım veya kulüp düzeyinde yarışma deneyimi</li>
                      <li>• Somut başarılar ve ödüller</li>
                      <li>• Highlight videosu (koçların sizi izlemesi için)</li>
                      <li>• Liderlik ve takım çalışması becerileri</li>
                      <li>• D1 için Türkiye'de lisanslı sporcu olma şartı</li>
                    </ul>
                  </div>
                </>
              )}

              {formData.scholarship_interest.type === 'arts' && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">Sanat Bilgileriniz</label>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          scholarship_interest: {
                            ...formData.scholarship_interest,
                            arts: [
                              ...(formData.scholarship_interest.arts || []),
                              { field: '', years_experience: '', achievements: '' }
                            ]
                          }
                        });
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      + Sanat Alanı Ekle
                    </button>
                  </div>

                  {(formData.scholarship_interest.arts || []).map((art, index) => (
                    <div key={index} className="space-y-4 mb-4 p-5 border-2 border-purple-100 rounded-lg bg-purple-50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">Sanat Alanı #{index + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newArts = (formData.scholarship_interest.arts || []).filter((_, i) => i !== index);
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                arts: newArts
                              }
                            });
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Sil
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Sanat Alanı</label>
                        <select
                          value={art.field}
                          onChange={(e) => {
                            const newArts = [...(formData.scholarship_interest.arts || [])];
                            newArts[index].field = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                arts: newArts
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                          <option value="">Seçiniz</option>
                          <option value="music">Müzik</option>
                          <option value="visual_arts">Görsel Sanatlar (Resim, Heykel)</option>
                          <option value="theater">Tiyatro / Drama</option>
                          <option value="dance">Dans</option>
                          <option value="film">Film / Sinema</option>
                          <option value="photography">Fotoğrafçılık</option>
                          <option value="creative_writing">Yaratıcı Yazarlık</option>
                          <option value="graphic_design">Grafik Tasarım</option>
                          <option value="fashion_design">Moda Tasarımı</option>
                          <option value="architecture">Mimarlık</option>
                          <option value="other">Diğer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Okumak İstediğiniz Bölüm (Opsiyonel)</label>
                        <input
                          type="text"
                          value={art.preferred_major || ''}
                          onChange={(e) => {
                            const newArts = [...(formData.scholarship_interest.arts || [])];
                            newArts[index].preferred_major = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                arts: newArts
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="Örn: Müzik Kompozisyonu, Grafik Tasarım, Fine Arts"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Kaç yıldır bu alanda aktifsiniz?</label>
                        <input
                          type="text"
                          value={art.years_experience}
                          onChange={(e) => {
                            const newArts = [...(formData.scholarship_interest.arts || [])];
                            newArts[index].years_experience = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                arts: newArts
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="5 yıl"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Portfolyo / Çalışmalar URL (Opsiyonel)</label>
                        <input
                          type="url"
                          value={art.portfolio_url || ''}
                          onChange={(e) => {
                            const newArts = [...(formData.scholarship_interest.arts || [])];
                            newArts[index].portfolio_url = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                arts: newArts
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="https://portfolio.com/yourwork"
                        />
                        <p className="text-xs text-gray-500 mt-1">Portfolyo siteniz, Instagram, Behance, YouTube vb.</p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Başarılar, Sergiler, Performanslar</label>
                        <textarea
                          value={art.achievements}
                          onChange={(e) => {
                            const newArts = [...(formData.scholarship_interest.arts || [])];
                            newArts[index].achievements = e.target.value;
                            setFormData({
                              ...formData,
                              scholarship_interest: {
                                ...formData.scholarship_interest,
                                arts: newArts
                              }
                            });
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                          placeholder="Kazandığınız ödüller, katıldığınız sergiler, performanslar, yarışmalar..."
                          rows={3}
                        />
                      </div>
                    </div>
                  ))}

                  {(formData.scholarship_interest.arts || []).length === 0 && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      "+ Sanat Alanı Ekle" butonuna tıklayarak sanat alanlarınızı ekleyin
                    </div>
                  )}

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-purple-900 mb-2">🎨 Sanat Bursları İçin İpuçları</h4>
                    <p className="text-sm text-purple-700 mb-2">
                      Sanat bursları için önemli faktörler:
                    </p>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Güçlü bir portfolyo (en önemli kriter)</li>
                      <li>• Sanat alanında deneyim süresi ve derinliği</li>
                      <li>• Sergiler, performanslar, yarışmalar</li>
                      <li>• Ödüller ve başarılar</li>
                      <li>• Online portfolyo (erişilebilir çalışmalar)</li>
                      <li>• Sanatsal vizyon ve yaratıcılık</li>
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            {formData.scholarship_interest.type !== 'arts' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Ek Spor Aktiviteleri (Burs Amaçlı Değil)</label>
              <p className="text-sm text-gray-600 mb-4">
                Burs başvurusu yapmayacağınız ancak özgeçmişinizde göstermek istediğiniz spor aktiviteleri
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, sports_detailed: [] })}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.sports_detailed.length === 0
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">Yok</div>
                  <div className="text-xs opacity-75">Ekstra spor aktivitem yok</div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (formData.sports_detailed.length === 0) {
                      addSport();
                    }
                  }}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    formData.sports_detailed.length > 0
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <div className="font-semibold mb-1">Var</div>
                  <div className="text-xs opacity-75">Eklemek istiyorum</div>
                </button>
              </div>
              {formData.sports_detailed.map((sport, index) => (
                <div key={index} className="space-y-3 mb-4 p-5 border-2 border-blue-100 rounded-lg bg-blue-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Spor Dalı</label>
                      <input
                        type="text"
                        value={sport.sport}
                        onChange={(e) => {
                          const newSports = [...formData.sports_detailed];
                          newSports[index].sport = e.target.value;
                          setFormData({ ...formData, sports_detailed: newSports });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="Basketbol, Futbol, Voleybol..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Pozisyon</label>
                      <input
                        type="text"
                        value={sport.position || ''}
                        onChange={(e) => {
                          const newSports = [...formData.sports_detailed];
                          newSports[index].position = e.target.value;
                          setFormData({ ...formData, sports_detailed: newSports });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="Point Guard, Forvet..."
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Kaç yıldır oynuyorsun?</label>
                      <input
                        type="text"
                        value={sport.years_playing}
                        onChange={(e) => {
                          const newSports = [...formData.sports_detailed];
                          newSports[index].years_playing = e.target.value;
                          setFormData({ ...formData, sports_detailed: newSports });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="5 yıl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Seviye</label>
                      <select
                        value={sport.level}
                        onChange={(e) => {
                          const newSports = [...formData.sports_detailed];
                          newSports[index].level = e.target.value;
                          setFormData({ ...formData, sports_detailed: newSports });
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        <option value="">Seviye Seçin</option>
                        <option value="recreational">Amatör</option>
                        <option value="club">Kulüp</option>
                        <option value="high_school">Lise Takımı</option>
                        <option value="varsity">Okul Takımı (Varsity)</option>
                        <option value="regional">Bölgesel</option>
                        <option value="national">Ulusal</option>
                        <option value="international">Uluslararası</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Takım Adı (Opsiyonel)</label>
                    <input
                      type="text"
                      value={sport.team_name || ''}
                      onChange={(e) => {
                        const newSports = [...formData.sports_detailed];
                        newSports[index].team_name = e.target.value;
                        setFormData({ ...formData, sports_detailed: newSports });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="Takım veya kulüp adı"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Başarılar & Ödüller</label>
                    <textarea
                      value={sport.achievements}
                      onChange={(e) => {
                        const newSports = [...formData.sports_detailed];
                        newSports[index].achievements = e.target.value;
                        setFormData({ ...formData, sports_detailed: newSports });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="Şampiyonluklar, ödüller, rekorlar..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Highlight Video Linki (Opsiyonel)</label>
                    <input
                      type="url"
                      value={sport.highlight_video || ''}
                      onChange={(e) => {
                        const newSports = [...formData.sports_detailed];
                        newSports[index].highlight_video = e.target.value;
                        setFormData({ ...formData, sports_detailed: newSports });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="https://youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo veya başka bir video platformu linki</p>
                  </div>
                </div>
              ))}
              {formData.sports_detailed.length > 0 && (
                <button
                  type="button"
                  onClick={addSport}
                  className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-colors"
                >
                  + Başka Spor Ekle
                </button>
              )}
            </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sanatsal Aktiviteler</label>
              <p className="text-sm text-gray-600 mb-2">
                Burs başvurusu yapmadığınız ancak özgeçmişinizde göstermek istediğiniz sanatsal aktiviteler
              </p>
              <textarea
                value={formData.extracurricular.arts.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  extracurricular: {
                    ...formData.extracurricular,
                    arts: e.target.value.split('\n').filter(s => s.trim())
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn:\n- 5 yıldır piyano çalıyorum, okul konserlerinde performans sergiledim\n- Resim ve suluboya ile ilgileniyorum, yerel galeride sergi açtım\n- Tiyatro kulübü üyesiyim, 3 oyunda rol aldım"
                rows={5}
              />
              <p className="text-xs text-gray-500 mt-1">Her bir aktiviteyi ayrı satıra yazın</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gönüllü Çalışmalar</label>
              <p className="text-sm text-gray-600 mb-2">
                Katıldığınız toplum hizmeti projeleri, gönüllü çalışmalar ve sosyal sorumluluk aktiviteleri
              </p>
              <textarea
                value={formData.extracurricular.volunteer.join('\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  extracurricular: {
                    ...formData.extracurricular,
                    volunteer: e.target.value.split('\n').filter(s => s.trim())
                  }
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Örn:\n- Kızılay'da 2 yıl gönüllü olarak kan bağışı kampanyalarında çalıştım\n- Yerel hayvan barınağında haftada 1 gün gönüllü olarak hayvanların bakımıyla ilgileniyorum\n- Öğrencilere ücretsiz ders verme programında mentorluk yaptım, 15 öğrenciye matematik dersi verdim\n- Çevre temizliği kampanyalarına düzenli olarak katılıyorum"
                rows={6}
              />
              <p className="text-xs text-gray-500 mt-1">Her bir gönüllü çalışmayı detaylı şekilde ayrı satıra yazın</p>
            </div>

            <div className="border-t border-gray-200 my-6"></div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={20} className="text-yellow-600" />
              Başarılar & Ödüller
            </h3>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Başarılar & Ödüller</label>
                <button
                  type="button"
                  onClick={addAchievement}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Başarı Ekle
                </button>
              </div>
              {formData.achievements.map((ach, index) => (
                <div key={index} className="space-y-3 mb-4 p-4 border border-gray-200 rounded-lg">
                  <input
                    type="text"
                    value={ach.title}
                    onChange={(e) => {
                      const newAch = [...formData.achievements];
                      newAch[index].title = e.target.value;
                      setFormData({ ...formData, achievements: newAch });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Başarı / Ödül Adı"
                  />
                  <textarea
                    value={ach.description}
                    onChange={(e) => {
                      const newAch = [...formData.achievements];
                      newAch[index].description = e.target.value;
                      setFormData({ ...formData, achievements: newAch });
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Açıklama"
                    rows={3}
                  />
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Burs Fırsatları</h4>
              <p className="text-sm text-blue-700">
                Girdiğiniz bilgilere göre uygun burs fırsatlarını size göstereceğiz:
              </p>
              <ul className="mt-2 text-sm text-blue-700 space-y-1">
                <li>• Akademik başarı bursları</li>
                <li>• Spor bursları</li>
                <li>• Sanat bursları</li>
                <li>• İhtiyaç bazlı burslar</li>
                <li>• Ülke-özel burslar</li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Yıllık Bütçe (USD)</label>
              <input
                type="number"
                value={formData.annual_budget}
                onChange={(e) => setFormData({ ...formData, annual_budget: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="30000"
              />
              <p className="mt-2 text-sm text-gray-500">
                Eğitim ve yaşam masrafları için ayırabileceğiniz yıllık toplam bütçe
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tercih Edilen Ülkeler</label>
              <input
                type="text"
                value={formData.preferred_countries.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  preferred_countries: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="ABD, İngiltere, Kanada, Almanya (virgülle ayırın)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tercih Edilen Alanlar</label>
              <input
                type="text"
                value={formData.preferred_fields.join(', ')}
                onChange={(e) => setFormData({
                  ...formData,
                  preferred_fields: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bilgisayar Bilimleri, Mühendislik, İşletme (virgülle ayırın)"
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2">Analiz Kriterleri</h4>
              <p className="text-sm text-green-700 mb-3">
                Profiliniz aşağıdaki kriterlere göre değerlendirilecek:
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-green-700">
                <div>• Akademik uyum</div>
                <div>• Mali uygunluk</div>
                <div>• Vize başarı oranı</div>
                <div>• Burs potansiyeli</div>
                <div>• Mezuniyet sonrası fırsatlar</div>
                <div>• Vatandaşlık yolu</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const actualStep = index - 1;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                  ${actualStep <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                `}>
                  <Icon size={20} />
                </div>
                <span className={`text-xs text-center ${actualStep <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-full mt-2 ${actualStep < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{steps[currentStep + 1]?.title || 'Program Tipi'}</h2>

        {renderStep()}

        <div className="flex justify-between mt-8 pt-6 border-t">
          {currentStep > -1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Geri
            </button>
          )}
          <button
            type="submit"
            disabled={currentStep === -1 && !formData.program_type}
            className={`px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${currentStep === -1 ? 'ml-auto' : ''}`}
          >
            {currentStep < steps.length - 2 ? 'Devam Et' : 'Eşleşmeleri Bul'}
          </button>
        </div>
      </form>
    </div>
  );
}