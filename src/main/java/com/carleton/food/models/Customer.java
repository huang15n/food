package com.carleton.food.models;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "customer")
public class Customer implements Serializable {



    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;


    @Column(name = "firstName")
    private String firstName;
    @Column(name = "lastName")
    private String lastName;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;
    @Column(name = "balance")
    private Double balance;
    @Column(name = "moneySpent")
    private Double moneySpent;

    @Column(name = "dateOfBirth")
    private LocalDate dateofbirth;

    @Column(name = "email")
    private String email;


    @Column(name = "signature")
    private String signatures;
    @Column(name = "accountCreatedDate")
    private LocalDate accountCreated;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    private Set<Demand> orders = new HashSet<>();

    public void add(Demand order){
        if(order != null){
            if(orders == null){
                orders = new HashSet<>();
            }
            orders.add(order);
            order.setCustomer(this);
        }
    }




    public Customer() {
    }

    public Customer(String firstName, String lastName, String username, String password,   String phone, Double balance, Double moneySpent,   LocalDate dateofbirth, String email, String signatures, LocalDate accountCreated) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.balance = balance;
        this.moneySpent = moneySpent;

        this.dateofbirth = dateofbirth;
        this.email = email;
        this.signatures = signatures;
        this.accountCreated = accountCreated;
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

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Double getMoneySpent() {
        return moneySpent;
    }

    public void setMoneySpent(Double moneySpent) {
        this.moneySpent = moneySpent;
    }



    public LocalDate getDateofbirth() {
        return dateofbirth;
    }

    public void setDateofbirth(LocalDate dateofbirth) {
        this.dateofbirth = dateofbirth;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSignatures() {
        return signatures;
    }

    public void setSignatures(String signatures) {
        this.signatures = signatures;
    }

    public LocalDate getAccountCreated() {
        return accountCreated;
    }

    public void setAccountCreated(LocalDate accountCreated) {
        this.accountCreated = accountCreated;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Demand> getOrders() {
        return orders;
    }

    public void setOrders(Set<Demand> orders) {
        this.orders = orders;
    }
}
