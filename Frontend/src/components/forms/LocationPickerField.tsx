import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

export const LocationPickerField = () => {
  return (
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
  );
};
