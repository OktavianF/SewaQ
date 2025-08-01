import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, MapPin, MessageSquare, Calendar, DollarSign, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import RentalCard from './RentalCard';

const Penyewaan = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [rentals] = useState([
    {
      id: 1,
      itemName: 'Kamera Canon EOS R5',
      itemImage: '',
      itemCategory: 'Fotografi',
      itemDescription: 'Kamera mirrorless full frame dengan resolusi tinggi',
      owner: 'Toko Cahaya',
      ownerWhatsapp: '+6281234567890',
      storeLink: '/store/toko-cahaya',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      pricePerDay: 150000,
      totalPrice: 450000,
      duration: 3,
      status: 'Selesai',
      pickupAddress: 'Jl. Sudirman No. 123, Jakarta Pusat',
      mapLocation: { lat: -6.2088, lng: 106.8456 },
      hasReviewed: false
    },
    {
      id: 2,
      itemName: 'Drone DJI Mini 3',
      itemImage: '',
      itemCategory: 'Drone',
      itemDescription: 'Drone compact dengan kamera 4K',
      owner: 'AeroRent',
      ownerWhatsapp: '+6281234567891',
      storeLink: '/store/aerorent',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      pricePerDay: 200000,
      totalPrice: 400000,
      duration: 2,
      status: 'Disetujui',
      pickupAddress: 'Jl. Thamrin No. 456, Jakarta Pusat',
      mapLocation: { lat: -6.1944, lng: 106.8229 },
      hasReviewed: false
    }
  ]);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ''
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Menunggu': { variant: 'outline' as const, className: 'text-yellow-600' },
      'Disetujui': { variant: 'secondary' as const, className: 'text-blue-600' },
      'Ditolak': { variant: 'destructive' as const, className: '' },
      'Selesai': { variant: 'default' as const, className: '' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['Menunggu'];
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubmitReview = (rentalId: number) => {
    if (reviewData.rating === 0) {
      toast({
        title: "Error",
        description: "Silakan berikan rating terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Review berhasil dikirim",
      description: "Terima kasih atas review Anda!",
    });

    setReviewData({ rating: 0, comment: '' });
  };

  const RentalDetailModal = ({ rental }: { rental: typeof rentals[0] }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Lihat Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] mx-auto">
        <DialogHeader>
          <DialogTitle>Detail Penyewaan</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informasi Barang */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informasi Barang
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{rental.itemName}</h3>
                  <Badge variant="secondary" className="mb-2">{rental.itemCategory}</Badge>
                  <p className="text-sm text-muted-foreground">{rental.itemDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informasi Pihak Terkait */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Pemilik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback>{rental.owner.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{rental.owner}</h4>
                    <p className="text-sm text-muted-foreground">{rental.ownerWhatsapp}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm">
                    Lihat Toko
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rincian Transaksi */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Rincian Transaksi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Tanggal Booking</Label>
                  <p className="text-sm">{formatDate(rental.startDate)} - {formatDate(rental.endDate)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Durasi</Label>
                  <p className="text-sm">{rental.duration} hari</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Harga per Hari</Label>
                  <p className="text-sm">{formatCurrency(rental.pricePerDay)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Total Harga</Label>
                  <p className="text-sm font-semibold">{formatCurrency(rental.totalPrice)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(rental.status)}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lokasi & Metode Pembayaran */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi & Pembayaran
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Alamat Pickup</Label>
                  <p className="text-sm">{rental.pickupAddress}</p>
                </div>
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map akan ditampilkan di sini</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Metode Pembayaran</Label>
                  <p className="text-sm">COD (Cash on Delivery)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review & Ulasan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Review & Ulasan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!rental.hasReviewed && rental.status === 'Selesai' ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Rating</Label>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= reviewData.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="comment">Komentar</Label>
                    <Textarea
                      id="comment"
                      value={reviewData.comment}
                      onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                      placeholder="Berikan ulasan Anda..."
                      rows={3}
                    />
                  </div>
                  <Button onClick={() => handleSubmitReview(rental.id)}>
                    Kirim Review
                  </Button>
                </div>
              ) : rental.hasReviewed ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Pelayanan sangat baik dan barang sesuai deskripsi!"
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Review akan tersedia setelah penyewaan selesai.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Penyewaan</CardTitle>
      </CardHeader>
      <CardContent>
        {isMobile ? (
          <div className="space-y-4">
            {rentals.map((rental) => (
              <RentalCard
                key={rental.id}
                rental={rental}
                formatDate={formatDate}
                formatCurrency={formatCurrency}
                getStatusBadge={getStatusBadge}
              />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Barang</TableHead>
                  <TableHead>Pemilik</TableHead>
                  <TableHead>Tanggal Sewa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentals.map((rental) => (
                  <TableRow key={rental.id}>
                    <TableCell className="font-medium">{rental.itemName}</TableCell>
                    <TableCell>{rental.owner}</TableCell>
                    <TableCell>
                      {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                    </TableCell>
                    <TableCell>{getStatusBadge(rental.status)}</TableCell>
                    <TableCell>
                      <RentalDetailModal rental={rental} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Penyewaan;