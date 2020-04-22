package com.info4.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.info4.coopcycle.domain.enumeration.RoleEnum;

/**
 * A Role.
 */
@Entity
@Table(name = "role")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, unique = true)
    private RoleEnum role;

    @ManyToMany(mappedBy = "roles")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<UserAccount> users = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleEnum getRole() {
        return role;
    }

    public Role role(RoleEnum role) {
        this.role = role;
        return this;
    }

    public void setRole(RoleEnum role) {
        this.role = role;
    }

    public Set<UserAccount> getUsers() {
        return users;
    }

    public Role users(Set<UserAccount> userAccounts) {
        this.users = userAccounts;
        return this;
    }

    public Role addUsers(UserAccount userAccount) {
        this.users.add(userAccount);
        userAccount.getRoles().add(this);
        return this;
    }

    public Role removeUsers(UserAccount userAccount) {
        this.users.remove(userAccount);
        userAccount.getRoles().remove(this);
        return this;
    }

    public void setUsers(Set<UserAccount> userAccounts) {
        this.users = userAccounts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Role)) {
            return false;
        }
        return id != null && id.equals(((Role) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Role{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            "}";
    }
}
