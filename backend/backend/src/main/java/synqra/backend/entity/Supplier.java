package synqra.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Supplier name is required")
    private String name;

    @NotBlank(message = "Contact is required")
    @Pattern(
        regexp = "\\d{10}",
        message = "Contact must be a valid 10-digit number"
    )
    private String contact;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Reliability score is required")
    @Min(value = 0, message = "Reliability score must be at least 0")
    @Max(value = 100, message = "Reliability score must not exceed 100")
    private Double reliabilityScore;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getReliabilityScore() {
        return reliabilityScore;
    }

    public void setReliabilityScore(Double reliabilityScore) {
        this.reliabilityScore = reliabilityScore;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}