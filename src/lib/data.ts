
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  measurement: string;
  description?: string;
  image: string;
  dataAiHint: string;
};

export const categories = ['All', 'Food', 'Clothing', 'Utensils', 'Electronics', 'Farming'];

export const products: Product[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Food',
    price: 3200,
    cost: 2800,
    quantity: 15,
    measurement: '25kg bag',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'sack rice',
  },
  {
    id: '2',
    name: 'Sunflower Oil',
    category: 'Food',
    price: 1100,
    cost: 950,
    quantity: 30,
    measurement: '5L bottle',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'oil bottle',
  },
  {
    id: '3',
    name: 'Warm Fleece Jacket',
    category: 'Clothing',
    price: 1500,
    cost: 1100,
    quantity: 20,
    measurement: 'piece',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'fleece jacket',
  },
  {
    id: '4',
    name: 'Stainless Steel Pot Set',
    category: 'Utensils',
    price: 2500,
    cost: 2000,
    quantity: 5,
    measurement: 'set',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'cooking pots',
  },
  {
    id: '5',
    name: 'Solar Powered Lamp',
    category: 'Electronics',
    price: 800,
    cost: 500,
    quantity: 25,
    measurement: 'piece',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'solar lamp',
  },
  {
    id: '6',
    name: 'Durable Farm Shovel',
    category: 'Farming',
    price: 650,
    cost: 400,
    quantity: 0,
    measurement: 'piece',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'metal shovel',
  },
  {
    id: '7',
    name: 'Instant Noodles',
    category: 'Food',
    price: 750,
    cost: 600,
    quantity: 50,
    measurement: 'box',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'instant noodles',
  },
  {
    id: '8',
    name: 'Woolen Shawl',
    category: 'Clothing',
    price: 900,
    cost: 650,
    quantity: 18,
    measurement: 'piece',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'woolen shawl',
  },
  {
    id: '9',
    name: 'Pressure Cooker',
    category: 'Utensils',
    price: 3500,
    cost: 2900,
    quantity: 8,
    measurement: '5L',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'pressure cooker',
  },
  {
    id: '10',
    name: 'Portable Radio',
    category: 'Electronics',
    price: 1200,
    cost: 900,
    quantity: 12,
    measurement: 'piece',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'portable radio',
  },
    {
    id: '11',
    name: 'Organic Fertilizer',
    category: 'Farming',
    price: 950,
    cost: 700,
    quantity: 22,
    measurement: '10kg bag',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'fertilizer bag',
  },
  {
    id: '12',
    name: 'Lentil Soup Mix',
    category: 'Food',
    price: 300,
    cost: 220,
    quantity: 40,
    measurement: 'pack',
    image: 'https://placehold.co/400x300',
    dataAiHint: 'lentils bag',
  },
];
