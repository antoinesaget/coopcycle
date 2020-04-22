package com.info4.coopcycle.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.info4.coopcycle.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.info4.coopcycle.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.info4.coopcycle.domain.User.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Authority.class.getName());
            createCache(cm, com.info4.coopcycle.domain.User.class.getName() + ".authorities");
            createCache(cm, com.info4.coopcycle.domain.UserAccount.class.getName());
            createCache(cm, com.info4.coopcycle.domain.UserAccount.class.getName() + ".restaurants");
            createCache(cm, com.info4.coopcycle.domain.UserAccount.class.getName() + ".roles");
            createCache(cm, com.info4.coopcycle.domain.Role.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Role.class.getName() + ".users");
            createCache(cm, com.info4.coopcycle.domain.Cooperative.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Cooperative.class.getName() + ".members");
            createCache(cm, com.info4.coopcycle.domain.Cooperative.class.getName() + ".restaurants");
            createCache(cm, com.info4.coopcycle.domain.Restaurant.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Product.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Product.class.getName() + ".carts");
            createCache(cm, com.info4.coopcycle.domain.Deliverer.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Payment.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Cart.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Cart.class.getName() + ".products");
            createCache(cm, com.info4.coopcycle.domain.Course.class.getName());
            createCache(cm, com.info4.coopcycle.domain.Course.class.getName() + ".payments");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}