package com.carleton.food.repositories;

import com.carleton.food.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Set;



@CrossOrigin({"http://127.0.0.1:4200/","http://localhost:4200/","http://127.0.0.1:4200/"})
@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Employee findByUsername(@RequestParam("username") String username);


}
