package com.carleton.food.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "restaurant")
// this is hibernate class to tell mysql to create a table
public class Restaurant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;


    @Column(name = "name")
    private String restuarantName;

    @Column(name = "city")
    private String city;
    @Column(name = "province")
    private String province;


    @Column(name = "address")
    private String address;


    @OneToMany(mappedBy = "restaurant")
    private Set<Food> food = new HashSet<>();

    @OneToOne(mappedBy = "restaurant")
    private Owner owner;

    @OneToMany(mappedBy = "restaurant")
    private Set<Employee> employees = new HashSet<>();





    public Restaurant() {
    }

    public Restaurant(String restuarantName, String city, String province, String address) {
        this.restuarantName = restuarantName;
        this.city = city;
        this.province = province;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRestuarantName() {
        return restuarantName;
    }

    public void setRestuarantName(String restuarantName) {
        this.restuarantName = restuarantName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }


//    public Set<Food> getFood() {
//        return food;
//    }



    public void setFood(Set<Food> food) {
        this.food = food;
    }

//     public Owner getOwner() {
//         return owner;
//     }



    public void setOwner(Owner owner) {
        this.owner = owner;
    }



    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
