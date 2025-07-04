// Vehicle database schema definition
// This would typically use Drizzle ORM syntax, but providing a generic schema structure

export const vehicleSchema = {
  id: {
    type: 'varchar',
    primaryKey: true,
    default: 'uuid()'
  },
  make: {
    type: 'varchar',
    length: 255,
    notNull: true
  },
  model: {
    type: 'varchar',
    length: 255,
    notNull: true
  },
  year: {
    type: 'integer',
    notNull: true,
    check: 'year >= 1900 AND year <= 2030'
  },
  color: {
    type: 'varchar',
    length: 100,
    notNull: true
  },
  licensePlate: {
    type: 'varchar',
    length: 20,
    notNull: true,
    unique: true
  },
  vin: {
    type: 'varchar',
    length: 17,
    notNull: true,
    unique: true
  },
  fuelType: {
    type: 'enum',
    values: ['gasoline', 'diesel', 'electric', 'hybrid'],
    notNull: true
  },
  transmission: {
    type: 'enum',
    values: ['manual', 'automatic'],
    notNull: true
  },
  category: {
    type: 'enum',
    values: ['economy', 'compact', 'mid-size', 'luxury', 'suv', 'truck'],
    notNull: true
  },
  pricePerDay: {
    type: 'decimal',
    precision: 10,
    scale: 2,
    notNull: true,
    check: 'pricePerDay > 0'
  },
  mileage: {
    type: 'integer',
    notNull: true,
    default: 0,
    check: 'mileage >= 0'
  },
  capacity: {
    type: 'integer',
    notNull: true,
    check: 'capacity > 0 AND capacity <= 12'
  },
  isAvailable: {
    type: 'boolean',
    notNull: true,
    default: true
  },
  locationId: {
    type: 'varchar',
    length: 255,
    references: 'locations.id'
  },
  features: {
    type: 'text',
    array: true,
    default: []
  },
  images: {
    type: 'text',
    array: true,
    default: []
  },
  createdAt: {
    type: 'timestamp',
    notNull: true,
    default: 'now()'
  },
  updatedAt: {
    type: 'timestamp',
    notNull: true,
    default: 'now()',
    onUpdate: 'now()'
  }
};

// Indexes for better query performance
export const vehicleIndexes = {
  makeModelIndex: ['make', 'model'],
  categoryIndex: ['category'],
  availabilityIndex: ['isAvailable'],
  locationIndex: ['locationId'],
  priceIndex: ['pricePerDay'],
  yearIndex: ['year']
};