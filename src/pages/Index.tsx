import { LocationSearch } from "@/components/ui/location-search";
import { MapPin, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-location-surface via-location-secondary/30 to-background">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-location-primary to-location-accent rounded-xl shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-location-primary to-location-accent bg-clip-text text-transparent">
            Location Search Component
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A beautiful maps autocomplete input with distance calculation and unique UI design
          </p>
        </div>

        {/* Demo Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-location-border/20">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-location-primary" />
              <h2 className="text-lg font-semibold text-foreground">Interactive Demo</h2>
            </div>
            
            <div className="flex justify-center mb-8">
              <LocationSearch
                placeholder="Search for any location..."
                onLocationSelect={(location) => {
                  console.log('Selected location:', location);
                }}
                className="w-full max-w-lg"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Features:</h3>
                <ul className="space-y-1">
                  <li>• Real-time autocomplete search</li>
                  <li>• Distance calculation in kilometers</li>
                  <li>• Beautiful gradient design</li>
                  <li>• Responsive dropdown results</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Try searching for:</h3>
                <ul className="space-y-1">
                  <li>• "Central Park"</li>
                  <li>• "Times Square"</li>
                  <li>• "Brooklyn Bridge"</li>
                  <li>• "Statue of Liberty"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* API Integration Note */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-location-secondary/30 rounded-xl border border-location-border/30">
          <h3 className="font-semibold text-foreground mb-2">Ready for Real Maps Integration</h3>
          <p className="text-sm text-muted-foreground">
            This component uses mock data for demonstration. To integrate with real maps services like Google Places API, 
            replace the mockGeocode function with your preferred geocoding service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
