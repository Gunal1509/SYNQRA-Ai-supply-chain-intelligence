package synqra.backend.service;

import org.springframework.stereotype.Service;
import synqra.backend.entity.Order;
import synqra.backend.entity.Shipment;
import synqra.backend.repository.OrderRepository;
import synqra.backend.repository.ShipmentRepository;

import java.util.List;

@Service
public class ShipmentService {

    private final ShipmentRepository shipmentRepository;
    private final OrderRepository orderRepository;

    public ShipmentService(
            ShipmentRepository shipmentRepository,
            OrderRepository orderRepository) {

        this.shipmentRepository = shipmentRepository;
        this.orderRepository = orderRepository;
    }

    public List<Shipment> getShipments() {

        return shipmentRepository.findAll();
    }
    public Shipment getShipmentById(Long id) {

        return shipmentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Shipment not found"));
    }

   
    public Shipment createShipment(Shipment shipment) {

        Long orderId = shipment.getOrder().getId();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));
        shipment.setOrder(order);
        order.setStatus(shipment.getStatus());
        orderRepository.save(order);

        return shipmentRepository.save(shipment);
    }
    public Shipment updateShipment(Long id, Shipment shipment) {

        Shipment existingShipment =
                shipmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Shipment not found"));

        Long orderId = shipment.getOrder().getId();

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        existingShipment.setTrackingNumber(
                shipment.getTrackingNumber());

        existingShipment.setCarrier(
                shipment.getCarrier());

        existingShipment.setStatus(
                shipment.getStatus());

        existingShipment.setExpectedDelivery(
                shipment.getExpectedDelivery());

        existingShipment.setOrder(order);

 
        order.setStatus(shipment.getStatus());
        orderRepository.save(order);

        return shipmentRepository.save(existingShipment);
    }

    public void deleteShipment(Long id) {

        Shipment existingShipment =
                shipmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException("Shipment not found"));

        shipmentRepository.delete(existingShipment);
    }
}