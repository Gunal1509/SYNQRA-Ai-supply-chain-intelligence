
package synqra.backend.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import synqra.backend.entity.Supplier;
import synqra.backend.service.SupplierService;
import synqra.backend.dto.PageResponse;

import org.springframework.data.domain.Page;

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

    // Get suppliers with pagination, search, filtering and sorting
    @GetMapping("/page")
    public PageResponse<Supplier> getSuppliersPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "ALL") String status,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Page<Supplier> result = supplierService.getSuppliersPaged(
                page, size, search, status, sortBy, direction
        );

        return PageResponse.from(result);
    }

   
    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable Long id) {
        return supplierService.getSupplierById(id);
    }

    @PostMapping
    public Supplier createSupplier(
            @Valid @RequestBody Supplier supplier) {
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
