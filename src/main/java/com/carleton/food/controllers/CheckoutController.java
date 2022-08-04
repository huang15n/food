package com.carleton.food.controllers;


import com.carleton.food.dto.Purchase;
import com.carleton.food.dto.PurchaseResponse;
import com.carleton.food.repositories.CheckoutService;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.http.MediaType;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin({"http://localhost:4200/","http://127.0.0.1:4200/"})
@RestController
@RequestMapping(value = "/checkout",consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
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

    @ResponseBody
    @ExceptionHandler(HttpMediaTypeNotAcceptableException.class)
    public String handleHttpMediaTypeNotAcceptableException() {
        return "acceptable MIME type:" + MediaType.APPLICATION_JSON_VALUE;
    }
}
