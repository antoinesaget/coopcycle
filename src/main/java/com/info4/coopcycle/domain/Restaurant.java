package com.info4.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 64)
    @Column(name = "adress", length = 64, nullable = false)
    private String adress;

    @ManyToOne
    @JsonIgnoreProperties("restaurants")
    private Cooperative cooperative;

    @ManyToOne
    @JsonIgnoreProperties("restaurants")
    private UserAccount owner;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdress() {
        return adress;
    }

    public Restaurant adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Cooperative getCooperative() {
        return cooperative;
    }

    public Restaurant cooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
        return this;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public UserAccount getOwner() {
        return owner;
    }

    public Restaurant owner(UserAccount userAccount) {
        this.owner = userAccount;
        return this;
    }

    public void setOwner(UserAccount userAccount) {
        this.owner = userAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", adress='" + getAdress() + "'" +
            "}";
    }
}
