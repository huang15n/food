package com.carleton.food.controllers;


import com.carleton.food.models.Customer;
import com.carleton.food.models.Demand;
import com.carleton.food.models.Employee;
import com.carleton.food.models.Owner;
import com.carleton.food.repositories.CustomerRepository;
import com.carleton.food.repositories.EmployeeRepository;
import com.carleton.food.repositories.OrderRepository;
import com.carleton.food.repositories.OwnerRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})


@RequestMapping("/customers")
public class UserController {

    private Set<Customer> customerSet = new HashSet<>();



    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OwnerRepository ownerRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;


    @GetMapping(value="/login", produces = "application/json")
    public Customer login(@Param("username") String username){
        Customer customer = (Customer) customerRepository.findByUsername(username);

        return customer;

    }
    
    @GetMapping(value="/ownerLogin", produces = "application/json")
    public Owner ownerLogin(@Param("username")String username){
        Owner owner = (Owner) ownerRepository.findByUsername(username);

        return owner;
    }

    @GetMapping(value="/employeeLogin", produces = "application/json")
    public Employee employeeLogin(@Param("username")String username){
        Employee employee = (Employee) employeeRepository.findByUsername(username);
        System.out.println(employee.getRestaurant().getId());
        employee.setRestId(employee.getRestaurant().getId());




        return employee;
    }



    @GetMapping(value="/orders",produces="application/json")
    public Set<Demand> customerOrders(@Param("email") String email){
         Set<Demand>orders  = (Set<Demand>) orderRepository.findAllByEmail(email);

        return orders;
    }



    @DeleteMapping(value = "/deleteOrders")
    public ResponseEntity<Long> deleteOrder(@Param("id") Long id){
        orderRepository.deleteById(id);

        return new ResponseEntity<>(id, HttpStatus.OK);
    }






    @PostMapping("/signup")
    public Customer create(@RequestBody Customer customer){
        Customer newCustomer = new Customer();
        newCustomer.setAccountCreated(LocalDate.now());
        newCustomer.setPhone(customer.getPhone());
        newCustomer.setUsername(customer.getUsername());
        newCustomer.setPassword(customer.getPassword());
        newCustomer.setFirstName(customer.getFirstName());
        newCustomer.setLastName(customer.getLastName());
        newCustomer.setEmail(customer.getEmail());
        newCustomer.setSignatures("");
        newCustomer.setBalance(0.0);
        newCustomer.setMoneySpent(0.0);

        customerSet.add(newCustomer);
        customerRepository.saveAll(customerSet);



        System.out.println("this was totally great:"+customer.getUsername());
        return customer;

    }


}
