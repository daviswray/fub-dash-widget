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
        
        // Use FUB API if available, otherwise fallback to postMessage
        if ((window as any).FUB && (window as any).FUB.ready) {
          // Use official FUB API
          (window as any).FUB.ready();
          console.log('FUB API ready signal sent');
        } else {
          // Fallback to manual postMessage
          const readyMessage = {
            type: 'widget-ready',
            source: 'fub-dash-widget',
            timestamp: Date.now()
          };
          
          // Send ready signal to parent window
          window.parent.postMessage(readyMessage, '*');
          window.parent.postMessage('widget-loaded', '*');
          window.parent.postMessage({ status: 'ready' }, '*');
          
          console.log('FUB Widget ready signals sent (fallback)');
        }
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
