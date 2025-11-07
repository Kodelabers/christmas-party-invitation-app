'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, type ResponseRecord } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// Snowflakes removed for a cleaner admin look

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [responses, setResponses] = useState<ResponseRecord[]>([]);
  const [loadingResponses, setLoadingResponses] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const adminSession = sessionStorage.getItem('admin_authenticated');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
      loadResponses();
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      // Check if admin exists
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !data) {
        setLoginError('Invalid email or password');
        return;
      }

      // Set authentication
      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      loadResponses();
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setResponses([]);
  };

  const loadResponses = async () => {
    setLoadingResponses(true);
    try {
      const { data, error } = await supabase
        .from('responses')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      setResponses(data || []);
    } catch (error) {
      console.error('Error loading responses:', error);
    } finally {
      setLoadingResponses(false);
    }
  };

  const comingCount = responses.filter(r => r.response === 'Coming').length;
  const notComingCount = responses.filter(r => r.response === 'Not coming').length;
  const noResponseCount = responses.filter(r => r.response === null).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎄</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="card card-contrast p-8 md:p-10 max-w-md w-full text-brand-text">
            <Header />
            <form onSubmit={handleLogin} className="mt-4 space-y-5">
              <div>
                <label htmlFor="email" className="block text-brand-text font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder='admin@kodelab.hr'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-brand-text font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder='********'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/40"
                />
              </div>
              {loginError && (
                <p className="text-red-400 font-normal text-sm">{loginError}</p>
              )}
              <button
                type="submit"
                className="w-full btn-primary text-black font-medium transition "
              >
                Login
              </button>
            </form>
            <Footer />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="card p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <Header />
              <button
                onClick={handleLogout}
                className="btn-outline border-solid border-[#00C4B4] text-[#00C4B4] bg-[#07090D] hover:text-[#07090D] hover:bg-[#00C4B4] transition"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-xl p-6 text-center border border-brand-border bg-brand-card">
                <h3 className="text-2xl font-bold mb-2">Coming</h3>
                <p className="text-4xl font-bold text-brand-primary">{comingCount}</p>
              </div>
              <div className="rounded-xl p-6 text-center border border-brand-border bg-brand-card">
                <h3 className="text-2xl font-bold mb-2">Not coming</h3>
                <p className="text-4xl font-bold text-red-400">{notComingCount}</p>
              </div>
              <div className="rounded-xl p-6 text-center border border-brand-border bg-brand-card">
                <h3 className="text-2xl font-bold mb-2">No Response</h3>
                <p className="text-4xl font-bold text-brand-muted">{noResponseCount}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-bold text-brand-text mb-6">All Responses</h2>
              {loadingResponses ? (
                <div className="text-center py-8">
                  <div className="text-4xl animate-bounce">🎄</div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg shadow-card border border-brand-border bg-brand-card">
                    <thead className="bg-black/20">
                      <tr className="text-brand-text">
                        <th className="px-6 py-4 text-left font-semibold">Email</th>
                        <th className="px-6 py-4 text-left font-semibold">Response</th>
                        <th className="px-6 py-4 text-left font-semibold">Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {responses.map((response, index) => (
                        <tr
                          key={response.email}
                          className={index % 2 === 0 ? 'bg-black/10' : 'bg-transparent'}
                        >
                          <td className="px-6 py-4 border-b border-brand-border/40">
                            {response.email}
                          </td>
                          <td className="px-6 py-4 border-b border-brand-border/40">
                            {response.response === 'Coming' ? (
                              <span className="text-brand-primary font-semibold">Coming</span>
                            ) : response.response === 'Not coming' ? (
                              <span className="text-red-400 font-semibold">Not coming</span>
                            ) : (
                              <span className="text-brand-muted">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 border-b border-brand-border/40">
                            {response.updated_at
                              ? new Date(response.updated_at).toLocaleString()
                              : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

