import { RealEstateWidget } from "@/components/RealEstateWidget";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <RealEstateWidget />
    </TooltipProvider>
  );
}

export default App;
