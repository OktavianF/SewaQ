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
    image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    image: 'https://images.unsplash.com/photo-1571687949921-1306bfb24b72?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGxheXN0YXRpb258ZW58MHx8MHx8fDA%3D',
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
    image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardContent className="p-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2 border-sewaqa-green/30 hover:bg-sewaqa-green-lighter"
                  onClick={() => {
                    const filterCard = document.getElementById('filter-card');
                    const isHidden = filterCard?.classList.contains('hidden');
                    if (isHidden) {
                      filterCard?.classList.remove('hidden');
                    } else {
                      filterCard?.classList.add('hidden');
                    }
                  }}
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter & Pencarian</span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Filter */}
          <div className="lg:w-80 space-y-6">
            <Card 
              id="filter-card" 
              className="hidden lg:block bg-gradient-card border-border/50 shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                  <div className="p-2 rounded-lg bg-sewaqa-green-lighter">
                    <Filter className="h-5 w-5 text-sewaqa-green" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">Filter Pencarian</h3>
                </div>

                {/* Search */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground block">Pencarian</label>
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-sewaqa-green transition-colors" />
                    <Input
                      placeholder="Cari barang..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 border-border/50 focus:border-sewaqa-green focus:ring-sewaqa-green/20 bg-background/50 transition-all"
                    />
                  </div>
                </div>

                <Separator className="bg-border/30" />

                {/* Category Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground block">Kategori</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-border/50 focus:border-sewaqa-green focus:ring-sewaqa-green/20 bg-background/50">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border/50 shadow-medium">
                      {categories.map(category => (
                        <SelectItem 
                          key={category} 
                          value={category}
                          className="hover:bg-sewaqa-green-lighter focus:bg-sewaqa-green-lighter"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-border/30" />

                {/* Price Range */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-foreground">Rentang Harga</label>
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      per hari
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-sewaqa-green">{formatPrice(priceRange[0])}</span>
                      <span className="font-medium text-sewaqa-green">{formatPrice(priceRange[1])}</span>
                    </div>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={200000}
                      min={0}
                      step={25000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Rp 0</span>
                      <span>Rp 200K</span>
                    </div>
                  </div>
                </div>

                <Separator className="bg-border/30" />

                {/* Rating Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground block">Rating Minimum</label>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                    <SelectTrigger className="border-border/50 focus:border-sewaqa-green focus:ring-sewaqa-green/20 bg-background/50">
                      <SelectValue placeholder="Pilih rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border/50 shadow-medium">
                      <SelectItem value="0" className="hover:bg-sewaqa-green-lighter focus:bg-sewaqa-green-lighter">
                        Semua Rating
                      </SelectItem>
                      <SelectItem value="3" className="hover:bg-sewaqa-green-lighter focus:bg-sewaqa-green-lighter">
                        <div className="flex items-center gap-2">
                          <span>3.0+</span>
                          <div className="flex">
                            {[1,2,3].map(i => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="4" className="hover:bg-sewaqa-green-lighter focus:bg-sewaqa-green-lighter">
                        <div className="flex items-center gap-2">
                          <span>4.0+</span>
                          <div className="flex">
                            {[1,2,3,4].map(i => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="4.5" className="hover:bg-sewaqa-green-lighter focus:bg-sewaqa-green-lighter">
                        <div className="flex items-center gap-2">
                          <span>4.5+</span>
                          <div className="flex">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Reset Button */}
                <div className="pt-4 border-t border-border/30">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-sewaqa-green/30 text-sewaqa-green hover:bg-sewaqa-green hover:text-primary-foreground transition-all"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('Semua');
                      setPriceRange([0, 200000]);
                      setMinRating(0);
                    }}
                  >
                    Reset Semua Filter
                  </Button>
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