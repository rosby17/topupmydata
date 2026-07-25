"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = ["Tous", "Art Numérique", "Développement", "Musique", "Vidéo", "Design"];

const ACTIVE_CAMPAIGNS = [
  {
    id: 1,
    category: "Développement",
    title: "Serveur Rendu 3D Open Source",
    description:
      "Besoin de bande passante pour héberger les fichiers sources du nouveau moteur de rendu communautaire.",
    current: "740 Go",
    total: "1 To",
    pct: 74,
    contributors: 124,
    daysLeft: "6 jours restants",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJTfu_U4ng8YgrWslPWim4nDj99xsu0aK2LaSF3JZxM2ndtt6O-MXXCZHYcGAKLo6Zhk4KDOptIpUFuJR3asuyFTVacd2YIKxGoEAYrv_k-Gyfng3fvzKNvJI5ZVnHyST164TO3UahMjBrQcFt3mPsxZMDQxPeIB-Rxj4OJaQFDFNQ6sIDMQF_0-uhk4B4ygFGHTIUXr9P8BritAz2vIhBiL_ebsMDBVc3xGKWFD9MgpSRKyS-k0N2ar3VL3jbKuR4CqfN0LcejPWx",
  },
  {
    id: 2,
    category: "Musique & Sound Design",
    title: "Banque de Sons Gratuite v2",
    description:
      "Aidez-nous à financer le stockage et le téléchargement de 50 Go de samples HQ pour tous les créateurs.",
    current: "450 Go",
    total: "500 Go",
    pct: 90,
    contributors: 210,
    daysLeft: "Termine demain",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALkBE_HxBkgNr_NjvQd6JzEhChL0dw5IaRzxVBV3hKG9hgBxDQg1vVhorZpUZ-0509_lI8lSEK5kjVqtpaaHJLnTTjsqBpp2i4hg3ejXRWX2t3rsZONmht0GVmgY28s0Ab733gWtodZTJT-4tE2GScjwMpWcOXF2Uph4JhgLccY6hcXvghwgIM3491-xRSsAPOgZRgojPjwOmFyMz2l3npGcUn1Nx7LGe1okUTk9-FN_nuA_byQoWcQjeEejuKJbeSsYcr7FtHO4fU",
  },
];

const FEATURED_CREATORS = [
  {
    id: 1,
    name: "Elena Rossi",
    role: "Illustratrice",
    data: "8.5/10 Go",
    pct: 85,
    category: "Art Numérique",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH3vQ3blLwzCASLtiOo1jcCt-qiPM_-XkCV1lzYsTcCpbAPhOwwXhUSVO8carJuS8nsEYaGTyxlOdIvr3wWb03PacagwSCakbkA4d2C7YhwIDOfC1ooHP7kFjmf8FIuWpPqgCWXnXpCNTAZ1bKgO6IHMoX2Mcyhl5kZ4Z14hkQ66QXxQ9kHaFB9TNvkw8YYkFv_lyvp2rs7EqSBzOxnjQ600_L-axWDhb1_2YXsnENl3yxR_MdzbbT-nkvA6MUa-ugeubLJvFxk0QD",
  },
  {
    id: 2,
    name: "Marc Weber",
    role: "Développeur",
    data: "12/50 Go",
    pct: 24,
    category: "Développement",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMO7Ey5IvIfcgmZUdMSyCbycVhM6X4sHkRxWomgo7G5Rft9JxoAxNplZLHRoVtpXMGQCjq4cu-DAW4_a3R4GArvw5WH6NnGPXgMe3n3wHGM41MHjU8XGlz9sSZ0CooUkeR5dR6vo1e1i2BdKVR7aoY31UyLuF4w1RfeUMwmG-dgQ9RRZKuZsuPZGwKY-IpjtZD4gxmIU5UqHqCI8UxBNOfa_mvy_S-835ZYauXq5O8FdAa6_3LNB_xd-4zK5kRLklaycme3I_SLQbo",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    role: "Vidéaste",
    data: "45/100 Go",
    pct: 45,
    category: "Vidéo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjlur-Ubtl259QdO6oIAcxwb0gk9SvJW8khMsq4_HC6pCDyUuxJ_w5YvxXgCpaUItycngwFAIlL2HKCU2BFXLZZcPE_c6m2YQZyemVqRumYAs-q_FK-w-VTGJbAYtamzNKR7AEjnIRvDwBd30aJXzWlz_fx1OIu8rJ1lQrQil9xaDsb2hRvf2Y8z0NAb8AilNk8JKv-L649XKicH5KrjmD3MI3wHec5xo0gHDZxOXBplgADR_lJbqCi8OKOT_ey-ne8MIsnoiTkA8P",
  },
  {
    id: 4,
    name: "Julie Chen",
    role: "UX Designer",
    data: "18/20 Go",
    pct: 90,
    category: "Design",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt-pJRPPV-ImhBMu5wgzAE7YCY-xxzfdTP8dXCyQXO1fF2HE-CdycSa40Ftw6xbm1NHCpRp8t1QUrtb0Z7xB35NJxdgUE8U8VG8xXEpHB02kHcMhP-YGWiwhmUuDVc36GTGpH6IGqANGHLDpgthouGg_wV5Tm6ruFAIXUNOfI7p3o3qz6QXBNv1k9CiirTy3l_ZlxbYEcti1CluT_eDUmiuTsIjAxa6V7utiKKlvIAuJXZLdD8ezwuzHtx1WcuKyvzby-WNT9VVlat",
  },
];

/* ── Gauge bar with entrance animation ── */
function GaugeBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(pct), 120 + delay);
    return () => clearTimeout(t);
  }, [pct, delay]);
  return (
    <div
      className="w-full rounded-full overflow-hidden"
      style={{ height: "6px", backgroundColor: "#e4e2dd" }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          backgroundColor: "#496546",
          borderRadius: "9999px",
          transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
}

function ExploreInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const filteredCreators =
    activeCategory === "Tous"
      ? FEATURED_CREATORS
      : FEATURED_CREATORS.filter((c) => c.category === activeCategory);

  const searchedCreators = query
    ? filteredCreators.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.role.toLowerCase().includes(query.toLowerCase())
      )
    : filteredCreators;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <Navbar />
      <main
        className="mx-auto px-8 py-6 space-y-16"
        style={{ maxWidth: "1200px" }}
      >
        {/* ── Hero ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-8">
          <div className="space-y-6">
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: "#1b1c19", letterSpacing: "-0.02em" }}
            >
              Rechargez le travail créatif de vos{" "}
              <span style={{ color: "#b20024" }}>créateurs préférés</span> ⚡
            </h1>
            <p
              className="text-lg leading-relaxed max-w-lg"
              style={{ color: "#5b403f" }}
            >
              Sur Top Up My Data, les dons sont reversés en cash directement aux créateurs pour financer leur connexion internet, leurs factures d&apos;électricité, ou tout autre besoin essentiel pour produire de meilleurs contenus et propulser leurs streams, uploads et projets en ligne.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/">
                <button
                  className="px-8 py-4 rounded-xl text-base font-bold shadow-md transition-all hover:opacity-90 active:scale-95 flex items-center gap-2"
                  style={{ backgroundColor: "#b20024", color: "#ffffff" }}
                >
                  <span className="material-symbols-outlined">bolt</span>
                  Offrir des Gigas
                </button>
              </Link>
              <Link href="/signup">
                <button
                  className="px-8 py-4 rounded-xl text-base font-bold border transition-all hover:opacity-80 flex items-center gap-2"
                  style={{ borderColor: "#b20024", color: "#b20024" }}
                >
                  <span className="material-symbols-outlined">rocket_launch</span>
                  Devenir créateur
                </button>
              </Link>
            </div>
            {/* Stats strip */}
            <div className="flex gap-8 pt-2">
              {[
                { value: "2.4k+", label: "Créateurs" },
                { value: "18k+", label: "Supporters" },
                { value: "90%", label: "Reversés aux créateurs" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold" style={{ color: "#b20024" }}>
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: "#5b403f" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2POkZZ_LTisfcNhjPujF7GaWHPXUmRGeBuDndDWbiXSFd_b88_JWvXNgrX0RUJXfrrTZXtH4B4uMBf7oN3MHGxpSj7Ao-xUvSwA8GW6BFplNKv88iqYBcXlaXnhRJf7_ypbrSScS_Wgo6kiH5xzxGIU9wHalH-iLz2B4_ehrzhyk3wTbUK55tBOZYDGM8txwTWKdRK3uJhS1IjC29rj89Dsk5eDl_QDgPDpPcpbeU39ivkowLH9lhW-aCtBsVWq5mMfZPOlw7JRP"
              alt="Creator workspace"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }}
            />
            <div className="absolute bottom-6 left-6 text-white">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                style={{ backgroundColor: "rgba(73,101,70,0.9)" }}
              >
                Featured Creator
              </span>
              <h3 className="text-xl font-bold">Thomas Delaunay</h3>
              <p className="text-sm opacity-90">Digital Artist • 85% Financé</p>
            </div>
            {/* Floating badge */}
            <div
              className="absolute top-4 right-4 px-3 py-2 rounded-xl text-xs font-bold shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.95)", color: "#b20024" }}
            >
              🔥 12 supporters aujourd&apos;hui
            </div>
          </div>
        </section>

        {/* ── Search & Filter ── */}
        <section className="space-y-5">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <span
                className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "#906f6e" }}
              >
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full outline-none text-base transition-all"
                style={{
                  paddingLeft: "48px",
                  paddingRight: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #e4bdbc",
                  borderRadius: "12px",
                  color: "#1b1c19",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#b20024";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(178,0,36,0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e4bdbc";
                  e.currentTarget.style.boxShadow = "none";
                }}
                placeholder="Rechercher un créateur ou une catégorie..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 rounded-xl text-sm font-bold transition-all active:scale-95"
              style={{ backgroundColor: "#b20024", color: "#ffffff" }}
            >
              Rechercher
            </button>
          </form>

          {/* Category chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activeCategory === cat ? "#b20024" : "#ffffff",
                  color: activeCategory === cat ? "#ffffff" : "#5b403f",
                  border: `1px solid ${activeCategory === cat ? "#b20024" : "#e4bdbc"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── Active Campaigns ── */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl font-bold" style={{ color: "#1b1c19" }}>
              Cagnottes actives
            </h2>
            <button className="text-sm font-medium" style={{ color: "#b20024" }}>
              Voir tout →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ACTIVE_CAMPAIGNS.map((c, i) => (
              <Link href="/" key={c.id}>
                <div
                  className="bg-white rounded-2xl border flex flex-col md:flex-row gap-6 p-6 transition-all cursor-pointer h-full"
                  style={{ borderColor: "#e4bdbc" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0px 8px 24px rgba(29,30,32,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-full md:w-44 rounded-xl overflow-hidden shrink-0"
                    style={{ height: "176px" }}
                  >
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div>
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "#496546" }}
                      >
                        {c.category}
                      </span>
                      <h3
                        className="text-lg font-bold mt-1"
                        style={{ color: "#1b1c19" }}
                      >
                        {c.title}
                      </h3>
                      <p
                        className="text-sm mt-2 leading-relaxed"
                        style={{
                          color: "#5b403f",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {c.description}
                      </p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="text-xl font-bold" style={{ color: "#b20024" }}>
                          {c.current}{" "}
                          <span className="text-sm font-normal" style={{ color: "#5b403f" }}>
                            / {c.total}
                          </span>
                        </span>
                        <span className="text-sm font-bold" style={{ color: "#496546" }}>
                          {c.pct}%
                        </span>
                      </div>
                      <GaugeBar pct={c.pct} delay={i * 100} />
                      <div className="flex justify-between text-xs" style={{ color: "#5b403f" }}>
                        <span>{c.contributors} contributeurs</span>
                        <span
                          className="font-medium"
                          style={{ color: c.pct >= 90 ? "#b20024" : "#5b403f" }}
                        >
                          {c.daysLeft}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured Creators Grid ── */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold" style={{ color: "#1b1c19" }}>
            Créateurs à la une
            {query && (
              <span className="text-base font-normal ml-3" style={{ color: "#5b403f" }}>
                — Résultats pour &ldquo;{query}&rdquo;
              </span>
            )}
          </h2>

          {searchedCreators.length === 0 ? (
            <div className="text-center py-20" style={{ color: "#5b403f" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#e4bdbc" }}>
                search_off
              </span>
              <p className="mt-3 text-lg font-medium">Aucun créateur trouvé pour &ldquo;{query}&rdquo;</p>
              <button
                onClick={() => { setQuery(""); setActiveCategory("Tous"); }}
                className="mt-4 text-sm font-medium"
                style={{ color: "#b20024" }}
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {searchedCreators.map((creator, i) => (
                <Link href="/" key={creator.id}>
                  <div
                    className="bg-white rounded-2xl border overflow-hidden flex flex-col cursor-pointer transition-all"
                    style={{ borderColor: "#e4bdbc" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0px 8px 24px rgba(29,30,32,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <div className="relative overflow-hidden" style={{ height: "192px" }}>
                      <img
                        src={creator.img}
                        alt={creator.name}
                        className="w-full h-full object-cover transition-transform duration-500"
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                        }
                      />
                      <div
                        className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.92)",
                          color: "#b20024",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {creator.data}
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h4 className="text-lg font-bold" style={{ color: "#1b1c19" }}>
                          {creator.name}
                        </h4>
                        <p
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: "#496546" }}
                        >
                          {creator.role}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <GaugeBar pct={creator.pct} delay={i * 80} />
                        <div className="flex justify-between items-center">
                          <span className="text-xs" style={{ color: "#5b403f" }}>
                            {creator.pct}% du forfait
                          </span>
                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all hover:opacity-80"
                            style={{ backgroundColor: "#ffdad8", color: "#b20024" }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                              bolt
                            </span>
                            Soutenir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── Newsletter ── */}
        <section
          className="rounded-2xl p-10 text-center relative overflow-hidden"
          style={{ backgroundColor: "#1b1c19" }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(circle at 20% 50%, #b20024 0%, transparent 60%), radial-gradient(circle at 80% 50%, #496546 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-3" style={{ color: "#ffffff" }}>
              Ne manquez aucun créateur 🚀
            </h2>
            <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
              Recevez chaque semaine une sélection des meilleurs créateurs et
              cagnottes actives directement dans votre boîte mail.
            </p>
            {emailSent ? (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#c8e9c1", color: "#496546" }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                Inscription confirmée ! À bientôt.
              </div>
            ) : (
              <form
                className="flex gap-3 justify-center max-w-md mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setEmailSent(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 outline-none text-sm rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#ffffff",
                  }}
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 hover:opacity-90"
                  style={{ backgroundColor: "#b20024", color: "#ffffff" }}
                >
                  S&apos;inscrire
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ color: "#5b403f" }}>
          Chargement…
        </div>
      }
    >
      <ExploreInner />
    </Suspense>
  );
}
