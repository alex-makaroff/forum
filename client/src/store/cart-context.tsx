import React, { createContext, useContext, useEffect, useState } from "react";
import { MenuItem } from "@/data/menu";
import { useToast } from "@/hooks/use-toast";

export interface CartItem extends MenuItem {
  cartId: string;
  quantity: number;
  selectedVariant?: {
    name: string;
    price: number;
  };
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, variantName?: string) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  getQtyByItemId: (itemId: string, variantName?: string) => number;
  getTotalQtyByItemId: (itemId: string) => number;
  getFirstVariantInCart: (itemId: string) => string | undefined;
  incrementByItemId: (item: MenuItem, variantName?: string) => void;
  decrementByItemId: (itemId: string, variantName?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("forum-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("forum-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: MenuItem, variantName?: string) => {
    setItems((prev) => {
      // Check if item with same variant exists
      const existing = prev.find(
        (i) =>
          i.id === item.id &&
          i.selectedVariant?.name === variantName
      );

      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      const selectedVariant = item.variants?.find((v) => v.name === variantName);
      
      // If item has variants but none selected, default to first (should act. be enforced by UI)
      const variant = selectedVariant || (item.variants ? item.variants[0] : undefined);
      
      // Determine price
      const finalPrice = variant ? variant.price : (item.price || 0);

      const newItem: CartItem = {
        ...item,
        cartId: Math.random().toString(36).substring(7),
        quantity: 1,
        selectedVariant: variant,
        price: finalPrice, // Override base price with variant price for the cart item
      };

      return [...prev, newItem];
    });
  };

  const removeFromCart = (cartId: string) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.cartId === cartId) {
          const newQty = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQty };
        }
        return i;
      })
    );
  };

  const clearCart = () => setItems([]);

  const getQtyByItemId = (itemId: string, variantName?: string): number => {
    const found = items.find(
      (i) => i.id === itemId && i.selectedVariant?.name === variantName
    );
    return found ? found.quantity : 0;
  };

  const getTotalQtyByItemId = (itemId: string): number => {
    return items
      .filter((i) => i.id === itemId)
      .reduce((sum, i) => sum + i.quantity, 0);
  };

  const getFirstVariantInCart = (itemId: string): string | undefined => {
    const found = items.find((i) => i.id === itemId);
    return found?.selectedVariant?.name;
  };

  const incrementByItemId = (item: MenuItem, variantName?: string) => {
    const existing = items.find(
      (i) => i.id === item.id && i.selectedVariant?.name === variantName
    );
    if (existing) {
      updateQuantity(existing.cartId, 1);
    } else {
      addToCart(item, variantName);
    }
  };

  const decrementByItemId = (itemId: string, variantName?: string) => {
    const existing = items.find(
      (i) => i.id === itemId && i.selectedVariant?.name === variantName
    );
    if (existing) {
      if (existing.quantity <= 1) {
        removeFromCart(existing.cartId);
      } else {
        updateQuantity(existing.cartId, -1);
      }
    }
  };

  const cartTotal = items.reduce((sum, item) => {
    const price = item.price || 0; 
    // Handle pricePer100g logic if needed (assumed fixed portion for now unless specified)
    // For pricePer100g items, we treat the base price as the unit price for the calculation in cart for v1
    const unitPrice = item.pricePer100g ? item.pricePer100g : price; 
    return sum + unitPrice * item.quantity;
  }, 0);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        getQtyByItemId,
        getTotalQtyByItemId,
        getFirstVariantInCart,
        incrementByItemId,
        decrementByItemId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
