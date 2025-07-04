// Main exports for the vehicle management system

// Types
export * from './types/vehicle.types';

// Schema
export * from './schemas/vehicle.schema';

// Validators
export { VehicleValidator } from './validators/vehicle.validator';

// Services
export { VehicleService } from './services/vehicle.service';

// Controllers
export { VehicleController } from './controllers/vehicle.controller';

// Routes
export * from './routes/vehicle.routes';

// Main initialization function for the vehicle system
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';

/**
 * Initialize the vehicle management system
 * @param database - Drizzle database instance (optional for demo)
 * @returns Initialized controller and service instances
 */
export function initializeVehicleSystem(database?: any) {
  const vehicleService = new VehicleService(database);
  const vehicleController = new VehicleController(vehicleService);
  
  return {
    vehicleService,
    vehicleController
  };
}