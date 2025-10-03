export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Barbearia Cruz</h3>
            <p>Estilo e qualidade para o homem moderno desde 2020.</p>
          </div>
          <div className="footer-section">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#home">Início</a></li>
              <li><a href="#services">Serviços</a></li>
              <li><a href="#prices">Preços</a></li>
              <li><a href="#schedule">Agendar</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              <a href="https://www.instagram.com/barbeariacruz_official/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Barbearia Cruz. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}



