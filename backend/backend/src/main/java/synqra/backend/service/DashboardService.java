package synqra.backend.service;

import org.springframework.stereotype.Service;
import synqra.backend.repository.OrderRepository;
import synqra.backend.repository.ShipmentRepository;
import synqra.backend.repository.SupplierRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    private final OrderRepository orderRepository;
    private final ShipmentRepository shipmentRepository;
    private final SupplierRepository supplierRepository;

    public DashboardService(
            OrderRepository orderRepository,
            ShipmentRepository shipmentRepository,
            SupplierRepository supplierRepository) {

        this.orderRepository = orderRepository;
        this.shipmentRepository = shipmentRepository;
        this.supplierRepository = supplierRepository;
    }

    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        long totalOrders = orderRepository.count();

        long activeShipments =
                shipmentRepository.countByStatus("IN_TRANSIT");

        long suppliers =
                supplierRepository.count();

        long pendingoOrders =
                shipmentRepository.countByStatus("PENDING");
        long InCompleteOrders=orderRepository.countByStatus("INCOMPLETE");
        long DeliveredOrders=shipmentRepository.countByStatus("DELIVERED");

        stats.put("totalOrders", totalOrders);
        stats.put("activeShipments", activeShipments);
        stats.put("suppliers", suppliers);
        stats.put("pendingOrders", pendingoOrders);
        stats.put("incompleteOrders",InCompleteOrders);
        stats.put("deliveredOrders",DeliveredOrders);

        return stats;
    }
}