export function getErrorMessage(error: unknown) {
   if (error instanceof Error) return error.message
   return String(error)
 }
 export interface ProductsType{
_id: string;
id: string;
title: string;
description: string;
price: number,
discountPercentage: number;
rating: number;
stock: number
brand: string;
category: string;
thumbnail: string;
images: Array<string>
 }
 export interface OrderType{
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number,
  discountPercentage: number;
  rating: number;
  stock: number
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
  count: number
   }
   export interface OrderSuccesfulType{
    _id: string;
    id: string;
    title: string;
    description: string;
    price: number,
    discountPercentage: number;
    rating: number;
    stock: number
    brand: string;
    category: string;
    thumbnail: string;
    images: Array<string>;
    order: Array<OrderType>;
    count: number;
    timeCreate: string;
     }
 
     