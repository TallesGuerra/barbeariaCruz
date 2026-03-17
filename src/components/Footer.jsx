export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Barber Shop</h3>
            <p style={{ fontSize: 12 }}>
              Estilo e qualidade para o homem moderno desde 2020.
            </p>
          </div>
          {/*  <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#services">Serviços</a></li>
              <li><a href="#prices">Preços</a></li>
              <li><a href="#schedule">Agendar</a></li>
            </ul>
          </div> */}
          <div className="footer-section">
            <div className="social-links">
              <i className="fab fa-instagram"></i>
              <i className="fas fa-phone"></i>
              <i className="fab fa-whatsapp"></i>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; Desenvolvido por{" "}
            <a href="https://www.linkedin.com/in/talles-guerra/">
              Talles Guerra
            </a>
            . Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
