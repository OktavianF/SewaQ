import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, Filter, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data untuk demonstrasi
const mockItems = [
  {
    id: 1,
    title: 'Kamera DSLR Canon EOS 80D',
    description: 'Kamera profesional untuk fotografi',
    category: 'Elektronik',
    pricePerDay: 75000,
    rating: 4.8,
    reviewCount: 24,
    distance: 2.3,
    location: 'Kemang, Jakarta Selatan',
    owner: 'Ahmad Rental',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
    available: true
  },
  {
    id: 2,
    title: 'Tenda Camping 4 Orang',
    description: 'Tenda berkualitas untuk camping keluarga',
    category: 'Outdoor',
    pricePerDay: 50000,
    rating: 4.6,
    reviewCount: 18,
    distance: 4.7,
    location: 'Senayan, Jakarta Pusat',
    owner: 'Outdoor Gear',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
    available: true
  },
  {
    id: 3,
    title: 'PlayStation 5 + 2 Controller',
    description: 'Konsol gaming terbaru dengan 2 controller',
    category: 'Gaming',
    pricePerDay: 100000,
    rating: 4.9,
    reviewCount: 31,
    distance: 6.2,
    location: 'Blok M, Jakarta Selatan',
    owner: 'Game Station',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400',
    available: false
  },
  {
    id: 4,
    title: 'Proyektor Epson EH-TW650',
    description: 'Proyektor HD untuk presentasi dan hiburan',
    category: 'Elektronik',
    pricePerDay: 125000,
    rating: 4.7,
    reviewCount: 15,
    distance: 8.1,
    location: 'Menteng, Jakarta Pusat',
    owner: 'Tech Rental Pro',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    available: true
  }
];

const categories = ['Semua', 'Elektronik', 'Outdoor', 'Gaming', 'Kendaraan', 'Olahraga'];

const Items = () => {
  const [items, setItems] = useState(mockItems);
  const [filteredItems, setFilteredItems] = useState(mockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [minRating, setMinRating] = useState(0);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<string>('loading');

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
          toast({
            title: "Lokasi berhasil dideteksi",
            description: "Menampilkan barang dalam radius 10km dari lokasi Anda"
          });
        },
        (error) => {
          setLocationPermission('denied');
          toast({
            title: "Gagal mengakses lokasi",
            description: "Menampilkan semua barang yang tersedia",
            variant: "destructive"
          });
        }
      );
    } else {
      setLocationPermission('not-supported');
    }
  }, []);

  // Filter items based on criteria
  useEffect(() => {
    let filtered = items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchesPrice = item.pricePerDay >= priceRange[0] && item.pricePerDay <= priceRange[1];
      const matchesRating = item.rating >= minRating;
      const withinRadius = userLocation ? item.distance <= 10 : true;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && withinRadius;
    });

    setFilteredItems(filtered);
  }, [items, searchQuery, selectedCategory, priceRange, minRating, userLocation]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Jelajahi Barang di Sekitarmu</h1>
          <p className="text-muted-foreground">
            {userLocation 
              ? `Menampilkan barang dalam radius 10km dari lokasi Anda`
              : 'Aktifkan lokasi untuk melihat barang terdekat'
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter */}
          <div className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-4 w-4" />
                  <h3 className="font-semibold">Filter</h3>
                </div>

                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari barang..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Category Filter */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Kategori</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="my-4" />

                {/* Price Range */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">
                    Harga per Hari: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200000}
                    min={0}
                    step={25000}
                    className="mt-2"
                  />
                </div>

                <Separator className="my-4" />

                {/* Rating Filter */}
                <div className="mb-4">
                  <label className="text-sm font-medium mb-2 block">Rating Minimum</label>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Semua Rating</SelectItem>
                      <SelectItem value="3">3+ ⭐</SelectItem>
                      <SelectItem value="4">4+ ⭐</SelectItem>
                      <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredItems.length} dari {items.length} barang
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <Link key={item.id} to={`/items/${item.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive">Tidak Tersedia</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{item.distance}km • {item.location}</span>
                      </div>

                      <Badge variant="secondary" className="mb-3">{item.category}</Badge>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <div className="w-full">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-bold text-primary">{formatPrice(item.pricePerDay)}</p>
                            <p className="text-sm text-muted-foreground">per hari</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Lihat Detail
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Tidak ada barang yang sesuai dengan filter Anda</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setPriceRange([0, 200000]);
                  setMinRating(0);
                }}>
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Items; 