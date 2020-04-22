package com.info4.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

import com.info4.coopcycle.domain.enumeration.ProductAvailability;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

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
    @DecimalMin(value = "0")
    @DecimalMax(value = "1000")
    @Column(name = "price", nullable = false)
    private Float price;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "availability", nullable = false)
    private ProductAvailability availability;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Restaurant restaurant;

    @ManyToMany(mappedBy = "products")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Cart> carts = new HashSet<>();

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

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getPrice() {
        return price;
    }

    public Product price(Float price) {
        this.price = price;
        return this;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public ProductAvailability getAvailability() {
        return availability;
    }

    public Product availability(ProductAvailability availability) {
        this.availability = availability;
        return this;
    }

    public void setAvailability(ProductAvailability availability) {
        this.availability = availability;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Product restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Set<Cart> getCarts() {
        return carts;
    }

    public Product carts(Set<Cart> carts) {
        this.carts = carts;
        return this;
    }

    public Product addCarts(Cart cart) {
        this.carts.add(cart);
        cart.getProducts().add(this);
        return this;
    }

    public Product removeCarts(Cart cart) {
        this.carts.remove(cart);
        cart.getProducts().remove(this);
        return this;
    }

    public void setCarts(Set<Cart> carts) {
        this.carts = carts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", availability='" + getAvailability() + "'" +
            "}";
    }
}
