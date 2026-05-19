import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Leaf, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-white/10 text-white shadow-sm'
      : 'text-slate-300 hover:bg-white/10 hover:text-white'
  }`;

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const links = [
        { to: '/', label: 'Home' },
        { to: '/classes', label: 'Classes' },
        { to: '/about', label: 'About Us' },
        { to: '/contact', label: 'Contact Us' },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link to="/" className="group flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                        <Leaf className="h-5 w-5" />
                    </span>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold tracking-tight text-white">FlexiZen</span>
                            <Sparkles className="h-4 w-4 text-indigo-300" />
                        </div>
                        <p className="text-xs text-slate-400">Digital Yoga Studio</p>
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} className={navLinkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Link to="/login" className="btn-secondary text-sm">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Admin Portal
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {open && (
                <div className="border-t border-white/10 bg-slate-950/95 md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
                        {links.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                                        isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Link to="/login" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Admin Portal
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
