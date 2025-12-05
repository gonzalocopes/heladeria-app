// src/admin/Editor.jsx
import { useState } from "react";
import * as data from "../data/heladeriaProducts";

export default function Editor() {
  const categoryKeys = Object.keys(data); // ej: ["helados", "batidos", "cafeteria", "postres"]

  const [products, setProducts] = useState(() => {
    const all = [];
    Object.keys(data).forEach((catKey) => {
      data[catKey].forEach((p) => {
        all.push({ ...p, categoryKey: catKey });
      });
    });
    return all;
  });

  const updateField = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleImageFile = (id, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target.result; // data:image/...
      updateField(id, "img", base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    const defaultCategoryKey = categoryKeys[0] || "helados";

    const newProduct = {
      id: `new-${Date.now()}`,
      name: "Nuevo producto",
      category: "Nueva categoría",
      description: "Descripción del producto",
      price: 0,
      img: "",
      categoryKey: defaultCategoryKey,
    };

    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (id) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;

    const ok = window.confirm(
      `¿Seguro que querés eliminar el producto "${prod.name}"?`
    );
    if (!ok) return;

    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDuplicateProduct = (id) => {
    const originalIndex = products.findIndex((p) => p.id === id);
    if (originalIndex === -1) return;

    const original = products[originalIndex];
    const newId = `${original.id}-copy-${Date.now()}`;

    const duplicated = {
      ...original,
      id: newId,
      name: original.name + " (copia)",
    };

    setProducts((prev) => {
      const copy = [...prev];
      copy.splice(originalIndex + 1, 0, duplicated);
      return copy;
    });
  };

  const downloadFile = () => {
    const grouped = {};
    products.forEach((p) => {
      const { categoryKey, ...prod } = p;
      if (!grouped[categoryKey]) grouped[categoryKey] = [];
      grouped[categoryKey].push(prod);
    });

    let text = "";
    Object.keys(grouped).forEach((catKey) => {
      text += `export const ${catKey} = ${JSON.stringify(
        grouped[catKey],
        null,
        2
      )};\n\n`;
    });

    const blob = new Blob([text], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "heladeriaProducts.js"; // Changed logic
    a.click();
  };

  return (
    <div className="container py-5">
      <h1 className="mb-3">🛠️ Editor de productos (solo admin)</h1>
      <p className="text-muted">
        Modificá los datos, agregá o duplicá productos y descargá el archivo
        <code> heladeriaProducts.js</code> actualizado para reemplazar en tu proyecto.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-success" onClick={handleAddProduct}>
          ➕ Agregar producto
        </button>
        <button className="btn btn-primary" onClick={downloadFile}>
          📥 Descargar archivo actualizado
        </button>
      </div>

      <hr />

      {products.map((p) => (
        <div key={p.id} className="border rounded p-3 mb-3 bg-light">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h5 className="mb-0">{p.name}</h5>
              <small className="text-muted">
                ID: <code>{p.id}</code>
              </small>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => handleDuplicateProduct(p.id)}
              >
                📄 Duplicar
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDeleteProduct(p.id)}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>

          <div className="row g-2">
            {/* Nombre */}
            <div className="col-md-3">
              <label className="form-label">Nombre</label>
              <input
                className="form-control"
                value={p.name}
                onChange={(e) => updateField(p.id, "name", e.target.value)}
              />
            </div>

            {/* Precio */}
            <div className="col-md-2">
              <label className="form-label">Precio</label>
              <input
                className="form-control"
                type="number"
                value={p.price}
                onChange={(e) =>
                  updateField(p.id, "price", Number(e.target.value))
                }
              />
            </div>

            {/* Categoría (texto que ve el cliente) */}
            <div className="col-md-3">
              <label className="form-label">Categoría (texto)</label>
              <input
                className="form-control"
                value={p.category || ""}
                onChange={(e) =>
                  updateField(p.id, "category", e.target.value)
                }
              />
            </div>

            {/* Array donde se guarda (pizzas, empanadas, etc.) */}
            <div className="col-md-4">
              <label className="form-label">
                Grupo (pizzas, empanadas, etc.)
              </label>
              <select
                className="form-select"
                value={p.categoryKey}
                onChange={(e) =>
                  updateField(p.id, "categoryKey", e.target.value)
                }
              >
                {categoryKeys.map((ck) => (
                  <option key={ck} value={ck}>
                    {ck}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row g-2 mt-2">
            {/* Descripción */}
            <div className="col-md-8">
              <label className="form-label">Descripción</label>
              <input
                className="form-control"
                value={p.description || ""}
                onChange={(e) =>
                  updateField(p.id, "description", e.target.value)
                }
              />
            </div>

            {/* Imagen URL / base64 */}
            <div className="col-md-4">
              <label className="form-label">Imagen (URL o base64)</label>
              <input
                className="form-control mb-1"
                value={p.img || ""}
                onChange={(e) => updateField(p.id, "img", e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={(e) =>
                  handleImageFile(p.id, e.target.files?.[0] || null)
                }
              />
              {p.img && (
                <div className="mt-2">
                  <small className="text-muted d-block">Vista previa:</small>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{ maxWidth: "100%", maxHeight: "120px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
