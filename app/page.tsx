"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SUPPORT_FEED = [
  {
    id: 1,
    name: "Marc A.",
    amount: "2.000 FCFA",
    time: "Il y a 2 heures",
    message:
      "Merci Juliet pour tes conseils sur LinkedIn, ça m'a beaucoup aidé !",
    icon: "person",
    iconBg: "#f0eee9",
    iconColor: "#906f6e",
    showHeart: true,
  },
  {
    id: 2,
    name: "Anonyme",
    amount: "5.000 FCFA",
    time: "Il y a 5 heures",
    message: "Keep going Juliet! Le contenu est top.",
    icon: "bolt",
    iconBg: "#c8e9c1",
    iconColor: "#496546",
    showHeart: false,
  },
  {
    id: 3,
    name: "Sarah K.",
    amount: "500 FCFA",
    time: "Hier",
    message: "",
    icon: "person",
    iconBg: "#f0eee9",
    iconColor: "#906f6e",
    showHeart: false,
  },
];

const PRESET_AMOUNTS = [500, 1000, 2000, 5000];

export default function CreatorProfile() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [goalsVisible, setGoalsVisible] = useState(false);
  const donationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setGoalsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
  };

  const handleCustomChange = (val: string) => {
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const getFinalAmount = () => {
    if (customAmount) return parseInt(customAmount) || 0;
    return selectedAmount || 0;
  };

  const handlePay = () => {
    const amount = getFinalAmount();
    if (amount <= 0) return;
    const params = new URLSearchParams({ amount: String(amount) });
    if (message.trim()) params.set("message", message.trim());
    router.push(`/pay?${params.toString()}`);
  };

  const scrollToDonation = () => {
    donationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar onSupportClick={scrollToDonation} />
      <main className="mx-auto px-8 py-6" style={{ maxWidth: "1200px" }}>
        {/* ── Banner ── */}
        <header className="relative mb-6">
          <div
            className="h-64 md:h-80 w-full rounded-xl overflow-hidden border"
            style={{ borderColor: "#e4bdbc", backgroundColor: "#f0eee9" }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9fNDWVaB1ngrYTaQAhy55MOYGUBHrwl1VJ8-eOkL8ri1BhCk_dMFFWYfezo0_EB2gOL9ZUChdqrBC5e2R6MBbuiPpbEgNblmsFVlZDTBWJGaG0dNWeO5PfX2PEvSM6lcQfnxuk-_ZKbQL8da-1mHEi-XBXFvxd2Bi14yquIrYKry-J1WOLopYgijAEU1TVdjJyFxbodIiZ3NIs4A3ZgnkYggH0k0BCAqOt3B3XRPAqIK4UliHL922qtE0CshI7T0pPujnhAtQhJcd')",
              }}
            />
          </div>

          {/* Avatar + Name */}
          <div className="flex flex-col md:flex-row items-end md:items-start gap-5 -mt-16 px-5 relative z-10">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 overflow-hidden shadow-lg bg-white"
              style={{ borderColor: "#fbf9f4" }}
            >
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5PXsU07Swjq7Y3mH7tozVZbYHzec6Aw5C2DmaWUfzS98LY35OIcUQS5rc_n8VemuuTVVwfeX1hyqQhBHtwMWEGAr8c_ZB_7XEAkeDZtq9vVb3meq7ZGhD4g0f1F0K0CTH9MlJJLYtDhRsdoXujXgsRZGIli6rVpuje-1XvBP7a1FLMWkxThc9EyWhV2BC8eJWC8_TxNofwvJDlxquJc3R0WjNuA9G7VGUmFYCq-1Vi-ylMlrLGzts10fqUh4bnnoD5L5qNqMs0x8W"
                alt="Juliet profile"
              />
            </div>
            <div className="flex-1 pb-4 text-left md:pt-20">
              <div className="flex items-center gap-2">
                <h1
                  className="text-3xl font-bold"
                  style={{ letterSpacing: "-0.02em", color: "#1b1c19" }}
                >
                  Juliet
                </h1>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    color: "#496546",
                    fontSize: "20px",
                  }}
                >
                  verified
                </span>
              </div>
              <p className="mt-1 text-sm" style={{ color: "#5b403f" }}>
                Créatrice de contenus digitaux &amp; Formatrice Tech
              </p>
              <div className="flex gap-4 mt-3">
                {["language", "alternate_email", "share"].map((icon) => (
                  <button
                    key={icon}
                    className="transition-colors"
                    style={{ color: "#5b403f" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#b20024")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#5b403f")
                    }
                    onClick={() => {
                      if (icon === "share") {
                        navigator.clipboard
                          .writeText(window.location.href)
                          .then(() => alert("Lien copié !"))
                          .catch(() => { });
                      }
                    }}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Quick support CTA */}
            <div className="pb-4 md:pt-20">
              <button
                onClick={scrollToDonation}
                className="px-6 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                style={{ backgroundColor: "#b20024", color: "#ffffff" }}
              >
                <span className="material-symbols-outlined text-base">bolt</span>
                Soutenir Juliet
              </button>
            </div>
          </div>
        </header>

        {/* ── Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ── Left Column ── */}
          <div className="lg:col-span-4 space-y-5">
            {/* À propos */}
            <section
              className="p-6 rounded-xl border card-shadow"
              style={{ backgroundColor: "#ffffff", borderColor: "#e4bdbc" }}
            >
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: "#906f6e" }}
              >
                À propos
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#5b403f" }}>
                Passionnée par la technologie et l&apos;éducation, je crée des
                guides simplifiés pour aider les entrepreneurs à maîtriser les
                outils digitaux. Votre soutien me permet de maintenir la qualité
                de mes recherches et de rester indépendante.
              </p>
            </section>

            {/* Objectifs */}
            <section
              className="p-6 rounded-xl border card-shadow"
              style={{ backgroundColor: "#ffffff", borderColor: "#e4bdbc" }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "#906f6e" }}
                >
                  Objectifs
                </h2>
                <span
                  className="text-xs font-medium px-2 py-1 rounded-full"
                  style={{ color: "#496546", backgroundColor: "#c8e9c1" }}
                >
                  En cours
                </span>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Nouveau Micro", pct: 75, current: "75.000", total: "100.000" },
                  { label: "Formation gratuite", pct: 40, current: "20.000", total: "50.000" },
                ].map((goal) => (
                  <div key={goal.label}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: "#1b1c19" }}>
                        {goal.label}
                      </span>
                      <span className="text-sm font-medium" style={{ color: "#496546" }}>
                        {goal.pct}%
                      </span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: "#f0eee9" }}
                    >
                      <div
                        className="gauge-bar h-full rounded-full"
                        style={{
                          width: goalsVisible ? `${goal.pct}%` : "0%",
                          backgroundColor: "#496546",
                        }}
                      />
                    </div>
                    <p className="text-xs mt-2" style={{ color: "#5b403f" }}>
                      {goal.current} / {goal.total} FCFA
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Statistiques */}
            <section
              className="p-6 rounded-xl border card-shadow"
              style={{ backgroundColor: "#ffffff", borderColor: "#e4bdbc" }}
            >
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-3"
                style={{ color: "#906f6e" }}
              >
                Statistiques
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "1.2k", label: "Soutiens" },
                  { value: "45", label: "Projets" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: "#fbf9f4" }}
                  >
                    <span className="block text-2xl font-bold" style={{ color: "#b20024" }}>
                      {stat.value}
                    </span>
                    <span className="text-xs" style={{ color: "#5b403f" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right Column ── */}
          <div className="lg:col-span-8 space-y-5">
            {/* ── Donation Card ── */}
            <section
              ref={donationRef}
              className="p-6 md:p-10 rounded-xl border-2 relative overflow-hidden card-shadow scroll-mt-20"
              style={{ backgroundColor: "#ffffff", borderColor: "#d62839" }}
            >
              <div className="absolute top-0 right-0 p-4" style={{ opacity: 0.05 }}>
                <span className="material-symbols-outlined" style={{ fontSize: "120px" }}>
                  bolt
                </span>
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-3" style={{ color: "#1b1c19" }}>
                  Payer les mégas de Juliet
                </h2>
                <p className="text-sm mb-8 max-w-lg" style={{ color: "#5b403f" }}>
                  Choisissez un montant pour soutenir la création de contenus.
                  Chaque contribution aide Juliet à rester connectée et à
                  partager son savoir.
                </p>

                {/* Preset amounts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {PRESET_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleAmountSelect(amt)}
                      className="p-6 rounded-xl border transition-all"
                      style={{
                        borderColor: selectedAmount === amt ? "#b20024" : "#e4bdbc",
                        backgroundColor: selectedAmount === amt ? "#ffdad8" : "transparent",
                        color: selectedAmount === amt ? "#b20024" : "#1b1c19",
                      }}
                    >
                      <span className="block text-2xl font-semibold">{amt}</span>
                      <span className="text-xs" style={{ color: "#5b403f" }}>FCFA</span>
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="number"
                      id="custom-amount"
                      className="w-full h-14 rounded-lg px-4 outline-none text-base transition-all"
                      style={{ backgroundColor: "#fbf9f4", border: "1px solid #e4bdbc" }}
                      placeholder="Montant personnalisé (FCFA)"
                      value={customAmount}
                      onChange={(e) => handleCustomChange(e.target.value)}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#b20024";
                        e.currentTarget.style.boxShadow = "0 0 0 2px rgba(178,0,36,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e4bdbc";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <label
                      htmlFor="custom-amount"
                      className="absolute -top-2 left-3 px-2 text-xs"
                      style={{ backgroundColor: "#ffffff", color: "#906f6e" }}
                    >
                      Ou entrez un montant
                    </label>
                  </div>

                  <textarea
                    className="w-full h-32 rounded-lg p-4 outline-none resize-none text-sm transition-all"
                    style={{ backgroundColor: "#fbf9f4", border: "1px solid #e4bdbc" }}
                    placeholder="Un petit message d'encouragement ? (Optionnel)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#b20024";
                      e.currentTarget.style.boxShadow = "0 0 0 2px rgba(178,0,36,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e4bdbc";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />

                  <button
                    onClick={handlePay}
                    disabled={getFinalAmount() === 0}
                    className="w-full h-16 rounded-xl text-white text-xl font-semibold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#b20024" }}
                  >
                    <span>Payer les mégas</span>
                    <span className="material-symbols-outlined">payments</span>
                  </button>
                </div>
              </div>
            </section>

            {/* ── Support Feed ── */}
            <section
              className="p-6 rounded-xl border card-shadow"
              style={{ backgroundColor: "#ffffff", borderColor: "#e4bdbc" }}
            >
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-6"
                style={{ color: "#906f6e" }}
              >
                Derniers soutiens
              </h2>

              <div className="space-y-6">
                {SUPPORT_FEED.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-6"
                    style={{
                      borderBottom: i < SUPPORT_FEED.length - 1 ? "1px solid #f0eee9" : "none",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: item.iconBg }}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{
                          color: item.iconColor,
                          fontVariationSettings: item.icon === "bolt" ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        {item.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium" style={{ color: "#1b1c19" }}>
                            {item.name}{" "}
                            <span className="font-normal" style={{ color: "#5b403f" }}>
                              a payé {item.amount}
                            </span>
                          </h3>
                          <p className="text-xs" style={{ color: "#5b403f" }}>{item.time}</p>
                        </div>
                        {item.showHeart && (
                          <span
                            className="material-symbols-outlined"
                            style={{ color: "#496546", fontVariationSettings: "'FILL' 1" }}
                          >
                            favorite
                          </span>
                        )}
                      </div>
                      {item.message && (
                        <p className="mt-2 italic text-sm" style={{ color: "#5b403f" }}>
                          &ldquo;{item.message}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="w-full mt-8 py-3 text-sm font-medium rounded-lg border transition-colors"
                style={{ color: "#b20024", borderColor: "rgba(178,0,36,0.2)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "#ffdad8")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                }
              >
                Voir plus de soutiens
              </button>
            </section>
          </div>
        </div>

        {/* ── Footer Info Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <section
            className="p-6 rounded-xl border"
            style={{ backgroundColor: "#f5f3ee", borderColor: "#e4bdbc" }}
          >
            <h2
              className="text-xs font-medium uppercase tracking-wider mb-3"
              style={{ color: "#906f6e" }}
            >
              Contact &amp; Liens
            </h2>
            <ul className="space-y-3">
              {[
                { icon: "mail", text: "hello@juliet-tech.com", href: "mailto:hello@juliet-tech.com" },
                { icon: "link", text: "linktr.ee/juliet_crea", href: "https://linktr.ee/juliet_crea" },
                { icon: "calendar_today", text: "Réserver une consultation", href: "#" },
              ].map((item) => (
                <li key={item.icon}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-opacity hover:opacity-70"
                    style={{ color: "#5b403f" }}
                  >
                    <span className="material-symbols-outlined" style={{ color: "#b20024" }}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="p-6 rounded-xl border"
            style={{ backgroundColor: "#f5f3ee", borderColor: "#e4bdbc" }}
          >
            <h2
              className="text-xs font-medium uppercase tracking-wider mb-3"
              style={{ color: "#906f6e" }}
            >
              Transparence
            </h2>
            <p className="text-xs mb-4" style={{ color: "#5b403f" }}>
              CreatorCare garantit que 90% des fonds sont reversés directement à
              Juliet. Les 10% restants couvrent les frais de transaction et
              d&apos;infrastructure.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: "#496546" }}>
              <span className="material-symbols-outlined">security</span>
              Paiements sécurisés par Mobile Money &amp; Card
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
