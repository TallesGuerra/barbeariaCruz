import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Prices from "./components/Prices";
import Hours from "./components/Hours";
import Gallery from "./components/Gallery";
import Schedule from "./components/Schedule";
import Contact from "./components/Contact";

import "./styles.css";

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Services />
        <Prices />
        <Hours />
        <Gallery />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
