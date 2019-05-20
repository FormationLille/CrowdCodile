package com.adaming.projetformationlille.service;

import com.adaming.projetformationlille.domain.Profil;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Profil.
 */
public interface ProfilService {

    /**
     * Save a profil.
     *
     * @param profil the entity to save
     * @return the persisted entity
     */
    Profil save(Profil profil);

    /**
     * Get all the profils.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Profil> findAll(Pageable pageable);


    /**
     * Get the "id" profil.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Profil> findOne(Long id);

    /**
     * Delete the "id" profil.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
