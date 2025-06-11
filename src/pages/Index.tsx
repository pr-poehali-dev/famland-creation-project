import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FamilyTreeVisualization from "@/components/FamilyTreeVisualization";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      <Hero />
      <FamilyTreeVisualization />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Index;
