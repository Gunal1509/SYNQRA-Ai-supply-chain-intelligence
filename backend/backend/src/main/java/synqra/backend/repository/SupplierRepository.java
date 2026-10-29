package synqra.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import synqra.backend.entity.Supplier;

public interface SupplierRepository
        extends JpaRepository<Supplier, Long>,
                JpaSpecificationExecutor<Supplier> {
}