package com.carleton.food.controllers;


import com.carleton.food.models.*;
import com.carleton.food.repositories.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RequestMapping(value = "/owner" )
public class OwnerController {

    @Autowired
    FoodRepository foodRepository;

    @Autowired
    RestaurantRepository restaurantRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    OwnerRepository ownerRepository;

    @Autowired
    EmployeeRepository employeeRepository;



    @PostMapping(value = "/createFood")
    public Food createMenu(@RequestBody Food food, @Param("categoryId") Long categoryId, @Param("restaurantId") Long restaurantId){

        System.out.println(food.getQuantity());

        Category category =  categoryRepository.findById(categoryId).get();
       food.setCategory(category);
       Restaurant r = restaurantRepository.findById(restaurantId).get();
       food.setRestaurant(r);
       food.setDateCreated(new Date());

       //http://localhost:8012/owner/createFood?categoryId=4355&restaurantId=4359

       foodRepository.save(food);
        return food;

        /*


        {
    "id": 4370,
    "foodName": "beef grilled",
    "foodDescription": "this is grilled beaf",
    "image_url": null,
    "price": 1.0,
    "stock": 1,
    "dateCreated": null,
    "quantity": 1
}
         */



    }


    @GetMapping(value = "foodList")
    public List<Food> listFood(@Param("restaurantid") Long restaurantid){
        return new ArrayList<>(foodRepository.findAllByRestaurantId(restaurantid));

    }

    @DeleteMapping(value = "fireEmployee")
    public ResponseEntity<Long> fireEmployee(@Param("employeeId") Long employeeId){
        employeeRepository.deleteById(employeeId);
        return new ResponseEntity<>(employeeId, HttpStatus.OK);
    //http://localhost:8012/owner/fireEmployee?employeeId=4449

    }

    @PostMapping(value = "/hireEmployee")
    public Employee hireEmployee(@RequestBody Employee employee,@Param("ownerId") Long ownerId, @Param("restaurantId") Long restaurantId){

        employee.setStartDate(new Date());


        Restaurant restaurant = restaurantRepository.getById(restaurantId);
        Owner owner = ownerRepository.getById(ownerId);

        employee.setOwner(owner);
        employee.setRestaurant(restaurant);

        /*

        {

    "username": "awesome",
    "password": "321",
    "phone": "32983234",
    "email": "hello@gmail.com",
    "firstName": "David",
    "lastName": "Beckham",
    "salary": 0.0,
    "startDate": null,
    "restId": 0
}
http://localhost:8012/owner/hireEmployee?restaurantId=4450&ownerId=4404
         */


        employeeRepository.save(employee);



        return employee;

    }

    @DeleteMapping(value = "deleteFood")
    public ResponseEntity<Long> deleteFood(@Param("foodId") Long foodId){
        foodRepository.deleteById(foodId);
        return new ResponseEntity<>(foodId, HttpStatus.OK);
        //http://localhost:8012/owner/fireEmployee?employeeId=4449

    }


}
