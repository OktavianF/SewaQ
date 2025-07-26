import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, Star, TrendingUp, LogOut, User, BarChart3, MessageSquare, Inbox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MyItems from '@/components/dashboardStore/MyItems';
import IncomingBookings from '@/components/dashboardStore/IncomingBookings';
import Reviews from '@/components/dashboardStore/Reviews';
import Statistics from '@/components/dashboardStore/Statistics';
import StoreProfile from '@/components/dashboardStore/StoreProfile';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('items');

  const menuItems = [
    { id: 'items', label: 'Barang Saya', icon: Package },
    { id: 'bookings', label: 'Booking Masuk', icon: Inbox },
    { id: 'reviews', label: 'Ulasan', icon: MessageSquare },
    { id: 'statistics', label: 'Statistik', icon: BarChart3 },
    { id: 'profile', label: 'Profil Toko', icon: User },
  ];

  const summaryCards = [
    { title: 'Jumlah Barang', value: '12', icon: Package, color: 'text-blue-600' },
    { title: 'Booking Aktif', value: '5', icon: Calendar, color: 'text-green-600' },
    { title: 'Rating Toko', value: '4.8', icon: Star, color: 'text-yellow-600' },
    { title: 'Total Penyewaan', value: '48', icon: TrendingUp, color: 'text-purple-600' }
  ];

  const recentBookings = [
    { item: 'Kamera Canon EOS R6', renter: 'John Doe', date: '2024-01-15', status: 'Aktif' },
    { item: 'Drone DJI Mini 3', renter: 'Jane Smith', date: '2024-01-14', status: 'Selesai' },
    { item: 'Laptop MacBook Pro', renter: 'Mike Johnson', date: '2024-01-13', status: 'Pending' },
    { item: 'Tripod Manfrotto', renter: 'Sarah Wilson', date: '2024-01-12', status: 'Aktif' }
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
      'Aktif': 'default',
      'Selesai': 'secondary',
      'Pending': 'outline'
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar className="w-64">
          <SidebarContent>
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-foreground">Toko Rental Ku</h2>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
            
            <SidebarMenu className="px-4 py-6">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full justify-start ${
                      activeMenu === item.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
              <SidebarMenuItem className="mt-8">
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="w-full justify-start text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          <header className="h-16 border-b bg-background flex items-center px-6">
            <SidebarTrigger />
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            </div>
          </header>

          <div className="p-6">
            {activeMenu === 'dashboard' && (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {summaryCards.map((card, index) => (
                    <Card key={index} className="shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {card.title}
                        </CardTitle>
                        <card.icon className={`h-4 w-4 ${card.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-foreground">{card.value}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Bookings Table */}
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">Booking Terbaru</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Barang</TableHead>
                          <TableHead>Penyewa</TableHead>
                          <TableHead>Tanggal</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentBookings.map((booking, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{booking.item}</TableCell>
                            <TableCell>{booking.renter}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
            
            {activeMenu === 'items' && <MyItems />}
            {activeMenu === 'bookings' && <IncomingBookings />}
            {activeMenu === 'reviews' && <Reviews />}
            {activeMenu === 'statistics' && <Statistics />}
            {activeMenu === 'profile' && <StoreProfile />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;