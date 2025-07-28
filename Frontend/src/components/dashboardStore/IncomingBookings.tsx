import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';

const IncomingBookings = () => {
  const [bookings] = useState([
    {
      id: 1,
      item: 'Kamera Canon EOS R6',
      renter: 'John Doe',
      phone: '081234567890',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      duration: '3 hari',
      totalPrice: 450000,
      status: 'Pending',
      message: 'Butuh untuk acara wedding'
    },
    {
      id: 2,
      item: 'Drone DJI Mini 3',
      renter: 'Jane Smith',
      phone: '081234567891',
      startDate: '2024-01-18',
      endDate: '2024-01-20',
      duration: '2 hari',
      totalPrice: 400000,
      status: 'Approved',
      message: 'Untuk dokumentasi event'
    },
    {
      id: 3,
      item: 'Laptop MacBook Pro',
      renter: 'Mike Johnson',
      phone: '081234567892',
      startDate: '2024-01-25',
      endDate: '2024-01-30',
      duration: '5 hari',
      totalPrice: 1500000,
      status: 'Pending',
      message: 'Untuk presentasi klien'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      'Pending': 'outline',
      'Approved': 'default',
      'Rejected': 'destructive',
      'Completed': 'secondary'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Booking Masuk</h1>
          <p className="text-muted-foreground">Kelola semua permintaan booking barang Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{bookings.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {bookings.filter(booking => booking.status === 'Pending').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {bookings.filter(booking => booking.status === 'Approved').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              Rp {bookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Barang</TableHead>
                <TableHead>Penyewa</TableHead>
                <TableHead>Kontak</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Durasi</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.item}</TableCell>
                  <TableCell>{booking.renter}</TableCell>
                  <TableCell>{booking.phone}</TableCell>
                  <TableCell>
                    {booking.startDate} - {booking.endDate}
                  </TableCell>
                  <TableCell>{booking.duration}</TableCell>
                  <TableCell>Rp {booking.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {booking.status === 'Pending' && (
                        <>
                          <Button variant="outline" size="sm" className="text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default IncomingBookings;