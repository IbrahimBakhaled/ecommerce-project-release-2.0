package com.ecommerce.Config;

import com.ecommerce.Domain.Country;
import com.ecommerce.Domain.Product;
import com.ecommerce.Domain.ProductCategory;
import com.ecommerce.Domain.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;



@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {




    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }




    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        // desactiver les methods PUT, POST DELETE pour product
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));




        // desactiver les methods : PUT, POST DELETE pour ProductCategory
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));



        // desactiver les methods : PUT, POST DELETE pour Country
        config.getExposureConfiguration()
                .forDomainType(Country.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));




        // desactiver les methods : PUT, POST DELETE pour State
        config.getExposureConfiguration()
                .forDomainType(State.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));


        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {


        // - obtenir une liste de toutes les entites a partir d'entity manager

        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - cree une liste des types d'entity
        List<Class> entityClasses = new ArrayList<>();

        // obtenir le type d'entite d"entities
        for (EntityType tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - exposé l'entité id d'un liste
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }


    }

