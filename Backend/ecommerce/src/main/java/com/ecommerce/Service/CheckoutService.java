package com.ecommerce.Service;

import com.ecommerce.Dto.Purchase;
import com.ecommerce.Dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
