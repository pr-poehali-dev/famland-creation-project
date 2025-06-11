import Hero from "@/components/Hero";
import FamilyTreeVisualization from "@/components/FamilyTreeVisualization";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FamilyTreeVisualization />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Index;
