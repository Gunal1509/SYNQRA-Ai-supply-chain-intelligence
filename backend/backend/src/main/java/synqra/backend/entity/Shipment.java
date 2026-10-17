package synqra.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "shipments")
public class Shipment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Tracking number is required")
    private String trackingNumber;

    @NotBlank(message = "Carrier is required")
    private String carrier;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Expected delivery is required")
    private LocalDate expectedDelivery;

    @NotNull(message = "Order is required")
    @OneToOne
    @JoinColumn(name = "order_id", unique = true)
    private Order order;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getCarrier() {
        return carrier;
    }

    public void setCarrier(String carrier) {
        this.carrier = carrier;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getExpectedDelivery() {
        return expectedDelivery;
    }

    public void setExpectedDelivery(LocalDate expectedDelivery) {
        this.expectedDelivery = expectedDelivery;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}