package synqra.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import synqra.backend.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}