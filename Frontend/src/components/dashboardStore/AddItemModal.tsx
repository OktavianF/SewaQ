import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddItemModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddItemModal = ({ open, onOpenChange }: AddItemModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    pricePerDay: '',
    stock: '',
    specialTerms: '',
    isActive: true
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const categories = [
    'Mobil',
    'Outdoor', 
    'Kamera',
    'Elektronik',
    'Lainnya'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (images.length + validFiles.length <= 5) {
      setImages(prev => [...prev, ...validFiles]);
      if (errors.images) {
        setErrors(prev => ({ ...prev, images: false }));
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setUnavailableDates(prev => {
        const exists = prev.find(d => d.toDateString() === date.toDateString());
        if (exists) {
          return prev.filter(d => d.toDateString() !== date.toDateString());
        } else {
          return [...prev, date];
        }
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.category) newErrors.category = true;
    if (!formData.description.trim()) newErrors.description = true;
    if (!formData.pricePerDay || parseFloat(formData.pricePerDay) <= 0) newErrors.pricePerDay = true;
    if (!formData.stock || parseInt(formData.stock) <= 0) newErrors.stock = true;
    if (images.length === 0) newErrors.images = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission here
      console.log('Form data:', formData);
      console.log('Images:', images);
      console.log('Unavailable dates:', unavailableDates);
      onOpenChange(false);
      // Reset form
      setFormData({
        name: '',
        category: '',
        description: '',
        pricePerDay: '',
        stock: '',
        specialTerms: '',
        isActive: true
      });
      setImages([]);
      setUnavailableDates([]);
      setErrors({});
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Barang Baru</DialogTitle>
          <DialogDescription>
            Lengkapi informasi barang yang akan disewakan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Nama Barang */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nama Barang <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Masukkan nama barang"
              className={cn(errors.name && "border-destructive")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">Nama barang wajib diisi</p>
            )}
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <Label>
              Kategori Barang <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className={cn(errors.category && "border-destructive")}>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">Kategori wajib dipilih</p>
            )}
          </div>

          {/* Deskripsi */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Deskripsi Barang <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Jelaskan detail barang, kondisi, dan fitur-fitur yang tersedia"
              rows={4}
              className={cn(errors.description && "border-destructive")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">Deskripsi barang wajib diisi</p>
            )}
          </div>

          {/* Harga dan Stok */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Harga Sewa per Hari <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  Rp
                </span>
                <Input
                  id="price"
                  type="number"
                  value={formData.pricePerDay}
                  onChange={(e) => handleInputChange('pricePerDay', e.target.value)}
                  placeholder="0"
                  className={cn("pl-8", errors.pricePerDay && "border-destructive")}
                  min="0"
                />
              </div>
              {errors.pricePerDay && (
                <p className="text-sm text-destructive">Harga wajib diisi dan lebih dari 0</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">
                Jumlah Unit / Stok <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', e.target.value)}
                placeholder="0"
                className={cn(errors.stock && "border-destructive")}
                min="1"
              />
              {errors.stock && (
                <p className="text-sm text-destructive">Stok wajib diisi dan minimal 1</p>
              )}
            </div>
          </div>

          {/* Upload Gambar */}
          <div className="space-y-2">
            <Label>
              Upload Gambar Barang <span className="text-destructive">*</span>
            </Label>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <Label
                    htmlFor="images"
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Pilih Gambar
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Maksimum 5 gambar, format JPG, PNG, atau WebP
                </p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.images && (
              <p className="text-sm text-destructive">Minimal 1 gambar wajib diupload</p>
            )}
          </div>

          {/* Tanggal Tidak Tersedia */}
          <div className="space-y-2">
            <Label>Tanggal Tidak Tersedia</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {unavailableDates.length > 0
                    ? `${unavailableDates.length} tanggal dipilih`
                    : "Pilih tanggal tidak tersedia"
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  onSelect={handleDateSelect}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {unavailableDates.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {unavailableDates.map((date, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {format(date, 'dd/MM/yyyy')}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => setUnavailableDates(prev => prev.filter((_, i) => i !== index))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Syarat Sewa Khusus */}
          <div className="space-y-2">
            <Label htmlFor="terms">Syarat Sewa Khusus (Opsional)</Label>
            <Textarea
              id="terms"
              value={formData.specialTerms}
              onChange={(e) => handleInputChange('specialTerms', e.target.value)}
              placeholder="Contoh: Wajib memiliki SIM A, Deposit Rp 500.000, dll."
              rows={3}
            />
          </div>

          {/* Toggle Aktif */}
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange('isActive', checked)}
            />
            <Label htmlFor="active">Tampilkan barang sekarang</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>
            Simpan Barang
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemModal;