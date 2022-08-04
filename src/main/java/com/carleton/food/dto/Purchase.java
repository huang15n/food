package com.carleton.food.dto;


import com.carleton.food.models.Address;
import com.carleton.food.models.Customer;
import com.carleton.food.models.Demand;
import com.carleton.food.models.OrderItem;

import java.util.HashSet;
import java.util.Set;


public class Purchase {
     private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;

    private Demand order;

    private Long food_id;


    private Set<OrderItem> orderItems = new HashSet<>();
    // orderItems is just a collection


    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Demand getOrder() {
        return order;
    }

    public void setOrder(Demand order) {
        this.order = order;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Long getFood_id() {
        return food_id;
    }

    public void setFood_id(Long food_id) {
        this.food_id = food_id;
    }
}
