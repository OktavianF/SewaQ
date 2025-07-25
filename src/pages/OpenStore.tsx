import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Upload, MapPin, Clock, Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const OpenStore = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '',
    category: '',
    description: '',
    profileImage: null as File | null,
    address: '',
    whatsapp: '',
    operatingHours: { start: '08:00', end: '20:00' },
    rentalTerms: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Toko berhasil didaftarkan!",
      description: "Toko Anda akan diaktifkan dalam 24 jam setelah verifikasi."
    });

     // Redirect to dashboard after successful registration
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Buka Toko Rental</h1>
            <p className="text-muted-foreground">
              Anda belum memiliki toko. Silahkan isi form berikut untuk membuka toko rental Anda.
            </p>
          </div>

          {/* Form */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Informasi Toko</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama Toko */}
                <div className="space-y-2">
                  <Label htmlFor="storeName">Nama Toko</Label>
                  <Input 
                    id="storeName"
                    placeholder="Masukkan nama toko Anda"
                    value={formData.storeName}
                    onChange={(e) => setFormData(prev => ({ ...prev, storeName: e.target.value }))}
                    required
                  />
                </div>

                {/* Kategori Utama */}
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori Utama</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori utama toko" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobil">Mobil</SelectItem>
                      <SelectItem value="kamera">Kamera</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Deskripsi Singkat */}
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Singkat</Label>
                  <Textarea 
                    id="description"
                    placeholder="Ceritakan tentang toko Anda..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Upload Foto Profil */}
                <div className="space-y-2">
                  <Label htmlFor="profileImage">Foto Profil Toko</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {formData.profileImage ? formData.profileImage.name : "Klik untuk upload foto profil toko"}
                      </p>
                    </label>
                  </div>
                </div>

                {/* Lokasi Toko */}
                <div className="space-y-2">
                  <Label>Lokasi Toko</Label>
                  <div className="border border-border rounded-lg p-4 text-center bg-muted/50">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Map picker akan diimplementasikan</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Pilih Lokasi di Peta
                    </Button>
                  </div>
                </div>

                {/* Alamat Lengkap */}
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat Lengkap</Label>
                  <Textarea 
                    id="address"
                    placeholder="Masukkan alamat lengkap toko Anda"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                  />
                </div>

                {/* Nomor WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                  <Input 
                    id="whatsapp"
                    type="tel"
                    placeholder="08123456789"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>

                {/* Jam Operasional */}
                <div className="space-y-2">
                  <Label>Jam Operasional</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="time"
                        value={formData.operatingHours.start}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          operatingHours: { ...prev.operatingHours, start: e.target.value }
                        }))}
                        className="w-32"
                      />
                    </div>
                    <span className="text-muted-foreground">sampai</span>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="time"
                        value={formData.operatingHours.end}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          operatingHours: { ...prev.operatingHours, end: e.target.value }
                        }))}
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>

                {/* Syarat Sewa Umum */}
                <div className="space-y-2">
                  <Label htmlFor="rentalTerms">Syarat Sewa Umum</Label>
                  <Textarea 
                    id="rentalTerms"
                    placeholder="Masukkan syarat dan ketentuan sewa umum untuk toko Anda..."
                    value={formData.rentalTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, rentalTerms: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="xl" 
                    className="w-full"
                  >
                    Daftar Sekarang
                  </Button>
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    Dengan mendaftar, Anda menyetujui syarat dan ketentuan SewaQ
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OpenStore;