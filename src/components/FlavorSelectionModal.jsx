import { useState, useEffect } from "react";
import { flavors } from "../data/flavors";

export default function FlavorSelectionModal({ isOpen, onClose, onConfirm, product, toppings = [] }) {
  const [selectedFlavors, setSelectedFlavors] = useState([]);
  const [selectedExtras, setSelectedExtras] = useState({}); // { id: qty }

  // Reseteamos la selección cada vez que se abre el modal con un producto nuevo
  useEffect(() => {
    if (isOpen) {
      setSelectedFlavors([]);
      setSelectedExtras({});
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  // Determinar límite de gustos según el producto
  let maxFlavors = 4; // Por defecto 1kg y 1/2kg

  if (product.id === "hel-250") {
    maxFlavors = 3;
  } else if (product.category === "Batidos" || product.id.startsWith("milkshake")) {
    maxFlavors = 1;
  } else if (product.id === "cucurucho") {
    maxFlavors = 2;
  }

  const handleToggleFlavor = (flavor) => {
    if (selectedFlavors.includes(flavor)) {
      // Deseleccionar
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavor));
    } else {
      // Seleccionar si no encuenta al límite
      if (selectedFlavors.length < maxFlavors) {
        setSelectedFlavors([...selectedFlavors, flavor]);
      }
    }
  };

  const handleToggleExtra = (extraId) => {
    setSelectedExtras((prev) => {
      const currentQty = prev[extraId] || 0;
      const newQty = currentQty > 0 ? 0 : 1;
      const copy = { ...prev };
      if (newQty === 0) delete copy[extraId];
      else copy[extraId] = newQty;
      return copy;
    });
  };

  const handleQuantityChange = (extraId, delta) => {
    setSelectedExtras((prev) => {
      const currentQty = prev[extraId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      const copy = { ...prev };
      if (newQty === 0) delete copy[extraId];
      else copy[extraId] = newQty;
      return copy;
    });
  };

  const handleConfirm = () => {
    onConfirm(selectedFlavors, selectedExtras);
  };

  const remaining = maxFlavors - selectedFlavors.length;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Elegí tus gustos <small className="text-muted">({product.name})</small>
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-info py-2 mb-3">
              <small>
                Podés elegir hasta <strong>{maxFlavors}</strong> gustos.{" "}
                {remaining === 0
                  ? "¡Completaste tu selección!"
                  : `Te faltan elegir ${remaining}.`}
              </small>
            </div>

            <div className="list-group">
              {flavors.map((flavor) => {
                const isSelected = selectedFlavors.includes(flavor);
                const isDisabled =
                  !isSelected && selectedFlavors.length >= maxFlavors;

                return (
                  <button
                    key={flavor}
                    type="button"
                    className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${isSelected ? "active" : ""
                      }`}
                    onClick={() => handleToggleFlavor(flavor)}
                    disabled={isDisabled}
                  >
                    {flavor}
                    {isSelected && <span className="badge bg-light text-dark">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Extras Section */}
            {toppings && toppings.length > 0 && (
              <div className="mt-4">
                <h6 className="fw-bold mb-3">Extras / Salsas / Cucuruchos</h6>
                <div className="list-group">
                  {toppings.map((extra) => {
                    const qty = selectedExtras[extra.id] || 0;
                    const isSelected = qty > 0;

                    // Lógica específica para "Cucurucho Extra" (id hardcodeado o por config)
                    const isCountable = extra.id === "top-cucurucho";

                    return (
                      <div
                        key={extra.id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${isSelected && !isCountable ? "list-group-item-light" : ""
                          }`}
                      >
                        <div>
                          <div className="fw-semibold">{extra.name}</div>
                          <small className="text-muted">
                            {extra.price === 0 ? "Gratis" : `+$${extra.price}`}
                          </small>
                        </div>

                        {isCountable ? (
                          <div className="d-flex align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => handleQuantityChange(extra.id, -1)}
                              disabled={qty === 0}
                            >
                              -
                            </button>
                            <span className="fw-bold" style={{ minWidth: '20px', textAlign: 'center' }}>
                              {qty}
                            </span>
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleQuantityChange(extra.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            className={`btn btn-sm ${isSelected ? "btn-success" : "btn-outline-secondary"
                              }`}
                            onClick={() => handleToggleExtra(extra.id)}
                          >
                            {isSelected ? "Agregado ✓" : "Agregar"}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleConfirm}
              disabled={selectedFlavors.length === 0}
            >
              Confirmar Selección
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
