import api from '../../utils/axios';
import {
   ADD_PRODUCT,
   ADD_TO_CART,
   CART_DETAILS,
   REMOVE_FROM_CART,
} from '../url';

export const addToCart = async (body) => {
   try {
      const response = await api.post(ADD_TO_CART, body);
      return response;
   } catch (error) {
      return error;
   }
};

export const removeFromCart = async (body) => {
   try {
      const response = await api.post(REMOVE_FROM_CART, body);
      return response;
   } catch (error) {
      return error;
   }
};

// ===== PRODUCTS =========================

export const addProduct = async (body) => {
   try {
      const response = await api.post(ADD_PRODUCT, body);
      return response;
   } catch (error) {
      return error;
   }
};

export const cartProducts = async (id) => {
   try {
      const response = await api.get(CART_DETAILS + id);
      return response;
   } catch (error) {
      return error;
   }
};
