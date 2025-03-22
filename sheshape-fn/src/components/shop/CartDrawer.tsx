'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    addItem, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    isCartOpen, 
    toggleCart 
  } = useCart();

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleCart}
          />
        )}
      </AnimatePresence>
      
      {/* Cart drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" /> Your Cart ({totalItems})
          </h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Empty cart state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 h-[calc(100vh-180px)]">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-neutral-500 text-center mb-6">
              Looks like you haven't added any products to your cart yet
            </p>
            <Button asChild onClick={toggleCart}>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        )}
        
        {/* Cart items */}
        {items.length > 0 && (
          <div className="flex flex-col h-[calc(100vh-180px)] overflow-hidden">
            <div className="flex-grow overflow-y-auto py-2">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex px-4 py-3 border-b"
                  >
                    {/* Product image */}
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 relative">
                      <Image
                        src={item.product.imageUrl || '/images/product-placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Product details */}
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <Link
                          href={`/shop/products/${item.product.id}`}
                          className="font-medium line-clamp-1 hover:text-primary"
                          onClick={toggleCart}
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-neutral-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-sm text-neutral-500 mb-2">
                        {formatPrice(
                          item.product.discountPrice || item.product.price
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-1 text-neutral-500 hover:text-primary"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-1 text-neutral-500 hover:text-primary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        
                        {/* Item total */}
                        <div className="font-medium">
                          {formatPrice(
                            (item.product.discountPrice || item.product.price) * item.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Cart summary */}
            <div className="bg-neutral-50 p-4 border-t">
              {/* Promo code input */}
              <div className="flex items-center mb-4">
                <Input 
                  placeholder="Promo code" 
                  className="mr-2" 
                />
                <Button variant="outline">Apply</Button>
              </div>
              
              {/* Subtotal */}
              <div className="flex justify-between mb-2">
                <span className="text-neutral-600">Subtotal:</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              
              {/* Shipping */}
              <div className="flex justify-between mb-2">
                <span className="text-neutral-600">Shipping:</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              
              {/* Total */}
              <div className="flex justify-between text-lg font-semibold mt-2 pt-2 border-t">
                <span>Total:</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              
              {/* Action buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={clearCart} className="flex items-center">
                  <Trash2 className="h-4 w-4 mr-2" /> Clear Cart
                </Button>
                <Button asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
              
              {/* Continue shopping button */}
              <Button
                variant="link"
                className="w-full mt-4 text-neutral-600"
                onClick={toggleCart}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}