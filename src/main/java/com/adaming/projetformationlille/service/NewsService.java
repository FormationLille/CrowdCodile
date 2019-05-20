package com.adaming.projetformationlille.service;

import com.adaming.projetformationlille.domain.News;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing News.
 */
public interface NewsService {

    /**
     * Save a news.
     *
     * @param news the entity to save
     * @return the persisted entity
     */
    News save(News news);

    /**
     * Get all the news.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<News> findAll(Pageable pageable);


    /**
     * Get the "id" news.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<News> findOne(Long id);

    /**
     * Delete the "id" news.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
