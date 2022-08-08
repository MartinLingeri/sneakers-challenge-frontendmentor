import create from "zustand";
import { persist } from "zustand/middleware";

interface ProductInCart {
  id: number;
  quantity: number;
}

interface CartState {
  cart: {[id:number]:ProductInCart};
  addToCart: (product: ProductInCart) => void;
  removeFromCart: (productId: number) => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: {},
  addToCart: (product: ProductInCart) => {
    set((state: CartState) => ({
      cart: {...state.cart, [product.id]:product},
    }));
  },
  removeFromCart: (productId: number) => {
    set((state: CartState) => ({
      cart: Object.fromEntries(Object.entries(state.cart).
      filter(([key, val]) => Number(key)!==productId))
    }));
  },
}));

export default useCartStore;
