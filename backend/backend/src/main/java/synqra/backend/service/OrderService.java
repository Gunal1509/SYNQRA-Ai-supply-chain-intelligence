package synqra.backend.service;

import synqra.backend.entity.Order;
import synqra.backend.entity.Supplier;
import synqra.backend.repository.OrderRepository;
import synqra.backend.repository.ShipmentRepository;
import synqra.backend.repository.SupplierRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.Set;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;
    private final ShipmentRepository shipmentRepository;

    public OrderService(
            OrderRepository orderRepository,
            SupplierRepository supplierRepository,
            ShipmentRepository shipmentRepository) {

        this.orderRepository = orderRepository;
        this.supplierRepository = supplierRepository;
        this.shipmentRepository = shipmentRepository;
    }


    public List<Order> getOrders() {

        return orderRepository.findAll();
    }
     
    public Page<Order> getOrdersPaged(
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

    Set<String> allowedSortFields =
            Set.of("id", "order", "status");

    if (sortBy == null ||
            !allowedSortFields.contains(sortBy)) {
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

    Specification<Order> specification =
            (root, query, cb) -> {

        var predicate = cb.conjunction();

      
        if (search != null && !search.trim().isEmpty()) {
            String keyword =
                    "%" + search.trim().toLowerCase() + "%";

            var searchPredicate = cb.like(
                    cb.lower(root.get("order").as(String.class)),
                    keyword
            );

         
            try {
                Long orderId = Long.parseLong(search.trim());

                searchPredicate = cb.or(
                        searchPredicate,
                        cb.equal(root.get("id"), orderId)
                );
            } catch (NumberFormatException ignored) {
               
            }

            predicate = cb.and(predicate, searchPredicate);
        }

        
        if (status != null
                && !status.isBlank()
                && !"ALL".equalsIgnoreCase(status)) {

            predicate = cb.and(
                    predicate,
                    cb.equal(
                            cb.lower(root.get("status")),
                            status.trim().toLowerCase()
                    )
            );
        }

        return predicate;
    };

    return orderRepository.findAll(specification, pageable);
}

    public void addOrders(Order order, Long supplierId) {

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() ->
                        new RuntimeException("Supplier not found"));

        order.setSupplier(supplier);

    
        order.setStatus("INCOMPLETE");

        orderRepository.save(order);
    }


    // DELETE ORDER
    public void deleteOrders(Long id) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (shipmentRepository.existsByOrder_Id(id)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Cannot delete order because it is currently in shipment"
            );
        }

        orderRepository.delete(order);
    }
    public Order updateOrders(
            Order order,
            Long id,
            Long supplierId) {

        Order existord = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() ->
                        new RuntimeException("Supplier not found"));

        existord.setOrder(order.getOrder());

        existord.setSupplier(supplier);

    
        orderRepository.save(existord);

        return existord;
    }
}