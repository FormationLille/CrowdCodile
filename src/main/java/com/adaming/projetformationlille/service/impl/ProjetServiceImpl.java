package com.adaming.projetformationlille.service.impl;

import com.adaming.projetformationlille.service.ProjetService;
import com.adaming.projetformationlille.domain.Projet;
import com.adaming.projetformationlille.repository.ProjetRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Projet.
 */
@Service
@Transactional
public class ProjetServiceImpl implements ProjetService {

    private final Logger log = LoggerFactory.getLogger(ProjetServiceImpl.class);

    private final ProjetRepository projetRepository;

    public ProjetServiceImpl(ProjetRepository projetRepository) {
        this.projetRepository = projetRepository;
    }

    /**
     * Save a projet.
     *
     * @param projet the entity to save
     * @return the persisted entity
     */
    @Override
    public Projet save(Projet projet) {
        log.debug("Request to save Projet : {}", projet);
        return projetRepository.save(projet);
    }

    /**
     * Get all the projets.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Projet> findAll(Pageable pageable) {
        log.debug("Request to get all Projets");
        return projetRepository.findAll(pageable);
    }

    /**
     * Get all the Projet with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Projet> findAllWithEagerRelationships(Pageable pageable) {
        return projetRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one projet by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Projet> findOne(Long id) {
        log.debug("Request to get Projet : {}", id);
        return projetRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the projet by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Projet : {}", id);
        projetRepository.deleteById(id);
    }
}
