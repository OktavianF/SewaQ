import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Statistics = () => {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 2400000 },
    { month: 'Feb', revenue: 1800000 },
    { month: 'Mar', revenue: 3200000 },
    { month: 'Apr', revenue: 2800000 },
    { month: 'May', revenue: 4100000 },
    { month: 'Jun', revenue: 3800000 }
  ];

  const bookingTrends = [
    { month: 'Jan', bookings: 12 },
    { month: 'Feb', bookings: 8 },
    { month: 'Mar', bookings: 15 },
    { month: 'Apr', bookings: 13 },
    { month: 'May', bookings: 18 },
    { month: 'Jun', bookings: 16 }
  ];

  const categoryData = [
    { name: 'Kamera', value: 45, color: '#3b82f6' },
    { name: 'Elektronik', value: 30, color: '#10b981' },
    { name: 'Outdoor', value: 15, color: '#f59e0b' },
    { name: 'Lainnya', value: 10, color: '#ef4444' }
  ];

  const topItems = [
    { name: 'Kamera Canon EOS R6', bookings: 25, revenue: 3750000 },
    { name: 'Drone DJI Mini 3', bookings: 18, revenue: 3600000 },
    { name: 'Laptop MacBook Pro', bookings: 15, revenue: 4500000 },
    { name: 'Tripod Manfrotto', bookings: 12, revenue: 600000 }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Statistik & Analytics</h1>
          <p className="text-muted-foreground">Analisa performa toko rental Anda</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Rp 3.8M</div>
            <p className="text-xs text-green-600">+12.5% dari bulan lalu</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">16</div>
            <p className="text-xs text-red-600">-2 dari bulan lalu</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Rata-rata Booking/Hari</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">0.53</div>
            <p className="text-xs text-green-600">+8.3% dari bulan lalu</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">68%</div>
            <p className="text-xs text-green-600">+5.2% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`Rp ${Number(value).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trend Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Kategori Booking</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">Rp {item.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;