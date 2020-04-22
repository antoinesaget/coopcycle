package com.info4.coopcycle.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cooperative.
 */
@Entity
@Table(name = "cooperative")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cooperative implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    @NotNull
    @Size(max = 64)
    @Column(name = "geographical_area", length = 64, nullable = false)
    private String geographicalArea;

    @OneToOne
    @JoinColumn(unique = true)
    private UserAccount dg;

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UserAccount> members = new HashSet<>();

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Restaurant> restaurants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Cooperative name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGeographicalArea() {
        return geographicalArea;
    }

    public Cooperative geographicalArea(String geographicalArea) {
        this.geographicalArea = geographicalArea;
        return this;
    }

    public void setGeographicalArea(String geographicalArea) {
        this.geographicalArea = geographicalArea;
    }

    public UserAccount getDg() {
        return dg;
    }

    public Cooperative dg(UserAccount userAccount) {
        this.dg = userAccount;
        return this;
    }

    public void setDg(UserAccount userAccount) {
        this.dg = userAccount;
    }

    public Set<UserAccount> getMembers() {
        return members;
    }

    public Cooperative members(Set<UserAccount> userAccounts) {
        this.members = userAccounts;
        return this;
    }

    public Cooperative addMembers(UserAccount userAccount) {
        this.members.add(userAccount);
        userAccount.setCooperative(this);
        return this;
    }

    public Cooperative removeMembers(UserAccount userAccount) {
        this.members.remove(userAccount);
        userAccount.setCooperative(null);
        return this;
    }

    public void setMembers(Set<UserAccount> userAccounts) {
        this.members = userAccounts;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public Cooperative restaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
        return this;
    }

    public Cooperative addRestaurants(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.setCooperative(this);
        return this;
    }

    public Cooperative removeRestaurants(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.setCooperative(null);
        return this;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cooperative)) {
            return false;
        }
        return id != null && id.equals(((Cooperative) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cooperative{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", geographicalArea='" + getGeographicalArea() + "'" +
            "}";
    }
}
