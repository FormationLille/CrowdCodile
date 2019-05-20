package com.adaming.projetformationlille.service.impl;

import com.adaming.projetformationlille.service.DonsService;
import com.adaming.projetformationlille.domain.Dons;
import com.adaming.projetformationlille.repository.DonsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Dons.
 */
@Service
@Transactional
public class DonsServiceImpl implements DonsService {

    private final Logger log = LoggerFactory.getLogger(DonsServiceImpl.class);

    private final DonsRepository donsRepository;

    public DonsServiceImpl(DonsRepository donsRepository) {
        this.donsRepository = donsRepository;
    }

    /**
     * Save a dons.
     *
     * @param dons the entity to save
     * @return the persisted entity
     */
    @Override
    public Dons save(Dons dons) {
        log.debug("Request to save Dons : {}", dons);
        return donsRepository.save(dons);
    }

    /**
     * Get all the dons.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Dons> findAll() {
        log.debug("Request to get all Dons");
        return donsRepository.findAll();
    }


    /**
     * Get one dons by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Dons> findOne(Long id) {
        log.debug("Request to get Dons : {}", id);
        return donsRepository.findById(id);
    }

    /**
     * Delete the dons by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Dons : {}", id);
        donsRepository.deleteById(id);
    }
}
