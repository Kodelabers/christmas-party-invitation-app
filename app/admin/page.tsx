'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LogoIcon from '@/components/KodelabIcon';
import NeyhoLogo from '@/components/NeyhoLogo';
import Snowflakes from '@/components/Snowflakes';
import { supabase, type ResponseRecord } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [responses, setResponses] = useState<ResponseRecord[]>([]);
  const [loadingResponses, setLoadingResponses] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;
  const [totalComing, setTotalComing] = useState(0);
  const [totalNotComing, setTotalNotComing] = useState(0);
  const [totalNoResponse, setTotalNoResponse] = useState(0);
  const [newEmail, setNewEmail] = useState('');
  const [addEmailError, setAddEmailError] = useState('');
  const [addEmailSuccess, setAddEmailSuccess] = useState('');


  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const adminSession = sessionStorage.getItem('admin_authenticated');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
      loadResponses();
      loadAllResponses();
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !data) {
        setLoginError('Invalid email or password');
        return;
      }

      const passwordHash: string | undefined = (data as any).password_hash;
      const legacyPassword: string | undefined = (data as any).password;

      let isValidPassword = false;
      if (passwordHash) {
        isValidPassword = await bcrypt.compare(password, passwordHash);
      } else if (legacyPassword) {
        isValidPassword = legacyPassword === password;
      }

      if (!isValidPassword) {
        setLoginError('Invalid email or password');
        return;
      }

      sessionStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      loadResponses(1);
      loadAllResponses();
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
    setResponses([]);
    setCurrentPage(1);
    setTotalCount(0);
    setNewEmail('');
    setAddEmailError('');
    setAddEmailSuccess('');
  };

  const loadResponses = async (page = 1) => {
    setLoadingResponses(true);
    try {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from('responses')
        .select('*', { count: 'exact' })
        .order('updated_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      setResponses(data || []);
      if (typeof count === 'number') {
        setTotalCount(count);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading responses:', error);
    } finally {
      setLoadingResponses(false);
    }
  };

  const loadAllResponses = async () => {
    try {
      const [comingRes, notComingRes, noRespRes] = await Promise.all([
        supabase.from('responses').select('email', { count: 'exact', head: true }).eq('response', 'Coming'),
        supabase.from('responses').select('email', { count: 'exact', head: true }).eq('response', 'Not coming'),
        supabase.from('responses').select('email', { count: 'exact', head: true }).is('response', null),
      ]);

      setTotalComing(comingRes.count ?? 0);
      setTotalNotComing(notComingRes.count ?? 0);
      setTotalNoResponse(noRespRes.count ?? 0);
    } catch (err) {
      console.error('Error loading total counts:', err);
      setTotalComing(0);
      setTotalNotComing(0);
      setTotalNoResponse(0);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    loadResponses(page);
  };

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddEmailError('');
    setAddEmailSuccess('');

    const trimmedEmail = newEmail.trim().toLowerCase();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(trimmedEmail)) {
      setAddEmailError('Please enter a valid email address.');
      return;
    }

    try {
      const { error } = await supabase
        .from('responses')
        .insert({ email: trimmedEmail, response: null, updated_at: new Date().toISOString() });

      if (error) {
        if (error.code === '23505') {
          setAddEmailError('This email is already invited.');
        } else {
          console.error('Add email error:', error);
          setAddEmailError('Unable to add this email right now. Please try again.');
        }
        return;
      }

      setAddEmailSuccess('Email added successfully.');
      setNewEmail('');
      loadResponses(1);
      loadAllResponses();
    } catch (err) {
      console.error('Add email error:', err);
      setAddEmailError('Unable to add this email right now. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center">
          <LogoIcon className="w-24 h-24 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Snowflakes />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="card card-contrast p-8 md:p-10 max-w-md w-full text-brand-text">
            <div className="flex items-center justify-between gap-4 mb-4">
              <LogoIcon className="w-16 h-16" />
              <NeyhoLogo className="w-20 h-auto opacity-90" />
            </div>
            <Header showLogos={false} />
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
      <Snowflakes />
      <div className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="card p-6 md:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
              <Header showLogos={false} />
              <div className="flex justify-end">
                <button
                  onClick={handleLogout}
                  className="btn-outline px-3 py-2 text-sm border-solid border-[#00C4B4] text-[#00C4B4] bg-[#07090D] hover:text-[#07090D] hover:bg-[#00C4B4] transition w-full sm:w-auto"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="card bg-brand-card/60 border border-brand-border p-6 mb-8 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-brand-text mb-4">Add guest</h2>
              <p className="text-sm text-brand-muted mb-4">
              Enter the guest’s email address to allow them access to the invitation page. Duplicate emails are ignored.
              </p>
              <form onSubmit={handleAddEmail} className="flex flex-col sm:flex-row gap-3 items-center md:items-start justify-center md:justify-start">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="guest@example.com"
                  onInvalid={(e) => {
                    (e.currentTarget as HTMLInputElement).setCustomValidity('Please enter a valid email address.');
                  }}
                  onInput={(e) => {
                    (e.currentTarget as HTMLInputElement).setCustomValidity('');
                  }}
                  className="flex-1 px-4 py-3 rounded-lg bg-transparent border border-brand-border text-brand-text placeholder:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/40 w-full md:w-auto md:max-w-none max-w-md"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary text-black transition px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loadingResponses}
                >
                  Add Email
                </button>
              </form>
              {addEmailError && (
                <p className="mt-3 text-sm text-red-400">{addEmailError}</p>
              )}
              {addEmailSuccess && (
                <p className="mt-3 text-sm text-brand-primary">{addEmailSuccess}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              <div className="rounded-xl p-5 md:p-6 text-center border border-brand-border bg-brand-card">
                <h3 className="text-2xl font-bold mb-2">Coming</h3>
                <p className="text-4xl font-bold text-brand-primary">{totalComing}</p>
              </div>
              <div className="rounded-xl p-5 md:p-6 text-center border border-brand-border bg-brand-card">
                <h3 className="text-2xl font-bold mb-2">Not coming</h3>
                <p className="text-4xl font-bold text-red-400">{totalNotComing}</p>
              </div>
              <div className="rounded-xl p-5 md:p-6 text-center border border-brand-border bg-brand-card">
                <h3 className="text-2xl font-bold mb-2">No Response</h3>
                <p className="text-4xl font-bold text-brand-muted">{totalNoResponse}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-bold text-brand-text text-center mb-6">All Responses</h2>
              {loadingResponses ? (
                <div className="text-center py-8 justify-center">
                  <LogoIcon className="w-16 h-16 animate-pulse mx-auto" />
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] md:min-w-[760px] border-collapse rounded-lg shadow-card border border-brand-border bg-brand-card">
                      <thead className="bg-black/20">
                        <tr className="text-brand-text">
                          <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">Email</th>
                          <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">Response</th>
                          <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">Updated At</th>
                          <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-semibold text-xs sm:text-sm">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {responses.map((response, index) => (
                          <tr
                            key={response.email}
                            className={index % 2 === 0 ? 'bg-black/10' : 'bg-transparent'}
                          >
                            <td className="px-4 sm:px-6 py-3 sm:py-4 border-b border-brand-border/40 text-xs sm:text-sm md:text-base">
                              {response.email}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 border-b border-brand-border/40 text-xs sm:text-sm md:text-base">
                              {response.response === 'Coming' ? (
                                <span className="text-brand-primary font-semibold">Coming</span>
                              ) : response.response === 'Not coming' ? (
                                <span className="text-red-400 font-semibold">Not coming</span>
                              ) : (
                                <span className="text-brand-muted">—</span>
                              )}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 border-b border-brand-border/40 text-xs sm:text-sm md:text-base">
                              {response.updated_at
                                ? new Date(response.updated_at).toLocaleString()
                                : '—'}
                            </td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 border-b border-brand-border/40 text-right">
                              <button
                                onClick={async () => {
                                  const confirmDelete = window.confirm(`Delete ${response.email}?`);
                                  if (!confirmDelete) return;
                                  try {
                                    const { error } = await supabase.from('responses').delete().eq('email', response.email);
                                    if (error) throw error;
                                    loadResponses(currentPage);
                                    loadAllResponses();
                                  } catch (err) {
                                    console.error('Delete error:', err);
                                    alert('Failed to delete this email. Please try again.');
                                  }
                                }}
                                className="btn-outline px-3 py-2"
                                aria-label={`Delete ${response.email}`}
                                title="Delete"
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-brand-muted">
                      {totalCount === 0
                        ? 'No responses yet'
                        : `Showing ${Math.min((currentPage - 1) * pageSize + 1, totalCount)}-${Math.min(currentPage * pageSize, totalCount)} of ${totalCount}`}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 hover:border-[#00C4B4] transition  "
                      >
                        Previous
                      </button>
                      <span className="text-sm text-brand-muted">
                        Page {totalCount === 0 ? 0 : currentPage} of {totalCount === 0 ? 0 : totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || totalCount === 0}
                        className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 hover:border-solid hover:border-[#00C4B4] transition"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

