export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <img
          src="/assets/logoBarbearia.png"
          alt="Barbearia Cruz"
          style={{ height: 200, borderRadius: 100 }}
        />
        <h1>
          Barbearia <span>Cruz</span>
        </h1>
        <p>Estilo e qualidade para o homem moderno</p>
        <a href="#schedule" className="cta-button">
          Agendar Horário
        </a>
      </div>
    </section>
  );
}
