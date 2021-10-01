import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Home} from '.';
import {CartProvider, useCart} from '../../hooks/useCart';
import {mockedNavigate} from '../../../jest/setup';
import {renderHook} from '@testing-library/react-hooks';

const mockedAddProduct = jest.fn();
const mockedDecreaseProductQuantity = jest.fn();
const mockedUseCartHook = useCart as jest.Mock;

jest.mock('../../hooks/useCart');

describe('Home', () => {
  beforeEach(() => {
    mockedUseCartHook.mockReturnValue({
      cart: [
        {
          product: {
            id: 3,
            name: 'Tênis Mizuno',
            quantity: 4,
            price: 2800,
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
            image:
              'https://www.imagemhost.com.br/images/2021/09/30/904105370.jpg',
          },
          quantity: 2,
        },
        {
          product: {
            id: 4,
            name: 'Tênis Vans',
            quantity: 3,
            price: 2900,
            description:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
            image:
              'https://www.imagemhost.com.br/images/2021/09/30/Tenis-Vans-Wm-Ward-0.jpg',
          },
          quantity: 2,
        },
      ],
      products: [
        {
          id: 3,
          name: 'Tênis Mizuno',
          quantity: 4,
          price: 2800,
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
          image:
            'https://www.imagemhost.com.br/images/2021/09/30/904105370.jpg',
        },
        {
          id: 4,
          name: 'Tênis Vans',
          quantity: 3,
          price: 2900,
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
          image:
            'https://www.imagemhost.com.br/images/2021/09/30/Tenis-Vans-Wm-Ward-0.jpg',
        },
      ],
      addProduct: mockedAddProduct,
      decreaseQuantity: mockedDecreaseProductQuantity,
    });
  });

  it('should render list without error', () => {
    expect(render(<Home />)).toBeDefined();
  });
});
