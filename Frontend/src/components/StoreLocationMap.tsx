import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const storeIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface StoreLocationMapProps {
  lat: number;
  lng: number;
  address: string;
  storeName: string;
}

const StoreLocationMap: React.FC<StoreLocationMapProps> = ({ 
  lat, 
  lng, 
  address, 
  storeName 
}) => {
  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        className="h-full w-full rounded-lg"
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={storeIcon}>
          <Popup>
            <div className="text-center p-2">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold">{storeName}</span>
              </div>
              <p className="text-sm text-muted-foreground">{address}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StoreLocationMap;