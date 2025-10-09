import { SERVICES } from "../config/servicePrices";

export default function Prices() {
  return (
    <section id="prices" className="prices">
      <div className="container">
        <h2 className="section-title">Tabela de Preços</h2>
        <div className="prices-grid">
          {SERVICES.map((service, idx) => (
            <div
              className={`price-card${idx === 1 ? " featured" : ""}`}
              key={service.id}
            >
              <h3>{service.name}</h3>
              <div className="price">{service.price.toFixed(2)} €</div>
              <ul>
                {service.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
