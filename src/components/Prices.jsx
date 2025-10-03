export default function Prices() {
  return (
    <section id="prices" className="prices">
      <div className="container">
        <h2 className="section-title">Tabela de Preços</h2>
        <div className="prices-grid">
          <div className="price-card">
            <h3>Corte </h3>
            <div className="price">35,00 €</div>
            <ul>
              <li>Lavagem incluída</li>
              <li>Acabamento perfeito</li>
              <li>Produtos premium</li>
            </ul>
          </div>
          <div className="price-card featured">
            <h3>Corte + Barba</h3>
            <div className="price"> 50,00 €</div>
            <ul>
              <li>Corte completo</li>
              <li>Acabamento da barba</li>
              <li>Produtos incluídos</li>
              <li>Hidratação</li>
            </ul>
          </div>
          <div className="price-card">
            <h3>Barba</h3>
            <div className="price">25,00 €</div>
            <ul>
              <li>Modelagem</li>
              <li>Acabamento</li>
              <li>Produtos premium</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
