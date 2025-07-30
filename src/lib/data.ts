
export type Product = {
  id: string;
  name: string;
  category: string;
  district: string;
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


export const categories = ['All', 'Food', 'Clothing', 'Utensils', 'Handicrafts', 'Electronics', 'Farming'];

export const districts = [
    "All Districts", "Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusa", "Dolakha", "Dolpa", "Doti", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalparasi", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rukum", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchowk", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Terhathum", "Udayapur"
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Ilam Tea',
    category: 'Food',
    district: 'Ilam',
    price: 800,
    cost: 600,
    quantity: 50,
    measurement: '250g pack',
    description: "Savor the authentic taste of the Himalayas with this premium orthodox tea from the rolling hills of Ilam. Known for its delicate floral aroma and muscatel flavor, it's a perfect cup for any time of day.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'tea leaves',
  },
  {
    id: '2',
    name: 'Mustang Apples',
    category: 'Food',
    district: 'Mustang',
    price: 450,
    cost: 300,
    quantity: 40,
    measurement: 'per kg',
    description: "Grown in the high-altitude orchards of Mustang, these apples are renowned for their crisp texture and exceptional sweetness. A healthy and delicious treat, perfect for eating fresh or baking.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'red apples',
  },
  {
    id: '3',
    name: 'Palpali Dhaka Topi',
    category: 'Clothing',
    district: 'Palpa',
    price: 700,
    cost: 500,
    quantity: 30,
    measurement: 'piece',
    description: "Wear a piece of Nepali heritage with this authentic Dhaka Topi from Palpa. Handwoven with intricate geometric patterns, this traditional cap is a symbol of national pride and cultural identity.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'dhaka topi',
  },
  {
    id: '4',
    name: 'Patan Singing Bowl',
    category: 'Handicrafts',
    district: 'Lalitpur',
    price: 3500,
    cost: 2800,
    quantity: 15,
    measurement: 'piece',
    description: "Create a tranquil atmosphere with this handcrafted singing bowl from Patan, the city of fine arts. Used for centuries in meditation and healing, its resonant tones promote relaxation and mindfulness.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'singing bowl',
  },
  {
    id: '5',
    name: 'Jumla Marsi Rice',
    category: 'Food',
    district: 'Jumla',
    price: 300,
    cost: 220,
    quantity: 25,
    measurement: 'per kg',
    description: "Cultivated in the highest rice-growing area on Earth, Jumla's Marsi rice is a unique red variety known for its nutty flavor and health benefits. A nutritious and gluten-free choice for your meals.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'red rice',
  },
  {
    id: '6',
    name: 'Bhaktapur Ju Ju Dhau',
    category: 'Food',
    district: 'Bhaktapur',
    price: 250,
    cost: 180,
    quantity: 20,
    measurement: 'clay pot',
    description: "Indulge in the 'King of Yogurts,' a rich and creamy delicacy from Bhaktapur. Made from buffalo milk and fermented in traditional clay pots, its sweet, thick texture is an unforgettable treat.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'yogurt pot',
  },
  {
    id: '7',
    name: 'Khukuri from Bhojpur',
    category: 'Handicrafts',
    district: 'Bhojpur',
    price: 2800,
    cost: 2200,
    quantity: 10,
    measurement: 'piece',
    description: "Own an authentic piece of Gurkha history with this traditional Khukuri from Bhojpur. Hand-forged by skilled artisans, this iconic curved knife is a powerful tool and a magnificent collector's item.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'khukuri knife',
  },
  {
    id: '8',
    name: 'Mithila Art Painting',
    category: 'Handicrafts',
    district: 'Dhanusa',
    price: 1800,
    cost: 1300,
    quantity: 18,
    measurement: 'piece',
    description: "Adorn your walls with a vibrant Mithila painting from the Janakpur region. Characterized by intricate line drawings and vivid colors, these artworks depict mythological and natural themes.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'folk painting',
  },
  {
    id: '9',
    name: 'Chitwan Honey',
    category: 'Food',
    district: 'Chitwan',
    price: 900,
    cost: 700,
    quantity: 35,
    measurement: '500g jar',
    description: "Pure, raw honey harvested from the nectar of wildflowers in the plains of Chitwan. This natural sweetener is packed with antioxidants and has a rich, complex flavor profile.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'honey jar',
  },
  {
    id: '10',
    name: 'Pashmina Shawl',
    category: 'Clothing',
    district: 'Kathmandu',
    price: 5500,
    cost: 4500,
    quantity: 12,
    measurement: 'piece',
    description: "Wrap yourself in luxury with an exquisitely soft Pashmina shawl from the Kathmandu Valley. Made from the fine wool of Himalayan goats, it provides incredible warmth while being feather-light.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'cashmere shawl',
  },
  {
    id: '11',
    name: 'Tehrathum Handmade Paper',
    category: 'Handicrafts',
    district: 'Terhathum',
    price: 400,
    cost: 250,
    quantity: 100,
    measurement: '10 sheets',
    description: "Eco-friendly and durable Lokta paper from the hills of Tehrathum. Traditionally made from the bark of the Daphne plant, it is perfect for journals, crafts, and official documents.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'handmade paper',
  },
  {
    id: '12',
    name: 'Palpa Karuwa',
    category: 'Utensils',
    district: 'Palpa',
    price: 1600,
    cost: 1200,
    quantity: 22,
    measurement: 'piece',
    description: "A traditional Nepali water jug made from brass, originating from Palpa. The Karuwa is not only a functional item for storing water but also a beautiful piece of craftsmanship for your home.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'brass jug',
  },
  {
    id: '13',
    name: 'Dolkha Organic Coffee',
    category: 'Food',
    district: 'Dolakha',
    price: 1100,
    cost: 850,
    quantity: 28,
    measurement: '250g pack',
    description: "Awaken your senses with aromatic Arabica coffee grown in the mid-hills of Dolkha. This single-origin coffee is known for its smooth body, mild acidity, and hints of citrus and spice.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'coffee beans',
  },
  {
    id: '14',
    name: 'Sunsari Wicker Baskets',
    category: 'Handicrafts',
    district: 'Sunsari',
    price: 950,
    cost: 700,
    quantity: 40,
    measurement: 'set of 3',
    description: "Handwoven wicker baskets from the craftsmen of Sunsari. Versatile and sturdy, these baskets are perfect for storage, decoration, or as eco-friendly shopping bags. Available in a set of three sizes.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'wicker basket',
  },
  {
    id: '15',
    name: 'Solukhumbu Yak Cheese',
    category: 'Food',
    district: 'Solukhumbu',
    price: 750,
    cost: 550,
    quantity: 18,
    measurement: '200g block',
    description: "A hard, savory cheese made from the milk of yaks grazing in the high pastures of the Everest region. Known locally as 'Chhurpi', it has a unique, tangy flavor and a long shelf life.",
    image: 'https://placehold.co/400x300.png',
    dataAiHint: 'cheese block',
  }
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
