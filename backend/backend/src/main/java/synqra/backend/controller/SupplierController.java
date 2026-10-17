package synqra.backend.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import synqra.backend.entity.Supplier;
import synqra.backend.service.SupplierService;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
@CrossOrigin(origins = "http://localhost:5173")
public class SupplierController {

    private final SupplierService supplierService;

    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }
    @GetMapping
    public List<Supplier> getSuppliers() {
        return supplierService.getSuppliers();
    }
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }
    @PostMapping
    public Supplier createSupplier(@Valid  @RequestBody Supplier supplier) {
        return supplierService.createSupplier(supplier);
    }
    @PutMapping("/{id}")
    public Supplier updateSupplier(
            @PathVariable Long id,
            @RequestBody Supplier supplier) {

        return supplierService.updateSupplier(id, supplier);
    }
    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable Long id) {
        supplierService.deleteSupplier(id);
    }
}