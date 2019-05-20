package com.adaming.projetformationlille.repository;

import com.adaming.projetformationlille.domain.Projet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Projet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {

    @Query(value = "select distinct projet from Projet projet left join fetch projet.profilsContributeurs left join fetch projet.profilsSuiveurs",
        countQuery = "select count(distinct projet) from Projet projet")
    Page<Projet> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct projet from Projet projet left join fetch projet.profilsContributeurs left join fetch projet.profilsSuiveurs")
    List<Projet> findAllWithEagerRelationships();

    @Query("select projet from Projet projet left join fetch projet.profilsContributeurs left join fetch projet.profilsSuiveurs where projet.id =:id")
    Optional<Projet> findOneWithEagerRelationships(@Param("id") Long id);

}
