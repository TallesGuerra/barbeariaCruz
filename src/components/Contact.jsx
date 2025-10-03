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
                <a
                  href="https://www.google.com/maps/place/Barbearia+Cruz/@38.6576219,-9.0480196,995m/data=!3m2!1e3!4b1!4m6!3m5!1s0xd1937c825b5488d:0x2c5c1ef5f0673806!8m2!3d38.6576219!4d-9.0480196!16s%2Fg%2F11g6mhh4vh?entry=ttu&g_ep=EgoyMDI1MDkzMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                >
                  R. Cidade de Pinhel 12 - Baixa da Banheira
                </a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <a href="tel:+351 938 914 016" target="_blank">
                  +351 938 914 016
                </a>
              </div>
            </div>
            <div className="contact-item">
              <i className="fab fa-instagram"></i>
              <div>
                <a
                  href="https://www.instagram.com/barbeariacruz_official/"
                  target="_blank"
                >
                  {" "}
                  barbeariacruz_official
                </a>
              </div>
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4332.658767507043!2d-9.0480196!3d38.657621899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1937c825b5488d%3A0x2c5c1ef5f0673806!2sBarbearia%20Cruz!5e1!3m2!1spt-PT!2ses!4v1759499811060!5m2!1spt-PT!2ses"
              width="100%"
              height="400"
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
