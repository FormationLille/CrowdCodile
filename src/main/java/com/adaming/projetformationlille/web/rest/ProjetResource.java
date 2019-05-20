package com.adaming.projetformationlille.web.rest;
import com.adaming.projetformationlille.domain.Projet;
import com.adaming.projetformationlille.service.ProjetService;
import com.adaming.projetformationlille.web.rest.errors.BadRequestAlertException;
import com.adaming.projetformationlille.web.rest.util.HeaderUtil;
import com.adaming.projetformationlille.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Projet.
 */
@RestController
@RequestMapping("/api")
public class ProjetResource {

    private final Logger log = LoggerFactory.getLogger(ProjetResource.class);

    private static final String ENTITY_NAME = "projet";

    private final ProjetService projetService;

    public ProjetResource(ProjetService projetService) {
        this.projetService = projetService;
    }

    /**
     * POST  /projets : Create a new projet.
     *
     * @param projet the projet to create
     * @return the ResponseEntity with status 201 (Created) and with body the new projet, or with status 400 (Bad Request) if the projet has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/projets")
    public ResponseEntity<Projet> createProjet(@Valid @RequestBody Projet projet) throws URISyntaxException {
        log.debug("REST request to save Projet : {}", projet);
        if (projet.getId() != null) {
            throw new BadRequestAlertException("A new projet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Projet result = projetService.save(projet);
        return ResponseEntity.created(new URI("/api/projets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /projets : Updates an existing projet.
     *
     * @param projet the projet to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated projet,
     * or with status 400 (Bad Request) if the projet is not valid,
     * or with status 500 (Internal Server Error) if the projet couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/projets")
    public ResponseEntity<Projet> updateProjet(@Valid @RequestBody Projet projet) throws URISyntaxException {
        log.debug("REST request to update Projet : {}", projet);
        if (projet.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Projet result = projetService.save(projet);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, projet.getId().toString()))
            .body(result);
    }

    /**
     * GET  /projets : get all the projets.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of projets in body
     */
    @GetMapping("/projets")
    public ResponseEntity<List<Projet>> getAllProjets(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Projets");
        Page<Projet> page;
        if (eagerload) {
            page = projetService.findAllWithEagerRelationships(pageable);
        } else {
            page = projetService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/projets?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /projets/:id : get the "id" projet.
     *
     * @param id the id of the projet to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the projet, or with status 404 (Not Found)
     */
    @GetMapping("/projets/{id}")
    public ResponseEntity<Projet> getProjet(@PathVariable Long id) {
        log.debug("REST request to get Projet : {}", id);
        Optional<Projet> projet = projetService.findOne(id);
        return ResponseUtil.wrapOrNotFound(projet);
    }

    /**
     * DELETE  /projets/:id : delete the "id" projet.
     *
     * @param id the id of the projet to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/projets/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        log.debug("REST request to delete Projet : {}", id);
        projetService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
