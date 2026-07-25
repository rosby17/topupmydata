"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b shadow-sm h-16"
      style={{
        backgroundColor: "#fbf9f4",
        borderColor: "#e4bdbc",
      }}
    >
      <div
        className="flex justify-between items-center w-full h-full mx-auto px-8"
        style={{ maxWidth: "1200px" }}
      >
        {/* Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <Link href="/">
            <span
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: "#b20024" }}
            >
              CreatorCare
            </span>
          </Link>
          <div className="hidden md:flex gap-6">
            {["Explore", "Feed", "My Support"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium transition-colors duration-200"
                style={{
                  color: "#5b403f",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#b20024")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#5b403f")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="text-sm font-medium transition-colors"
            style={{ color: "#5b403f" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#b20024")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#5b403f")
            }
          >
            Sign In
          </button>
          <button
            className="px-6 py-2 rounded-lg text-sm font-bold transition-transform active:scale-90"
            style={{
              backgroundColor: "#d62839",
              color: "#fff2f1",
            }}
          >
            Start Creating
          </button>
        </div>
      </div>
    </nav>
  );
}
