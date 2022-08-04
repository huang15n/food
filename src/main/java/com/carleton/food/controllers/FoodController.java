package com.carleton.food.controllers;


import com.carleton.food.models.Demand;
import com.carleton.food.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RequestMapping("/food")
public class FoodController {

    @Autowired
    OrderRepository orderRepository;
    Set<Demand> orders = new HashSet<>();
    Demand order;

    @GetMapping(value="/orders", produces = "application/json")
    public Set<Demand> getOrders(@Param("foodId") Long foodId){
        orders =   orderRepository.findAllByFoodId(foodId);
        return orders;
    }

    @PutMapping(value = "/order/{id}")
    public Optional<Demand> getOrder(@RequestBody Demand order, @PathVariable Long id){
        return orderRepository.findById(id).map(o -> {
            o.setStatus(order.getStatus());
            return orderRepository.save(o);
        });
    }


}
