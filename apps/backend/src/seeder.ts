import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db';
import Product from './models/product.model';

// Sample data
const sampleProducts = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 13 Pro 256GB',
    image: '/images/iphone13.jpg',
    description:
      'Introducing the iPhone 13 Pro. A transformative triple-camera system.',
    brand: 'Apple',
    category: 'Electronics',
    price: 999.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
];

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Never overwrite existing products or users when seeding.
    const existingProducts = await Product.countDocuments();
    if (existingProducts > 0) {
      console.log('Seed skipped: products already exist in this database.');
      return;
    }

    await Product.insertMany(sampleProducts);
    console.log('Data imported!');
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

// Destructive reset is intentionally disabled to protect existing data.
const destroyData = async () => {
  console.error(
    'Seed destroy is disabled: this command must not delete existing products or users.'
  );
  process.exitCode = 1;
};

if (process.argv[2] === '-d') {
  void destroyData();
} else {
  void importData();
}
