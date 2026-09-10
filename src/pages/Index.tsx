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
        title="Bumerang Ağır Nakliyat | Lowbed Taşımacılık - Diyarbakır"
        description="Diyarbakır merkezli Bumerang Ağır Nakliyat ile lowbed taşımacılık, ağır yük nakliyesi ve şehirlerarası profesyonel taşıma hizmetleri. Güvenilir ve zamanında teslimat."
        keywords="lowbed taşımacılık, ağır nakliyat, diyarbakır nakliyat, iş makinesi taşıma, lowbed kiralama, ağır yük taşıma, şehirlerarası nakliyat, ekskavatör taşıma, iş makinesi nakliyesi"
      />
      <div className="min-h-screen">
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
