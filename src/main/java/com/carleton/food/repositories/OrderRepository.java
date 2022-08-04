package com.carleton.food.repositories;

import com.carleton.food.models.Demand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
import java.util.Set;


@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RepositoryRestResource(collectionResourceRel = "orders", path = "orders")
public interface OrderRepository extends JpaRepository<Demand,Long> {


    Set<Demand> findAllByEmail(@RequestParam("email") String email);


    @Query(value = "SELECT * FROM Demand WHERE food_id IN (SELECT id FROM Food WHERE restaurantid = :foodId)",nativeQuery = true)
     Set<Demand> findAllByFoodId(@RequestParam("foodId") Long foodId);





}
