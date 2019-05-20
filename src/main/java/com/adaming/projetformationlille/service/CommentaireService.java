package com.adaming.projetformationlille.service;

import com.adaming.projetformationlille.domain.Commentaire;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Commentaire.
 */
public interface CommentaireService {

    /**
     * Save a commentaire.
     *
     * @param commentaire the entity to save
     * @return the persisted entity
     */
    Commentaire save(Commentaire commentaire);

    /**
     * Get all the commentaires.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Commentaire> findAll(Pageable pageable);


    /**
     * Get the "id" commentaire.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Commentaire> findOne(Long id);

    /**
     * Delete the "id" commentaire.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
