import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, Search, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationResult {
  id: string;
  name: string;
  address: string;
  distance?: number;
  coordinates?: { lat: number; lng: number };
}

interface LocationSearchProps {
  onLocationSelect?: (location: LocationResult) => void;
  onDistanceChange?: (distance: number) => void;
  placeholder?: string;
  userLocation?: { lat: number; lng: number };
  className?: string;
}

const DISTANCE_OPTIONS = [
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 25, label: '25 km' },
  { value: 50, label: '50 km' },
];

// Mock geocoding service - replace with real service like Google Places API
const mockGeocode = async (query: string): Promise<LocationResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const mockResults: LocationResult[] = [
    {
      id: '1',
      name: 'Central Park',
      address: 'New York, NY, USA',
      coordinates: { lat: 40.785091, lng: -73.968285 },
      distance: Math.random() * 10 + 1
    },
    {
      id: '2', 
      name: 'Times Square',
      address: 'Manhattan, NY, USA',
      coordinates: { lat: 40.758, lng: -73.9855 },
      distance: Math.random() * 10 + 1
    },
    {
      id: '3',
      name: 'Brooklyn Bridge',
      address: 'Brooklyn, NY, USA', 
      coordinates: { lat: 40.7061, lng: -73.9969 },
      distance: Math.random() * 10 + 1
    },
    {
      id: '4',
      name: 'Statue of Liberty',
      address: 'Liberty Island, NY, USA',
      coordinates: { lat: 40.6892, lng: -74.0445 },
      distance: Math.random() * 10 + 1
    }
  ].filter(result => 
    result.name.toLowerCase().includes(query.toLowerCase()) ||
    result.address.toLowerCase().includes(query.toLowerCase())
  );

  return mockResults;
};

export const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  onDistanceChange,
  placeholder = "Search for a location...",
  userLocation,
  className
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationResult | null>(null);
  const [selectedDistance, setSelectedDistance] = useState(10); // Default to 10km
  const [isDistanceDropdownOpen, setIsDistanceDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const distanceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchLocations = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const searchResults = await mockGeocode(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } catch (error) {
        console.error('Geocoding error:', error);
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(searchLocations, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
      
      if (
        distanceDropdownRef.current &&
        !distanceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDistanceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: LocationResult) => {
    setSelectedLocation(location);
    setQuery(location.name);
    setIsOpen(false);
    onLocationSelect?.(location);
  };

  const handleDistanceSelect = (distance: number) => {
    setSelectedDistance(distance);
    setIsDistanceDropdownOpen(false);
    onDistanceChange?.(distance);
  };

  const clearSelection = () => {
    setSelectedLocation(null);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      {/* Input Container */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-location-primary/20 to-location-accent/20 rounded-xl blur-sm" />
        <div className="relative bg-location-surface border-2 border-location-border rounded-xl shadow-lg shadow-location-shadow/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-location-shadow/20">
          {/* Input Field */}
          <div className="flex items-center p-4">
            <div className="flex-shrink-0 mr-3">
              <div className="p-2 bg-gradient-to-br from-location-primary to-location-accent rounded-lg shadow-md">
                <Search className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="flex-1 text-sm font-medium placeholder:text-muted-foreground bg-transparent focus:outline-none"
              onFocus={() => {
                if (results.length > 0) setIsOpen(true);
              }}
            />

            {selectedLocation && (
              <button
                onClick={clearSelection}
                className="flex-shrink-0 ml-2 p-1 hover:bg-location-secondary rounded-md transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Distance Range Selector */}
          <div className="px-4 pb-3">
            <div className="relative">
              <button
                onClick={() => setIsDistanceDropdownOpen(!isDistanceDropdownOpen)}
                className="w-full flex items-center justify-between bg-gradient-to-r from-location-secondary to-location-secondary/50 rounded-lg p-3 hover:from-location-secondary/80 hover:to-location-secondary/30 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <Navigation className="w-4 h-4 text-location-primary" />
                  <span className="text-sm font-medium text-location-primary">Search Range</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-location-primary">
                    {selectedDistance} km
                  </span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-location-primary transition-transform duration-200",
                    isDistanceDropdownOpen && "rotate-180"
                  )} />
                </div>
              </button>

              {/* Distance Dropdown */}
              {isDistanceDropdownOpen && (
                <div
                  ref={distanceDropdownRef}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-location-border rounded-lg shadow-xl shadow-location-shadow/20 z-[60] overflow-hidden"
                >
                  {DISTANCE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleDistanceSelect(option.value)}
                      className={cn(
                        "w-full text-left p-3 hover:bg-location-secondary/50 transition-colors border-b border-location-border/30 last:border-b-0",
                        selectedDistance === option.value && "bg-location-secondary text-location-primary font-medium"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{option.label}</span>
                        {selectedDistance === option.value && (
                          <div className="w-2 h-2 bg-location-primary rounded-full" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Distance Display */}
          {selectedLocation?.distance && (
            <div className="px-4 pb-3">
              <div className="flex items-center justify-between bg-gradient-to-r from-location-accent/10 to-location-accent/5 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-location-accent" />
                  <span className="text-sm font-medium text-location-accent">Distance to Location</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-location-accent">
                    {selectedLocation.distance.toFixed(1)}
                  </span>
                  <span className="text-sm text-location-accent/70">km</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-location-surface border border-location-border rounded-xl shadow-xl shadow-location-shadow/20 z-50 overflow-hidden"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-location-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleLocationSelect(result)}
                  className="w-full text-left p-4 hover:bg-location-secondary/50 transition-colors border-b border-location-border/50 last:border-b-0 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-location-primary/10 rounded-md group-hover:bg-location-primary/20 transition-colors">
                        <MapPin className="w-4 h-4 text-location-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-foreground">{result.name}</div>
                        <div className="text-xs text-muted-foreground">{result.address}</div>
                      </div>
                    </div>
                    {result.distance && (
                      <div className="text-right">
                        <div className="text-sm font-semibold text-location-primary">
                          {result.distance.toFixed(1)} km
                        </div>
                        <div className="text-xs text-muted-foreground">away</div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <MapPin className="w-8 h-8 text-muted-foreground/50" />
                <span className="text-sm text-muted-foreground">No locations found</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;