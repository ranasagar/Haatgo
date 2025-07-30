
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

export type Order = {
  id: string;
  product: string;
  status: 'Pending' | 'Confirmed' | 'On the Way' | 'Delivered';
  date: string;
  amount: number;
}

export type Delivery = {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  lat: number;
  lon: number;
  status: 'Pending' | 'Out for Delivery' | 'Completed';
  driver: string;
};

export type Parcel = {
  id: string;
  fromStop: string;
  toStop: string;
  senderName: string;
  senderPhone: string;
  receiverName: string;
  receiverPhone: string;
  description: string;
  status: 'Pending' | 'On the Way' | 'Ready for Pickup' | 'Completed';
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
    description: "Experience the aromatic and flavorful world of authentic Basmati rice. Our premium quality long-grain rice is perfect for creating fluffy biryanis, pilafs, and everyday rice dishes that will delight your family.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Make your meals healthier and tastier with our pure Sunflower Oil. Light, versatile, and rich in Vitamin E, it's the ideal choice for frying, sautéing, and creating delicious salad dressings.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Stay cozy and protected from the cold with this soft fleece jacket. Perfect for misty mornings and cool evenings, its lightweight design provides excellent warmth without the bulk. A must-have for any wardrobe.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Upgrade your kitchen with this durable and elegant stainless steel pot set. Featuring three different sizes with matching lids, this set is perfect for cooking everything from curries to stews. Easy to clean and built to last.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Never be left in the dark again. This eco-friendly solar-powered lamp provides hours of bright, reliable light on a single day's charge. It's perfect for homes, shops, and for studying during power outages.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Tackle any digging task with confidence. This heavy-duty farm shovel features a hardened steel blade and a sturdy wooden handle, making it the perfect tool for farming, gardening, and construction.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Enjoy a hot, delicious meal in minutes with this family-sized box of instant noodles. Packed with savory flavor, it's the perfect solution for a quick lunch, dinner, or satisfying snack.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Wrap yourself in comfort and style with this beautifully crafted woolen shawl. Its soft texture and elegant design make it a versatile accessory for any occasion, providing warmth on a chilly day.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Cook meals faster while saving fuel with this high-quality 5-liter pressure cooker. Equipped with modern safety features, it makes cooking beans, lentils, and meats quicker and more convenient than ever.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Stay connected to news, music, and entertainment with this compact AM/FM portable radio. With its long-lasting battery life and clear reception, it's the perfect companion for your home or while on the move.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Boost your crop yield and enrich your soil with our premium organic fertilizer. Made from natural ingredients, it provides essential nutrients for healthier plants and more abundant harvests. Safe for all types of plants.",
    image: 'https://placehold.co/400x300.png',
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
    description: "Create a wholesome and nutritious dal in no time with our ready-to-cook lentil soup mix. This blend of high-quality lentils and spices is a convenient way to prepare a delicious and healthy meal for your family.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'lentils bag',
  },
];


export const deliveries: Delivery[] = [
    {
        id: "1",
        orderId: "#1004",
        customerName: "Ramesh Thapa",
        address: "Bhedetar, Dhankuta",
        lat: 26.9167,
        lon: 87.3167,
        status: "Out for Delivery",
        driver: "Ram Kumar"
    },
    {
        id: "2",
        orderId: "#1005",
        customerName: "Sunita Rai",
        address: "Chisapani, Ilam",
        lat: 26.9833,
        lon: 87.1333,
        status: "Completed",
        driver: "Ram Kumar"
    },
    {
        id: "3",
        orderId: "#1003",
        customerName: "Gita Gurung",
        address: "Sankhejung, Ilam",
        lat: 27.0194,
        lon: 87.8044,
        status: "Pending",
        driver: "Sita Devi"
    }
];

export const routeStops = [
  { name: "Chisapani Market", lat: 26.9833, lon: 87.1333 },
  { name: "Bhedetar Junction", lat: 26.9167, lon: 87.3167 },
  { name: "Sankhejung Village", lat: 27.0194, lon: 87.8044 },
];

export const parcels: Parcel[] = [
    {
        id: "P1",
        fromStop: "Chisapani Market",
        toStop: "Sankhejung Village",
        senderName: "Bikash",
        senderPhone: "9812345678",
        receiverName: "Srijana",
        receiverPhone: "9887654321",
        description: "Important Documents",
        status: "On the Way"
    },
];

export const initialOrders: Order[] = [
  { id: "#1005", product: "Warm Fleece Jacket", status: "Delivered", date: "2023-06-27", amount: 1500.00 },
  { id: "#1004", product: "Stainless Steel Pot Set", status: "On the Way", date: "2023-06-26", amount: 2500.00 },
  { id: "#1003", product: "Basmati Rice (25kg)", status: "Confirmed", date: "2023-06-25", amount: 3200.00 },
];
