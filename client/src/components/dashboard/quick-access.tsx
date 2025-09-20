import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Search, BarChart3, FileSignature, Cloud } from "lucide-react";

const platforms = [
  {
    name: "MLS",
    description: "Property Search",
    icon: Search,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    url: "#", // Replace with actual MLS URL
    testId: "platform-mls",
  },
  {
    name: "SISU.co",
    description: "Analytics",
    icon: BarChart3,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    url: "#", // Replace with actual SISU.co URL
    testId: "platform-sisu",
  },
  {
    name: "Dotloop",
    description: "Documents",
    icon: FileSignature,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    url: "#", // Replace with actual Dotloop URL
    testId: "platform-dotloop",
  },
  {
    name: "Skyslope",
    description: "Transaction Mgmt",
    icon: Cloud,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    url: "#", // Replace with actual Skyslope URL
    testId: "platform-skyslope",
  },
];

export function QuickAccess() {
  const handlePlatformClick = (platform: string, url: string) => {
    console.log(`Opening platform: ${platform}`);
    // In a real implementation, this would open the platform URL
    // window.open(url, '_blank');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Platform Quick Access</CardTitle>
        <ExternalLink className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.name}
                onClick={() => handlePlatformClick(platform.name, platform.url)}
                className="flex flex-col items-center p-4 border border-border rounded-lg hover:bg-muted hover:border-primary transition-all group"
                data-testid={platform.testId}
              >
                <div className={`w-12 h-12 ${platform.iconBg} rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/10`}>
                  <Icon className={`h-6 w-6 ${platform.iconColor} group-hover:text-primary`} />
                </div>
                <span className="text-sm font-medium text-foreground">{platform.name}</span>
                <span className="text-xs text-muted-foreground">{platform.description}</span>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
