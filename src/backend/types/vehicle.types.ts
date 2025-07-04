export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin: string;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  category: 'economy' | 'compact' | 'mid-size' | 'luxury' | 'suv' | 'truck';
  pricePerDay: number;
  mileage: number;
  capacity: number;
  isAvailable: boolean;
  locationId?: string;
  features: string[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleFilters {
  make?: string;
  model?: string;
  category?: string;
  fuelType?: string;
  transmission?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  isAvailable?: boolean;
  locationId?: string;
}

export interface VehicleStatistics {
  totalVehicles: number;
  availableVehicles: number;
  rentedVehicles: number;
  averagePrice: number;
  mostPopularCategory: string;
  totalRevenue: number;
}

export interface CreateVehicleData {
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  vin: string;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission: 'manual' | 'automatic';
  category: 'economy' | 'compact' | 'mid-size' | 'luxury' | 'suv' | 'truck';
  pricePerDay: number;
  mileage: number;
  capacity: number;
  locationId?: string;
  features?: string[];
  images?: string[];
}

export interface UpdateVehicleData {
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  licensePlate?: string;
  vin?: string;
  fuelType?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission?: 'manual' | 'automatic';
  category?: 'economy' | 'compact' | 'mid-size' | 'luxury' | 'suv' | 'truck';
  pricePerDay?: number;
  mileage?: number;
  capacity?: number;
  isAvailable?: boolean;
  locationId?: string;
  features?: string[];
  images?: string[];
}

export interface PaginatedVehicles {
  vehicles: Vehicle[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}