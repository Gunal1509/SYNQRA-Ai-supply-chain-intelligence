package synqra.backend.service;

import org.springframework.stereotype.Service;
import synqra.backend.entity.Supplier;
import synqra.backend.repository.SupplierRepository;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public List<Supplier> getSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
    }

    public Supplier createSupplier(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier updateSupplier(Long id, Supplier supplier) {

        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        existingSupplier.setName(supplier.getName());
        existingSupplier.setContact(supplier.getContact());
        existingSupplier.setLocation(supplier.getLocation());
        existingSupplier.setReliabilityScore(supplier.getReliabilityScore());
        existingSupplier.setStatus(supplier.getStatus());

        return supplierRepository.save(existingSupplier);
    }

    public void deleteSupplier(Long id) {
        Supplier existingSupplier = supplierRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));

        supplierRepository.delete(existingSupplier);
    }
}