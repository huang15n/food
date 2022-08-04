package com.carleton.food;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import javax.persistence.metamodel.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Configuration
public class DataRestConfig implements  RepositoryRestConfigurer {
    @Autowired
    private EntityManager entityManager;



    // internal method to expose ids


    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        System.out.println("this is exposed");
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

// create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

// get the entity type for the entities
        for(EntityType tempEntityType: entities){
            entityClasses.add(tempEntityType.getJavaType());

        }

        // expose the entity if for the array domain type

        Class [] domainTypes =  entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

        //config.exposeIdsFor(entityManager.getMetamodel().getEntities().stream().map(Type::getJavaType).toArray(Class[]::new));

    }


}
