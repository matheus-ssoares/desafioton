import React from 'react';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import api from '../services/api';

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  description: string;
}
interface Cart {
  product: Product;
  quantity: number;
}
interface CardProviderProps {
  children: ReactNode;
}
export interface CartContextData {
  cart: Cart[];
  addProduct: (product: Product) => void;
  decreaseQuantity: (productId: number) => void;
  removeProduct: (productId: number) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({children}: CardProviderProps) {
  const [cart, setCart] = useState<Cart[]>([]);

  function addProduct(product: Product) {
    let newCard = [...cart];
    const cartItem = newCard.find(item => item.product.id === product.id);
    if (cartItem && cartItem.quantity < cartItem.product.quantity) {
      /*if the product is already in cart and your quantity is lesser
       than product stock,
       increase the product quantity in cart by one*/
      cartItem.quantity += 1;
      setCart(newCard);
      return;
    } else if (cartItem && cartItem.quantity >= cartItem.product.quantity) {
      return;
    }

    setCart([...newCard, {product: product, quantity: 1}]);
  }

  function decreaseQuantity(productId: number) {
    //function to decrease cart product quantity one by one
    const updatedCart = [...cart];
    const findItem = updatedCart.find(item => item.product.id === productId);

    if (findItem!.quantity > 1) {
      //if the product quantity in cart is greater than one, decrease the quantity by one
      findItem!.quantity -= 1;
      setCart(updatedCart);
      return;
    }
    setCart([...cart.filter(item => item.product.id !== productId)]);
  }
  function removeProduct(productId: number) {
    //function to remove a product from cart
    setCart([...cart.filter(cartItem => cartItem.product.id !== productId)]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        decreaseQuantity,
        removeProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(CartContext);

  return context;
}
