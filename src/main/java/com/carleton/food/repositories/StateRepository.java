package com.carleton.food.repositories;

import com.carleton.food.models.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RepositoryRestResource(collectionResourceRel = "state", path = "state")
public interface StateRepository extends JpaRepository<State, Integer> {

    List<State>findByCountryCode(@Param("code") String code);
}
