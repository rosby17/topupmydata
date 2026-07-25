export default function Footer() {
  return (
    <footer
      className="border-t mt-20"
      style={{
        backgroundColor: "#f5f3ee",
        borderColor: "#e4bdbc",
      }}
    >
      <div
        className="w-full py-6 px-8 mx-auto grid grid-cols-1 md:grid-cols-4 gap-5"
        style={{ maxWidth: "1200px" }}
      >
        {/* Brand */}
        <div className="md:col-span-1">
          <span className="text-2xl font-bold" style={{ color: "#1b1c19" }}>
            CreatorCare
          </span>
          <p
            className="mt-4 text-xs leading-relaxed"
            style={{ color: "#5b403f" }}
          >
            Propulser la créativité locale par le soutien communautaire.
          </p>
        </div>

        {/* Plateforme */}
        <div>
          <h4
            className="font-semibold mb-4 text-sm"
            style={{ color: "#1b1c19" }}
          >
            Plateforme
          </h4>
          <ul className="space-y-2">
            {["About Us", "Help Center", "Newsletter"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#5b403f" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#b20024")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#5b403f")
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h4
            className="font-semibold mb-4 text-sm"
            style={{ color: "#1b1c19" }}
          >
            Légal
          </h4>
          <ul className="space-y-2">
            {["Terms of Service", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#5b403f" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#b20024")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#5b403f")
                  }
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Suivez-nous */}
        <div>
          <h4
            className="font-semibold mb-4 text-sm"
            style={{ color: "#1b1c19" }}
          >
            Suivez-nous
          </h4>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: "#fbf9f4", color: "#1b1c19" }}
            >
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="mx-auto px-8 py-6 border-t text-center md:text-left"
        style={{
          maxWidth: "1200px",
          borderColor: "rgba(228, 189, 188, 0.1)",
        }}
      >
        <p className="text-xs" style={{ color: "#5b403f" }}>
          © 2024 CreatorCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
