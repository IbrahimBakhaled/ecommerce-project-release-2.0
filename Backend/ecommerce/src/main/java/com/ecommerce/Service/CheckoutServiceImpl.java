package com.ecommerce.Service;

import com.ecommerce.Domain.Customer;
import com.ecommerce.Domain.Order;
import com.ecommerce.Domain.OrderItem;
import com.ecommerce.Dto.Purchase;
import com.ecommerce.Dto.PurchaseResponse;
import com.ecommerce.Repositories.CustomerRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {


    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {


        // retir order information apartir dto
        Order order = purchase.getOrder();

        // generer tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // remplir oder avec orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        //remplir order avec billingAddress / shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // remplir customer avec order
        Customer customer = purchase.getCustomer();
        customer.add(order);


        // enregistrer sur la base de donnee
        customerRepository.save(customer);

        // return response
        return new PurchaseResponse(orderTrackingNumber);

        // on va utiliser une code difficile de réfléchir


    }
    private String generateOrderTrackingNumber () {

        // generer aleatoire une code uuid
        return UUID.randomUUID().toString();


    }
}
