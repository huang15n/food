package com.carleton.food.dto;

import lombok.NonNull;

public class PurchaseResponse {


    private final String orderTrackingNumber;
    // @NonNull

    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }
}
