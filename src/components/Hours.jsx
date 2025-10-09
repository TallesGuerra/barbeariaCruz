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

          <a href="#schedule" className="cta-button">
            Agendar Horário
          </a>
        </div>
      </div>
    </section>
  );
}
