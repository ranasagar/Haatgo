-- HaatGo Supabase Database Schema
-- This script sets up all the necessary tables for the application.
-- You can run this script in your Supabase SQL Editor.

-- 1. Users Table
-- This table stores public user profile information and is linked to the authentication service.
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'Customer',
    status TEXT NOT NULL DEFAULT 'Active',
    address TEXT,
    lat TEXT,
    lon TEXT,
    whatsapp TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.users IS 'Stores public user profile information.';

-- 2. Products Table
-- Manages the inventory of products available for sale.
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT,
    district TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    cost NUMERIC(10, 2) DEFAULT 0,
    quantity INT NOT NULL DEFAULT 0,
    measurement TEXT,
    status TEXT DEFAULT 'active',
    description TEXT,
    image TEXT,
    data_ai_hint TEXT,
    tags TEXT[],
    bulk_price NUMERIC(10, 2),
    bulk_quantity INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.products IS 'Stores all product information and inventory.';

-- 3. Orders Table
-- Records all orders placed by users.
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INT NOT NULL,
    district TEXT,
    status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Confirmed, On the Way, Delivered
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.orders IS 'Tracks customer orders.';

-- 4. Routes Table
-- Defines the main routes the seller will travel.
CREATE TABLE IF NOT EXISTS public.routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    start_location TEXT,
    end_location TEXT,
    is_round_trip BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.routes IS 'Defines seller travel routes.';

-- 5. Route Stops Table
-- Defines the individual stops within a route.
CREATE TABLE IF NOT EXISTS public.route_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES public.routes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    stop_order INT NOT NULL, -- To maintain the order of stops
    arrival_date DATE,
    arrival_time TIME,
    passed BOOLEAN DEFAULT FALSE,
    lat NUMERIC(9, 6),
    lon NUMERIC(9, 6),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.route_stops IS 'Stores individual stops for each route.';

-- 6. Deliveries Table
-- Tracks the delivery of orders to customers.
CREATE TABLE IF NOT EXISTS public.deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    customer_name TEXT,
    address TEXT,
    lat NUMERIC(9, 6),
    lon NUMERIC(9, 6),
    status TEXT NOT NULL DEFAULT 'Pending', -- Pending, Out for Delivery, Completed
    driver TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.deliveries IS 'Manages the delivery of products to customers.';

-- 7. Parcels Table
-- Manages the user-to-user courier service.
CREATE TABLE IF NOT EXISTS public.parcels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_stop TEXT NOT NULL,
    to_stop TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    sender_phone TEXT,
    receiver_name TEXT NOT NULL,
    receiver_phone TEXT,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'Pending', -- Pending, On the Way, Ready for Pickup, Completed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.parcels IS 'Manages the user-to-user parcel delivery service.';

-- 8. Reviews Table
-- Stores customer reviews for products.
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    user_name TEXT,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    text TEXT,
    images TEXT[],
    review_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMENT ON TABLE public.reviews IS 'Stores customer product reviews.';

-- Enable Row Level Security (RLS) for all tables
-- This is a security best practice. You should define policies below.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parcels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;


-- Basic RLS Policies (Example - You should customize these)
-- Allow public read access to products, routes, and reviews
CREATE POLICY "Allow public read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on routes" ON public.routes FOR SELECT USING (true);
CREATE POLICY "Allow public read access on route_stops" ON public.route_stops FOR SELECT USING (true);
CREATE POLICY "Allow public read access on reviews" ON public.reviews FOR SELECT USING (true);

-- Allow users to see their own user data
CREATE POLICY "Allow individual read access on users" ON public.users FOR SELECT USING (auth.uid() = id);

-- Allow users to see their own orders
CREATE POLICY "Allow individual read access on orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);

-- Allow users to insert their own orders and reviews
CREATE POLICY "Allow individual insert on orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow individual insert on reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- NOTE: You will need to create more specific policies for admin roles
-- and for writing/updating data in a production environment.
-- Example for allowing an admin to do anything (use with caution):
-- CREATE POLICY "Allow admin full access" ON public.products FOR ALL USING (
--   (SELECT role FROM public.users WHERE id = auth.uid()) = 'Admin'
-- );