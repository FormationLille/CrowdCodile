package com.adaming.projetformationlille.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.adaming.projetformationlille.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Projet.class.getName(), jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Projet.class.getName() + ".commentaires", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Projet.class.getName() + ".news", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Projet.class.getName() + ".profilsContributeurs", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Projet.class.getName() + ".profilsSuiveurs", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Projet.class.getName() + ".categories", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Profil.class.getName(), jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Profil.class.getName() + ".projetsPortes", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Profil.class.getName() + ".projetContribues", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Profil.class.getName() + ".projetSuivis", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Dons.class.getName(), jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Commentaire.class.getName(), jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Categorie.class.getName(), jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.Categorie.class.getName() + ".projets", jcacheConfiguration);
            cm.createCache(com.adaming.projetformationlille.domain.News.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
