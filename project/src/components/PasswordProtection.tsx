import { useState } from 'react';
import { Lock } from 'lucide-react';

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export default function PasswordProtection({ onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const CORRECT_PASSWORD = 'mentora2024';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === CORRECT_PASSWORD) {
      localStorage.setItem('mentora_authenticated', 'true');
      onAuthenticated();
    } else {
      setError('Yanlış şifre. Lütfen tekrar deneyin.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-blue-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ventora</h1>
            <p className="text-gray-600">Bu alana erişim için şifre gereklidir</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Şifrenizi girin"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Giriş Yap
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Şifre için yöneticinizle iletişime geçin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
