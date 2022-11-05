

# Preview 

My intent is to build a realtime food ordering app simulates uber eats for Carleton, Nepean, Kanata, and Downtown Ottawa which has full stack capability of handling restaurant functionalities.


#### Please refer to my Java and Js Repo in my github if you have not done programming in these two languages https://github.com/huang15n/javascript/tree/main/javascript_crash

#### Please refer to my TypeScprit, Spring.md and Angular.md notes in this repo if you do not have any exposures to use the front end and backend framework -- Eddie Huang
https://github.com/huang15n/food/blob/master/angular.md
https://github.com/huang15n/food/blob/master/spring.md

## Technology involved Angular front-end <-> spring boot backend <-> Full CRUD 

the spring boot leverages the data REST for REST API in order to minize the coding for spring boot backend 



## User requirement 


we would like to show a list of food 
customers can add food to their order list/shopping chart (CRUD)
their food check out 
user login/logout security 
and also we can track previous order for logged in users 


in release 1.0 we will show a list of product
release 2.0 we will add food to shopping cart using CRUD and checkout 
release 3.0 we use user login/logout security and track previous orders for logged in users 



## Development environment 

you should have:
1. Java Development Kit
2. Java IDE, intelli community editition. but you are free to use other java IDEs such as eclipse, vs code, bet beans and etc. but they all support support maven 
3. Maven 
4. MySQL database https://dev.mysql.com/downloads/file/?id=510039 which includes mysql shell and mysql server or MySQL workbench  https://spring.io/guides/gs/accessing-data-mysql/
keep the port number and configurations as default 
add password as your choice, we can do root here

edit system variables -> new : 


## how to run it 
1. set up mySQL
add  C:\ Program Files \ MySQL Server 8.0\ bin
```shell
mysql -u root -p

 drop table demand;
```


```sql 
show databases 
CREATE DATABASE foodapp
USE foodapp;
SHOW TABLES;
  SHOW GLOBAL VARIABLES LIKE 'PORT';

```

2. Install intellij -> open project, select src -> FoodApplication.java -> run 
https://www.geeksforgeeks.org/how-to-run-spring-boot-application/


go to food\target folder and run java -jar .\food-0.0.1-SNAPSHOT.jar



3. install npm, download dependencies 
https://www.cirruslabs.io/blog1/modernized-technology/how-to-start-an-angularjs-application

go to the frontend folder \food\frontend\food-app\src>, run ng serve 

4. open browser and type in http://127.0.0.1:4200/




## note 

1. we need to use spring data REST which will scan your project for JpaRepository and expose REST APIs for each entity type for your JpaRepository 


```java
public interface FoodRepository extends JpaRepository<Food, Long>{

}
// food is the entity type and Long is mean for id 

```

It takes the the domain class to manage as well as the id type of the domain class as type arguments. This interface acts primarily as a marker interface to capture the types to work with and to help you to discover interfaces that extend this one. The CrudRepository provides sophisticated CRUD functionality for the entity class that is being managed.

```java

public interface CrudRepository<T, ID extends Serializable>
    extends Repository<T, ID> {
                                                                                                                      
    <S extends T> S save(S entity);
                                                                                                                       
    T findOne(ID primaryKey);
                                                                                                                       
    Iterable<T> findAll();

    Long count();
                                                                                                                       
    void delete(T entity);
                                                                                                                       
    boolean exists(ID primaryKey);
                                                                                                                       
    // … more functionality omitted.
}

```
 

Saves the given entity.
Returns the entity identified by the given id.
Returns all entities.
Returns the number of entities.
Deletes the given entity.
Indicates whether an entity with the given id exists.


Usually we will have persistence technology specific sub-interfaces to include additional technology specific methods. We will now ship implementations for a variety of Spring Data modules that implement CrudRepository.

2. REST Endpoints 
by default, spring data REST will create endpoitns based on entity type, simple pluralized form meaning the first character of Entity type is lwoer case and then adds "s" to the entity meaning it takes Food and converts to "Foods"

spring data REST will expose endpoints for free 

POST /products create a new food item / food order
GET /products read a list of food item / food order
GET /products/{id} read a single food item / food order 
PUT /products/{id} update an existing food item / food order 
DELETE /products/{id} detelte an existing food item / food order

these are minimal code to expose REST API and also with spring boot 



database design 


food: 

food_id: BIGINT 20 primary key 
food_name VARCHAR 255
description VARCHAR 255
image_url VARCHAR 255
price DECIMAL (15,2)
stock int (12)
date_created DATETIME(6)
last_update DATETIME(6)
restaurant_id(6): foreign key 


```sql
  CREATE TABLE food(
     foodID BIGINT(26) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    foodName varchar(255),
     foodDescription varchar(255),
     image_url varchar(255),
      price decimal(15,2),
      stock int(12),
      dateCreated DATETIME,
      lastUpdate DATETIME,
     restaurantID BIGINT) ENGINE=INNODB;

  mysql> DESC food;                                                                                                        
```

restaurant: 
restaurant_id bigint 20 
restuarant name VARCHAR 255 
restaurant_owner_id int ;  foreign key 

```sql
  CREATE TABLE restaurant(
  restaurantID bigint (20) NOT NULL PRIMARY KEY  AUTO_INCREMENT,
  restuarantName VARCHAR(255),
  restaurantOwnerID int
  )ENGINE=INNODB;

```



food to restuarant many to many relationships 


food to order many to many 
resutarnt to order : one to may 
order: 
id: BIGINIT 20 primary key
food_id(6)  foreign key
restaurant_id(6): foreign key   
comment VARCHAR
userID BIGINT  foreign key 
employeeID BIGINT
time_created DATETIME(6)
last_update DATETIME(6)
status VARCHAR(255)


```SQL
  CREATE TABLE od(
  orderID bigint (20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
      foodID BIGINT(20) NOT NULL,
    comment VARCHAR(255),
     userID BIGINT(20) NOT NULL,
      emplyeeID BIGINT(20),
      timeCreated DATETIME(6),
     lastUpdate DATETIME(6),
      order_status VARCHAR(255),
      FOREIGN KEY(restaurantID) REFERENCES restaurant(restaurantID) ON DELETE CASCADE

    )ENGINE=INNODB;
```



customer:
id: bigInt 20 primary key
  
username: VARCHAR 255
password: VARCHAR 255 
city : VARCHAR 255
province: VARCHAR 255
phone number: VARCHAR 255
balance: DECIMAL 
card info:  VARCHAR
dateofbirth: VARCHAR
emaiL: VARCHAR
signatures: VARCHAR 255  
accountCreated : DATATIME(6)

```SQL
CREATE TABLE customer(
customerID BIGINT(25) NOT NULL PRIMARY KEY AUTO_INCREMENT,    
username VARCHAR (255),
passwrd  VARCHAR (255), 
city VARCHAR (255),
province VARCHAR (255),
phone VARCHAR (255),
balance DECIMAL(5,2),
cardinfo  VARCHAR(255),
dateofbirth DATETIME(6),
email VARCHAR(255),
signatures VARCHAR(255),
accountCreated DATETIME(6)

)ENGINE=INNODB;

```






restaraunt owner
id: bigInt 20 primary key
restaurant_id: BIGINT foreign key  
username: VARCHAR 255
password: VARCHAR 255 


```SQL

CREATE TABLE owner (
ownerID bigInt(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
restaurantID BIGINT(20) NOT NULL,
FOREIGN KEY (restaurantID) REFERENCES restaurant(restaurantID) ON DELETE CASCADE,  
username VARCHAR (255),
passwrd VARCHAR (255),
phone VARCHAR (255),
email VARCHAR (255)

)ENGINE=INNODB;


```



restaraunt employees 
id: bigInt 20 primary key 
resutrant_id: BIGINT foreign key
onwer_id: BIGINT foreign key  
profile: VARCHAR 255    
username: VARCHAR 255
password: VARCHAR 255 

```SQL

CREATE TABLE employee (
employeeID bigInt(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
restaurantID BIGINT(20),  
ownerID BIGINT(25),
username VARCHAR (255),
passwrd VARCHAR (255),
phone VARCHAR (255),
email VARCHAR (255),

FOREIGN KEY (ownerID) REFERENCES owner(ownerID) ON DELETE CASCADE



);


```


insert into restaurant and owner:

```SQL
INSERT INTO restaurant( restaurantID,  restuarantName,  restaurantOwnerID) VALUES (1, 'Flying Tiger',1);
 INSERT INTO restaurant(  restuarantName,  restaurantOwnerID) VALUES ( 'JADE',2);
  INSERT INTO restaurant(  restuarantName,  restaurantOwnerID) VALUES ( 'Panda Express',3);


  INSERT INTO owner(restaurantID,username,passwrd,phone,email) VALUES(1,"fly",'fly','6132123123','hello@gmail.com');
  -- DELETE FROM restaurant WHERE restaurantID = 1; if you delete it now, it will become an empty set 


```



### REST API 
our spring data REST API will expose these all operations for free 
| http methods  | CRUD operation |
| ------------- | ------------- |
| POST /food  | create a new food  |
| GET /food  | read a list of food  |
| GET /food/{id}  | read a single food |
| PUT /food/{id}  | update an existing food  |
| DELETE /food/{id}  | delete an existing food  |








## MySQL  user for your app 

userid : root
password: root 


## backend java spring development process 
1. set up database table 
2. create a spring boot starter project with following dependencies 
spring-boot-starter-data-jpa
spring-boot-stater-data-rest
mysql-connector-java
3. develop food, restaurant, order , restaurant owner, resaturant employees 
4. create REST APIS with spring data JPA repository and spring data REST 



in application properties
set 

```
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/foodapp
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name =com.mysql.jdbc.Driver
#spring.jpa.show-sql: true

```


## Angular Front End 
1. create angular front end components 
2. retrieve data from spring boot REST APIs since we have done the back end expose the REST APIs 
3. define our routes 
4. configure router based on our routes 
5. define the router outlets 
6. set up router links to pass category id param 
7. enhance Component to read category id param
8. modify spring boot app -- REST Repository needs new methods 
9. update angular service to call new URL on spring boot app 

add an enhancement that product not found 


agination 


pagination is useful for handling large amounts of data 

it shows the users a small subset of data: page of data 

the user can click links to view other pages 

look atthe pagination concept, query database for a list of products 
we only show the user a page of data at a time 


we only provide a count of total number of elements , we only return a small subset 

we need pagination support on the backend also need pagination support on the front-end angular 



our spring boot backend uses spring data REST 
spring data REST provides pagination support out of the box 

by default, spring data rest returns : 20 elemens 
we can cusstomize this by passing in parameters 

we can use :

1. page: the page number to acess - based defaults to 0
2. size: the size of the page to return items per page, defaults to 20

get the first page , with page size of 3 
http://localhost:8080/api/food?page=0&size=3

we need the response meta data has valuable info 

```json
{
  "page":{
    "size":10,
    "totalElements": 200,
    "totalPages":20,
    "number":0
  }
}

```



there re many pagination solutions available for angular 
we can use ng-bootstrap 


overview of entire shopping cart process 
1. cart status component: on the main page, display total price and quantity 
2. cart detail pags: list the item in the cart 
3. cart detail page: add / remove items 
4. check out button
5. check out form 


we will create a new component called CartStatusComponent 
```shell
ng generate component components-cart-status

```


add html template for CartStatusComponent 
add click handler for add to cart button 
update ProductListComponent with click handler method 

we assigned over appropriate values 





## we need to provide user login/logout security 
1. login logon 
2. provide access to special page only for autheiticated users
3. keep tracoker of order history for registered customers 



login and logout security 
provide access to special page only for authenticated users such as restaurant owners and employees 

keep track of order history for registered users 

we need to authenticate a user 
we need to know what actions a user or app authorized to perform 
we need to delegate permissions to another app 


authentication :
the process of validating whether a user and app is who they claim to be username and password 
token or pin
finger print or retina scan 



authorization :
process of determing the actions a user app can perform 
commonly understood as roles 
guest user, minimal actions readonly 
authorized user: read or wrie data in user account 
adminL full access to all acounts system wide 

oAuth2 :
authorization framework that enables app to have limited access to a resource on behalf of a resource owner/user 

resource owner -- user account <> protected resources 
client app <> authorization server as what a user can do for accesing difference resources 

resource owner can request authorization to client app, authorization server will provide auth token, the client will use that to request access token, this access token will actually have the details as far as how they can access this given resources and also we have details as far as what they can do , then they can go ahead and send acess to those resources and so on and so forth 










openID connection OIDC 
openID applies on top of the authetication, open id connect will allow you to have authentication. it allows clients to receive identity info about authenticated resource owner/users 



JSON Web token  JTT 
there is a standard way of describing a token or JWT 

open standard that defines self-cotnained way of describing tokens 
secure and digitally signed to guarantee integrity 
it is ued by oauth and openID connect 

JSON web token will be well defined way of describing the format of a token 
header {

}
the type of token we are using, sigining algorithm and type of token 

payload that contains content for user data 

signature {} they are assigned to reserve guarantee itnegrity of the token 




### authorization server 
generate tokens and define security policies 

simple solutiosn 
create your own simple solution with code 
a lot of low level coding and vulernable to security holes and flaws 

you can easily be explosed vulnerable to some security holes 

realtime solutions, off the shelf solutions from companies specialzing in security 



OAuth2 
openID connect 
JWT  


# authorization server 
what is an authorization server? 

it is a server that generates tokens: OAuth2 or Open ID connect 


it defines access polices for a given app / protected resources 

it can also serve as identity provider using open ID connect 

Okta.com provids a cloud based authorization server + platform 
login widgets, social login 

authorizatin
- role based access 
- api access polcies 

user management 
- admin paneel 
- policy assignemt 
support industry standards: OAuth2, OpenID conenct, JWT 

it is a free developer account 

developing code with OAuth2, OpenID connect and JWT has a lot of bolierplate coding 
Okta provies SDKS for angular and java

it includes login/sign-in widets and can customize look and feel 

integeration 
Okta Integeration 

Angular from end <> Okta sign in widget, authentication, authorization, user management <> spring boot backend  <> database 



# Create new authentication service 







### use okta
1. create a free dev account at okta.com 
http://developer.okta.com, sign up , check email to verify 


2. add oepn id conenct client app in okta 
in your okta developer account, create a new app, select option for single page app 


3. set up app configuration for  open id connection 

need the clientID and issuer avaialble on Okta app details screen 

export default{
  oidc:{
    clientId:'',
    issuer: ''
    redirectUri: '',
    scope: []
  }
}


4. install okta sdk dependencies 
okta sign in widget is a js lib for app login 
you do not have to create the html just integrate the widget into your app
customizable use your own logo field name and custom fields

npm install @okta/okta-sigin-widget
npm install @okta/okta-angular

5. integration okta sign in widget 
angular.json 
```ts
"styles": [
  "node_modles/@okta/okta-signin-widget/dist/css/okta-sign-in.min.css"
]

```
ng generate component components/login 

```html
<div class = "pt">

<div id = "okta-sign-in-widget" class = "pt-5">
  </>

```

login.component.ts
```ts
import * as OktaSignIn '@okta/okta-signin-widget';
import {OktaAuthService} from '@okta/okta-angular';

```


PKEC proof key for code exchange 
recommended approach for controlling access between app and auth server 
protects against authoiztion code interception attacks 



6. develop login status component for login and logout buttons 
7. update app module configs to connect routes 




































