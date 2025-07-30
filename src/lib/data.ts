export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  dataAiHint: string;
};

export const categories = ['All', 'Food', 'Clothing', 'Utensils', 'Electronics', 'Farming'];

export const products: Product[] = [
  {
    id: '1',
    name: 'Basmati Rice (25kg)',
    category: 'Food',
    price: 3200,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'sack rice',
  },
  {
    id: '2',
    name: 'Sunflower Oil (5L)',
    category: 'Food',
    price: 1100,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'oil bottle',
  },
  {
    id: '3',
    name: 'Warm Fleece Jacket',
    category: 'Clothing',
    price: 1500,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'fleece jacket',
  },
  {
    id: '4',
    name: 'Stainless Steel Pot Set',
    category: 'Utensils',
    price: 2500,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'cooking pots',
  },
  {
    id: '5',
    name: 'Solar Powered Lamp',
    category: 'Electronics',
    price: 800,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'solar lamp',
  },
  {
    id: '6',
    name: 'Durable Farm Shovel',
    category: 'Farming',
    price: 650,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'metal shovel',
  },
  {
    id: '7',
    name: 'Instant Noodles (Box)',
    category: 'Food',
    price: 750,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'instant noodles',
  },
  {
    id: '8',
    name: 'Woolen Shawl',
    category: 'Clothing',
    price: 900,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'woolen shawl',
  },
  {
    id: '9',
    name: 'Pressure Cooker (5L)',
    category: 'Utensils',
    price: 3500,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'pressure cooker',
  },
  {
    id: '10',
    name: 'Portable Radio',
    category: 'Electronics',
    price: 1200,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'portable radio',
  },
    {
    id: '11',
    name: 'Organic Fertilizer (10kg)',
    category: 'Farming',
    price: 950,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'fertilizer bag',
  },
  {
    id: '12',
    name: 'Lentil Soup Mix',
    category: 'Food',
    price: 300,
    image: 'https://placehold.co/400x300',
    dataAiHint: 'lentils bag',
  },
];
