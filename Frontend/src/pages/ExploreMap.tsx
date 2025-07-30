import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import { Search, MapPin, Star, Navigation, Store, Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';
import 'leaflet/dist/leaflet.css';

// Mock store data
const mockStores = [
  {
    id: 1,
    name: 'ElektroMart Jakarta',
    location: { lat: -6.2088, lng: 106.8456 },
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    rating: 4.5,
    itemCount: 25,
    distance: 1.2,
    category: 'Elektronik'
  },
  {
    id: 2,
    name: 'Outdoor Adventure',
    location: { lat: -6.2186, lng: 106.8329 },
    address: 'Jl. Thamrin No. 456, Jakarta Pusat',
    rating: 4.3,
    itemCount: 18,
    distance: 2.1,
    category: 'Outdoor'
  },
  {
    id: 3,
    name: 'Gaming Zone Pro',
    location: { lat: -6.1944, lng: 106.8229 },
    address: 'Jl. Menteng No. 789, Jakarta Pusat',
    rating: 4.7,
    itemCount: 32,
    distance: 1.8,
    category: 'Gaming'
  },
  {
    id: 4,
    name: 'SportCenter',
    location: { lat: -6.2297, lng: 106.8224 },
    address: 'Jl. Gatot Subroto No. 101, Jakarta Selatan',
    rating: 4.2,
    itemCount: 22,
    distance: 3.5,
    category: 'Olahraga'
  },
  {
    id: 5,
    name: 'Vehicle Hub',
    location: { lat: -6.1888, lng: 106.8650 },
    address: 'Jl. Casablanca No. 234, Jakarta Timur',
    rating: 4.4,
    itemCount: 15,
    distance: 4.2,
    category: 'Kendaraan'
  }
];

// Custom map icons
const createStoreIcon = (category: string) => {
  const colors: { [key: string]: string } = {
    'Elektronik': '#3b82f6',
    'Outdoor': '#10b981',
    'Gaming': '#8b5cf6',
    'Olahraga': '#f59e0b',
    'Kendaraan': '#ef4444'
  };
  
  return divIcon({
    html: `<div style="background-color: ${colors[category] || '#6b7280'}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
             <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
               <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.09-.21 2.16-.56 3.16-1.01C17.16 26.44 21 21.99 21 17V7l-9-5z"/>
             </svg>
           </div>`,
    className: 'store-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const userLocationIcon = divIcon({
  html: `<div style="background-color: #2563eb; width: 20px; height: 20px; border-radius: 50%; border: 4px solid white; box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);"></div>`,
  className: 'user-location-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

interface MapControllerProps {
  center: [number, number];
  zoom: number;
}

const MapController = ({ center, zoom }: MapControllerProps) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const ExploreMap = () => {
  const isMobile = useIsMobile();
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchRadius, setSearchRadius] = useState([5]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStores, setFilteredStores] = useState(mockStores);
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [showMobileList, setShowMobileList] = useState(false);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Default to Jakarta center if location access denied
          setUserLocation({ lat: -6.2088, lng: 106.8456 });
        }
      );
    } else {
      setUserLocation({ lat: -6.2088, lng: 106.8456 });
    }
  }, []);

  // Filter stores based on search and radius
  useEffect(() => {
    let filtered = mockStores;
    
    if (searchQuery) {
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filtered = filtered.filter(store => store.distance <= searchRadius[0]);
    
    setFilteredStores(filtered);
  }, [searchQuery, searchRadius]);

  const handleStoreClick = (storeId: number) => {
    setSelectedStore(storeId);
  };

  if (!userLocation) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Navigation className="h-12 w-12 mx-auto mb-4 animate-pulse text-primary" />
            <p className="text-lg">Mencari lokasi Anda...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="h-screen flex overflow-hidden">
        {/* Sidebar - Desktop */}
        {!isMobile && (
          <div className="w-80 bg-background border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <h1 className="text-xl font-bold mb-4">Jelajahi Toko</h1>
              
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari toko atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Radius Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Radius Pencarian</span>
                  <span className="font-medium">{searchRadius[0]} km</span>
                </div>
                <Slider
                  value={searchRadius}
                  onValueChange={setSearchRadius}
                  max={15}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Store List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">
                  {filteredStores.length} toko ditemukan
                </span>
              </div>
              
              {filteredStores.map((store) => (
                <Card 
                  key={store.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedStore === store.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleStoreClick(store.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{store.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {store.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{store.address}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{store.rating}</span>
                        </div>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{store.itemCount} barang</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{store.distance} km</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="flex-1 relative">
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={13}
            className="h-full w-full"
            zoomControl={false}
          >
            <MapController center={[userLocation.lat, userLocation.lng]} zoom={13} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* User location */}
            <Marker 
              position={[userLocation.lat, userLocation.lng]} 
              icon={userLocationIcon}
            >
              <Popup>
                <div className="text-center">
                  <strong>Lokasi Anda</strong>
                </div>
              </Popup>
            </Marker>

            {/* Search radius circle */}
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={searchRadius[0] * 1000}
              pathOptions={{
                color: '#2563eb',
                fillColor: '#2563eb',
                fillOpacity: 0.1,
                weight: 2
              }}
            />

            {/* Store markers */}
            {filteredStores.map((store) => (
              <Marker
                key={store.id}
                position={[store.location.lat, store.location.lng]}
                icon={createStoreIcon(store.category)}
                eventHandlers={{
                  click: () => handleStoreClick(store.id)
                }}
              >
                <Popup>
                  <div className="w-48">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{store.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {store.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{store.address}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{store.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{store.itemCount} barang</span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{store.distance} km</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      <Store className="h-4 w-4 mr-2" />
                      Lihat Toko
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Mobile Controls */}
          {isMobile && (
            <>
              {/* Top Search Bar - Mobile */}
              <div className="absolute top-4 left-4 right-4 z-[1000]">
                <Card>
                  <CardContent className="p-3">
                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Cari toko atau kategori..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Radius: {searchRadius[0]} km</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowMobileList(!showMobileList)}
                        >
                          <Filter className="h-4 w-4 mr-1" />
                          {filteredStores.length} toko
                        </Button>
                      </div>
                      <Slider
                        value={searchRadius}
                        onValueChange={setSearchRadius}
                        max={15}
                        min={1}
                        step={0.5}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mobile Store List */}
              {showMobileList && (
                <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-background border-t border-border max-h-64 overflow-y-auto">
                  <div className="p-4 space-y-3">
                    {filteredStores.map((store) => (
                      <Card 
                        key={store.id} 
                        className={`cursor-pointer transition-all ${
                          selectedStore === store.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => {
                          handleStoreClick(store.id);
                          setShowMobileList(false);
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-sm">{store.name}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {store.category}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>{store.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{store.itemCount} barang</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{store.distance} km</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ExploreMap;