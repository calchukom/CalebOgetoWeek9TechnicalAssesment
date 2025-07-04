import { VehicleController } from '../controllers/vehicle.controller';
import { VehicleService } from '../services/vehicle.service';

/**
 * Vehicle Routes Definition
 * 
 * This file defines the REST API endpoints for vehicle management.
 * In a real Express.js application, these would be actual route handlers.
 */

// Initialize service and controller
const vehicleService = new VehicleService();
const vehicleController = new VehicleController(vehicleService);

// Route definitions (Express.js style pseudo-code)
export const vehicleRoutes = {
  // GET /api/vehicles - Get all vehicles with pagination and filters
  'GET /api/vehicles': async (req: any, res: any) => {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      ...filters 
    } = req.query;

    const result = await vehicleController.getAllVehicles(
      parseInt(page), 
      parseInt(limit), 
      sortBy, 
      sortOrder, 
      filters
    );

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  },

  // GET /api/vehicles/available - Get available vehicles for date range
  'GET /api/vehicles/available': async (req: any, res: any) => {
    const { startDate, endDate, locationId } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required'
      });
    }

    const result = await vehicleController.getAvailableVehicles(startDate, endDate, locationId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  },

  // GET /api/vehicles/statistics - Get vehicle statistics
  'GET /api/vehicles/statistics': async (_req: any, res: any) => {
    const result = await vehicleController.getVehicleStatistics();

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(500).json(result);
    }
  },

  // GET /api/vehicles/popular - Get popular vehicles
  'GET /api/vehicles/popular': async (req: any, res: any) => {
    const { limit = 10 } = req.query;

    const result = await vehicleController.getPopularVehicles(parseInt(limit));

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  },

  // GET /api/vehicles/:id - Get vehicle by ID
  'GET /api/vehicles/:id': async (req: any, res: any) => {
    const { id } = req.params;

    const result = await vehicleController.getVehicleById(id);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  },

  // POST /api/vehicles - Create new vehicle
  'POST /api/vehicles': async (req: any, res: any) => {
    const vehicleData = req.body;

    const result = await vehicleController.createVehicle(vehicleData);

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  },

  // PUT /api/vehicles/:id - Update vehicle
  'PUT /api/vehicles/:id': async (req: any, res: any) => {
    const { id } = req.params;
    const updates = req.body;

    const result = await vehicleController.updateVehicle(id, updates);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  },

  // DELETE /api/vehicles/:id - Delete vehicle
  'DELETE /api/vehicles/:id': async (req: any, res: any) => {
    const { id } = req.params;

    const result = await vehicleController.deleteVehicle(id);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  },

  // PATCH /api/vehicles/:id/toggle-availability - Toggle vehicle availability
  'PATCH /api/vehicles/:id/toggle-availability': async (req: any, res: any) => {
    const { id } = req.params;

    const result = await vehicleController.toggleAvailability(id);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  },

  // PATCH /api/vehicles/bulk-update - Bulk update vehicles
  'PATCH /api/vehicles/bulk-update': async (req: any, res: any) => {
    const { vehicleIds, updates } = req.body;

    if (!vehicleIds || !Array.isArray(vehicleIds)) {
      return res.status(400).json({
        success: false,
        error: 'Vehicle IDs array is required'
      });
    }

    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Updates object is required'
      });
    }

    const result = await vehicleController.bulkUpdateVehicles(vehicleIds, updates);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  }
};

// Export route handlers for use in Express.js app
export const setupVehicleRoutes = (_app: any) => {
  // In a real Express.js application, you would register these routes like:
  /*
  app.get('/api/vehicles', vehicleRoutes['GET /api/vehicles']);
  app.get('/api/vehicles/available', vehicleRoutes['GET /api/vehicles/available']);
  app.get('/api/vehicles/statistics', vehicleRoutes['GET /api/vehicles/statistics']);
  app.get('/api/vehicles/popular', vehicleRoutes['GET /api/vehicles/popular']);
  app.get('/api/vehicles/:id', vehicleRoutes['GET /api/vehicles/:id']);
  app.post('/api/vehicles', vehicleRoutes['POST /api/vehicles']);
  app.put('/api/vehicles/:id', vehicleRoutes['PUT /api/vehicles/:id']);
  app.delete('/api/vehicles/:id', vehicleRoutes['DELETE /api/vehicles/:id']);
  app.patch('/api/vehicles/:id/toggle-availability', vehicleRoutes['PATCH /api/vehicles/:id/toggle-availability']);
  app.patch('/api/vehicles/bulk-update', vehicleRoutes['PATCH /api/vehicles/bulk-update']);
  */
};

// Export controller and service for external use
export { vehicleController, vehicleService };