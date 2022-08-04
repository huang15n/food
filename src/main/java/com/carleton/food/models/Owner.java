package com.carleton.food.models;

import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "owner")
public class Owner implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
   private String username;

    @Column(name = "password")
   private String password;
    @Column(name = "phone")
   private String phone;
    @Column(name = "email")
   private String email;

    @Column(name = "firstname")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;



    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "restaurant_ID")
    private Restaurant restaurant;

    //@ManyToOne how to make Json refer to existing foreign key?
    /*



It's not the best practice to expose the persistence-level entities in the controllers layer, because API gets coupled to the internal representation of the data.

The common way to implement your requirement is to use the Transfer Object Pattern. That is, create separate classes to use in the API. In your use case, you could create a ProductTO class with the following structure:
     */


    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private Set<Employee> employees = new HashSet<>();


    public Owner() {
    }

    public Owner(String username, String password, String phone, String email) {
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
