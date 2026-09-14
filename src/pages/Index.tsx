import SEO from "@/components/SEO";
import PageShell from "@/components/layout/PageShell";
import Hero from "@/components/home/Hero";
import FleetSection from "@/components/home/FleetSection";
import PhotoInterlude from "@/components/home/PhotoInterlude";
import OperationsProtocol from "@/components/home/OperationsProtocol";
import QuoteRequest from "@/components/home/QuoteRequest";
import ProjectArchive from "@/components/home/ProjectArchive";
import DispatchRoom from "@/components/home/DispatchRoom";

const Index = () => (
  <>
    <SEO />
    <PageShell>
      <Hero />
      <FleetSection />
      <PhotoInterlude
        slug="kleemann-mc110r-mobil-kirici"
        focus="50% 58%"
        caption="Kleemann Mobicat MC 110 R mobil çeneli kırıcı, hidrolik rampalardan kendi paletleriyle lowbed dorseye çıkıyor; operatör makineyi uzaktan kumandayla yönlendiriyor."
      />
      <OperationsProtocol />
      <QuoteRequest />
      <ProjectArchive />
      <DispatchRoom />
    </PageShell>
  </>
);

export default Index;
