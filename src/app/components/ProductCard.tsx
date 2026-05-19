import { Heart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  colors: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-sm text-orange-600 font-semibold">Just In</p>
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.category}</p>
            <p className="text-gray-600 text-sm">{product.colors} Colour{product.colors > 1 ? 's' : ''}</p>
          </div>
          <p className="font-semibold">₹ {product.price.toLocaleString()}</p>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-black text-white py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mt-2 hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
