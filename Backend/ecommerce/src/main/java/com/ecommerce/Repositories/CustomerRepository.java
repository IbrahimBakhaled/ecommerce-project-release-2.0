package com.ecommerce.Repositories;

import com.ecommerce.Domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
=======

>>>>>>> 7387810bbf4b031bedd2fe9343e614233ce70d71
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
