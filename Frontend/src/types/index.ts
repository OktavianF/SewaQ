export interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  distance: number;
  location: string;
  owner: string;
  image: string;
  available: boolean;
}

export interface ItemPricing {
  perDay: number;
  per3Days: number;
  perWeek: number;
  per2Weeks: number;
  perMonth: number;
}

export interface ItemOwner {
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  joinDate: string;
  avatar: string;
}

export interface ItemSpecification {
  label: string;
  value: string;
}

export interface ItemAvailability {
  unavailableDates: Date[];
}

export interface ItemDetails extends Omit<Item, 'image' | 'owner'> {
  images: string[];
  pricing: ItemPricing;
  owner: ItemOwner;
  rentalTerms: string[];
  specifications: ItemSpecification[];
  availability: ItemAvailability;
}

export interface Store {
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  rating: number;
  itemCount: number;
  distance: number;
  category: string;
}