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

        {/* Combined Store Header & Description */}
        <Card className="mb-6 bg-gradient-to-br from-background to-muted/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-24 w-24 mx-auto sm:mx-0 ring-4 ring-primary/10">
                <AvatarImage src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200`} />
                <AvatarFallback className="text-2xl font-bold bg-primary/5">{store.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{store.name}</h1>
                  <Badge variant="secondary" className="text-sm px-3 py-1">{store.category}</Badge>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-2">
                  {renderStars(store.rating)}
                  <span className="ml-2 font-medium text-lg">{store.rating}</span>
                  <span className="text-muted-foreground">({store.itemCount} barang)</span>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start gap-1 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{store.address} • {store.distance}km dari Anda</span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4 text-sm sm:text-base">
                  {store.description}
                </p>
                
                <Separator className="my-4" />
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-3 text-sm">Syarat Umum Penyewaan</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {extendedStoreData[1].rentalTerms.map((term, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleContactStore} className="flex-1 sm:flex-none shadow-lg">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Hubungi Toko
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-md">
                    <Clock className="h-4 w-4" />
                    <span>{extendedStoreData[1].operatingHours}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Items - Full Width */}
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              Barang yang Disewakan 
              <Badge variant="outline" className="text-sm">{storeItems.length} item</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {storeItems.map((item) => (
                <div key={item.id} className="group border rounded-xl p-3 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-gradient-to-b from-background to-muted/20">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted/50">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2 text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                  
                  <div className="space-y-2 mb-3">
                    <div className="text-sm font-bold text-primary">
                      {formatPrice(item.pricePerDay)}<span className="text-xs font-normal text-muted-foreground">/hari</span>
                    </div>
                    <Badge 
                      variant={item.available ? "default" : "secondary"} 
                      className="text-xs px-2 py-0.5 w-full justify-center"
                    >
                      {item.available ? "Tersedia" : "Disewa"}
                    </Badge>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs h-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={() => navigate(`/items/${item.id}`)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Detail
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StoreProfile;