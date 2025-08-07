import { CategoryOption } from '@/types/openStore';

export const INITIAL_FORM_DATA = {
  storeName: '',
  category: '',
  description: '',
  profileImage: null as File | null,
  address: '',
  whatsapp: '',
  operatingHours: { start: '08:00', end: '20:00' },
  rentalTerms: ''
};

export const INITIAL_ERRORS = {
  storeName: '',
  category: '',
  description: '',
  profileImage: '',
  address: '',
  whatsapp: ''
};

export const INITIAL_TOUCHED = {
  storeName: false,
  category: false,
  description: false,
  profileImage: false,
  address: false,
  whatsapp: false
};

export const STORE_CATEGORIES: CategoryOption[] = [
  { value: 'mobil', label: 'Mobil' },
  { value: 'kamera', label: 'Kamera' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'lainnya', label: 'Lainnya' }
];

export const VALIDATION_RULES = {
  STORE_NAME_MIN_LENGTH: 3,
  DESCRIPTION_MIN_LENGTH: 10,
  ADDRESS_MIN_LENGTH: 10,
  WHATSAPP_PATTERN: /^08\d{8,11}$/
} as const;
