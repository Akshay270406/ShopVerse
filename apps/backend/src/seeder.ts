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
  {
    name: 'Pirate Captain Collectible Figure',
    image: '/images/figurines/pirate-captain.webp',
    description: 'A dynamic anime-style pirate captain collectible with a flowing coat, straw hat, and confident battle-ready pose. Display piece for anime figure collectors.',
    brand: 'Anime Collectibles',
    category: 'Anime Figurines',
    price: 2799,
    countInStock: 8,
    rating: 4.9,
    numReviews: 18,
  },
  {
    name: 'Azure Sorcerer Collectible Figure',
    image: '/images/figurines/azure-sorcerer.webp',
    description: 'A premium anime-style sorcerer figure featuring a dramatic dark outfit, vivid blue accents, and a confident standing pose.',
    brand: 'Anime Collectibles',
    category: 'Anime Figurines',
    price: 3299,
    countInStock: 6,
    rating: 4.8,
    numReviews: 14,
  },
  {
    name: 'Flame Swordsman Collectible Figure',
    image: '/images/figurines/flame-swordsman.webp',
    description: 'A detailed anime-style swordsman collectible with a patterned cloak, katana, and flame-inspired color palette.',
    brand: 'Anime Collectibles',
    category: 'Anime Figurines',
    price: 2599,
    countInStock: 9,
    rating: 4.7,
    numReviews: 21,
  },
  {
    name: 'Silver-Haired Ninja Collectible Figure',
    image: '/images/figurines/silver-haired-ninja.webp',
    description: 'A masked silver-haired ninja figure in a relaxed battle-ready stance, with layered tactical clothing and finely sculpted details.',
    brand: 'Anime Collectibles',
    category: 'Anime Figurines',
    price: 2899,
    countInStock: 7,
    rating: 4.8,
    numReviews: 16,
  },
  {
    name: 'Crimson Mage Collectible Figure',
    image: '/images/figurines/crimson-mage.webp',
    description: 'A fantasy anime-style mage collectible wearing a crimson cloak and ornate accessories, posed with a magical staff.',
    brand: 'Anime Collectibles',
    category: 'Anime Figurines',
    price: 2299,
    countInStock: 10,
    rating: 4.6,
    numReviews: 12,
  },
  {
    name: 'Emerald Archer Collectible Figure',
    image: '/images/figurines/emerald-archer.webp',
    description: 'An elegant fantasy anime-style archer collectible with emerald accents, a detailed bow, and a scenic display base.',
    brand: 'Anime Collectibles',
    category: 'Anime Figurines',
    price: 3499,
    countInStock: 5,
    rating: 4.9,
    numReviews: 11,
  },
];

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Insert missing products only. Existing catalog entries are left untouched.
    let added = 0;
    let alreadyPresent = 0;

    for (const product of sampleProducts) {
      const result = await Product.updateOne(
        { name: product.name },
        { $setOnInsert: product },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        added += 1;
      } else {
        alreadyPresent += 1;
      }
    }

    console.log(
      `Seed complete: added ${added} products; ${alreadyPresent} already existed.`
    );
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
