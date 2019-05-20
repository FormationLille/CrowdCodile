package com.adaming.projetformationlille.repository;

import com.adaming.projetformationlille.domain.Categorie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Categorie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Long> {

    @Query(value = "select distinct categorie from Categorie categorie left join fetch categorie.projets",
        countQuery = "select count(distinct categorie) from Categorie categorie")
    Page<Categorie> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct categorie from Categorie categorie left join fetch categorie.projets")
    List<Categorie> findAllWithEagerRelationships();

    @Query("select categorie from Categorie categorie left join fetch categorie.projets where categorie.id =:id")
    Optional<Categorie> findOneWithEagerRelationships(@Param("id") Long id);

}
