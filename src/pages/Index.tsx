
import { MedBridge } from "@/components/MedBridge";
import { InfoSection } from "@/components/InfoSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background py-8">
      <div className="container mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">MedSpeak AI Bridge</h1>
          <p className="text-lg text-muted-foreground">
            Real-time Healthcare Translation
          </p>
        </header>
        
        <InfoSection />
        <MedBridge />
      </div>
    </div>
  );
};

export default Index;
