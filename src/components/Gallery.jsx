export default function Gallery() {
  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery-grid">
          {[
            "photo-1503951914875-452162b0f3f1",
            "photo-1585747860715-2ba37e788b70",
            "photo-1621605815971-fbc98d665033",
            "photo-1507003211169-0a1dd7228f2d",
            "photo-1599351431202-1e0f0137899a",
            "photo-1622287162716-f311baa1a2b8",
          ].map((id) => (
            <div className="gallery-item" key={id}>
              <img
                src={`https://images.unsplash.com/${id}?w=400`}
                alt="Galeria"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
