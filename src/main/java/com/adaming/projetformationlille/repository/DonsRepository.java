package com.adaming.projetformationlille.repository;

import com.adaming.projetformationlille.domain.Dons;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Dons entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DonsRepository extends JpaRepository<Dons, Long> {

}
