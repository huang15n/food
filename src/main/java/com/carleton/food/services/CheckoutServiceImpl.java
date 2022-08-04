package com.carleton.food.services;

import com.carleton.food.dto.Purchase;
import com.carleton.food.dto.PurchaseResponse;
import com.carleton.food.models.Customer;
import com.carleton.food.models.Demand;
import com.carleton.food.models.OrderItem;
import com.carleton.food.repositories.CheckoutService;
import com.carleton.food.repositories.CustomerRepository;
import com.carleton.food.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    private OrderRepository orderRepository;


    @Autowired
    // this is optional because we only have one constructor
    public CheckoutServiceImpl(CustomerRepository customerRepository, OrderRepository orderRepository) {
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;

    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrieve the order info from dto
        Demand order = purchase.getOrder();

        System.out.println("the food id is " + purchase.getFood_id());
        order.setFoodId(purchase.getFood_id());



        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        // populate order with order items

        Set<OrderItem> orderItems = purchase.getOrderItems();
        System.out.println("the purchase order items are " + purchase.getOrderItems());


        orderItems.forEach(item -> {order.add(item); order.setFoodId(item.getFoodId());});



        // populate order with billing and shipping address
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        order.setEmail(purchase.getCustomer().getEmail());

        orderRepository.save(order);
        // populate customer with order
//        Customer customer = purchase.getCustomer();
//        customer.add(order);




        // save to database
//        customerRepository.save(customer);
        // return a response
        return new PurchaseResponse(orderTrackingNumber);



    }

    private String generateOrderTrackingNumber() {
        // create a unique id hard to get

        // generate a random UUID number
        // for detail sees this
        // what is a UUID?? hard to guess and unique
        // UUID Universally unique identity
        // standardized methods for generating unique ids, avaliable in four version, use v4
        // what about uniquness or collision
        // the probability of collison is very low,, neglible
        // you generate random uuid, query your db and see if uuid has been used by your database

        return UUID.randomUUID().toString();



    }
}
