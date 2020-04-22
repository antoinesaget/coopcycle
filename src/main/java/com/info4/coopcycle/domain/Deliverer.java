package com.info4.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.info4.coopcycle.domain.enumeration.DelivererStatus;

/**
 * A Deliverer.
 */
@Entity
@Table(name = "deliverer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Deliverer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 64)
    @Column(name = "current_position", length = 64, nullable = false)
    private String currentPosition;

    @NotNull
    @Size(max = 64)
    @Column(name = "transport_type", length = 64, nullable = false)
    private String transportType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private DelivererStatus status;

    @ManyToOne
    @JsonIgnoreProperties("deliverers")
    private UserAccount account;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCurrentPosition() {
        return currentPosition;
    }

    public Deliverer currentPosition(String currentPosition) {
        this.currentPosition = currentPosition;
        return this;
    }

    public void setCurrentPosition(String currentPosition) {
        this.currentPosition = currentPosition;
    }

    public String getTransportType() {
        return transportType;
    }

    public Deliverer transportType(String transportType) {
        this.transportType = transportType;
        return this;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
    }

    public DelivererStatus getStatus() {
        return status;
    }

    public Deliverer status(DelivererStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(DelivererStatus status) {
        this.status = status;
    }

    public UserAccount getAccount() {
        return account;
    }

    public Deliverer account(UserAccount userAccount) {
        this.account = userAccount;
        return this;
    }

    public void setAccount(UserAccount userAccount) {
        this.account = userAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Deliverer)) {
            return false;
        }
        return id != null && id.equals(((Deliverer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Deliverer{" +
            "id=" + getId() +
            ", currentPosition='" + getCurrentPosition() + "'" +
            ", transportType='" + getTransportType() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
