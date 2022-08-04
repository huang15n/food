

# @Entity 


# @Id
# 
The @Id annotation is inherited from javax.persistence.Id， indicating the member field below is the primary key of current entity. Hence your Hibernate and spring framework as well as you can do some reflect works based on this annotation.

##  @GeneratedValue(strategy = xxx)
## @GeneratedValue(strategy = GenerationType.AUTO)


# @Entity 
note you cannot use inheritance in @Entity to enhance your homogeous classes 




#    @OneToOne(mappedBy = "")  @OneToMany(mappedBy = "")
 MappedBy signals hibernate that the key for the relationship is on the other side.This means that although you link 2 tables together,
  only 1 of those tables has a foreign key constraint to the other one. MappedBy allows you to still link from the table not containing the constraint to the other table.


# @ManyToMany
# @JoinTable(name = "tableName", joinColums = @JoinColum(name = "this_table"), inverseJoinColumns = @JoinColumn(name = "other_table"))
# Set< TableTwoClass > objectOne;
# @ManyToMany(mappedBy = "objectOne")
# Set< TableOneClass > objectTwo;



# @Column("value")


# @Table(name = "value")
keep in mind that ORDER  does not work in mysql as a table name 




# @CreationTimeStamp 
# @UpdateTimeStamp
this is a special annotation that hibernate will automatically manage the timestamp, there is no need for developers to call the getters and setters here 



# @RepositoryRestResource(collectionResourceRel = "nameOfJsonEntry", path = "xx-xx")
## public interface xxx extends JpaRepository<Type, Long>{}
JpaRepository extends PagingAndSortingRepository which in turn extends CrudRepository.
ollectionResourceRel = "nameOfJsonEntry" 
path = "xx-xx" is the actually reference to the path, normally they will make it plural by making it a 's' at the end 
let's see it in action 


```java
@RepositoryRestResource(collectionResourceRel = "restaurant", path = "restaurant")
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}

```

let's go to https://localhost:8012/api/path 
this basically takes us to the apis of each 


Their main functions are:

CrudRepository mainly provides CRUD functions.
PagingAndSortingRepository provides methods to do pagination and sorting records.
JpaRepository provides some JPA-related methods such as flushing the persistence context and deleting records in a batch.
Because of the inheritance mentioned above, JpaRepository will have all the functions of CrudRepository and PagingAndSortingRepository. So if you don't need the repository to have the functions provided by JpaRepository and PagingAndSortingRepository , use CrudRepository.

But we want the apis to be readonly for visitors, customers and employees 

we can simply not use spring REST 
1. manually create our own @RestController 
2. manually define methods for access @Ge 
3. but we lose the spring data REST support for paging and sorting 

option 2 is to use spring data REST API
1. configure to disable certain HTTP methods : delete, post 


we can implement a config class which implements RepositoryRestConfigurer

let's make a small digression 






## error: object references an unsaved transient instance

You should include cascade="all" (if using xml) or cascade=CascadeType.ALL (if using annotations) on your collection mapping.

This happens because you have a collection in your entity, and that collection has one or more items which are not present in the database. By specifying the above options you tell hibernate to save them to the database when saving their parent.

save this one before you save the other :

```java
  ownerRepository.save(o1);
        restaurantRepository.save(r1);
        foodRepository.save(f1);

```





## by default spring data REST does not expose entity ids , we need entity ids for a num 
to get a list of ids and get master/master view by ids 

it is in the rest but there is no easy access requires parsing url string, this approach is cumbersome and brittle . it is not ideal 
we need tne entity id at the foodCategory level, easy access 

we need to update spring data REST config to expose entity ids 
to autowire the EntityManger 


```java
@Configuration 
public class MyDataRestConfig implements RepositoryRestConfigurer{
  @Autowired
  private Entity entityMnanger; 
}

```
effective inject the jpa 

in the data rest config java
```java
@Override 
public void configureRepositoryConfiguration(RepositoryRestConfiguration config)
{
  exposeIds(config);
}
public void exposeIds(RepositoryRestConfiguration config){
  Set<EntityType<?>> entities = entityManager.getMeamodel().getEntties();

  List<Class> entityClasses = new ArrayList<>();

  for(EntityType tempEntityType: entities){
    entityClasses.add(tempEntityType.getJavaType());
  }
  Class [] domainTypes = entityClasses.toArray(new Class[0]);
  config.exposedIdsFor(domainTypes);

}
```


```java
package com.carleton.food;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Configuration
public class DataRestConfig implements  RepositoryRestConfigurer {
    @Autowired
    private EntityManager entityManager;



    // internal method to expose ids


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        System.out.println("this is exposed");
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

// create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

// get the entity type for the entities
        for(EntityType tempEntityType: entities){
            entityClasses.add(tempEntityType.getJavaType());

        }

        // expose the entity if for the array domain type

        Class [] domainTypes =  entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

        //config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));

    }


}


```
 



 spring data rest spring data jpa supports query methods 

 spring will construct a query based on method naming convention 


 ```java

public interface xxRepository extends JpaRepository<T,Long>{
  Page<T> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
 ```
containing means it is simlar to sql LIKE, behind the scenes, spring will execute a query similar to this 
```sql
SELECT * FROM xxx p 
WHERE p.name LIKE CONCAT('%',:NAME, '%')
```
http://localhost:xxx/api/xxx/search/findByNameContaing?name=xxx
 
spring-data uses the underscore as a separator for nested fields when it tries to inject a query from the method signature. So, if you do findByrun_id Spring will search for the nested field Jenkins.run.id. You should change the attribute run_id to runId and then rename your method to findByrunId or findByRunId
 
```java
package com.carleton.food.repositories;

import com.carleton.food.models.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RepositoryRestResource(collectionResourceRel = "food", path = "food")
public interface FoodRepository extends JpaRepository<Food, Long> {
    Page<Food> findByCategoryId(@RequestParam("id") Long id, Pageable pageable);
    Page<Food> findByfoodNameContaining(@RequestParam("foodName") String name, Pageable pageable );

}



```

http://127.0.0.1:8012/food/search/findByfoodNameContaining?name=Donut

this should also match anything or whatever 




create country table and state tables 
country 
id: smallint 5
code varchar 2
name varchar 255



state 
id: small int 5
name : varchar 255
country_id smallint 5

develop JPA entities 


```java
// country 

@OneToMany(mappedBy="country")
private List<State> states;

``


```java
// satte 

@ManyToOne
@JoinColumn(name="country_id")
private List<Country> countries;


```

```java
@CrossOrigin("http://localhost:4200")
@RepoistoryRestResource(collectionResourceRel="countries", ath="countries")
public interface CountryRepository extends JpaRepositiory<Country, Long>{

}



@CrossOrigin("http://localhost:4200")
@RepoistoryRestResource(collectionResourceRel="states", ath="states")
public interface StateRepository extends JpaRepositiory<State, Long>{
  List<State> findByCountryCode(@Param("code") String code);
  
}
```


to retrieve states for a given country code 
http://localhost:8080/states/search/findByCountryCode?Code=IN

we will pull all this together 


we need to load the table . Spring will pick this file up and use it for creating a schema.

Please note that script-based initialization i.e. through schema.sql and data.sql and Hibernate initialization together can cause some issues.

```shell

spring.datasource.initialization-mode=always

```


```java
package com.carleton.food.models;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "country")
    private List<State> states;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

package com.carleton.food.models;


import javax.persistence.*;

@Entity
@Table(name = "state")
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
}


```


```java
package com.carleton.food.repositories;

import com.carleton.food.models.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RepositoryRestResource(collectionResourceRel = "countries", path = "countries")
public interface CountryRepository extends JpaRepository<Country, Integer> {


}

```

make suer the naming is right, otherwise it will present error


http://localhost:8012/countries


we will retrieve the actual associated states for a given country 
@JsonIgnore will ignore the data when it makes return of the actual data 


```java
    @OneToMany(mappedBy = "country")
    @JsonIgnore
    private List<State> states;


```



```java

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
//Caused by: java.lang.IllegalArgumentException: Failed to create query for method public abstract java.util.List com.carleton.food.repositories.StateRepository.findbyCountryCode(java.lang.String)! No property findbyCountryCode found for type State!

//    List<State>findbyCountryCode(@Param("code") String code);
    List<State>findByCountryCode(@Param("code") String code);

}

```
that will retrieve state by country code:
http://localhost:8012/state/search/findByCountryCode?code=IN

updating spring data REST configs 
we do not want to modify that via the REST API as kind of locking down the REST APIs 





# save the order to the backend 


send the order to the backend and store it in the database 


angular front end <-- rest api --> spring boot backend <> database 


angular <- rest api -> checkout controller -> checkout service -> spring data jpa repo -> database 


for the architecture, we will create a custom controller an service 
1. checkout controller 
2. checkout service 

why not using spring data REST?? 
Spring data REST is great for basic CRUD
we are currently using it for product catalog 

not the best for processing the order using custom business logic 

we need to generate custom tracking number save orer in database and other custom business logic 

spring data rest is very limited in terms of customization for custom business logic and processing, create a custom controller and service 


customer has id, firstname, last name , email 

orders has id, order trackin number, total price, total quantity, billing address, customer id, shipping address, datae created, last updated , status 

address: id, city, couontry, state, street , zip code 

order item: id, image url, quantity , unit price, order id, prduct id 


## Data Transfer object
 data transfer between angular front end and spring boot bbackend 

 we will use this called Purcahse 


 angular --- purchase -- spring boot 

 purchase will ahve shipping address, billing address, order, order item []



 REST API 
 support the post method for checkout purchase 
 request body contains json for purchase data transferobject
request body contains json for purchase data transfer object



POST      /api/checkout/purcahse         new purchase order 
this will create a new Purchase order and stored in the database 



# development process -- spring boot 
1. run databse script 
2. create entity 
3. create data transfer objects 
4. create repository 
5. create service 
6. create controller 

it is not a slideshow, we pulling them all together 


```java

package com.carleton.food.models;


import javax.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "street")
    private String street;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "zip_code")
    private String zipCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }






}

```



```java
package com.carleton.food.models;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;


@Entity
public class OrderItem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "productId")
    private Long productId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}


```

```java

package com.carleton.food.models;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
public class Demand {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;



    @Column(name = "order_tracing_number")
    private String orderTrackingNumber;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "total_price")
    private BigDecimal totalPrice;


    @Column(name = "status")
    private String status;


    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;


    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }

    public void setOrderTrackingNumber(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}

```

customer has zero to many orders 
an order can have a shipping and billing address
and also an order has a collection of order items 


it is in action, it may take a bit for you to catch up 

```java
package com.carleton.food.models;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Demand {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;



    @Column(name = "order_tracing_number")
    private String orderTrackingNumber;

    @Column(name = "total_quantity")
    private int totalQuantity;

    @Column(name = "total_price")
    private BigDecimal totalPrice;


    @Column(name = "status")
    private String status;


    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;


    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
    private Set<OrderItem> orderItems = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToOne(cascade =  CascadeType.ALL)
    @JoinColumn(name = "shipping_address_id",referencedColumnName = "id")
    private Address shippingAddress;


    @OneToOne(cascade =  CascadeType.ALL)
    @JoinColumn(name = "billing_address_id", referencedColumnName = "id")
    private Address billingAddress;



    public void add(OrderItem item){
        if(orderItems == null){
            orderItems = new HashSet<>();
        }
        orderItems.add(item);
        item.setOrder(this);
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }

    public void setOrderTrackingNumber(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }
}



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
    @Column(name = "city")
    private String city;
    @Column(name = "province")
    private String province;
    @Column(name = "address")
    private String address;
    @Column(name = "phone")
    private String phone;
    @Column(name = "balance")
    private Double balance;
    @Column(name = "moneySpent")
    private Double moneySpent;
    @Column(name = "cardInfo")
    private String cardinfo;
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

    public Customer(String firstName, String lastName, String username, String password, String city, String province, String phone, Double balance, Double moneySpent, String cardinfo, LocalDate dateofbirth, String email, String signatures, LocalDate accountCreated) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.city = city;
        this.province = province;
        this.phone = phone;
        this.balance = balance;
        this.moneySpent = moneySpent;
        this.cardinfo = cardinfo;
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

    public String getCardinfo() {
        return cardinfo;
    }

    public void setCardinfo(String cardinfo) {
        this.cardinfo = cardinfo;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}
package com.carleton.food.models;


import javax.persistence.*;

@Entity
@Table(name = "address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "street")
    private String street;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "zip_code")
    private String zipCode;

    @OneToOne
    @PrimaryKeyJoinColumn
    // join using primary keys
    // by default keys have the same names
    private Demand order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }






}
package com.carleton.food.models;

import javax.persistence.*;
import java.math.BigDecimal;


@Entity
public class OrderItem {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "imageUrl")
    private String imageUrl;

    @Column(name = "unitPrice")
    private BigDecimal unitPrice;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "productId")
    private Long productId;

   @ManyToOne
   @JoinColumn(name = "order_id")
    private Demand order;





    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Demand getOrder() {
        return order;
    }

    public void setOrder(Demand order) {
        this.order = order;
    }
}

```



```java
package com.carleton.food.dto;


import com.carleton.food.models.Address;
import com.carleton.food.models.Customer;
import com.carleton.food.models.Demand;
import com.carleton.food.models.OrderItem;

import java.util.Set;


public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;

    private Demand order;


    private Set<OrderItem> orderItems;
    // orderItems is just a collection


    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Address getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(Address shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Demand getOrder() {
        return order;
    }

    public void setOrder(Demand order) {
        this.order = order;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}

package com.carleton.food.dto;

import lombok.NonNull;

public class PurchaseResponse {


    private final String orderTrackingNumber;
    // @NonNull

    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

 
}




```


```java

package com.carleton.food.services;

import com.carleton.food.dto.Purchase;
import com.carleton.food.dto.PurchaseResponse;
import com.carleton.food.models.Customer;
import com.carleton.food.models.Demand;
import com.carleton.food.models.OrderItem;
import com.carleton.food.repositories.CheckoutService;
import com.carleton.food.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    // this is optional because we only have one constructor
    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // retrieve the order info from dto
        Demand order = purchase.getOrder();
        // generate tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);
        // populate order with order items

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));


        // populate order with billing and shipping address
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());
        // populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // save to database
        customerRepository.save(customer);
        // return a response
        return new PurchaseResponse(orderTrackingNumber);



    }

    private String generateOrderTrackingNumber() {
        // create a unique id hard to get

        // generate a random UUID number
        // for detail sees this
        // what is a UUID?? hard to guess and unique
        // UUID Universally unique identity
        // standardized methods for generating unique ids, avaliable in four version, use v4
        // what about uniquness or collision
        // the probability of collison is very low,, neglible
        // you generate random uuid, query your db and see if uuid has been used by your database

        return UUID.randomUUID().toString();



    }
}

```




```java

package com.carleton.food.controllers;


import com.carleton.food.dto.Purchase;
import com.carleton.food.dto.PurchaseResponse;
import com.carleton.food.repositories.CheckoutService;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.*;

@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }
    
    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;
        
    }
}

```




```java
package com.carleton.food.repositories;

import com.carleton.food.dto.Purchase;
import com.carleton.food.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}

```


```java

package com.carleton.food.controllers;


import com.carleton.food.dto.Purchase;
import com.carleton.food.dto.PurchaseResponse;
import com.carleton.food.repositories.CheckoutService;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RestController
@RequestMapping(value = "/checkout", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class CheckoutController {

    private CheckoutService checkoutService;
    public CheckoutController(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return purchaseResponse;

    }
}


```
org.springframework.web.HttpMediaTypeNotAcceptableException: Could not find acceptable representation






2022-02-27 23:19:37.516  WARN 16788 --- [nio-8012-exec-1] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.http.converter.HttpMessageNotWritableException: No converter for [class com.carleton.food.dto.PurchaseResponse] with preset Content-Type 'null']

```java
package com.carleton.food.dto;

import lombok.NonNull;

public class PurchaseResponse {


    private final String orderTrackingNumber;
    // @NonNull

    public PurchaseResponse(String orderTrackingNumber) {
        this.orderTrackingNumber = orderTrackingNumber;
    }

    public String getOrderTrackingNumber() {
        return orderTrackingNumber;
    }
}


```

# in spring we must initialize every single set!!!!!!

```java


public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;

    private Demand order;


    private Set<OrderItem> orderItems = new HashSet<>();
    // orderItems is just a collection
```


```json

{
    
     
      "id": 1231,
    "firstName":"Mark",
    "lastName": "Dave",
    "username": "123",
    "password": "123" ,
    "phone": "3212",
    "email": "12312@gmail.com",
    "signatures": "sdfs"
       
 
}
```