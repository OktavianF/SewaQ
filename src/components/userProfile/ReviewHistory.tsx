import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare, Clock, CheckCircle } from 'lucide-react';

const ReviewHistory = () => {
  const [reviews] = useState([
    {
      id: 1,
      reviewer: 'Ahmad Suharto',
      reviewerAvatar: '',
      item: 'Kamera Canon EOS R5',
      rating: 5,
      comment: 'Penyewa yang sangat baik! Mengembalikan barang dalam kondisi sempurna dan tepat waktu.',
      date: '2024-01-15',
      replied: false
    },
    {
      id: 2,
      reviewer: 'Siti Nurhaliza',
      reviewerAvatar: '',
      item: 'Drone DJI Mini 3',
      rating: 4,
      comment: 'Komunikasi lancar dan bertanggung jawab. Recommended!',
      date: '2024-01-10',
      replied: true
    },
    {
      id: 3,
      reviewer: 'Budi Santoso',
      reviewerAvatar: '',
      item: 'Laptop Gaming ASUS ROG',
      rating: 5,
      comment: 'Sangat puas dengan pelayanan. Penyewa yang dapat dipercaya.',
      date: '2024-01-08',
      replied: false
    }
  ]);

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  const unrepliedReviews = reviews.filter(review => !review.replied).length;

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{totalReviews}</p>
                <p className="text-sm text-muted-foreground">Total Review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-muted-foreground">Rata-rata Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{unrepliedReviews}</p>
                <p className="text-sm text-muted-foreground">Belum Dibalas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={review.reviewerAvatar} />
                    <AvatarFallback>{review.reviewer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{review.reviewer}</h4>
                        <p className="text-sm text-muted-foreground">{review.item}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {review.replied ? (
                          <Badge variant="secondary" className="text-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Sudah Dibalas
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-orange-600">
                            <Clock className="h-3 w-3 mr-1" />
                            Belum Dibalas
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-2">
                      {getRatingStars(review.rating)}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                    
                    {!review.replied && (
                      <Button variant="outline" size="sm">
                        Balas Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewHistory;