export type GoalType = 'Muscle Gain' | 'Fat Loss' | 'Endurance';
export type ProductType = 'Apparel' | 'Hardware' | 'Supplements';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  type: ProductType;
  goal: GoalType;
  image: string;
  rating: number;
  ratingCount: number;
  isLimitedBatch: boolean;
  isAthleteApproved: boolean;
  isLimitedEdition: boolean;
  stockCount: number;
  description: string;
  sizes?: string[];
  weights?: string[];
  colors?: string[];
  features: string[];
}

export interface DigitalProgram {
  id: string;
  name: string;
  price: number;
  duration: string;
  goal: GoalType;
  image: string;
  rating: number;
  description: string;
  curriculumSneakPeek: string[];
  instructorId: string;
  difficulty: 'Intermediate' | 'Advanced' | 'Elite Hardcore';
}

export interface Athlete {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  favoriteProductIds: string[];
  quote: string;
}

export interface TransformationStory {
  id: string;
  name: string;
  age: number;
  achievement: string;
  story: string;
  beforeWeight: string;
  afterWeight: string;
  timeframe: string;
  imageBefore: string;
  imageAfter: string;
  pinnedProductIds: string[];
  isVerifiedBuyer: boolean;
}

export interface CartItem {
  product?: Product;
  program?: DigitalProgram;
  selectedSize?: string;
  selectedWeight?: string;
  selectedColor?: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    type: 'physical' | 'digital';
  }[];
  total: number;
  status: 'Dispatched' | 'Completed' | 'Processing';
  trackingNumber?: string;
  ironPointsEarned: number;
}

export interface UserAccount {
  name: string;
  email: string;
  ironPoints: number;
  orders: Order[];
  unlockedPrograms: string[]; // ID of DigitalPrograms
}
