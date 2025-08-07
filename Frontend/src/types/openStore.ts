export interface StoreFormData {
  storeName: string;
  category: string;
  description: string;
  profileImage: File | null;
  address: string;
  whatsapp: string;
  operatingHours: {
    start: string;
    end: string;
  };
  rentalTerms: string;
}

export interface StoreFormErrors {
  storeName: string;
  category: string;
  description: string;
  profileImage: string;
  address: string;
  whatsapp: string;
}

export interface StoreFormTouched {
  storeName: boolean;
  category: boolean;
  description: boolean;
  profileImage: boolean;
  address: boolean;
  whatsapp: boolean;
}

export interface CategoryOption {
  value: string;
  label: string;
}
