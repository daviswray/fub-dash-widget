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

  return (
    <div className="p-4 bg-background min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto shadow-lg border-2">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold text-primary flex items-center justify-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Real Estate Platform Access
          </CardTitle>
          <p className="text-sm text-muted-foreground">Quick access to your essential real estate tools</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.name}
                  onClick={() => handlePlatformClick(platform.name, platform.url)}
                  className="flex flex-col items-center p-6 border border-border rounded-lg hover:bg-muted hover:border-primary transition-all group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  data-testid={platform.testId}
                >
                  <div className={`w-16 h-16 ${platform.iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors`}>
                    <Icon className={`h-8 w-8 ${platform.iconColor} group-hover:text-primary transition-colors`} />
                  </div>
                  <span className="text-lg font-medium text-foreground mb-1">{platform.name}</span>
                  <span className="text-sm text-muted-foreground text-center">{platform.description}</span>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}