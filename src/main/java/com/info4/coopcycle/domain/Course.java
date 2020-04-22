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

import com.info4.coopcycle.domain.enumeration.CourseState;

import com.info4.coopcycle.domain.enumeration.DeliveryState;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private CourseState state;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_state", nullable = false)
    private DeliveryState deliveryState;

    @Column(name = "prep_time")
    private Integer prepTime;

    @Column(name = "delivery_time")
    private Integer deliveryTime;

    @Column(name = "delivery_details")
    private String deliveryDetails;

    @OneToOne
    @JoinColumn(unique = true)
    private Cart cart;

    @OneToMany(mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Payment> payments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("courses")
    private Restaurant restaurant;

    @ManyToOne
    @JsonIgnoreProperties("courses")
    private Deliverer deliverer;

    @ManyToOne
    @JsonIgnoreProperties("courses")
    private UserAccount client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CourseState getState() {
        return state;
    }

    public Course state(CourseState state) {
        this.state = state;
        return this;
    }

    public void setState(CourseState state) {
        this.state = state;
    }

    public DeliveryState getDeliveryState() {
        return deliveryState;
    }

    public Course deliveryState(DeliveryState deliveryState) {
        this.deliveryState = deliveryState;
        return this;
    }

    public void setDeliveryState(DeliveryState deliveryState) {
        this.deliveryState = deliveryState;
    }

    public Integer getPrepTime() {
        return prepTime;
    }

    public Course prepTime(Integer prepTime) {
        this.prepTime = prepTime;
        return this;
    }

    public void setPrepTime(Integer prepTime) {
        this.prepTime = prepTime;
    }

    public Integer getDeliveryTime() {
        return deliveryTime;
    }

    public Course deliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
        return this;
    }

    public void setDeliveryTime(Integer deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public String getDeliveryDetails() {
        return deliveryDetails;
    }

    public Course deliveryDetails(String deliveryDetails) {
        this.deliveryDetails = deliveryDetails;
        return this;
    }

    public void setDeliveryDetails(String deliveryDetails) {
        this.deliveryDetails = deliveryDetails;
    }

    public Cart getCart() {
        return cart;
    }

    public Course cart(Cart cart) {
        this.cart = cart;
        return this;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Set<Payment> getPayments() {
        return payments;
    }

    public Course payments(Set<Payment> payments) {
        this.payments = payments;
        return this;
    }

    public Course addPayments(Payment payment) {
        this.payments.add(payment);
        payment.setCourse(this);
        return this;
    }

    public Course removePayments(Payment payment) {
        this.payments.remove(payment);
        payment.setCourse(null);
        return this;
    }

    public void setPayments(Set<Payment> payments) {
        this.payments = payments;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Course restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Deliverer getDeliverer() {
        return deliverer;
    }

    public Course deliverer(Deliverer deliverer) {
        this.deliverer = deliverer;
        return this;
    }

    public void setDeliverer(Deliverer deliverer) {
        this.deliverer = deliverer;
    }

    public UserAccount getClient() {
        return client;
    }

    public Course client(UserAccount userAccount) {
        this.client = userAccount;
        return this;
    }

    public void setClient(UserAccount userAccount) {
        this.client = userAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", deliveryState='" + getDeliveryState() + "'" +
            ", prepTime=" + getPrepTime() +
            ", deliveryTime=" + getDeliveryTime() +
            ", deliveryDetails='" + getDeliveryDetails() + "'" +
            "}";
    }
}
