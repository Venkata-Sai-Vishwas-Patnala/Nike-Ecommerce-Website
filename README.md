# 🏃‍♂️ Nike E-Commerce Website

A modern, full-stack e-commerce website for Nike products built with React, TypeScript, and PHP. This project features a sleek UI inspired by Nike's design language, complete with product browsing, shopping cart, user authentication, and order management.

![Nike E-Commerce](./screenshots/Screenshot%202026-05-25%20003656.png)

## 🌟 Features

- **Product Catalog**: Browse through a collection of Nike shoes with detailed information
- **Shopping Cart**: Add products to cart, update quantities, and manage items
- **User Authentication**: Register and login functionality with session management
- **Order Management**: Place orders and track order history
- **Responsive Design**: Fully responsive UI that works on all devices
- **Modern UI Components**: Built with Radix UI and Tailwind CSS
- **Real-time Updates**: Dynamic cart updates and product filtering

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/Screenshot%202026-05-25%20003656.png)

### Product Catalog
![Product Catalog](./screenshots/Screenshot%202026-05-25%20003709.png)

### Shopping Cart
![Shopping Cart](./screenshots/Screenshot%202026-05-25%20003742.png)

### User Authentication
![User Authentication](./screenshots/Screenshot%202026-05-25%20003754.png)

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Motion** - Animation library

### Backend
- **PHP** - Server-side scripting
- **MySQL** - Database management
- **XAMPP** - Local development environment

### UI Components
- Shadcn UI components (Accordion, Dialog, Dropdown, etc.)
- Custom Nike-themed components
- Responsive navigation and footer

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **XAMPP** (or any PHP + MySQL environment)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Venkata-Sai-Vishwas-Patnala/Nike-Ecommerce-Website.git
cd Nike-Ecommerce-Website
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Database Setup

1. Start XAMPP and ensure Apache and MySQL are running
2. Open phpMyAdmin (http://localhost/phpmyadmin)
3. Import the database:
   - Create a new database named `nike_store`
   - Import the `nike_store.sql` file

### 4. Configure Backend

Update the database configuration in `api/config/db.php` if needed:

```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'nike_store');
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
Nike-Ecommerce-Website/
├── api/                      # Backend PHP API
│   ├── config/
│   │   ├── cors.php         # CORS configuration
│   │   └── db.php           # Database connection
│   ├── auth.php             # Authentication endpoints
│   ├── orders.php           # Order management
│   └── products.php         # Product endpoints
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # Shadcn UI components
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── AuthModal.tsx
│   │   │   └── Footer.tsx
│   │   └── App.tsx          # Main application
│   ├── styles/              # CSS styles
│   └── main.tsx             # Entry point
├── screenshots/             # Application screenshots
├── nike_store.sql          # Database schema and seed data
├── package.json            # Dependencies
└── vite.config.ts          # Vite configuration
```

## 🔌 API Endpoints

### Products
- `GET /api/products.php` - Get all products
- `GET /api/products.php?category={category}` - Filter by category

### Authentication
- `POST /api/auth.php?action=register` - Register new user
- `POST /api/auth.php?action=login` - User login
- `GET /api/auth.php?action=me` - Get current user
- `GET /api/auth.php?action=logout` - Logout user

### Orders
- `POST /api/orders.php` - Create new order
- `GET /api/orders.php` - Get user orders

## 🎨 Design

This project is based on the Figma design available at:
[E-commerce website for Nike](https://www.figma.com/design/xZfhfpYPAKXRkqis9yV3Hg/E-commerce-website-for-Nike)

## 🗄️ Database Schema

### Tables
- **users** - User accounts and authentication
- **products** - Product catalog with details
- **orders** - Order records
- **order_items** - Individual items in orders

## 🌐 Deployment

### Frontend (Vercel)
The frontend is deployed on Vercel. However, note that the PHP backend needs separate hosting.

### Backend Deployment Options
1. **Traditional PHP Hosting** - Deploy to services like Hostinger, Bluehost, etc.
2. **Convert to Serverless** - Rewrite API as Node.js serverless functions
3. **Use Cloud Services** - Deploy on AWS, Google Cloud, or Azure

## ⚠️ Known Issues

- The API is currently configured for localhost only
- For production deployment, the backend needs to be hosted separately
- CORS configuration may need adjustment for production

## 🔧 Configuration for Production

To use this in production:

1. Host the PHP backend on a PHP-compatible server
2. Update the API URL in `src/app/App.tsx`:
   ```typescript
   const API = 'https://your-backend-url.com/api';
   ```
3. Configure CORS in `api/config/cors.php` to allow your frontend domain
4. Update database credentials in `api/config/db.php`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Venkata Sai Vishwas Patnala**

- GitHub: [@Venkata-Sai-Vishwas-Patnala](https://github.com/Venkata-Sai-Vishwas-Patnala)

## 🙏 Acknowledgments

- Original Figma design inspiration
- Nike for design inspiration
- Shadcn UI for component library
- Unsplash for product images

---

⭐ If you found this project helpful, please give it a star!
