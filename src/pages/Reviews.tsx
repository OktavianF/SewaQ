import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare } from 'lucide-react';

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      item: 'Kamera Canon EOS R6',
      reviewer: 'John Doe',
      rating: 5,
      comment: 'Kamera dalam kondisi sangat baik, pemilik sangat responsif dan ramah. Highly recommended!',
      date: '2024-01-15',
      replied: true
    },
    {
      id: 2,
      item: 'Drone DJI Mini 3',
      reviewer: 'Jane Smith',
      rating: 4,
      comment: 'Drone berfungsi dengan baik, hanya saja baterai agak cepat habis. Overall good service.',
      date: '2024-01-10',
      replied: false
    },
    {
      id: 3,
      item: 'Laptop MacBook Pro',
      reviewer: 'Mike Johnson',
      rating: 5,
      comment: 'Perfect condition! Laptop sangat lancar untuk editing video. Terima kasih!',
      date: '2024-01-08',
      replied: true
    },
    {
      id: 4,
      item: 'Tripod Manfrotto',
      reviewer: 'Sarah Wilson',
      rating: 4,
      comment: 'Tripod kokoh dan mudah digunakan. Pengalaman rental yang menyenangkan.',
      date: '2024-01-05',
      replied: false
    }
  ]);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Ulasan & Rating</h1>
          <p className="text-muted-foreground">Lihat semua ulasan dari pelanggan Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Ulasan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{reviews.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rating Rata-rata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
              <div className="flex">
                {getRatingStars(Math.round(averageRating))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ulasan Positif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reviews.filter(review => review.rating >= 4).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Belum Dibalas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {reviews.filter(review => !review.replied).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{review.reviewer}</span>
                    <div className="flex">
                      {getRatingStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.item} • {review.date}</p>
                </div>
                <div className="flex gap-2">
                  {review.replied ? (
                    <Badge variant="default">Sudah Dibalas</Badge>
                  ) : (
                    <Badge variant="outline">Belum Dibalas</Badge>
                  )}
                </div>
              </div>
              
              <p className="text-foreground mb-4">{review.comment}</p>
              
              {!review.replied && (
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <MessageSquare className="h-4 w-4" />
                    Balas Ulasan
                  </button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;