export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Entre em Contacto</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <p>R. Cidade de Pinhel - 12 Baixa da Banheira</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <p>(11) 99999-9999</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <p>contacto@barbeariacruz.com</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fab fa-instagram"></i>
              <div>
                <p>@barbeariacruz_official</p>
              </div>
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3110.1234567890123!2d-9.0333!3d38.6667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQwJzAwLjAiTiA5wrAwMicwMC4wIlc!5e0!3m2!1spt-PT!2spt!4v1234567890123"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
