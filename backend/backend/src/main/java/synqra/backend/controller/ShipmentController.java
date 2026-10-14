package synqra.backend.controller;

import org.springframework.web.bind.annotation.*;
import synqra.backend.entity.Shipment;
import synqra.backend.service.ShipmentService;

import java.util.List;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin(origins = "http://localhost:5173")
public class ShipmentController {

    private final ShipmentService shipmentService;

    public ShipmentController(ShipmentService shipmentService) {
        this.shipmentService = shipmentService;
    }

    @GetMapping
    public List<Shipment> getShipments() {
        return shipmentService.getShipments();
    }

    @GetMapping("/{id}")
    public Shipment getShipmentById(@PathVariable Long id) {
        return shipmentService.getShipmentById(id);
    }

    @PostMapping
    public Shipment createShipment(
            @RequestBody Shipment shipment) {

        return shipmentService.createShipment(shipment);
    }

    @PutMapping("/{id}")
    public Shipment updateShipment(
            @PathVariable Long id,
            @RequestBody Shipment shipment) {

        return shipmentService.updateShipment(id, shipment);
    }

    @DeleteMapping("/{id}")
    public void deleteShipment(@PathVariable Long id) {

        shipmentService.deleteShipment(id);
    }
}