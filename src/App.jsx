import React, { useState } from 'react';
import './App.css';

function App() {
  // Estado inicial para los productos con datos de ejemplo
  const [products, setProducts] = useState([
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 10, available: true },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 20, available: false }
  ]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    available: false,
  });
  const [editProduct, setEditProduct] = useState(null);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Manejar el envío del formulario para agregar o editar un producto
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      // Actualizar producto existente
      setProducts(products.map(p => (p.id === editProduct.id ? { ...newProduct, id: editProduct.id } : p)));
      setEditProduct(null);
    } else {
      // Crear nuevo producto
      setProducts([...products, { ...newProduct, id: Date.now() }]);
    }
    setNewProduct({ name: '', description: '', price: '', available: false });
  };

  // Editar un producto existente
  const handleEdit = (product) => {
    setEditProduct(product);
    setNewProduct({ ...product });
  };

  // Eliminar un producto
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h1>Inventario de Productos</h1>

      {/* Formulario para crear o editar productos */}
      <form onSubmit={handleSubmit}>
        <h2>{editProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <label>
          <input
            type="checkbox"
            name="available"
            checked={newProduct.available}
            onChange={handleChange}
          />
          Disponible
        </label>
        <button type="submit">{editProduct ? 'Actualizar Producto' : 'Agregar Producto'}</button>
      </form>

      {/* Lista de productos */}
      <h2>Lista de Productos</h2>
      <ul>
        {products.map(product => (
          <li
            key={product.id}
            style={{ backgroundColor: product.available ? 'white' : 'red' }}
          >
            <div>
              <strong>{product.name}</strong> - {product.description} - Q{product.price} -{' '}
              {product.available ? 'Disponible' : 'No Disponible'}
            </div>
            <div>
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
