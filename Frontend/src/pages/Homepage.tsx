import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { MapPin, Shield, Clock, Star, ArrowRight, Search, Smartphone, Car, Wrench, Home, Shirt, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';
import {  } from 'lucide-react';


const Homepage = () => {
  const navigate = useNavigate();

  // Check user status from localStorage
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const hasStore = localStorage.getItem('hasStore') === 'true';

  const categories = [
    { name: 'Elektronik', icon: <Smartphone className="w-10 h-10 mx-auto text-primary" />, count: '120+ barang' },
    { name: 'Kendaraan', icon: <Car className="w-10 h-10 mx-auto text-primary" />, count: '85+ barang' },
    { name: 'Peralatan', icon: <Wrench className="w-10 h-10 mx-auto text-primary" />, count: '200+ barang' },
    { name: 'Olahraga', icon: <Dumbbell className="w-10 h-10 mx-auto text-primary" />, count: '90+ barang' },
    { name: 'Rumah Tangga', icon: <Home className="w-10 h-10 mx-auto text-primary" />, count: '150+ barang' },
    { name: 'Fashion', icon: <Shirt className="w-10 h-10 mx-auto text-primary" />, count: '75+ barang' },
  ];

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-sewaqa-green" />,
      title: 'Berbasis Lokasi',
      description: 'Temukan barang sewa dalam radius 10km dari lokasi Anda'
    },
    {
      icon: <Shield className="h-8 w-8 text-sewaqa-blue" />,
      title: 'Pembayaran COD',
      description: 'Bayar saat pengambilan barang, lebih aman dan terpercaya'
    },
    {
      icon: <Clock className="h-8 w-8 text-sewaqa-green" />,
      title: 'Booking Mudah',
      description: 'Proses booking cepat dengan kalender ketersediaan real-time'
    },
    {
      icon: <Star className="h-8 w-8 text-sewaqa-blue" />,
      title: 'Rating Terpercaya',
      description: 'Sistem rating dan review untuk membantu pilihan terbaik'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="SewaQ Community" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sewaqa-green/20 to-accent-blue/20"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Sewa Barang Sekitar Anda,
            </span>
            <br />
            <span className="text-foreground">Tanpa Repot</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Platform terpercaya untuk menyewa dan menyewakan barang di sekitar Anda. 
            Mudah, aman, dan terjangkau dengan sistem pembayaran COD.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate('/items')}
              className="w-full sm:w-auto cursor-pointer hover:shadow-medium transition-all hover:scale-105"
            >
              <Search className="h-5 w-5 mr-2" />
              Jelajahi Barang di Sekitarmu
            </Button>
            {!isLoggedIn && (
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto"
              >
                Daftar Sekarang
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-sewaqa-green-lighter">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Kategori Populer
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-medium transition-all hover:scale-105 bg-gradient-card border-primary/10"
                onClick={() => navigate(`/items?category=${encodeURIComponent(category.name)}`)}
              >
                <CardContent className="p-6 text-center min-h-[180px] flex flex-col justify-center items-center">
                  <div className="mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Mengapa Pilih SewaQ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-sewaqa-green-lighter flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Siap Memulai Pengalaman Sewa yang Baru?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Bergabung dan rasakan kemudahan menyewa barang di SewaQ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!isLoggedIn && (
              <Button 
                variant="secondary" 
                size="xl"
                onClick={() => navigate('/register')}
                className="w-full sm:w-auto bg-white/20 border-white/30 text-primary-foreground hover:bg-white/30"
              >
                Daftar Sebagai Penyewa
              </Button>
            )}
            {!hasStore && (
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => navigate('/open-store')}
                className="w-full sm:w-auto border-white/30 text-primary-foreground hover:bg-white/10"
              >
                Daftarkan Toko Anda
              </Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Homepage; 