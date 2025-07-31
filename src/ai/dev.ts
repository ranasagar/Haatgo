import { config } from 'dotenv';
config();

import '@/ai/flows/product-recommendations.ts';
import '@/ai/flows/livestream-fetcher.ts';
import '@/ai/flows/notification-flow.ts';
import '@/ai/flows/weather-flow.ts';
