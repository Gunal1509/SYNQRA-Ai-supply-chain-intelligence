package synqra.backend.service;

import synqra.backend.entity.Order;
import synqra.backend.entity.Supplier;
import synqra.backend.repository.OrderRepository;
import synqra.backend.repository.ShipmentRepository;
import synqra.backend.repository.SupplierRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

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