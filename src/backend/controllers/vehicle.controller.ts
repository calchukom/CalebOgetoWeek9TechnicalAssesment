import { Vehicle, VehicleFilters, CreateVehicleData, UpdateVehicleData, PaginatedVehicles, VehicleStatistics, ServiceResponse } from '../types/vehicle.types';
import { VehicleValidator } from '../validators/vehicle.validator';
import { VehicleService } from '../services/vehicle.service';

export class VehicleController {
  private vehicleService: VehicleService;

  constructor(vehicleService: VehicleService) {
    this.vehicleService = vehicleService;
  }

  async getAllVehicles(
    page: number = 1,
    limit: number = 10,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    filters: VehicleFilters = {}
  ): Promise<ServiceResponse<PaginatedVehicles>> {
    try {
      // Validate pagination parameters
      const paginationValidation = VehicleValidator.validatePagination(page, limit);
      if (!paginationValidation.isValid) {
        return {
          success: false,
          error: paginationValidation.errors.join(', ')
        };
      }

      // Validate filters
      const filtersValidation = VehicleValidator.validateFilters(filters);
      if (!filtersValidation.isValid) {
        return {
          success: false,
          error: filtersValidation.errors.join(', ')
        };
      }

      const result = await this.vehicleService.getAllVehicles(page, limit, sortBy, sortOrder, filters);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve vehicles',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getAvailableVehicles(
    startDate: string,
    endDate: string,
    locationId?: string
  ): Promise<ServiceResponse<Vehicle[]>> {
    try {
      // Validate date range
      const dateValidation = VehicleValidator.validateDateRange(startDate, endDate);
      if (!dateValidation.isValid) {
        return {
          success: false,
          error: dateValidation.errors.join(', ')
        };
      }

      const result = await this.vehicleService.getAvailableVehicles(startDate, endDate, locationId);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve available vehicles',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getVehicleById(id: string): Promise<ServiceResponse<Vehicle>> {
    try {
      if (!id?.trim()) {
        return {
          success: false,
          error: 'Vehicle ID is required'
        };
      }

      const result = await this.vehicleService.getVehicleById(id);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve vehicle',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async createVehicle(vehicleData: CreateVehicleData): Promise<ServiceResponse<Vehicle>> {
    try {
      // Validate vehicle data
      const validation = VehicleValidator.validateCreateVehicle(vehicleData);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      const result = await this.vehicleService.createVehicle(vehicleData);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create vehicle',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async updateVehicle(id: string, updates: UpdateVehicleData): Promise<ServiceResponse<Vehicle>> {
    try {
      if (!id?.trim()) {
        return {
          success: false,
          error: 'Vehicle ID is required'
        };
      }

      // Validate update data
      const validation = VehicleValidator.validateUpdateVehicle(updates);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      const result = await this.vehicleService.updateVehicle(id, updates);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to update vehicle',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async deleteVehicle(id: string): Promise<ServiceResponse<void>> {
    try {
      if (!id?.trim()) {
        return {
          success: false,
          error: 'Vehicle ID is required'
        };
      }

      const result = await this.vehicleService.deleteVehicle(id);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete vehicle',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getVehicleStatistics(): Promise<ServiceResponse<VehicleStatistics>> {
    try {
      const result = await this.vehicleService.getVehicleStatistics();
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve vehicle statistics',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getPopularVehicles(limit: number = 10): Promise<ServiceResponse<Vehicle[]>> {
    try {
      if (limit < 1 || limit > 50) {
        return {
          success: false,
          error: 'Limit must be between 1 and 50'
        };
      }

      const result = await this.vehicleService.getPopularVehicles(limit);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to retrieve popular vehicles',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async toggleAvailability(id: string): Promise<ServiceResponse<Vehicle>> {
    try {
      if (!id?.trim()) {
        return {
          success: false,
          error: 'Vehicle ID is required'
        };
      }

      const result = await this.vehicleService.toggleAvailability(id);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to toggle vehicle availability',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async bulkUpdateVehicles(vehicleIds: string[], updates: UpdateVehicleData): Promise<ServiceResponse<Vehicle[]>> {
    try {
      if (!vehicleIds || vehicleIds.length === 0) {
        return {
          success: false,
          error: 'Vehicle IDs are required'
        };
      }

      if (vehicleIds.length > 100) {
        return {
          success: false,
          error: 'Cannot update more than 100 vehicles at once'
        };
      }

      // Validate update data
      const validation = VehicleValidator.validateUpdateVehicle(updates);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors.join(', ')
        };
      }

      const result = await this.vehicleService.bulkUpdateVehicles(vehicleIds, updates);
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Failed to bulk update vehicles',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}