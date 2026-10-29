
package synqra.backend.controller;

import synqra.backend.entity.Order;
import synqra.backend.service.OrderService;
import synqra.backend.dto.PageResponse;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/page")
    public PageResponse<Order> getOrdersPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "ALL") String status,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Page<Order> result = orderService.getOrdersPaged(
                page,
                size,
                search,
                status,
                sortBy,
                direction
        );

        return PageResponse.from(result);
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
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order order,
            @RequestParam Long supplierId) {

        return orderService.updateOrders(order, id, supplierId);
    }
}
