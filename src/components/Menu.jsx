import { useState, useRef, useEffect } from "react";
import { helados, batidos, cafeteria, postres, toppings } from "../data/heladeriaProducts";
import FlavorSelectionModal from "./FlavorSelectionModal";
import FlavorsViewModal from "./FlavorsViewModal";
import CategoryNav from "./CategoryNav";

export default function Menu({ onAddToCart, isClosed }) {
  const categories = [
    { id: "helados", label: "Helados", products: helados },
    { id: "batidos", label: "Batidos", products: batidos },
    { id: "cafeteria", label: "Cafetería", products: cafeteria },
    { id: "postres", label: "Postres", products: postres },
  ];

  const categoryRefs = useRef({});
  const [activeCategory, setActiveCategory] = useState("helados");

  // Estado para el modal de gustos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewFlavorsOpen, setIsViewFlavorsOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  const handleScrollToCategory = (id) => {
    setActiveCategory(id);
    const element = categoryRefs.current[id];
    if (element) {
      // Offset para que no quede tapado por el navbar sticky
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleAddToCartClick = (item) => {
    const itemsWithFlavors = [
      "hel-1kg", "hel-500", "hel-250",
      "milkshake-vainilla", "milkshake-frutilla", "milkshake-chocolate"
    ];
    if (itemsWithFlavors.includes(item.id)) {
      setSelectedProductForModal(item);
      setIsModalOpen(true);
    } else {
      onAddToCart(item);
    }
  };

  const handleFlavorConfirm = (flavors, selectedExtras = {}) => {
    if (selectedProductForModal) {
      // Calcular precio de extras
      let extrasPrice = 0;
      const extraEntries = Object.entries(selectedExtras); // [[id, qty], ...]

      const extrasDescParts = [];

      extraEntries.forEach(([id, qty]) => {
        if (qty > 0) {
          const extra = toppings.find((t) => t.id === id);
          if (extra) {
            extrasPrice += extra.price * qty;
            if (qty === 1) {
              extrasDescParts.push(extra.name);
            } else {
              extrasDescParts.push(`${qty}x ${extra.name}`);
            }
          }
        }
      });

      const extrasNames = extrasDescParts.join(", ");

      const descriptionExtras = extrasNames
        ? ` Gustos: ${flavors.join(", ")}. Extras: ${extrasNames}.`
        : ` Gustos: ${flavors.join(", ")}.`;

      const itemWithFlavors = {
        ...selectedProductForModal,
        description: selectedProductForModal.description + descriptionExtras,
        price: selectedProductForModal.price + extrasPrice,
      };
      onAddToCart(itemWithFlavors);
    }
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  // Renderizado de tarjeta HORIZONTAL (Lista para mobile/desktop)
  const renderProductCard = (item) => (
    <div key={item.id} className="col-12 col-lg-6 mb-3">
      <div className="card border-0 shadow-sm rounded-4 h-100 p-2 product-card-horizontal">
        <div className="d-flex align-items-center h-100">
          {/* Imagen (Izquierda) */}
          <div className="flex-shrink-0 position-relative" style={{ width: "110px", height: "110px" }}>
            <img
              src={item.img}
              alt={item.name}
              className="w-100 h-100 rounded-3"
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>

          {/* Contenido (Derecha) */}
          <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-between" style={{ minHeight: "110px" }}>
            <div className="d-flex justify-content-between align-items-start mb-1">
              <h5 className="mb-0 fw-bold text-dark fs-6 pe-2 text-wrap">{item.name}</h5>
              <button
                className="btn btn-sm btn-success rounded-3 px-3 fw-bold"
                disabled={isClosed}
                onClick={() => handleAddToCartClick(item)}
                style={{
                  backgroundColor: '#198754',
                  borderColor: '#198754',
                  fontSize: '0.8rem',
                  whiteSpace: 'nowrap'
                }}
              >
                {isClosed ? "Cerrado" : "Agregar"}
              </button>
            </div>

            <p className="text-muted small mb-2 text-truncate-2" style={{ fontSize: '0.85rem', lineHeight: '1.3' }}>
              {item.description}
            </p>

            <div className="mt-auto">
              <span className="fw-bolder fs-5 text-dark">${item.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="menu" className="pb-5 bg-light position-relative">

      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleScrollToCategory}
      />

      <div className="container mt-4">
        {/* Cabecera minimalista en movil oculta, visible en desktop si se quiere */}
        <div className="text-center mb-4 d-none d-md-block">
          <div>
            <button
              className="btn btn-outline-dark rounded-pill px-4 fw-bold"
              onClick={() => setIsViewFlavorsOpen(true)}
            >
              Ver Todos los Gustos 🍦
            </button>
          </div>
        </div>

        <div className="d-md-none text-center mb-3">
          <button
            className="btn btn-sm btn-outline-secondary rounded-pill px-3"
            onClick={() => setIsViewFlavorsOpen(true)}
          >
            Ver Gustos Disponibles 🍦
          </button>
        </div>

        <div className="row">
          <div className="col-12">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="mb-5 scroll-mt-offset"
                id={cat.id}
                ref={(el) => (categoryRefs.current[cat.id] = el)}
                style={{ scrollMarginTop: '160px' }}
              >
                <h3 className="mb-4 fw-bold text-dark ps-2 border-start border-4 border-danger">
                  {cat.label}
                </h3>

                <div className="row gx-3">
                  {cat.products.map((item) => renderProductCard(item))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FlavorSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFlavorConfirm}
        product={selectedProductForModal}
        toppings={selectedProductForModal?.category === "Helados" ? toppings : []}
      />
      <FlavorsViewModal
        isOpen={isViewFlavorsOpen}
        onClose={() => setIsViewFlavorsOpen(false)}
      />
    </section>
  );
}

