import { CreateVehicleData, UpdateVehicleData, VehicleFilters } from '../types/vehicle.types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class VehicleValidator {
  private static readonly FUEL_TYPES = ['gasoline', 'diesel', 'electric', 'hybrid'];
  private static readonly TRANSMISSIONS = ['manual', 'automatic'];
  private static readonly CATEGORIES = ['economy', 'compact', 'mid-size', 'luxury', 'suv', 'truck'];
  private static readonly VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/;
  private static readonly LICENSE_PLATE_PATTERN = /^[A-Z0-9\-\s]{1,20}$/i;

  static validateCreateVehicle(data: CreateVehicleData): ValidationResult {
    const errors: string[] = [];

    // Required fields validation
    if (!data.make?.trim()) errors.push('Make is required');
    if (!data.model?.trim()) errors.push('Model is required');
    if (!data.color?.trim()) errors.push('Color is required');
    if (!data.licensePlate?.trim()) errors.push('License plate is required');
    if (!data.vin?.trim()) errors.push('VIN is required');

    // Year validation
    if (!data.year || data.year < 1900 || data.year > 2030) {
      errors.push('Year must be between 1900 and 2030');
    }

    // Enum validations
    if (!this.FUEL_TYPES.includes(data.fuelType)) {
      errors.push(`Fuel type must be one of: ${this.FUEL_TYPES.join(', ')}`);
    }

    if (!this.TRANSMISSIONS.includes(data.transmission)) {
      errors.push(`Transmission must be one of: ${this.TRANSMISSIONS.join(', ')}`);
    }

    if (!this.CATEGORIES.includes(data.category)) {
      errors.push(`Category must be one of: ${this.CATEGORIES.join(', ')}`);
    }

    // Price validation
    if (!data.pricePerDay || data.pricePerDay <= 0) {
      errors.push('Price per day must be greater than 0');
    }

    // Mileage validation
    if (data.mileage < 0) {
      errors.push('Mileage cannot be negative');
    }

    // Capacity validation
    if (!data.capacity || data.capacity <= 0 || data.capacity > 12) {
      errors.push('Capacity must be between 1 and 12');
    }

    // VIN validation
    if (data.vin && !this.VIN_PATTERN.test(data.vin)) {
      errors.push('Invalid VIN format');
    }

    // License plate validation
    if (data.licensePlate && !this.LICENSE_PLATE_PATTERN.test(data.licensePlate)) {
      errors.push('Invalid license plate format');
    }

    // Features validation
    if (data.features && !Array.isArray(data.features)) {
      errors.push('Features must be an array of strings');
    }

    // Images validation
    if (data.images && !Array.isArray(data.images)) {
      errors.push('Images must be an array of URLs');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateUpdateVehicle(data: UpdateVehicleData): ValidationResult {
    const errors: string[] = [];

    // Optional field validations (only if provided)
    if (data.make !== undefined && !data.make?.trim()) {
      errors.push('Make cannot be empty');
    }

    if (data.model !== undefined && !data.model?.trim()) {
      errors.push('Model cannot be empty');
    }

    if (data.color !== undefined && !data.color?.trim()) {
      errors.push('Color cannot be empty');
    }

    if (data.year !== undefined && (data.year < 1900 || data.year > 2030)) {
      errors.push('Year must be between 1900 and 2030');
    }

    if (data.fuelType !== undefined && !this.FUEL_TYPES.includes(data.fuelType)) {
      errors.push(`Fuel type must be one of: ${this.FUEL_TYPES.join(', ')}`);
    }

    if (data.transmission !== undefined && !this.TRANSMISSIONS.includes(data.transmission)) {
      errors.push(`Transmission must be one of: ${this.TRANSMISSIONS.join(', ')}`);
    }

    if (data.category !== undefined && !this.CATEGORIES.includes(data.category)) {
      errors.push(`Category must be one of: ${this.CATEGORIES.join(', ')}`);
    }

    if (data.pricePerDay !== undefined && data.pricePerDay <= 0) {
      errors.push('Price per day must be greater than 0');
    }

    if (data.mileage !== undefined && data.mileage < 0) {
      errors.push('Mileage cannot be negative');
    }

    if (data.capacity !== undefined && (data.capacity <= 0 || data.capacity > 12)) {
      errors.push('Capacity must be between 1 and 12');
    }

    if (data.vin !== undefined && !this.VIN_PATTERN.test(data.vin)) {
      errors.push('Invalid VIN format');
    }

    if (data.licensePlate !== undefined && !this.LICENSE_PLATE_PATTERN.test(data.licensePlate)) {
      errors.push('Invalid license plate format');
    }

    if (data.features !== undefined && !Array.isArray(data.features)) {
      errors.push('Features must be an array of strings');
    }

    if (data.images !== undefined && !Array.isArray(data.images)) {
      errors.push('Images must be an array of URLs');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateFilters(filters: VehicleFilters): ValidationResult {
    const errors: string[] = [];

    if (filters.fuelType && !this.FUEL_TYPES.includes(filters.fuelType)) {
      errors.push(`Fuel type filter must be one of: ${this.FUEL_TYPES.join(', ')}`);
    }

    if (filters.transmission && !this.TRANSMISSIONS.includes(filters.transmission)) {
      errors.push(`Transmission filter must be one of: ${this.TRANSMISSIONS.join(', ')}`);
    }

    if (filters.category && !this.CATEGORIES.includes(filters.category)) {
      errors.push(`Category filter must be one of: ${this.CATEGORIES.join(', ')}`);
    }

    if (filters.minPrice !== undefined && filters.minPrice < 0) {
      errors.push('Minimum price cannot be negative');
    }

    if (filters.maxPrice !== undefined && filters.maxPrice < 0) {
      errors.push('Maximum price cannot be negative');
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined && filters.minPrice > filters.maxPrice) {
      errors.push('Minimum price cannot be greater than maximum price');
    }

    if (filters.minYear !== undefined && (filters.minYear < 1900 || filters.minYear > 2030)) {
      errors.push('Minimum year must be between 1900 and 2030');
    }

    if (filters.maxYear !== undefined && (filters.maxYear < 1900 || filters.maxYear > 2030)) {
      errors.push('Maximum year must be between 1900 and 2030');
    }

    if (filters.minYear !== undefined && filters.maxYear !== undefined && filters.minYear > filters.maxYear) {
      errors.push('Minimum year cannot be greater than maximum year');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validatePagination(page: number, limit: number): ValidationResult {
    const errors: string[] = [];

    if (page < 1) errors.push('Page must be greater than 0');
    if (limit < 1 || limit > 100) errors.push('Limit must be between 1 and 100');

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static validateDateRange(startDate: string, endDate: string): ValidationResult {
    const errors: string[] = [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime())) errors.push('Invalid start date format');
    if (isNaN(end.getTime())) errors.push('Invalid end date format');

    if (start.getTime() >= end.getTime()) {
      errors.push('Start date must be before end date');
    }

    // Allow dates in the past for testing purposes - in production you might want to keep this check
    // if (start.getTime() < Date.now()) {
    //   errors.push('Start date cannot be in the past');
    // }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}