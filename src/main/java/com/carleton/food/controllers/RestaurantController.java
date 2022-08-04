package com.carleton.food.controllers;


import com.carleton.food.models.*;
import com.carleton.food.repositories.FoodRepository;
import com.carleton.food.repositories.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RequestMapping({"/restaurants"})
public class RestaurantController {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodRepository foodRepository;


    private List<Restaurant> restaurantList = new ArrayList<>();


    @GetMapping(value = "/items", produces = "application/json")
    public List<Restaurant> listRestaurant(){
        restaurantList = (ArrayList)restaurantRepository.findAllRestaurant();


        //i recommend adding @Jsonignore on the property that is causing the circular reference. this will tell jackson not to serialize that property.


        return restaurantList;

    }







}
