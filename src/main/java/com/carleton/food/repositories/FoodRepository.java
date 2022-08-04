package com.carleton.food.repositories;

import com.carleton.food.models.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RepositoryRestResource(collectionResourceRel = "food", path = "food")
public interface FoodRepository extends JpaRepository<Food, Long> {
    Page<Food> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    Page<Food> findByfoodNameContaining(@RequestParam("foodName") String name, Pageable pageable );


    List<Food> findAllByRestaurantId(@RequestParam("restaurantid") Long restaurantid);

}
