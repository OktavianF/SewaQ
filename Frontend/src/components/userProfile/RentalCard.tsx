import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Package, Calendar, MapPin, MessageSquare, DollarSign, Star } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface RentalCardProps {
  rental: {
    id: number;
    itemName: string;
    itemCategory: string;
    itemDescription: string;
    owner: string;
    ownerWhatsapp: string;
    storeLink: string;
    startDate: string;
    endDate: string;
    pricePerDay: number;
    totalPrice: number;
    duration: number;
    status: string;
    pickupAddress: string;
    hasReviewed: boolean;
  };
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number) => string;
  getStatusBadge: (status: string) => React.ReactNode;
}

const RentalCard = ({ rental, formatDate, formatCurrency, getStatusBadge }: RentalCardProps) => {
  const { toast } = useToast();
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ''
  });

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

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{rental.itemName}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs">{rental.owner.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground truncate">{rental.owner}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                </span>
              </div>
              <div className="mt-2">
                {getStatusBadge(rental.status)}
              </div>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex-shrink-0">
                Detail
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] mx-auto">
              <DialogHeader>
                <DialogTitle>Detail Penyewaan</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Informasi Barang */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base">{rental.itemName}</h3>
                        <Badge variant="secondary" className="mb-2">{rental.itemCategory}</Badge>
                        <p className="text-sm text-muted-foreground">{rental.itemDescription}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Informasi Pemilik */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{rental.owner.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{rental.owner}</h4>
                          <p className="text-sm text-muted-foreground">{rental.ownerWhatsapp}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          Lihat Toko
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rincian Transaksi */}
                <Card>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      <div className="sm:col-span-2">
                        <Label className="text-sm font-medium">Status</Label>
                        <div className="mt-1">{getStatusBadge(rental.status)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lokasi */}
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Alamat Pickup</Label>
                        <p className="text-sm">{rental.pickupAddress}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Metode Pembayaran</Label>
                        <p className="text-sm">COD (Cash on Delivery)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Review Section */}
                {rental.status === 'Selesai' && !rental.hasReviewed && (
                  <Card>
                    <CardContent className="p-4">
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
                        <Button onClick={() => handleSubmitReview(rental.id)} className="w-full">
                          Kirim Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default RentalCard;