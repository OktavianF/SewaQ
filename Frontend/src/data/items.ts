import { Item, ItemDetails } from '@/types/index';

export const mockItems: Item[] = [
  {
    id: 1,
    title: 'Kamera DSLR Canon EOS 80D',
    description: 'Kamera profesional untuk fotografi',
    category: 'Elektronik',
    pricePerDay: 75000,
    rating: 4.8,
    reviewCount: 24,
    distance: 2.3,
    location: 'Kemang, Jakarta Selatan',
    owner: 'Ahmad Rental',
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
    available: true
  },
  {
    id: 2,
    title: 'Tenda Camping 4 Orang',
    description: 'Tenda berkualitas untuk camping keluarga',
    category: 'Outdoor',
    pricePerDay: 50000,
    rating: 4.6,
    reviewCount: 18,
    distance: 4.7,
    location: 'Senayan, Jakarta Pusat',
    owner: 'Outdoor Gear',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
    available: true
  },
  {
    id: 3,
    title: 'PlayStation 5 + 2 Controller',
    description: 'Konsol gaming terbaru dengan 2 controller',
    category: 'Gaming',
    pricePerDay: 100000,
    rating: 4.9,
    reviewCount: 31,
    distance: 6.2,
    location: 'Blok M, Jakarta Selatan',
    owner: 'Game Station',
    image: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400',
    available: false
  },
  {
    id: 4,
    title: 'Proyektor Epson EH-TW650',
    description: 'Proyektor HD untuk presentasi dan hiburan',
    category: 'Elektronik',
    pricePerDay: 125000,
    rating: 4.7,
    reviewCount: 15,
    distance: 8.1,
    location: 'Menteng, Jakarta Pusat',
    owner: 'Tech Rental Pro',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    available: true
  }
];

export const mockItemDetails: { [key: number]: ItemDetails } = {
  1: {
    id: 1,
    title: 'Kamera DSLR Canon EOS 80D',
    description: 'Kamera DSLR profesional Canon EOS 80D dengan sensor APS-C 24.2MP. Dilengkapi dengan fitur autofocus yang cepat dan akurat, perfect untuk fotografi portrait, landscape, dan event. Kondisi sangat baik dan terawat.',
    category: 'Elektronik',
    images: [
      'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'
    ],
    pricePerDay: 75000,
    pricing: {
      perDay: 75000,
      per3Days: 200000,
      perWeek: 450000,
      per2Weeks: 800000,
      perMonth: 1500000
    },
    owner: {
      name: 'Ahmad Rental',
      rating: 4.8,
      reviewCount: 24,
      location: 'Kemang, Jakarta Selatan',
      joinDate: '2023',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    rentalTerms: [
      'Deposit Rp 500.000 (dikembalikan setelah barang kembali)',
      'Wajib membawa KTP/SIM saat pengambilan',
      'Penyewa bertanggung jawab atas kerusakan',
      'Pembayaran COD saat pengambilan barang',
      'Gratis tutorial penggunaan untuk pemula'
    ],
    specifications: [
      { label: 'Sensor', value: 'APS-C 24.2MP' },
      { label: 'ISO Range', value: '100-25600' },
      { label: 'Video', value: 'Full HD 1080p' },
      { label: 'Baterai', value: 'LP-E6N (included)' },
      { label: 'Memory Card', value: 'SD Card (not included)' }
    ],
    availability: {
      unavailableDates: [
        new Date(2024, 11, 25), // Christmas
        new Date(2024, 11, 26),
        new Date(2025, 0, 1),   // New Year
        new Date(2025, 0, 15),
        new Date(2025, 0, 16)
      ]
    },
    storeLocation: {
      lat: -6.2297,
      lng: 106.8224,
      address: 'Jl. Kemang Raya No. 123, Jakarta Selatan'
    },
    rating: 4.8,
    reviewCount: 24,
    distance: 2.3,
    location: 'Kemang, Jakarta Selatan',
    available: true
  }
};