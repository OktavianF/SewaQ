import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/layout/Layout';
import { useStoreForm } from '@/hooks/useStoreForm';
import { STORE_CATEGORIES } from '@/constants/openStore';
import {
  FormField,
  TextAreaField,
  SelectField,
  ImageUploadField,
  OperatingHoursField,
  LocationPickerField
} from '@/components/forms';
import { OpenStoreHeader } from '@/components/openStore/OpenStoreHeader';

const OpenStore = () => {
  const {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleFieldBlur,
    handleImageUpload,
    handleOperatingHoursChange,
    handleSubmit
  } = useStoreForm();

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="container mx-auto max-w-3xl">
          <OpenStoreHeader />

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Informasi Toko</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama Toko */}
                <FormField
                  id="storeName"
                  label="Nama Toko"
                  placeholder="Masukkan nama toko Anda"
                  value={formData.storeName}
                  error={errors.storeName}
                  touched={touched.storeName}
                  required
                  onChange={(value) => handleFieldChange('storeName', value)}
                  onBlur={() => handleFieldBlur('storeName')}
                />

                {/* Kategori Utama */}
                <SelectField
                  id="category"
                  label="Kategori Utama"
                  placeholder="Pilih kategori utama toko"
                  value={formData.category}
                  options={STORE_CATEGORIES}
                  error={errors.category}
                  touched={touched.category}
                  required
                  onChange={(value) => handleFieldChange('category', value)}
                  onBlur={() => handleFieldBlur('category')}
                />

                {/* Deskripsi Singkat */}
                <TextAreaField
                  id="description"
                  label="Deskripsi Singkat"
                  placeholder="Ceritakan tentang toko Anda..."
                  value={formData.description}
                  error={errors.description}
                  touched={touched.description}
                  required
                  onChange={(value) => handleFieldChange('description', value)}
                  onBlur={() => handleFieldBlur('description')}
                />

                {/* Upload Foto Profil */}
                <ImageUploadField
                  id="profileImage"
                  label="Foto Profil Toko"
                  file={formData.profileImage}
                  error={errors.profileImage}
                  touched={touched.profileImage}
                  required
                  onChange={handleImageUpload}
                  onBlur={() => handleFieldBlur('profileImage')}
                />

                {/* Lokasi Toko */}
                <LocationPickerField />

                {/* Alamat Lengkap */}
                <TextAreaField
                  id="address"
                  label="Alamat Lengkap"
                  placeholder="Masukkan alamat lengkap toko Anda"
                  value={formData.address}
                  error={errors.address}
                  touched={touched.address}
                  required
                  rows={3}
                  onChange={(value) => handleFieldChange('address', value)}
                  onBlur={() => handleFieldBlur('address')}
                />

                {/* Nomor WhatsApp */}
                <FormField
                  id="whatsapp"
                  label="Nomor WhatsApp"
                  type="tel"
                  placeholder="08123456789"
                  value={formData.whatsapp}
                  error={errors.whatsapp}
                  touched={touched.whatsapp}
                  required
                  onChange={(value) => handleFieldChange('whatsapp', value)}
                  onBlur={() => handleFieldBlur('whatsapp')}
                />

                {/* Jam Operasional */}
                <OperatingHoursField
                  startTime={formData.operatingHours.start}
                  endTime={formData.operatingHours.end}
                  onStartTimeChange={(value) => handleOperatingHoursChange('start', value)}
                  onEndTimeChange={(value) => handleOperatingHoursChange('end', value)}
                />

                {/* Syarat Sewa Umum */}
                <TextAreaField
                  id="rentalTerms"
                  label="Syarat Sewa Umum"
                  placeholder="Masukkan syarat dan ketentuan sewa umum untuk toko Anda..."
                  value={formData.rentalTerms}
                  onChange={(value) => handleFieldChange('rentalTerms', value)}
                  onBlur={() => {}}
                />

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