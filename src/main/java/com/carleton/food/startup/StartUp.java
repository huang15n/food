package com.carleton.food.startup;

import com.carleton.food.models.*;
import com.carleton.food.repositories.*;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;


@Component
public class StartUp implements CommandLineRunner {


    @Autowired
    private  RestaurantRepository restaurantRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;


    @Autowired
    private CustomerRepository customerRepository;




    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CountryRepository coutryRepository;







    @Override
    public void run(String... args) throws Exception {
        System.out.println("initialzing restaurant and food");


        categoryRepository.deleteAll();
  foodRepository.deleteAll();

    employeeRepository.deleteAll();
   customerRepository.deleteAll();
        ownerRepository.deleteAll();
        restaurantRepository.deleteAll();


        Food f1 = new Food();
        f1.setDateCreated(new Date(System.currentTimeMillis()));
        f1.setDateCreated(new Date(System.currentTimeMillis()));
        f1.setFoodDescription("this is the sugary donut");
        f1.setFoodName("Donut");
        f1.setImage_url("https://www.shugarysweets.com/wp-content/uploads/2020/01/baked-chocolate-donuts-recipe-735x735.jpg");
        f1.setPrice(2.2);
        f1.setStock(100);
        f1.setQuantity(1);


        Food f2 = new Food();
        f2.setDateCreated(new Date(System.currentTimeMillis()));
        f2.setDateCreated(new Date(System.currentTimeMillis()));
        f2.setFoodDescription("this is boston cream");
        f2.setFoodName("cream");
        f2.setImage_url("https://www.livewellbakeoften.com/wp-content/uploads/2017/02/Homemade-Whipped-Cream-7.jpg");
        f2.setPrice(3.1);
        f2.setStock(999);
        f2.setQuantity(1);


        Food f3 = new Food();
        f3.setDateCreated(new Date(System.currentTimeMillis()));
        f3.setDateCreated(new Date(System.currentTimeMillis()));
        f3.setFoodDescription("This is a popular Chinese-American dish that appears in suburban Chinese restaurants here in Australia under various other guises.");
        f3.setFoodName("General Tao Chicken");
        f3.setImage_url("https://www.skinnytaste.com/wp-content/uploads/2018/04/General-Tsos-Chicken-1-6.jpg");
        f3.setPrice(10.1);
        f3.setStock(999);
        f3.setQuantity(1);






        Food f4 = new Food();
        f4.setDateCreated(new Date(System.currentTimeMillis()));
        f4.setDateCreated(new Date(System.currentTimeMillis()));
        f4.setFoodDescription("Sweet and Sour Chicken is a classic Chinese takeout option most of us are too afraid to make at home.");
        f4.setFoodName("Sour Sweet Chicken");
        f4.setImage_url("https://dinnerthendessert.com/wp-content/uploads/2017/05/Sweet-Sour-Chicken-5.jpg");
        f4.setPrice(12.1);
        f4.setStock(999);
        f4.setQuantity(1);


        Food f5 = new Food();
        f5.setDateCreated(new Date(System.currentTimeMillis()));
        f5.setDateCreated(new Date(System.currentTimeMillis()));
        f5.setFoodDescription("Mapo Tofu is a popular Chinese dish from Sichuan Province, where spicy food is king and the signature spice of the region––the Sichuan Peppercorn");
        f5.setFoodName("Maopo Tofu");
        f5.setImage_url("https://www.maangchi.com/wp-content/uploads/2019/09/mapotofu.jpg");
        f5.setPrice(13.1);
        f5.setStock(999);
        f5.setQuantity(1);


        Food f6 = new Food();
        f6.setDateCreated(new Date(System.currentTimeMillis()));
        f6.setDateCreated(new Date(System.currentTimeMillis()));
        f6.setFoodDescription("The dish is called “Little Pot Rice Noodles” because it’s usually served in a small personalized pot, and you can customize it to your own tastes");
        f6.setFoodName("Yunan Rice Noodle");
        f6.setImage_url("https://thewoksoflife.com/wp-content/uploads/2020/04/yunnan-rice-noodle-soup-17.jpg");
        f6.setPrice(13.1);
        f6.setStock(999);
        f6.setQuantity(1);







        Restaurant r1 = new Restaurant("Tim Hortons","Ottawa","Ontario","1293 Laurier Avenue");
        Restaurant r2 = new Restaurant("Panda Express","Ottawa","Ontario","2021 Josephine Avenue");
        Set<Food> foodSet = new HashSet<>();
         Set<Food> foodSet2 = new HashSet<>();
        foodSet.add(f1);
        foodSet.add(f2);



         r1.setFood(foodSet);

         foodSet2.add(f3);
         foodSet2.add(f4);
         foodSet2.add(f5);
         foodSet2.add(f6);


         //        Restaurant r2 = new Restaurant("Panda Express",,"Ottawa","Ontario","2021 Josephine Avenue");

        r2.setFood(foodSet2);
        f1.setRestaurant(r1);
        f2.setRestaurant(r1);
        f3.setRestaurant(r2);
        f4.setRestaurant(r2);
        f5.setRestaurant(r2);
        f6.setRestaurant(r2);


        Owner o1 = new Owner();
        o1.setEmail("hello@gmail.com");
        o1.setUsername("hello");
        o1.setPassword("123");
        o1.setPhone("1123123131");
        o1.setRestaurant(r1);
        o1.setFirstName("James");
        o1.setLastName("Harden");


         Owner o2 = new Owner();
         o2.setEmail("wonderful@gmail.com");
         o2.setUsername("wondedful");
         o2.setPassword("123");
         o2.setPhone("1123123131");
         o2.setRestaurant(r2);
         o2.setFirstName("Cameron");
         o2.setLastName("Anthony");
        r1.setOwner(o1);
        r2.setOwner(o2);


        Employee e1 = new Employee();
        e1.setOwner(o1);
        e1.setUsername("what");
        e1.setPassword("123");
        e1.setPhone("533453453");
        e1.setEmail("sdfs@gmail.com");
        e1.setRestaurant(r1);
        e1.setFirstName("Mark");
        e1.setLastName("Twins");
        e1.setSalary(12.5);
        e1.setStartDate(new Date());




        Set<Employee> employeeSet = new HashSet<>();
        employeeSet.add(e1);
        o1.setEmployees(employeeSet);
        r1.setEmployees(employeeSet);



        Customer c1 = new Customer();
        c1.setAccountCreated(LocalDate.now());

        c1.setEmail("good@gmail.com");
        c1.setUsername("wind");
        c1.setPassword("3231");

        c1.setBalance(32.21);

        c1.setFirstName("David");
        c1.setLastName("Peterson");
        c1.setAccountCreated(LocalDate.now());

        c1.setMoneySpent(12.31);
        c1.setSignatures("nothing");
        c1.setPhone("342423421");











        Category category1 = new Category();
        Category category2 = new Category();
        Category category3 = new Category();
        category1.setCategoryName("Dessert");
        category2.setCategoryName("Chinese");
        category3.setCategoryName("Canadian");
        f1.setCategory(category1);
        f2.setCategory(category3);
        f3.setCategory(category2);
        f4.setCategory(category2);
        f5.setCategory(category2);
        f6.setCategory(category2);




        Set<Category> categories = new HashSet<>();
        categories.add(category1);
        categories.add(category2);
        categories.add(category3);

        categoryRepository.saveAll(categories);




























        ownerRepository.save(o1);
        ownerRepository.save(o2);


        foodRepository.saveAll(foodSet);
        foodRepository.saveAll(foodSet2);



        restaurantRepository.save(r1);
        restaurantRepository.save(r2);
        employeeRepository.save(e1);
        customerRepository.save(c1);







    }
}
