package com.telusko.BatchApp.config;

import com.telusko.BatchApp.model.Customer;
import org.springframework.batch.item.ItemProcessor;

public class CustomerProcessor implements ItemProcessor<Customer, Customer> {

    @Override
    public Customer process(Customer item) throws Exception{
        //logic to filter the data
        return item;
    }
}
