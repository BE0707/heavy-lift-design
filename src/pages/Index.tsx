import SEO from "@/components/SEO";
import PageShell from "@/components/layout/PageShell";
import Hero from "@/components/home/Hero";
import FleetSection from "@/components/home/FleetSection";
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
      <OperationsProtocol />
      <QuoteRequest />
      <ProjectArchive />
      <DispatchRoom />
    </PageShell>
  </>
);

export default Index;
