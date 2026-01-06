import { useState } from 'react';
import { Globe, GraduationCap, Target } from 'lucide-react';
import ProfileForm, { ProfileFormData } from './components/ProfileForm';
import MatchResults, { UniversityMatch } from './components/MatchResults';
import { calculateMatches } from './utils/matchingAlgorithm';
import { calculateHighSchoolMatches } from './utils/highSchoolMatching';
import { calculateLanguageSchoolMatches } from './utils/languageSchoolMatching';
import { supabase } from './lib/supabase';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [matches, setMatches] = useState<UniversityMatch[]>([]);
  const [savedProfile, setSavedProfile] = useState<ProfileFormData | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileSubmit = async (profileData: ProfileFormData) => {
    setSavedProfile(profileData);
    setIsLoading(true);

    try {
      if (profileData.program_type === 'high_school') {
        const highSchoolMatches = await calculateHighSchoolMatches(profileData);
        setMatches(highSchoolMatches as any);
      } else if (profileData.program_type === 'language_school') {
        const languageSchoolMatches = calculateLanguageSchoolMatches(profileData);
        setMatches(languageSchoolMatches as any);
      } else {
        const calculatedMatches = calculateMatches(profileData);
        setMatches(calculatedMatches);
      }
      setShowResults(true);
    } catch (error) {
      console.error('Error calculating matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Sizin için en uygun okulları buluyoruz...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
        <MatchResults matches={matches} onBack={handleBack} programType={savedProfile?.program_type || ''} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/chatgpt_image_6_oca_2026_12_33_06.png"
                alt="Ventora Logo"
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ventora</h1>
                <p className="text-sm text-gray-600">The AI Platform That Finds the Right Country, the Right University, and the Right Scholarship — For Every Student.</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-blue-600" />
                <span>195+ Ülke</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-green-600" />
                <span>5000+ Okul</span>
              </div>
              <div className="flex items-center gap-2">
                <Target size={18} className="text-orange-600" />
                <span>%100 Kişiselleştirilmiş</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Hayalinizdeki Okulu Bulun
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            CV'nizi oluşturun, bütçenizi belirleyin ve size özel eşleşen liseleri veya üniversiteleri keşfedin.
            Vize süreçlerinden burs fırsatlarına, mezuniyet sonrası vatandaşlık imkanlarına kadar
            her şeyi detaylı analiz ediyoruz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Kapsamlı Profil</h3>
            <p className="text-gray-600">
              Akademik geçmişiniz, test skorlarınız, aktiviteleriniz ve başarılarınızla
              eksiksiz bir profil oluşturun.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-600">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Akıllı Eşleştirme</h3>
            <p className="text-gray-600">
              Gelişmiş algoritmamız akademik uyum, mali durum, vize kolaylığı ve burs
              potansiyelini analiz eder.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-600">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Globe className="text-orange-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Küresel Fırsatlar</h3>
            <p className="text-gray-600">
              Dünya genelindeki üniversiteleri karşılaştırın. Vize, oturma izni ve
              vatandaşlık süreçlerini öğrenin.
            </p>
          </div>
        </div>

        <ProfileForm onSubmit={handleProfileSubmit} initialData={savedProfile} />
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <span className="font-semibold text-gray-900">Ventora</span> - Her öğrenci için en uygun eğitim yolunu buluyoruz
            </p>
            <p className="text-sm">
              Akademik başarı, spor, sanat ve özel burslar dahil tüm fırsatları değerlendiriyoruz
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
