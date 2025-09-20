import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Search, BarChart3, FileSignature, Cloud } from "lucide-react";

const platforms = [
  {
    name: "MLS",
    description: "Property Search & Listings",
    icon: Search,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    url: "https://www.mls.com", // Replace with actual MLS URL
    testId: "platform-mls",
  },
  {
    name: "SISU.co",
    description: "Real Estate Analytics",
    icon: BarChart3,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    url: "https://www.sisu.co", // Replace with actual SISU.co URL
    testId: "platform-sisu",
  },
  {
    name: "Dotloop",
    description: "Transaction Documents",
    icon: FileSignature,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    url: "https://www.dotloop.com", // Replace with actual Dotloop URL
    testId: "platform-dotloop",
  },
  {
    name: "Skyslope",
    description: "Transaction Management",
    icon: Cloud,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    url: "https://www.skyslope.com", // Replace with actual Skyslope URL
    testId: "platform-skyslope",
  },
];

export function RealEstateWidget() {
  const handlePlatformClick = (platform: string, url: string) => {
    console.log(`Opening platform: ${platform} - ${url}`);
    // Open in new tab/window
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Check if we're in an iframe
  const isInIframe = window.self !== window.top;
  
  // Add debugging
  console.log('RealEstateWidget rendering, isInIframe:', isInIframe);
  
  return (
    <div className={`${isInIframe ? 'p-1' : 'p-3'} bg-white w-full ${isInIframe ? 'min-h-fit' : 'min-h-screen'}`} style={{
      minHeight: isInIframe ? '200px' : 'auto',
      backgroundColor: '#ffffff',
      position: isInIframe ? 'relative' : 'static',
      overflow: isInIframe ? 'hidden' : 'auto',
      transform: isInIframe ? 'translateZ(0)' : 'none', // Force hardware acceleration
      backfaceVisibility: isInIframe ? 'hidden' : 'visible', // Reduce flicker
      perspective: isInIframe ? '1000px' : 'none' // Smooth rendering
    }}>
      {/* Minimal debug indicator for iframe */}
      {isInIframe && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          width: '8px',
          height: '8px',
          backgroundColor: '#22c55e',
          borderRadius: '50%',
          zIndex: 1000
        }} title="FUB iframe loaded" />
      )}
      
      <Card className={`w-full ${isInIframe ? 'max-w-none shadow-sm border' : 'max-w-xl mx-auto shadow-lg border-2'}`}>
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold text-primary flex items-center justify-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Real Estate Platform Access
            {isInIframe && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">FUB Mode</span>}
          </CardTitle>
          <p className="text-sm text-muted-foreground">Quick access to your essential real estate tools</p>
        </CardHeader>
        <CardContent className={isInIframe ? 'p-3' : 'p-6'}>
          <div className={`grid ${isInIframe ? 'grid-cols-2 gap-2' : 'grid-cols-1 sm:grid-cols-2 gap-4'}`}>
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.name}
                  onClick={() => handlePlatformClick(platform.name, platform.url)}
                  className={`flex flex-col items-center ${isInIframe ? 'p-3' : 'p-6'} border border-border rounded-lg hover:bg-muted hover:border-primary ${isInIframe ? '' : 'transition-all'} group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  data-testid={platform.testId}
                  style={isInIframe ? {
                    transition: 'none',
                    transform: 'none',
                    animation: 'none'
                  } : {}}
                >
                  <div className={`${isInIframe ? 'w-10 h-10' : 'w-16 h-16'} ${platform.iconBg} rounded-lg flex items-center justify-center ${isInIframe ? 'mb-2' : 'mb-4'} group-hover:bg-primary/10 ${isInIframe ? '' : 'transition-colors'}`}>
                    <Icon className={`${isInIframe ? 'h-5 w-5' : 'h-8 w-8'} ${platform.iconColor} group-hover:text-primary ${isInIframe ? '' : 'transition-colors'}`} />
                  </div>
                  <span className={`${isInIframe ? 'text-sm' : 'text-lg'} font-medium text-foreground mb-1`}>{platform.name}</span>
                  <span className={`${isInIframe ? 'text-xs' : 'text-sm'} text-muted-foreground text-center`}>{platform.description}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}