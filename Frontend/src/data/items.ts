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
    location: 'Mendalan, Lamongan',
    owner: 'Ahmad Rental',
    image: 'https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg',
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
    location: 'Mendalan, Lamongan',
    owner: 'Outdoor Gear',
    image: 'https://images.pexels.com/photos/2612228/pexels-photo-2612228.jpeg',
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
    location: 'Mendalan, Lamongan',
    owner: 'Game Station',
    image: 'https://images.pexels.com/photos/7776100/pexels-photo-7776100.jpeg',
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
    location: 'Mendalan, Lamongan',
    owner: 'Tech Rental Pro',
    image: 'https://images.pexels.com/photos/2867980/pexels-photo-2867980.jpeg',
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
      'https://images.pexels.com/photos/1787235/pexels-photo-1787235.jpeg',
      'https://images.pexels.com/photos/1787220/pexels-photo-1787220.jpeg',
      'https://images.pexels.com/photos/1787234/pexels-photo-1787234.jpeg'
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
      location: 'Mendalan, Lamongan',
      joinDate: '2023',
      avatar: 'https://images.pexels.com/photos/598917/pexels-photo-598917.jpeg'
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
      lat: -7.117505,
      lng: 112.423096,
      address: 'Jl. Mendalan Raya No. 123, Lamongan'
    },
    rating: 4.8,
    reviewCount: 24,
    distance: 2.3,
    location: 'Kemang, Jakarta Selatan',
    available: true
  }
};