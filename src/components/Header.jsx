import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleAnchorClick(e, href) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const headerEl = document.querySelector(".header");
    const headerHeight = headerEl ? headerEl.offsetHeight : 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <div
            className="logo"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img
              src="/assets/logoBarbearia.png"
              alt="Barbearia Cruz"
              style={{ height: 50, borderRadius: 100 }}
            />
            <h2>
              Barbearia <span>Cruz</span>
            </h2>
          </div>
          <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
            <li>
              <a
                href="#home"
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, "#home")}
              >
                Início
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, "#services")}
              >
                Serviços
              </a>
            </li>
            <li>
              <a
                href="#prices"
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, "#prices")}
              >
                Preços
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, "#gallery")}
              >
                Galeria
              </a>
            </li>
            <li>
              <a
                href="#schedule"
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, "#schedule")}
              >
                Agendar
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="nav-link"
                onClick={(e) => handleAnchorClick(e, "#contact")}
              >
                Contacto
              </a>
            </li>
          </ul>
          <div
            className={menuOpen ? "hamburger active" : "hamburger"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
