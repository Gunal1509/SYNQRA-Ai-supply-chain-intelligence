
package synqra.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import synqra.backend.entity.Supplier;
import synqra.backend.repository.SupplierRepository;

import java.util.List;
import java.util.Set;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    private static final Set<String> ALLOWED_SORT_FIELDS =
            Set.of("id", "name", "location", "status", "reliabilityScore");

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    // Existing CRUD methods

    public List<Supplier> getSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Supplier not found"));
    }

    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(Long id, Supplier supplier) {
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Supplier not found"));

        existingSupplier.setName(supplier.getName());
        existingSupplier.setContact(supplier.getContact());
        existingSupplier.setLocation(supplier.getLocation());
        existingSupplier.setReliabilityScore(
                supplier.getReliabilityScore());
        existingSupplier.setStatus(supplier.getStatus());

        return supplierRepository.save(existingSupplier);
    }

    public void deleteSupplier(Long id) {
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Supplier not found"));

        supplierRepository.delete(existingSupplier);
    }

    public Page<Supplier> getSuppliersPaged(
            int page,
            int size,
            String search,
            String status,
            String sortBy,
            String direction) {

        page = Math.max(page, 0);

        if (!List.of(5, 10, 20).contains(size)) {
            size = 10;
        }

        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            sortBy = "id";
        }
        Sort.Direction sortDirection =
                "desc".equalsIgnoreCase(direction)
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, sortBy)
        );

        Specification<Supplier> specification =
                (root, query, criteriaBuilder) -> {

            var predicate = criteriaBuilder.conjunction();

            if (search != null && !search.trim().isEmpty()) {
                String keyword = "%" +
                        search.trim().toLowerCase() + "%";

                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.or(
                                criteriaBuilder.like(
                                        criteriaBuilder.lower(
                                                root.get("name")),
                                        keyword
                                ),
                                criteriaBuilder.like(
                                        criteriaBuilder.lower(
                                                root.get("location")),
                                        keyword
                                )
                        )
                );
            }
            if (status != null
                    && !status.isBlank()
                    && !"ALL".equalsIgnoreCase(status)) {

                predicate = criteriaBuilder.and(
                        predicate,
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(
                                        root.get("status")),
                                status.trim().toLowerCase()
                        )
                );
            }

            return predicate;
        };

        return supplierRepository.findAll(specification, pageable);
    }
}
