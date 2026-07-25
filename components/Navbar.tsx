"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  onSupportClick?: () => void;
}

const NAV_LINKS = [
  { label: "Explorer", href: "/explore" },
  { label: "Tableau de bord", href: "/dashboard" },
];

/* ── Top Up My Data Custom SVG Logo ── */
export function TopUpLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer wifi wave */}
      <path d="M 15 35 A 45 45 0 0 1 85 35" stroke="#ff0055" strokeWidth="10" strokeLinecap="round" />
      {/* Inner wifi wave */}
      <path d="M 28 50 A 28 28 0 0 1 72 50" stroke="#ff0055" strokeWidth="10" strokeLinecap="round" />
      {/* Coin circle */}
      <circle cx="50" cy="70" r="18" fill="#ff0055" />
      <circle cx="50" cy="70" r="14" stroke="#ffffff" strokeWidth="1.5" fill="#ff0055" />
      <text x="50" y="76" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="sans-serif">$</text>
    </svg>
  );
}

export default function Navbar({ onSupportClick }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const isProfile = pathname === "/";
  const isPayment = pathname === "/pay";
  const isMerci = pathname === "/merci";
  const isAuth = pathname === "/login" || pathname === "/signin" || pathname === "/signup";

  return (
    <nav
      className="sticky top-0 z-50 border-b shadow-sm h-16 transition-colors"
      style={{ backgroundColor: "#fbf9f4", borderColor: "#e4bdbc" }}
    >
      <div
        className="flex justify-between items-center w-full h-full mx-auto px-8"
        style={{ maxWidth: "1200px" }}
      >
        {/* Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/explore" className="flex items-center gap-2 group">
            <TopUpLogo className="w-8 h-8 transition-transform group-hover:scale-105" />
            <span
              className="text-2xl font-extrabold tracking-tight cursor-pointer"
              style={{ color: "#b20024" }}
            >
              Top Up My Data
            </span>
          </Link>

          {!isAuth && (
            <div className="hidden md:flex gap-6">
              <Link href="/explore">
                <span
                  className="text-sm font-medium transition-colors duration-200 cursor-pointer pb-1"
                  style={{
                    color: pathname === "/explore" ? "#b20024" : "#5b403f",
                    borderBottom: pathname === "/explore" ? "2px solid #b20024" : "2px solid transparent",
                    letterSpacing: "0.05em",
                  }}
                >
                  Explorer
                </span>
              </Link>
              {pathname === "/dashboard" && (
                <Link href="/dashboard">
                  <span
                    className="text-sm font-medium transition-colors duration-200 cursor-pointer pb-1"
                    style={{
                      color: pathname === "/dashboard" ? "#b20024" : "#5b403f",
                      borderBottom: pathname === "/dashboard" ? "2px solid #b20024" : "2px solid transparent",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Tableau de bord
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search bar — shown on explore & dashboard */}
          {(pathname === "/explore" || pathname === "/dashboard") && (
            <div className="relative hidden lg:block">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#5b403f", fontSize: "20px" }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Rechercher un créateur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && search.trim()) {
                    router.push(`/explore?q=${encodeURIComponent(search.trim())}`);
                  }
                }}
                className="outline-none text-sm"
                style={{
                  paddingLeft: "36px",
                  paddingRight: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  backgroundColor: "#f0eee9",
                  border: "1px solid #e4bdbc",
                  borderRadius: "9999px",
                  width: "220px",
                  color: "#1b1c19",
                }}
              />
            </div>
          )}

          {/* Back to profile — on /pay and /merci */}
          {(isPayment || isMerci) && (
            <Link href="/">
              <span
                className="hidden md:flex items-center gap-1 text-sm font-medium transition-opacity hover:opacity-70 cursor-pointer"
                style={{ color: "#5b403f" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                  arrow_back
                </span>
                Retour au profil
              </span>
            </Link>
          )}

          {/* Soutenir — on profile page */}
          {isProfile && onSupportClick && (
            <button
              onClick={onSupportClick}
              className="hidden md:flex items-center gap-1 text-sm font-bold transition-opacity hover:opacity-70 px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#ffdad8", color: "#b20024" }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                wifi
              </span>
              Offrir des Gigas
            </button>
          )}

          {/* Avatar — on dashboard */}
          {pathname === "/dashboard" && (
            <Link href="/dashboard">
              <div
                className="w-8 h-8 rounded-full overflow-hidden border cursor-pointer"
                style={{ borderColor: "#e4bdbc" }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5PXsU07Swjq7Y3mH7tozVZbYHzec6Aw5C2DmaWUfzS98LY35OIcUQS5rc_n8VemuuTVVwfeX1hyqQhBHtwMWEGAr8c_ZB_7XEAkeDZtq9vVb3meq7ZGhD4g0f1F0K0CTH9MlJJLYtDhRsdoXujXgsRZGIli6rVpuje-1XvBP7a1FLMWkxThc9EyWhV2BC8eJWC8_TxNofwvJDlxquJc3R0WjNuA9G7VGUmFYCq-1Vi-ylMlrLGzts10fqUh4bnnoD5L5qNqMs0x8W"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}

          {!isAuth ? (
            <>
              <Link href="/login">
                <button
                  className="text-sm font-semibold transition-colors hover:opacity-80 px-3 py-1.5"
                  style={{ color: "#5b403f" }}
                >
                  Sign In
                </button>
              </Link>

              <Link href="/signup">
                <button
                  className="px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-90 hover:opacity-90 shadow-sm flex items-center gap-1.5"
                  style={{ backgroundColor: "#d62839", color: "#fff2f1" }}
                >
                  <span className="material-symbols-outlined text-base">rocket_launch</span>
                  Start Creating
                </button>
              </Link>
            </>
          ) : (
            <Link href="/explore">
              <button
                className="text-sm font-medium transition-colors hover:opacity-80 flex items-center gap-1"
                style={{ color: "#5b403f" }}
              >
                <span>Accueil</span>
                <span className="material-symbols-outlined text-base">home</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
