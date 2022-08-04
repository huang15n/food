package com.carleton.food.repositories;

import com.carleton.food.dto.Purchase;
import com.carleton.food.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
