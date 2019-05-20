package com.adaming.projetformationlille.service.impl;

import com.adaming.projetformationlille.service.ProfilService;
import com.adaming.projetformationlille.domain.Profil;
import com.adaming.projetformationlille.repository.ProfilRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Profil.
 */
@Service
@Transactional
public class ProfilServiceImpl implements ProfilService {

    private final Logger log = LoggerFactory.getLogger(ProfilServiceImpl.class);

    private final ProfilRepository profilRepository;

    public ProfilServiceImpl(ProfilRepository profilRepository) {
        this.profilRepository = profilRepository;
    }

    /**
     * Save a profil.
     *
     * @param profil the entity to save
     * @return the persisted entity
     */
    @Override
    public Profil save(Profil profil) {
        log.debug("Request to save Profil : {}", profil);
        return profilRepository.save(profil);
    }

    /**
     * Get all the profils.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Profil> findAll(Pageable pageable) {
        log.debug("Request to get all Profils");
        return profilRepository.findAll(pageable);
    }


    /**
     * Get one profil by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Profil> findOne(Long id) {
        log.debug("Request to get Profil : {}", id);
        return profilRepository.findById(id);
    }

    /**
     * Delete the profil by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Profil : {}", id);
        profilRepository.deleteById(id);
    }
}
