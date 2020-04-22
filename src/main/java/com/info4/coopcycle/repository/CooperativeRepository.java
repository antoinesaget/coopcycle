package com.info4.coopcycle.repository;

import com.info4.coopcycle.domain.Cooperative;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Cooperative entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CooperativeRepository extends JpaRepository<Cooperative, Long> {
}
