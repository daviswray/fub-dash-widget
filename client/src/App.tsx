import { useEffect } from "react";
import { RealEstateWidget } from "@/components/RealEstateWidget";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  useEffect(() => {
    // FollowUpBoss iframe integration
    const handleFUBIntegration = () => {
      // Check if we're running in an iframe (FUB context)
      const isInIframe = window.self !== window.top;
      
      if (isInIframe) {
        // Parse FUB context from URL
        const urlParams = new URLSearchParams(window.location.search);
        const contextParam = urlParams.get('context');
        
        if (contextParam) {
          try {
            const context = JSON.parse(atob(contextParam));
            console.log('FUB Context:', context);
            
            // Store context for use in components
            (window as any).fubContext = context;
          } catch (error) {
            console.error('Failed to parse FUB context:', error);
          }
        }
        
        // Signal to parent iframe that we're ready
        const readyMessage = {
          type: 'widget-ready',
          source: 'fub-dash-widget',
          timestamp: Date.now()
        };
        
        // Send ready signal to parent window
        window.parent.postMessage(readyMessage, '*');
        
        // Also try common FUB ready signals
        window.parent.postMessage('widget-loaded', '*');
        window.parent.postMessage({ status: 'ready' }, '*');
        
        console.log('FUB Widget ready signals sent');
      }
    };
    
    // Run FUB integration when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleFUBIntegration);
    } else {
      handleFUBIntegration();
    }
    
    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', handleFUBIntegration);
    };
  }, []);
  
  return (
    <TooltipProvider>
      <RealEstateWidget />
    </TooltipProvider>
  );
}

export default App;
