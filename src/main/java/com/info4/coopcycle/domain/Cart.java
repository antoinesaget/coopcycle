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

import com.info4.coopcycle.domain.enumeration.CartState;

/**
 * A Cart.
 */
@Entity
@Table(name = "cart")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sate", nullable = false)
    private CartState sate;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cart_products",
               joinColumns = @JoinColumn(name = "cart_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "products_id", referencedColumnName = "id"))
    private Set<Product> products = new HashSet<>();

    @OneToOne(mappedBy = "cart")
    @JsonIgnore
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CartState getSate() {
        return sate;
    }

    public Cart sate(CartState sate) {
        this.sate = sate;
        return this;
    }

    public void setSate(CartState sate) {
        this.sate = sate;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Cart products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Cart addProducts(Product product) {
        this.products.add(product);
        product.getCarts().add(this);
        return this;
    }

    public Cart removeProducts(Product product) {
        this.products.remove(product);
        product.getCarts().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Course getCourse() {
        return course;
    }

    public Cart course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cart)) {
            return false;
        }
        return id != null && id.equals(((Cart) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cart{" +
            "id=" + getId() +
            ", sate='" + getSate() + "'" +
            "}";
    }
}
