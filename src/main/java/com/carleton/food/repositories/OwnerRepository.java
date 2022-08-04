package com.carleton.food.repositories;

import com.carleton.food.models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RepositoryRestResource(collectionResourceRel = "owner", path = "owner")
public interface OwnerRepository extends JpaRepository<Owner,Long> {
    Owner findByUsername(@RequestParam("username")String username);
}
