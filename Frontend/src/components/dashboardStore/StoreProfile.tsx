import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, MapPin, Phone, Clock, FileText } from 'lucide-react';

const StoreProfile = () => {
  const [formData, setFormData] = useState({
    storeName: 'Toko Rental Ku',
    category: 'Kamera',
    description: 'Menyediakan berbagai peralatan kamera dan elektronik berkualitas tinggi untuk kebutuhan fotografi dan videografi profesional.',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    whatsapp: '081234567890',
    operatingHours: '08:00 - 20:00',
    rentalTerms: 'Barang harus dikembalikan dalam kondisi yang sama. Jika terjadi kerusakan, penyewa bertanggung jawab atas biaya perbaikan.'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving store profile:', formData);
    // TODO: Implement save functionality
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profil Toko</h1>
          <p className="text-muted-foreground">Kelola informasi toko rental Anda</p>
        </div>
        <Button onClick={handleSave}>Simpan Perubahan</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Store Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informasi Dasar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="storeName">Nama Toko</Label>
                <Input
                  id="storeName"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Kategori Utama</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kamera">Kamera</SelectItem>
                    <SelectItem value="Mobil">Mobil</SelectItem>
                    <SelectItem value="Outdoor">Outdoor</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Deskripsi Toko</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Lokasi & Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Alamat Lengkap</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="operatingHours">Jam Operasional</Label>
                <Input
                  id="operatingHours"
                  value={formData.operatingHours}
                  onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Syarat & Ketentuan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="rentalTerms">Syarat Sewa Umum</Label>
                <Textarea
                  id="rentalTerms"
                  rows={6}
                  value={formData.rentalTerms}
                  onChange={(e) => handleInputChange('rentalTerms', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Store Stats & Profile Image */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Foto Profil Toko
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-12 w-12 text-muted-foreground" />
                </div>
                <Button variant="outline">Upload Foto Baru</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Statistik Toko</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Barang</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Booking</span>
                <span className="font-semibold">48</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating Toko</span>
                <span className="font-semibold">4.8 ⭐</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member Sejak</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Status Toko
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Aktif</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Verifikasi</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">Terverifikasi</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;