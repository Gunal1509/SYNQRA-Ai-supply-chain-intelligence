package synqra.backend.controller;

import synqra.backend.entity.Order;
import synqra.backend.service.OrderService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/gunal")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    @PostMapping
    public Order createOrders(
            @RequestBody Order order,
            @RequestParam Long supplierId) {

        orderService.addOrders(order, supplierId);

        return order;
    }

    @DeleteMapping("/{id}")
public void deleteOrder(@PathVariable Long id) {
    orderService.deleteOrders(id);
}

    @PutMapping("/{id}")
    public Order UpdateOrder(
            @PathVariable Long id,
            @RequestBody Order order,
            @RequestParam Long supplierId) {

        Order updateorder =
                orderService.updateOrders(order, id, supplierId);

        return updateorder;
    }
}