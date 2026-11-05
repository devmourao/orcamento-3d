import { useState, useEffect } from 'react';
import type { PrintItem } from '../types/Order';

const STORAGE_KEY = '@3d-print-quotes:cart-v1';

export const useCart = () => {
  const [items, setItems] = useState<PrintItem[]>(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (newItem: Omit<PrintItem, 'id'>) => {
    const itemWithId: PrintItem = {
      ...newItem,
      id: Date.now().toString(),
    };
    setItems((prevItems) => [...prevItems, itemWithId]);
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return {
    items,
    addItem,
    removeItem,
    clearCart,
  };
};