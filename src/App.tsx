import Header from './components/Header';
import HeroSearch from './components/HeroSearch';
import Deals from './components/Deals';
import PopularDestinations from './components/PopularDestinations';
import FeaturedHotels from './components/FeaturedHotels';
import PropertyTypes from './components/PropertyTypes';
import WhyChooseUs from './components/WhyChooseUs';
import AppDownload from './components/AppDownload';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <HeroSearch />
      <Deals />
      <PopularDestinations />
      <FeaturedHotels />
      <PropertyTypes />
      <WhyChooseUs />
      <AppDownload />
      <Footer />
    </div>
  );
}

export default App;
