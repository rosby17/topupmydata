"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar, { TopUpLogo } from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12" style={{ backgroundColor: "#fbf9f4" }}>
        <div className="w-full max-w-md bg-white rounded-3xl border shadow-xl p-8 md:p-10 transition-all" style={{ borderColor: "#e4bdbc" }}>
          {/* Logo & Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <TopUpLogo className="w-12 h-12 transition-transform group-hover:scale-105" />
            </Link>
            <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#1b1c19", letterSpacing: "-0.02em" }}>
              Créer un compte
            </h1>
            <p className="text-sm mt-2" style={{ color: "#5b403f" }}>
              Rejoignez les créateurs sur <strong style={{ color: "#b20024" }}>Top Up My Data</strong>
            </p>
          </div>

          {/* Social Logins */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => { setLoading(true); setTimeout(() => router.push("/dashboard"), 800); }}
              className="w-full h-12 rounded-xl border flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:bg-gray-50 active:scale-98"
              style={{ borderColor: "#e4bdbc", color: "#1b1c19" }}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span>S&apos;inscrire avec Google</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t w-full" style={{ borderColor: "#f0eee9" }} />
            <span className="absolute bg-white px-3 text-xs uppercase font-semibold" style={{ color: "#906f6e" }}>
              Ou par email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg text-xs font-medium text-center" style={{ backgroundColor: "#ffdad8", color: "#b20024" }}>
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#5b403f" }}>
                Nom Complet ou Pseudo
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Juliet Tech"
                className="w-full h-12 rounded-xl px-4 outline-none text-sm transition-all"
                style={{ backgroundColor: "#fbf9f4", border: "1px solid #e4bdbc", color: "#1b1c19" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#b20024";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(178,0,36,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e4bdbc";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#5b403f" }}>
                Adresse Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="juliet@example.com"
                className="w-full h-12 rounded-xl px-4 outline-none text-sm transition-all"
                style={{ backgroundColor: "#fbf9f4", border: "1px solid #e4bdbc", color: "#1b1c19" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#b20024";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(178,0,36,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e4bdbc";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#5b403f" }}>
                Mot de passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-xl px-4 outline-none text-sm transition-all"
                style={{ backgroundColor: "#fbf9f4", border: "1px solid #e4bdbc", color: "#1b1c19" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#b20024";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(178,0,36,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e4bdbc";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl text-white text-base font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-6"
              style={{ backgroundColor: "#b20024" }}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <span>Créer mon compte</span>
                  <span className="material-symbols-outlined text-lg">rocket_launch</span>
                </>
              )}
            </button>
          </form>

          {/* Footer link */}
          <div className="mt-8 text-center text-sm" style={{ color: "#5b403f" }}>
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="font-bold hover:underline" style={{ color: "#b20024" }}>
              Connectez-vous
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
