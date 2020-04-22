package com.info4.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A UserAccount.
 */
@Entity
@Table(name = "user_account")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")
    @Column(name = "mail", nullable = false, unique = true)
    private String mail;

    @Column(name = "adress")
    private String adress;

    @NotNull
    @Size(min = 5, max = 32)
    @Column(name = "login", length = 32, nullable = false, unique = true)
    private String login;

    @NotNull
    @Size(min = 8)
    @Column(name = "password", nullable = false)
    private String password;

    @OneToMany(mappedBy = "owner")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Restaurant> restaurants = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "user_account_roles",
               joinColumns = @JoinColumn(name = "user_account_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "roles_id", referencedColumnName = "id"))
    private Set<Role> roles = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("members")
    private Cooperative cooperative;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMail() {
        return mail;
    }

    public UserAccount mail(String mail) {
        this.mail = mail;
        return this;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getAdress() {
        return adress;
    }

    public UserAccount adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getLogin() {
        return login;
    }

    public UserAccount login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public UserAccount password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Restaurant> getRestaurants() {
        return restaurants;
    }

    public UserAccount restaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
        return this;
    }

    public UserAccount addRestaurants(Restaurant restaurant) {
        this.restaurants.add(restaurant);
        restaurant.setOwner(this);
        return this;
    }

    public UserAccount removeRestaurants(Restaurant restaurant) {
        this.restaurants.remove(restaurant);
        restaurant.setOwner(null);
        return this;
    }

    public void setRestaurants(Set<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public UserAccount roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public UserAccount addRoles(Role role) {
        this.roles.add(role);
        role.getUsers().add(this);
        return this;
    }

    public UserAccount removeRoles(Role role) {
        this.roles.remove(role);
        role.getUsers().remove(this);
        return this;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Cooperative getCooperative() {
        return cooperative;
    }

    public UserAccount cooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
        return this;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAccount)) {
            return false;
        }
        return id != null && id.equals(((UserAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserAccount{" +
            "id=" + getId() +
            ", mail='" + getMail() + "'" +
            ", adress='" + getAdress() + "'" +
            ", login='" + getLogin() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
