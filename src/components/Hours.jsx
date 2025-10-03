export default function Hours() {
  return (
    <section className="hours">
      <div className="container">
        <h2 className="section-title">Horário de Funcionamento</h2>
        <div className="hours-content">
          <div className="hours-grid">
            <div className="day">
              <span>Terça a Sábado</span>
              <span>09:00 - 20:00</span>
            </div>

            <div className="day">
              <span>Domingo e Segunda</span>
              <span>Fechado</span>
            </div>
          </div>
          <div className="contact-info">
            <p>
              <i className="fas fa-phone"></i> +351 938 914 016
            </p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              Rua Cidade de Pinhel - 12, 2835-076 Baixa da Banheira
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
