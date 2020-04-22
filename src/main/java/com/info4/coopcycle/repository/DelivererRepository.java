package com.info4.coopcycle.repository;

import com.info4.coopcycle.domain.Deliverer;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Deliverer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DelivererRepository extends JpaRepository<Deliverer, Long> {
}
