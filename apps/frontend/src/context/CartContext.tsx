"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { ICartItem, IProduct, IShippingAddress } from "@/types";

interface ICartContext {
  cartItems: ICartItem[];
  shippingAddress: IShippingAddress | null;
  addToCart: (product: IProduct, qty: number) => void;
  removeFromCart: (productId: string) => void;
  saveShippingAddress: (address: IShippingAddress) => void;
  clearCart: () => void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [shippingAddress, setShippingAddress] =
    useState<IShippingAddress | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Read persisted state before writing defaults back to localStorage.
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart: unknown = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart as ICartItem[]);
        }
      }

      const storedAddress = localStorage.getItem("shippingAddress");
      if (storedAddress) {
        setShippingAddress(JSON.parse(storedAddress) as IShippingAddress);
      }
    } catch (error) {
      console.error("Could not restore saved cart data:", error);
      localStorage.removeItem("cart");
      localStorage.removeItem("shippingAddress");
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, isHydrated]);

  const saveShippingAddress = (address: IShippingAddress) => {
    setShippingAddress(address);
    localStorage.setItem("shippingAddress", JSON.stringify(address));
  };

  // Keep this callback stable for pages that depend on it in useEffect.
  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem("cart");
  }, []);

  const addToCart = (product: IProduct, qty: number) => {
    const existItem = cartItems.find((x) => x.product._id === product._id);

    if (existItem) {
      setCartItems(
        cartItems.map((x) =>
          x.product._id === product._id ? { ...x, qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { product, qty }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((x) => x.product._id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        shippingAddress,
        addToCart,
        removeFromCart,
        saveShippingAddress,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
