import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Star, 
  ChevronLeft, 
  User, 
  Calendar as CalendarIcon,
  CreditCard,
  Info,
  Phone,
  FileText
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock data untuk detail barang (same as ItemDetail)
const mockItemDetails = {
  1: {
    id: 1,
    title: 'Kamera DSLR Canon EOS 80D',
    description: 'Kamera DSLR profesional Canon EOS 80D dengan sensor APS-C 24.2MP.',
    category: 'Elektronik',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'
    ],
    pricing: {
      perDay: 75000,
    },
    owner: {
      name: 'Ahmad Rental',
      rating: 4.8,
      reviewCount: 24,
      location: 'Kemang, Jakarta Selatan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      address: 'Jl. Kemang Raya No. 123, Kemang, Jakarta Selatan 12560'
    },
    rating: 4.8,
    reviewCount: 24,
    distance: 2.3,
    available: true,
    availability: {
      unavailableDates: [
        new Date(2024, 11, 25),
        new Date(2024, 11, 26),
        new Date(2025, 0, 1),
        new Date(2025, 0, 15),
        new Date(2025, 0, 16)
      ]
    }
  }
};

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [renterName, setRenterName] = useState('John Doe'); // Mock autofill
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');

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

  const isDateDisabled = (date: Date) => {
    return item.availability.unavailableDates.some((disabledDate: Date) => 
      date.toDateString() === disabledDate.toDateString()
    ) || date < new Date();
  };

  const calculateDays = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays || 1;
    }
    return 1;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    return days * item.pricing.perDay;
  };

  const handleBooking = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Tanggal belum dipilih",
        description: "Silakan pilih tanggal mulai dan selesai sewa",
        variant: "destructive"
      });
      return;
    }

    if (!phoneNumber.trim()) {
      toast({
        title: "Nomor HP belum diisi",
        description: "Silakan isi nomor HP untuk konfirmasi booking",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking berhasil!",
      description: "Booking Anda telah berhasil dibuat. Silakan hubungi penyedia untuk konfirmasi."
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate(`/items/${id}`)}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Kembali ke Detail Barang
        </Button>

        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Item Summary & Rental Details */}
          <div className="space-y-6">
            {/* Item Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Barang</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.owner.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{item.rating}</span>
                        <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rental Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Detail Sewa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Tanggal Mulai</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP", { locale: idLocale }) : <span>Pilih tanggal</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          disabled={isDateDisabled}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="end-date">Tanggal Selesai</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP", { locale: idLocale }) : <span>Pilih tanggal</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          disabled={(date) => isDateDisabled(date) || (startDate && date <= startDate)}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Durasi</span>
                    <span className="font-medium">{calculateDays()} hari</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Harga per hari</span>
                    <span className="font-medium">{formatPrice(item.pricing.perDay)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Harga</span>
                    <span className="text-primary">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Lokasi Pengambilan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{item.owner.address}</p>
                  <p className="text-sm text-muted-foreground">
                    Estimasi jarak: {item.distance}km dari lokasi Anda
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Payment Method & Renter Info */}
          <div className="space-y-6">
            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Bayar di Tempat (COD)</strong>
                    <br />
                    Pembayaran dilakukan saat pengambilan barang
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Renter Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informasi Penyewa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="renter-name">Nama Penyewa</Label>
                  <Input
                    id="renter-name"
                    value={renterName}
                    onChange={(e) => setRenterName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone-number">Nomor WhatsApp/HP *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone-number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Catatan Tambahan (Opsional)</Label>
                  <div className="relative mt-1">
                    <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tambahkan catatan atau permintaan khusus..."
                      className="pl-10 min-h-[80px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleBooking}
              >
                Booking Sekarang
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(`/items/${id}`)}
              >
                Kembali ke Detail Barang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;