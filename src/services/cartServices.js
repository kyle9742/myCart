import React from "react";
import apiClient from "../utils/api-client";

export function addToCartAPI(id, quantity) {
  return apiClient.post(`/cart/${id}`, { quantity });
}

export async function getCartAPI() {
    return await apiClient.get("/cart");
}

const cartServices = () => {};

export default cartServices;
