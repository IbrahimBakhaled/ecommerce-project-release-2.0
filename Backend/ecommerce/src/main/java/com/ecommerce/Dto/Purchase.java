package com.ecommerce.Dto;

import com.ecommerce.Domain.Address;
import com.ecommerce.Domain.Customer;
import com.ecommerce.Domain.Order;
import com.ecommerce.Domain.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
