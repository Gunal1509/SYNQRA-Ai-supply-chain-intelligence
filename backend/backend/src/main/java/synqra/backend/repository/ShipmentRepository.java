package synqra.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import synqra.backend.entity.Shipment;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {

    boolean existsByOrder_Id(Long orderId);
    long countByStatus(String status);
}