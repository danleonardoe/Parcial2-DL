package com.example.demo.controller;

import com.example.demo.model.Inventario;
import com.example.demo.repository.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "http://localhost:3000") // Ajusta el origen según tu configuración de frontend
public class InventarioController {

    @Autowired
    private InventarioRepository inventarioRepository;

    // Obtener todos los productos
@GetMapping
public ResponseEntity<List<Inventario>> getAllProductos() {
    List<Inventario> productos = inventarioRepository.findAll();
    return ResponseEntity.ok(productos);
}

// Obtener un producto por ID
@GetMapping("/{id}")
public ResponseEntity<Inventario> getProductoById(@PathVariable Long id) {
    return inventarioRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}

// Crear un nuevo producto
@PostMapping
public ResponseEntity<Inventario> createProducto(@RequestBody Inventario inventario) {
    // Validar datos de entrada
    if (inventario.getNombre() == null || inventario.getDescripcion() == null || inventario.getPrecio() == null) {
        return ResponseEntity.badRequest().build();
    }
    return ResponseEntity.ok(inventarioRepository.save(inventario));
}

// Actualizar un producto existente
@PutMapping("/{id}")
public ResponseEntity<Inventario> updateProducto(@PathVariable Long id, @RequestBody Inventario detallesInventario) {
    return inventarioRepository.findById(id)
            .map(producto -> {
                producto.setNombre(detallesInventario.getNombre());
                producto.setDescripcion(detallesInventario.getDescripcion());
                producto.setPrecio(detallesInventario.getPrecio());
                producto.setDisponibilidad(detallesInventario.getDisponibilidad());
                return ResponseEntity.ok(inventarioRepository.save(producto));
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
}

    // Eliminar un producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        Optional<Inventario> optionalProducto = inventarioRepository.findById(id);
        if (optionalProducto.isPresent()) {
            inventarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
