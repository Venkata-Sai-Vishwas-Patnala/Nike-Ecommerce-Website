-- Create and use database
CREATE DATABASE IF NOT EXISTS nike_store;
USE nike_store;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    email    VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price    INT NOT NULL,
    colors   INT DEFAULT 1,
    image    TEXT NOT NULL
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    user_id    INT NOT NULL,
    total      DECIMAL(10,2) NOT NULL,
    status     ENUM('pending','processing','shipped','delivered') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    order_id   INT NOT NULL,
    product_id INT NOT NULL,
    quantity   INT NOT NULL,
    price      INT NOT NULL,
    FOREIGN KEY (order_id)   REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Seed products
INSERT INTO products (name, category, price, colors, image) VALUES
('Nike Air Max Pulse',    'Men''s Shoes',              13995, 2, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Air Force 1',      'Men''s Shoes',              8295,  3, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Dunk Low Retro',   'Men''s Shoes',              8695,  1, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike React Infinity',   'Women''s Running Shoe',     14995, 2, 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Blazer Mid',       'Women''s Shoes',            9995,  4, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Court Vision',     'Men''s Shoes',              5695,  2, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Air Jordan 1',     'Men''s Basketball Shoes',   12795, 3, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Off-White',        'Limited Edition',           19995, 1, 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike SB Dunk',          'Men''s Skateboarding Shoe', 11495, 2, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Zoom Freak',       'Basketball Shoes',          10995, 3, 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Air Force 1 High', 'Men''s Shoes',              9695,  2, 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'),
('Nike Pegasus Turbo',    'Running Shoes',             15995, 4, 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080');
