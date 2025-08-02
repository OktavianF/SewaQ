import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Shield, 
  Clock, 
  CreditCard,
  Info,
  Map
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import StoreLocationMap from '@/components/StoreLocationMap';

import { mockItemDetails } from '../data';
import { ItemDetails } from '../types';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    if (id) {
      const itemData = mockItemDetails[parseInt(id) as keyof typeof mockItemDetails];
      if (itemData) {
        setItem(itemData);
      } else {
        navigate('/items');
        toast({
          title: "Barang tidak ditemukan",
          description: "Barang yang Anda cari tidak tersedia",
          variant: "destructive"
        });
      }
    }
  }, [id, navigate]);

  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-muted rounded mb-4"></div>
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleBooking = () => {
    navigate(`/items/${id}/checkout`);
  };

  const isDateDisabled = (date: Date) => {
    return item.availability.unavailableDates.some((disabledDate: Date) => 
      date.toDateString() === disabledDate.toDateString()
    ) || date < new Date();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/items')}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Kembali ke Daftar Barang
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img 
                src={item.images[currentImageIndex]} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              
              {item.images.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {item.images.map((_: any, index: number) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail navigation */}
            {item.images.length > 1 && (
              <div className="flex space-x-2">
                {item.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${item.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{item.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-sm text-muted-foreground">({item.reviewCount} ulasan)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
              
              <div className="flex items-center gap-1 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{item.distance}km • {item.owner.location}</span>
              </div>

              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Harga Sewa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">{formatPrice(item.pricing.perDay)}</p>
                    <p className="text-sm text-muted-foreground">per hari</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{formatPrice(item.pricing.per3Days)}</p>
                    <p className="text-sm text-muted-foreground">per 3 hari</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{formatPrice(item.pricing.perWeek)}</p>
                    <p className="text-sm text-muted-foreground">per minggu</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{formatPrice(item.pricing.per2Weeks)}</p>
                    <p className="text-sm text-muted-foreground">per 2 minggu</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-lg font-semibold">{formatPrice(item.pricing.perMonth)}</p>
                    <p className="text-sm text-muted-foreground">per bulan</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Pemilik
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar 
                    className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => navigate('/store/1')}
                  >
                    <AvatarImage src={item.owner.avatar} />
                    <AvatarFallback>{item.owner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 
                      className="font-semibold cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigate('/store/1')}
                    >
                      {item.owner.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{item.owner.rating} ({item.owner.reviewCount} ulasan)</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Bergabung sejak {item.owner.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Pembayaran dilakukan saat pengambilan barang (COD)</strong>
                <br />
                Silakan hubungi pemilik untuk mengatur waktu dan tempat pengambilan.
              </AlertDescription>
            </Alert>

            {/* Book Now Button */}
            <Button 
              className="w-full" 
              size="lg"
              onClick={handleBooking}
              disabled={!item.available}
            >
              {item.available ? 'Booking Sekarang' : 'Tidak Tersedia'}
            </Button>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Spesifikasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {item.specifications.map((spec: any, index: number) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rental Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Syarat Sewa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {item.rentalTerms.map((term: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Availability Calendar & Store Location */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Availability Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Kalender Ketersediaan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={isDateDisabled}
                  className="pointer-events-auto"
                />
              </div>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded"></div>
                  <span>Tidak tersedia</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded"></div>
                  <span>Tersedia</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Location Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Lokasi Toko
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <StoreLocationMap
                  lat={item.storeLocation.lat}
                  lng={item.storeLocation.lng}
                  address={item.storeLocation.address}
                  storeName={item.owner.name}
                />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{item.storeLocation.address}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail; 