package com.adaming.projetformationlille.service;

import com.adaming.projetformationlille.domain.Dons;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Dons.
 */
public interface DonsService {

    /**
     * Save a dons.
     *
     * @param dons the entity to save
     * @return the persisted entity
     */
    Dons save(Dons dons);

    /**
     * Get all the dons.
     *
     * @return the list of entities
     */
    List<Dons> findAll();


    /**
     * Get the "id" dons.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Dons> findOne(Long id);

    /**
     * Delete the "id" dons.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
