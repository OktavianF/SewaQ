import { Store } from '@/types/index';

export const mockStores: Store[] = [
  {
    id: 1,
    name: 'ElektroMart Jakarta',
    location: { lat: -6.2088, lng: 106.8456 },
    address: 'Jl. Sudirman No. 123, Jakarta Pusat',
    rating: 4.5,
    itemCount: 25,
    distance: 1.2,
    category: 'Elektronik'
  },
  {
    id: 2,
    name: 'Outdoor Adventure',
    location: { lat: -6.2186, lng: 106.8329 },
    address: 'Jl. Thamrin No. 456, Jakarta Pusat',
    rating: 4.3,
    itemCount: 18,
    distance: 2.1,
    category: 'Outdoor'
  },
  {
    id: 3,
    name: 'Gaming Zone Pro',
    location: { lat: -6.1944, lng: 106.8229 },
    address: 'Jl. Menteng No. 789, Jakarta Pusat',
    rating: 4.7,
    itemCount: 32,
    distance: 1.8,
    category: 'Gaming'
  },
  {
    id: 4,
    name: 'SportCenter',
    location: { lat: -6.2297, lng: 106.8224 },
    address: 'Jl. Gatot Subroto No. 101, Jakarta Selatan',
    rating: 4.2,
    itemCount: 22,
    distance: 3.5,
    category: 'Olahraga'
  },
  {
    id: 5,
    name: 'Vehicle Hub',
    location: { lat: -6.1888, lng: 106.8650 },
    address: 'Jl. Casablanca No. 234, Jakarta Timur',
    rating: 4.4,
    itemCount: 15,
    distance: 4.2,
    category: 'Kendaraan'
  }
];