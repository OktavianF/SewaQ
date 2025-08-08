import { Store } from '@/types/index';

export const mockStores: Store[] = [
  {
    id: 1,
    name: 'ElektroMart Lamongan',
    location: { lat: -6.9143825, lng: 112.3297338 },
    address: 'Jl. Merdeka No. 123, Lamongan',
    rating: 4.5,
    itemCount: 25,
    distance: 1.2,
    category: 'Elektronik'
  },
  {
    id: 2,
    name: 'Outdoor Adventure',
    location: { lat: -6.9149112, lng: 112.3255762 },
    address: 'Jl. Mawar No. 456, Lamongan',
    rating: 4.3,
    itemCount: 18,
    distance: 2.1,
    category: 'Outdoor'
  },
  {
    id: 3,
    name: 'Gaming Zone Pro',
    location: { lat: -6.9169936, lng: 112.3296892 },
    address: 'Jl. Mawar No. 789, Lamongan',
    rating: 4.7,
    itemCount: 32,
    distance: 1.8,
    category: 'Gaming'
  },
  {
    id: 4,
    name: 'SportCenter',
    location: { lat: -6.9208204, lng: 112.3242481 },
    address: 'Jl. Gatot Subroto No. 101, Lamongan',
    rating: 4.2,
    itemCount: 22,
    distance: 3.5,
    category: 'Olahraga'
  },
  {
    id: 5,
    name: 'Vehicle Hub',
    location: { lat: -6.9135606, lng: 112.3273434 },
    address: 'Jl. Merdeka No. 234, Lamongan',
    rating: 4.4,
    itemCount: 15,
    distance: 4.2,
    category: 'Kendaraan'
  }
];