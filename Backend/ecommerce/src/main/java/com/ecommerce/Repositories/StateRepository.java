package com.ecommerce.Repositories;

import com.ecommerce.Domain.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface StateRepository extends JpaRepository<State, Integer> {

    // chercher state apartir country code chaque state de chaque country
    List<State> findByCountryCode(@Param("code") String code);
}
