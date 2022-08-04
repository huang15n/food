package com.carleton.food.models;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "food")

public class Food implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;


    @Column(name = "foodName")
    private String foodName;
    @Column(name = "description")
    private String foodDescription;
    @Column(name = "image_url")
    private String image_url;

    private double price;
    @Column(name = "stock")
    private  int stock;
    @Column(name = "dateCreated")
    private Date dateCreated;


    private  int qt;




    /*A join column is column in a database table that is used to link to another table.*/

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurantID", nullable = false)
    @JsonIgnore
    private Restaurant restaurant;



    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnore
    private Category category;







    public Food() {
    }

    public Food(Long id, String foodName, String foodDescription, String image_url, double price, int stock, Date dateCreated, int qt, Restaurant restaurant, Category category) {
        this.id = id;
        this.foodName = foodName;
        this.foodDescription = foodDescription;
        this.image_url = image_url;
        this.price = price;
        this.stock = stock;
        this.dateCreated = dateCreated;
        this.qt = qt;
        this.restaurant = restaurant;
        this.category = category;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public String getFoodDescription() {
        return foodDescription;
    }

    public void setFoodDescription(String foodDescription) {
        this.foodDescription = foodDescription;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }


    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }




    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getQuantity() {
        return qt;
    }

    public void setQuantity(int quantity) {
        this.qt = quantity;
    }
}
