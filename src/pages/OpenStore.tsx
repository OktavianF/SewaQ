import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import { Upload, MapPin, Clock, Store, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

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

  const [errors, setErrors] = useState({
    storeName: '',
    category: '',
    description: '',
    profileImage: '',
    address: '',
    whatsapp: ''
  });

  const [touched, setTouched] = useState({
    storeName: false,
    category: false,
    description: false,
    profileImage: false,
    address: false,
    whatsapp: false
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFieldChange('profileImage', file);
    }
  };

  const validateField = (name: string, value: string | File | null) => {
    switch (name) {
      case 'storeName':
        if (!value || (typeof value === 'string' && value.trim().length < 3)) {
          return 'Nama toko minimal 3 karakter';
        }
        break;
      case 'category':
        if (!value) {
          return 'Kategori harus dipilih';
        }
        break;
      case 'description':
        if (!value || (typeof value === 'string' && value.trim().length < 10)) {
          return 'Deskripsi minimal 10 karakter';
        }
        break;
      case 'profileImage':
        if (!value) {
          return 'Foto profil toko wajib diupload';
        }
        break;
      case 'address':
        if (!value || (typeof value === 'string' && value.trim().length < 10)) {
          return 'Alamat lengkap minimal 10 karakter';
        }
        break;
      case 'whatsapp':
        if (!value || (typeof value === 'string' && !/^08\d{8,11}$/.test(value.replace(/\s/g, '')))) {
          return 'Nomor WhatsApp harus dimulai dengan 08 dan 10-13 digit';
        }
        break;
    }
    return '';
  };

  const handleFieldChange = (name: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it has been touched
    if (touched[name as keyof typeof touched]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    let value: string | File | null;
    
    if (name === 'profileImage') {
      value = formData.profileImage;
    } else if (name in formData && typeof formData[name as keyof typeof formData] === 'string') {
      value = formData[name as keyof typeof formData] as string;
    } else {
      value = null;
    }
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      storeName: validateField('storeName', formData.storeName),
      category: validateField('category', formData.category),
      description: validateField('description', formData.description),
      profileImage: validateField('profileImage', formData.profileImage),
      address: validateField('address', formData.address),
      whatsapp: validateField('whatsapp', formData.whatsapp)
    };

    setErrors(newErrors);
    setTouched({
      storeName: true,
      category: true,
      description: true,
      profileImage: true,
      address: true,
      whatsapp: true
    });

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form tidak valid",
        description: "Silakan periksa kembali semua field yang wajib diisi.",
        variant: "destructive"
      });
      return;
    }

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
                  <Label htmlFor="storeName" className={cn(errors.storeName && touched.storeName && "text-destructive")}>
                    Nama Toko <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="storeName"
                    placeholder="Masukkan nama toko Anda"
                    value={formData.storeName}
                    onChange={(e) => handleFieldChange('storeName', e.target.value)}
                    onBlur={() => handleFieldBlur('storeName')}
                    className={cn(errors.storeName && touched.storeName && "border-destructive focus-visible:ring-destructive")}
                    required
                  />
                  {errors.storeName && touched.storeName && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.storeName}
                    </div>
                  )}
                </div>

                {/* Kategori Utama */}
                <div className="space-y-2">
                  <Label htmlFor="category" className={cn(errors.category && touched.category && "text-destructive")}>
                    Kategori Utama <span className="text-destructive">*</span>
                  </Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => {
                      handleFieldChange('category', value);
                      handleFieldBlur('category');
                    }}
                  >
                    <SelectTrigger className={cn(errors.category && touched.category && "border-destructive focus:ring-destructive")}>
                      <SelectValue placeholder="Pilih kategori utama toko" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobil">Mobil</SelectItem>
                      <SelectItem value="kamera">Kamera</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && touched.category && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.category}
                    </div>
                  )}
                </div>

                {/* Deskripsi Singkat */}
                <div className="space-y-2">
                  <Label htmlFor="description" className={cn(errors.description && touched.description && "text-destructive")}>
                    Deskripsi Singkat <span className="text-destructive">*</span>
                  </Label>
                  <Textarea 
                    id="description"
                    placeholder="Ceritakan tentang toko Anda..."
                    value={formData.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    onBlur={() => handleFieldBlur('description')}
                    className={cn(errors.description && touched.description && "border-destructive focus-visible:ring-destructive")}
                    rows={4}
                  />
                  {errors.description && touched.description && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.description}
                    </div>
                  )}
                </div>

                {/* Upload Foto Profil */}
                <div className="space-y-2">
                  <Label htmlFor="profileImage" className={cn(errors.profileImage && touched.profileImage && "text-destructive")}>
                    Foto Profil Toko <span className="text-destructive">*</span>
                  </Label>
                  <div className={cn(
                    "border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors",
                    errors.profileImage && touched.profileImage ? "border-destructive" : "border-border"
                  )}>
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      onBlur={() => handleFieldBlur('profileImage')}
                      className="hidden"
                    />
                    <label htmlFor="profileImage" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {formData.profileImage ? formData.profileImage.name : "Klik untuk upload foto profil toko"}
                      </p>
                    </label>
                  </div>
                  {errors.profileImage && touched.profileImage && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.profileImage}
                    </div>
                  )}
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
                  <Label htmlFor="address" className={cn(errors.address && touched.address && "text-destructive")}>
                    Alamat Lengkap <span className="text-destructive">*</span>
                  </Label>
                  <Textarea 
                    id="address"
                    placeholder="Masukkan alamat lengkap toko Anda"
                    value={formData.address}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    onBlur={() => handleFieldBlur('address')}
                    className={cn(errors.address && touched.address && "border-destructive focus-visible:ring-destructive")}
                    rows={3}
                  />
                  {errors.address && touched.address && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.address}
                    </div>
                  )}
                </div>

                {/* Nomor WhatsApp */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className={cn(errors.whatsapp && touched.whatsapp && "text-destructive")}>
                    Nomor WhatsApp <span className="text-destructive">*</span>
                  </Label>
                  <Input 
                    id="whatsapp"
                    type="tel"
                    placeholder="08123456789"
                    value={formData.whatsapp}
                    onChange={(e) => handleFieldChange('whatsapp', e.target.value)}
                    onBlur={() => handleFieldBlur('whatsapp')}
                    className={cn(errors.whatsapp && touched.whatsapp && "border-destructive focus-visible:ring-destructive")}
                  />
                  {errors.whatsapp && touched.whatsapp && (
                    <div className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      {errors.whatsapp}
                    </div>
                  )}
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