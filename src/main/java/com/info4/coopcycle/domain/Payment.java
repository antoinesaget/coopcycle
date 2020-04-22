package com.info4.coopcycle.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import com.info4.coopcycle.domain.enumeration.PaymentState;

import com.info4.coopcycle.domain.enumeration.PaymentMethod;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private PaymentState state;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "method", nullable = false)
    private PaymentMethod method;

    @ManyToOne
    @JsonIgnoreProperties("payments")
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaymentState getState() {
        return state;
    }

    public Payment state(PaymentState state) {
        this.state = state;
        return this;
    }

    public void setState(PaymentState state) {
        this.state = state;
    }

    public PaymentMethod getMethod() {
        return method;
    }

    public Payment method(PaymentMethod method) {
        this.method = method;
        return this;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }

    public Course getCourse() {
        return course;
    }

    public Payment course(Course course) {
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
        if (!(o instanceof Payment)) {
            return false;
        }
        return id != null && id.equals(((Payment) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Payment{" +
            "id=" + getId() +
            ", state='" + getState() + "'" +
            ", method='" + getMethod() + "'" +
            "}";
    }
}
