package com.adaming.projetformationlille.service;

import com.adaming.projetformationlille.domain.Projet;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Projet.
 */
public interface ProjetService {

    /**
     * Save a projet.
     *
     * @param projet the entity to save
     * @return the persisted entity
     */
    Projet save(Projet projet);

    /**
     * Get all the projets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Projet> findAll(Pageable pageable);

    /**
     * Get all the Projet with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Projet> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" projet.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Projet> findOne(Long id);

    /**
     * Delete the "id" projet.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
