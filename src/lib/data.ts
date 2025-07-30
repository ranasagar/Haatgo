
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
    description: "Premium quality long-grain Basmati rice, perfect for biryani and pulao.",
    image: 'https://storage.googleapis.com/haatgo-store-images/rice-bag.png',
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
    description: "Light and healthy sunflower oil, ideal for everyday cooking and frying.",
    image: 'https://storage.googleapis.com/haatgo-store-images/sunflower-oil.png',
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
    description: "Cozy and comfortable fleece jacket to keep you warm during chilly weather.",
    image: 'https://storage.googleapis.com/haatgo-store-images/fleece-jacket.png',
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
    description: "A complete set of durable stainless steel pots for all your cooking needs.",
    image: 'https://storage.googleapis.com/haatgo-store-images/pot-set.png',
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
    description: "Eco-friendly solar-powered lamp, provides bright light during power outages.",
    image: 'https://storage.googleapis.com/haatgo-store-images/solar-lamp.png',
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
    description: "Heavy-duty shovel designed for farming and gardening tasks.",
    image: 'https://storage.googleapis.com/haatgo-store-images/shovel.png',
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
    description: "A box of delicious and convenient instant noodles for a quick meal.",
    image: 'https://storage.googleapis.com/haatgo-store-images/instant-noodles.png',
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
    description: "Elegant and warm woolen shawl, perfect for cool evenings.",
    image: 'https://storage.googleapis.com/haatgo-store-images/shawl.png',
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
    description: "A 5-liter pressure cooker that saves time and energy in the kitchen.",
    image: 'https://storage.googleapis.com/haatgo-store-images/pressure-cooker.png',
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
    description: "A compact and portable radio with AM/FM reception.",
    image: 'https://storage.googleapis.com/haatgo-store-images/radio.png',
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
    description: "Enrich your soil with this high-quality organic fertilizer for healthier plants.",
    image: 'https://storage.googleapis.com/haatgo-store-images/fertilizer.png',
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
    description: "A ready-to-cook lentil soup mix, nutritious and easy to prepare.",
    image: 'https://storage.googleapis.com/haatgo-store-images/lentils.png',
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
