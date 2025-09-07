import { Product, Vendor, Buyer, Conversation, Review } from './types';

export const BUYERS: Buyer[] = [
  {
    id: 1,
    name: 'Adewale Adeyemi',
    location: 'Ikeja, Lagos',
  }
];

export const VENDORS: Vendor[] = [
  {
    id: 1,
    name: 'Kano Plains',
    location: 'Kano State',
    bio: 'Pioneers in rice cultivation, Kano Plains brings you the finest grains directly from the fertile fields of Northern Nigeria. Committed to sustainable and traditional farming methods.',
    rating: 4.8,
    impactStory: 'By sourcing directly from Kano Plains, you help fund a local irrigation project that has empowered over 50 farming families, ensuring water security for future harvests.'
  },
  {
    id: 2,
    name: 'Delta Growers',
    location: 'Delta State',
    bio: 'From the heart of the Niger Delta, we specialize in rich, authentic palm oil. Our groves have been passed down through generations, ensuring premium quality with every bottle.',
    rating: 4.9,
    impactStory: 'Your purchase supports our co-op\'s initiative to provide educational materials to children in our community, helping to build a brighter future beyond the farm.'
  },
  {
    id: 3,
    name: 'Benue Farms',
    location: 'Benue State',
    bio: 'Known as the food basket of the nation, Benue Farms delivers the freshest maize and yams. We pride ourselves on organic practices and empowering local communities.',
    rating: 4.7,
    impactStory: 'Epla has enabled us to invest in better storage facilities, reducing post-harvest losses by 30% and ensuring more of our hard work reaches your table.'
  },
  {
    id: 4,
    name: 'Ogun Processors',
    location: 'Ogun State',
    bio: 'Masters of cassava processing, we produce the crispiest and most authentic Ijebu Garri. Our traditional techniques guarantee the classic taste you love.',
    rating: 4.8,
    impactStory: 'We are a women-led cooperative. Every bag of Garri sold helps us provide financial literacy and business training to our members, fostering female entrepreneurship.'
  },
   {
    id: 5,
    name: 'Edo Plantations',
    location: 'Edo State',
    bio: 'Our lush plantations provide the sweetest and most wholesome plantains. We are dedicated to providing healthy and delicious produce for families everywhere.',
    rating: 4.6,
    impactStory: 'Through our partnership with Epla, we have been able to adopt more sustainable farming practices, protecting the rich biodiversity of our region for generations to come.'
  },
  {
    id: 6,
    name: 'Oyo Growers',
    location: 'Oyo State',
    bio: 'Specializing in nuts and natural butters, Oyo Growers brings you healthy snacks sourced ethically from local cooperatives.',
    rating: 4.9,
    impactStory: 'Our co-op ensures fair wages for all our nut harvesters. Your support helps us maintain this commitment to ethical and equitable local commerce.'
  }
];


export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Nigerian Rice',
    vendorId: 1,
    price: 18000,
    imageUrl: 'https://images.pexels.com/photos/6731633/pexels-photo-6731633.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: '5kg bag',
    stock: 50,
    category: 'Grains & Rice',
    origin: 'Kano State'
  },
  {
    id: 2,
    name: 'Red Palm Oil',
    vendorId: 2,
    price: 3500,
    imageUrl: 'https://i.imgur.com/2s3v4Xb.jpeg',
    unit: 'liter',
    stock: 35,
    category: 'Oils & Spices',
    origin: 'Delta State'
  },
  {
    id: 3,
    name: 'Yellow Maize',
    vendorId: 3,
    price: 1200,
    imageUrl: 'https://images.pexels.com/photos/547264/pexels-photo-547264.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    stock: 120,
    category: 'Grains & Rice',
    origin: 'Benue State'
  },
  {
    id: 4,
    name: 'Ijebu Garri',
    vendorId: 4,
    price: 2500,
    imageUrl: 'https://i.imgur.com/KzDq2s9.jpeg',
    unit: '2kg bag',
    stock: 80,
    category: 'Yams & Tubers',
    origin: 'Ogun State'
  },
  {
    id: 5,
    name: 'Puna Yam',
    vendorId: 3,
    price: 2000,
    imageUrl: 'https://images.pexels.com/photos/8979929/pexels-photo-8979929.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'tuber',
    stock: 150,
    category: 'Yams & Tubers',
    origin: 'Benue State'
  },
  {
    id: 6,
    name: 'Ripe Plantain',
    vendorId: 5,
    price: 1500,
    imageUrl: 'https://images.pexels.com/photos/2872883/pexels-photo-2872883.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'bunch',
    stock: 60,
    category: 'Fruits',
    origin: 'Edo State'
  },
  {
    id: 7,
    name: 'Fresh Cassava',
    vendorId: 4,
    price: 800,
    imageUrl: 'https://images.pexels.com/photos/8979927/pexels-photo-8979927.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    stock: 200,
    category: 'Yams & Tubers',
    origin: 'Ogun State'
  },
  {
    id: 8,
    name: 'Oloyin Beans',
    vendorId: 1,
    price: 2200,
    imageUrl: 'https://images.pexels.com/photos/10554278/pexels-photo-10554278.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    stock: 95,
    category: 'Grains & Rice',
    origin: 'Kano State'
  },
  {
    id: 9,
    name: 'Cashew Nuts',
    vendorId: 6,
    price: 4500,
    imageUrl: 'https://images.pexels.com/photos/3331093/pexels-photo-3331093.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    stock: 40,
    category: 'Grains & Rice',
    origin: 'Oyo State'
  },
  {
    id: 10,
    name: 'Fresh Tomatoes',
    vendorId: 3,
    price: 1800,
    imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'kg',
    stock: 70,
    category: 'Vegetables',
    origin: 'Benue State'
  },
  {
    id: 11,
    name: 'Spinach (Efo)',
    vendorId: 5,
    price: 500,
    imageUrl: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
    unit: 'bunch',
    stock: 90,
    category: 'Vegetables',
    origin: 'Edo State'
  }
];

export const BUNDLES: Product[] = [
  {
    id: 101,
    name: 'Family Box',
    vendorId: 0, // 0 for Epla-curated
    price: 25000,
    imageUrl: 'https://i.imgur.com/e3rJpYh.jpeg',
    unit: 'box',
    stock: 20,
    category: 'Bundles & Packs',
    origin: 'Curated by Epla',
    description: 'A perfect mix of essentials for a family of four. Includes Rice, Beans, Garri, and Palm Oil.'
  },
  {
    id: 102,
    name: 'Student Survival Pack',
    vendorId: 0,
    price: 15000,
    imageUrl: 'https://i.imgur.com/e3rJpYh.jpeg',
    unit: 'pack',
    stock: 30,
    category: 'Bundles & Packs',
    origin: 'Curated by Epla',
    description: 'All the staples a student needs for quick, nourishing meals. Includes Garri, Plantain, and Cashew Nuts.'
  },
  {
    id: 103,
    name: 'Mama\'s Kitchen Box',
    vendorId: 0,
    price: 32000,
    imageUrl: 'https://i.imgur.com/e3rJpYh.jpeg',
    unit: 'box',
    stock: 15,
    category: 'Bundles & Packs',
    origin: 'Curated by Epla',
    description: 'A comprehensive selection for the family cook. Includes Yam, Palm Oil, Rice, Beans, and Maize.'
  }
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    buyerId: 1,
    vendorId: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 1,
        senderType: 'buyer',
        text: 'Hello, is the 5kg Nigerian Rice the same as Ofada rice?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: 'msg-2',
        senderId: 1,
        senderType: 'vendor',
        text: 'Hi Adewale, thanks for asking! It\'s a high-quality long-grain rice, but not Ofada. We do have Ofada rice coming in stock next week if you\'re interested.',
        timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
      }
    ],
    lastMessageTimestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    unreadByBuyer: 0,
    unreadByVendor: 0,
  }
];

export const REVIEWS: Review[] = [
  {
    id: 1,
    vendorId: 1,
    reviewerName: 'Aisha Bello',
    rating: 5,
    comment: 'The Kano Plains rice is the best I have ever cooked. So clean and it swells perfectly. My family loves it!',
    date: '2024-07-15',
  },
  {
    id: 2,
    vendorId: 1,
    reviewerName: 'Chinedu Okoro',
    rating: 4,
    comment: 'Good quality rice, but delivery took a day longer than expected. Still, I would buy again.',
    date: '2024-07-12',
  },
  {
    id: 3,
    vendorId: 2,
    reviewerName: 'Funke Adebayo',
    rating: 5,
    comment: 'This is the real deal! The palm oil has that authentic, rich flavor I remember from my childhood. Excellent quality from Delta Growers.',
    date: '2024-07-18',
  },
  {
    id: 4,
    vendorId: 4,
    reviewerName: 'Ibrahim Musa',
    rating: 5,
    comment: 'The Ijebu Garri is fantastic. Crispy, sour, and perfect for soaking. Reminds me of home. Thank you, Ogun Processors!',
    date: '2024-07-20',
  },
  {
    id: 5,
    vendorId: 4,
    reviewerName: 'Ngozi Eze',
    rating: 4,
    comment: 'Very good Garri. The packaging was secure and it arrived quickly. I will be a repeat customer.',
    date: '2024-07-11',
  },
  {
    id: 6,
    vendorId: 3,
    reviewerName: 'Adewale Adeyemi',
    rating: 5,
    comment: 'The yams from Benue Farms are massive and very tasty. No bruises, perfectly fresh. I am very impressed with the quality.',
    date: '2024-07-19',
  }
];