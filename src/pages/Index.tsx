import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Gallery from "@/components/Gallery";
import ContactFooter from "@/components/ContactFooter";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="Bumerang Ağır Nakliyat | Lowbed Taşımacılık & Gabari Dışı Ağır Nakliye - Diyarbakır"
        description="Diyarbakır ve Güneydoğu merkezli gabari dışı ağır nakliyat, KTK 33/1 özel izinli ve eskortlu lowbed operasyonları. Ekskavatör, dozer, konkasör ve ağır sanayi ekipman nakliyesi."
        keywords="lowbed taşımacılık, ağır nakliyat, diyarbakır ağır nakliyat, gabari dışı taşıma, iş makinesi taşıma, lowbed kiralama, ktk 33/1 eskort, teleskopik lowbed, havuzlu dorse, ekskavatör nakliyesi"
      />
      <div className="min-h-screen bg-asphalt-950 text-foreground selection:bg-machinery-yellow selection:text-asphalt-950">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <WhyChooseUs />
        <Gallery />
        <ContactFooter />
      </div>
    </>
  );
};

export default Index;
