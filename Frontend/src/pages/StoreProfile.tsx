import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Star, 
  ChevronLeft, 
  MessageCircle,
  Phone,
  Clock,
  Eye
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StoreLocationMap from '@/components/StoreLocationMap';
import { mockStores } from '@/data/stores';
import { mockItems } from '@/data/items';

// Extended store data for profile view
const extendedStoreData = {
  1: {
    ...mockStores[0],
    description: "Toko elektronik terpercaya dengan pengalaman lebih dari 5 tahun dalam menyewakan peralatan elektronik berkualitas. Melayani dengan sepenuh hati untuk kepuasan pelanggan.",
    phone: "+62 21 1234 5678",
    operatingHours: "08:00 - 20:00 WIB",
    rentalTerms: [
      "Deposit 20% dari harga sewa",
      "Pembayaran COD saat pengambilan",
      "Pengembalian maksimal 3 hari keterlambatan",
      "Gratis antar jemput radius 5km"
    ],
    reviews: [
      {
        id: 1,
        customerName: "A***d",
        date: "2024-01-15",
        rating: 5,
        comment: "Pelayanan sangat memuaskan, barang sesuai deskripsi dan kondisi excellent!"
      },
      {
        id: 2,
        customerName: "S***i",
        date: "2024-01-10",
        rating: 4,
        comment: "Proses sewa mudah dan cepat. Pemilik ramah dan responsif."
      },
      {
        id: 3,
        customerName: "D***o",
        date: "2024-01-05",
        rating: 5,
        comment: "Recommended! Harga bersaing dan kualitas barang terjamin."
      }
    ]
  }
};

const StoreProfile = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState<any>(null);
  const [storeItems, setStoreItems] = useState<any[]>([]);

  useEffect(() => {
    if (storeId) {
      const storeData = extendedStoreData[parseInt(storeId) as keyof typeof extendedStoreData];
      if (storeData) {
        setStore(storeData);
        // Filter items that belong to this store (simplified - in real app would be from API)
        const items = mockItems.filter(item => item.id <= 2); // Mock filtering
        setStoreItems(items);
      } else {
        navigate('/items');
        toast({
          title: "Toko tidak ditemukan",
          description: "Toko yang Anda cari tidak tersedia",
          variant: "destructive"
        });
      }
    }
  }, [storeId, navigate]);

  if (!store) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleContactStore = () => {
    const message = `Halo, saya tertarik dengan barang sewaan di toko ${store.name}. Bisakah saya mendapat informasi lebih lanjut?`;
    const whatsappUrl = `https://wa.me/${store.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        {/* Store Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-20 w-20 mx-auto sm:mx-0">
                <AvatarImage src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200`} />
                <AvatarFallback className="text-2xl">{store.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{store.name}</h1>
                  <Badge variant="secondary">{store.category}</Badge>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                  {renderStars(store.rating)}
                  <span className="ml-2 font-medium">{store.rating}</span>
                  <span className="text-muted-foreground">({store.itemCount} barang)</span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{store.address} • {store.distance}km dari Anda</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleContactStore} className="flex-1 sm:flex-none">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Hubungi Toko
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{extendedStoreData[1].operatingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Store Description */}
            <Card>
              <CardHeader>
                <CardTitle>Tentang Toko</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {store.description}
                </p>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="font-semibold mb-3">Syarat Umum Penyewaan</h4>
                  <ul className="space-y-2">
                    {extendedStoreData[1].rentalTerms.map((term, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Store Items */}
            <Card>
              <CardHeader>
                <CardTitle>Barang yang Disewakan ({storeItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {storeItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(item.pricePerDay)}/hari
                        </span>
                        <Badge variant={item.available ? "default" : "secondary"}>
                          {item.available ? "Tersedia" : "Disewa"}
                        </Badge>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => navigate(`/items/${item.id}`)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Ulasan Penyewa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {extendedStoreData[1].reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{review.customerName}</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.date).toLocaleDateString('id-ID')}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Store Location */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Lokasi Toko
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full mb-4">
                  <StoreLocationMap
                    lat={store.location.lat}
                    lng={store.location.lng}
                    address={store.address}
                    storeName={store.name}
                  />
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{extendedStoreData[1].operatingHours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StoreProfile;