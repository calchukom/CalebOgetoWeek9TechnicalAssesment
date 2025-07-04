# Vehicle Management Service

A comprehensive TypeScript-based vehicle management system with clean architecture, proper validation, and full type safety.

## Overview

This vehicle service provides a complete backend solution for managing vehicles in a rental or fleet management system. It follows best practices with proper separation of concerns, comprehensive validation, and robust error handling.

## Architecture

```
src/backend/
├── types/           # TypeScript type definitions
├── schemas/         # Database schema definitions (Drizzle ORM compatible)
├── validators/      # Input validation logic
├── services/        # Business logic layer
├── controllers/     # HTTP request handlers
├── routes/          # API route definitions
└── index.ts         # Main export file
```

## Features

### ✅ Complete Service Implementation
- **Vehicle CRUD Operations**: Create, read, update, delete vehicles
- **Advanced Filtering**: Filter by make, model, category, fuel type, price range, etc.
- **Pagination & Sorting**: Efficient data retrieval with sorting options
- **Availability Management**: Check vehicle availability for date ranges
- **Statistics & Analytics**: Get vehicle fleet statistics and popular vehicles
- **Bulk Operations**: Update multiple vehicles simultaneously

### ✅ Type Safety
- Comprehensive TypeScript interfaces for all data structures
- Proper return types for all service methods
- Type-safe error handling with `ServiceResponse<T>` pattern

### ✅ Validation
- Input validation for all vehicle data
- Date range validation for availability checks
- Pagination parameter validation
- Filter validation with proper error messages

### ✅ Error Handling
- Consistent error response format
- Proper error propagation from service to controller
- Descriptive error messages for debugging

### ✅ Controller Compatibility
All service methods match the controller expectations exactly:

- `getAllVehicles(page, limit, sortBy, sortOrder, filters)`
- `getAvailableVehicles(startDate, endDate, locationId?)`
- `getVehicleById(id)`
- `createVehicle(vehicleData)`
- `updateVehicle(id, updates)`
- `deleteVehicle(id)`
- `getVehicleStatistics()`
- `getPopularVehicles(limit)`
- `toggleAvailability(id)`
- `bulkUpdateVehicles(vehicleIds, updates)`

## Usage Examples

### Initialize the System

```typescript
import { initializeVehicleSystem } from './src/backend';

// Initialize with optional database connection
const { vehicleService, vehicleController } = initializeVehicleSystem(databaseConnection);
```

### Get All Vehicles with Filtering

```typescript
const result = await vehicleController.getAllVehicles(
  1,     // page
  10,    // limit
  'year', // sortBy
  'desc', // sortOrder
  {      // filters
    category: 'luxury',
    fuelType: 'electric',
    minPrice: 50,
    maxPrice: 200
  }
);

if (result.success) {
  console.log(`Found ${result.data.vehicles.length} vehicles`);
  console.log(`Total pages: ${result.data.totalPages}`);
}
```

### Check Vehicle Availability

```typescript
const availableVehicles = await vehicleController.getAvailableVehicles(
  '2024-07-10',
  '2024-07-15',
  'location-id-123'
);

if (availableVehicles.success) {
  console.log(`${availableVehicles.data.length} vehicles available`);
}
```

### Create a New Vehicle

```typescript
const newVehicle = await vehicleController.createVehicle({
  make: 'Tesla',
  model: 'Model 3',
  year: 2023,
  color: 'White',
  licensePlate: 'TESLA-123',
  vin: '5YJ3E1EA0KF123456',
  fuelType: 'electric',
  transmission: 'automatic',
  category: 'luxury',
  pricePerDay: 120,
  mileage: 5000,
  capacity: 5,
  features: ['Autopilot', 'Supercharging']
});
```

### Get Vehicle Statistics

```typescript
const stats = await vehicleController.getVehicleStatistics();

if (stats.success) {
  console.log(`Total vehicles: ${stats.data.totalVehicles}`);
  console.log(`Available: ${stats.data.availableVehicles}`);
  console.log(`Average price: $${stats.data.averagePrice}`);
  console.log(`Most popular category: ${stats.data.mostPopularCategory}`);
}
```

## API Response Format

All service methods return a consistent response format:

```typescript
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Vehicle ID is required"
}
```

## Validation Rules

### Vehicle Creation
- **Make, Model, Color**: Required, non-empty strings
- **Year**: Must be between 1900 and 2030
- **VIN**: Must be valid 17-character format
- **License Plate**: Required, alphanumeric with dashes/spaces
- **Price**: Must be greater than 0
- **Capacity**: Must be between 1 and 12
- **Fuel Type**: Must be one of: gasoline, diesel, electric, hybrid
- **Transmission**: Must be: manual or automatic
- **Category**: Must be one of: economy, compact, mid-size, luxury, suv, truck

### Filtering
- **Price Range**: Min/Max prices must be positive, min ≤ max
- **Year Range**: Years must be valid range between 1900-2030
- **Category/Fuel Type**: Must match predefined enums

### Pagination
- **Page**: Must be ≥ 1
- **Limit**: Must be between 1 and 100

## Database Schema

The system is designed to work with Drizzle ORM and includes a complete schema definition with:
- Primary key (UUID)
- Foreign key relationships (locationId)
- Proper constraints and validations
- Indexes for optimal query performance

## Testing

Run the included test suite to verify functionality:

```bash
npx tsx src/backend/test-vehicle-service.ts
```

The test suite covers:
- ✅ All CRUD operations
- ✅ Filtering and pagination
- ✅ Validation error handling
- ✅ Availability checking
- ✅ Statistics calculation
- ✅ Bulk operations

## Integration

### Express.js Integration

```typescript
import express from 'express';
import { setupVehicleRoutes } from './src/backend/routes/vehicle.routes';

const app = express();
app.use(express.json());

// Set up vehicle routes
setupVehicleRoutes(app);

app.listen(3000, () => {
  console.log('Vehicle service running on port 3000');
});
```

### Database Integration

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import { VehicleService } from './src/backend/services/vehicle.service';

const db = drizzle(/* database connection */);
const vehicleService = new VehicleService(db);
```

## Key Benefits

1. **🏗️ Clean Architecture**: Proper separation of concerns with distinct layers
2. **🔒 Type Safety**: Full TypeScript support with comprehensive type definitions
3. **✅ Validation**: Robust input validation at all levels
4. **🛡️ Error Handling**: Consistent error handling with proper error propagation
5. **📊 Comprehensive**: All required methods implemented and tested
6. **🔄 Compatible**: Fully compatible with controller, routes, schema, and validator
7. **🚀 Production Ready**: Follows best practices for maintainable, scalable code

## Future Enhancements

- Add caching layer for improved performance
- Implement real-time availability updates
- Add comprehensive logging and monitoring
- Support for vehicle reservations and bookings
- Advanced search with full-text capabilities
- Image upload and management for vehicle photos