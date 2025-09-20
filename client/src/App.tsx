import { useEffect } from "react";
import { RealEstateWidget } from "@/components/RealEstateWidget";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  useEffect(() => {
    // FollowUpBoss iframe integration
    const handleFUBIntegration = () => {
      // Check if we're running in an iframe (FUB context)
      const isInIframe = window.self !== window.top;
      
      // Add comprehensive debugging
      console.log('=== FUB INTEGRATION DEBUG ===');
      console.log('isInIframe:', isInIframe);
      console.log('window.location.href:', window.location.href);
      console.log('window.innerWidth:', window.innerWidth);
      console.log('window.innerHeight:', window.innerHeight);
      console.log('document.body.clientWidth:', document.body?.clientWidth);
      console.log('document.body.clientHeight:', document.body?.clientHeight);
      console.log('FUB object available:', !!(window as any).FUB);
      
      if (isInIframe) {
        // Parse FUB context from URL
        const urlParams = new URLSearchParams(window.location.search);
        const contextParam = urlParams.get('context');
        
        console.log('FUB context param found:', !!contextParam);
        
        if (contextParam) {
          try {
            const context = JSON.parse(atob(contextParam));
            console.log('FUB Context parsed successfully:', context);
            
            // Store context for use in components
            (window as any).fubContext = context;
          } catch (error) {
            console.error('Failed to parse FUB context:', error);
          }
        }
        
        // Optimize for iframe display
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.overflow = 'auto';
        document.body.style.minHeight = '200px'; // Ensure minimum visibility
        document.body.style.minWidth = '250px';  // Ensure minimum width
        
        // Use FUB API if available, otherwise fallback to postMessage
        if ((window as any).FUB && (window as any).FUB.ready) {
          // Use official FUB API
          (window as any).FUB.ready();
          console.log('✅ FUB API ready signal sent');
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
          
          console.log('✅ FUB Widget ready signals sent (fallback)');
        }
        
        // Try to resize iframe from inside
        setTimeout(() => {
          try {
            window.parent.postMessage({
              type: 'resize-iframe',
              width: Math.max(400, document.body.scrollWidth),
              height: Math.max(300, document.body.scrollHeight)
            }, '*');
            console.log('📏 Resize message sent to parent');
          } catch (e) {
            console.log('Could not send resize message:', e);
          }
        }, 1000);
      } else {
        console.log('Running in standalone mode (not iframe)');
      }
      
      console.log('=== END FUB DEBUG ===');
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
