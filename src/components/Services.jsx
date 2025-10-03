export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Nossos Serviços</h2>
        <div className="services-grid">
          <div className="service-card">
            <i className="fas fa-cut"></i>
            <h3>Corte </h3>
            <p>Cortes modernos e tradicionais com acabamento perfeito</p>
          </div>
          <div className="service-card">
            <i className="fas fa-beard"></i>
            <h3>Barba</h3>
            <p>Acabamento e modelagem de barba com produtos premium</p>
          </div>
          <div className="service-card">
            <i className="fas fa-palette"></i>
            <h3>Coloração</h3>
            <p>Coloração profissional para cabelo e barba</p>
          </div>
          <div className="service-card">
            <i className="fas fa-spa"></i>
            <h3>Tratamentos</h3>
            <p>Hidratação e tratamentos especiais</p>
          </div>
        </div>
      </div>
    </section>
  );
}
