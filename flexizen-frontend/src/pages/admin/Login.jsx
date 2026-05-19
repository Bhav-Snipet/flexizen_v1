import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(username, password);
            navigate('/admin/dashboard');
        } catch (err) {
            if (!err.response) {
                setError('Network Error: Cannot connect to server. Please ensure your Tomcat backend is running on port 8085.');
            } else {
                setError(err.response?.data?.message || 'Invalid username or password');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
            <div className="absolute left-10 top-10 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl animate-glow" />
            <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl animate-glow" />

            <div className="surface relative grid w-full max-w-5xl overflow-hidden lg:grid-cols-2">
                <div className="relative hidden min-h-[620px] overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
                    <img
                        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1400"
                        alt="Yoga studio background"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/50 to-indigo-950/80" />
                    <div className="relative z-10">
                        <div className="muted-kicker">
                            <Sparkles className="h-3.5 w-3.5" />
                            Premium admin access
                        </div>
                        <h1 className="mt-6 max-w-md text-5xl font-black tracking-tight text-white">
                            Control the studio from one elegant workspace.
                        </h1>
                        <p className="mt-5 max-w-md text-base leading-7 text-slate-200">
                            Manage classes, bookings, enquiries, pages, and reports with a cleaner, more polished dashboard experience.
                        </p>
                    </div>

                    <div className="relative z-10 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                            <ShieldCheck className="h-5 w-5 text-emerald-300" />
                            <p className="mt-3 text-sm font-semibold text-white">Secure session login</p>
                            <p className="mt-1 text-sm text-slate-300">Protected admin access with role-based routing.</p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                            <ArrowRight className="h-5 w-5 text-indigo-300" />
                            <p className="mt-3 text-sm font-semibold text-white">Fast control panel</p>
                            <p className="mt-1 text-sm text-slate-300">Everything is organized for quick daily operations.</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-10">
                    <div className="mx-auto flex max-w-md flex-col justify-center">
                        <div className="mb-8 text-center">
                            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
                                <LogIn className="h-6 w-6 text-white" />
                            </div>
                            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white">Admin Portal</h2>
                            <p className="mt-2 text-sm text-slate-400">Sign in to manage the FlexiZen experience.</p>
                        </div>

                        {error && (
                            <div className="mb-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="label-soft">Username</label>
                                <input
                                    type="text"
                                    className="input-surface"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    placeholder="Enter username"
                                />
                            </div>
                            <div>
                                <label className="label-soft">Password</label>
                                <input
                                    type="password"
                                    className="input-surface"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Enter password"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <LogIn className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-xs leading-6 text-slate-400">
                            Session-based access for admin operations only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
