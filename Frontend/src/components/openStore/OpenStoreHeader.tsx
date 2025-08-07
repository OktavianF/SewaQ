import { Store } from 'lucide-react';

export const OpenStoreHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-hero flex items-center justify-center">
        <Store className="h-8 w-8 text-primary-foreground" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-2">Buka Toko Rental</h1>
      <p className="text-muted-foreground">
        Anda belum memiliki toko. Silahkan isi form berikut untuk membuka toko rental Anda.
      </p>
    </div>
  );
};
