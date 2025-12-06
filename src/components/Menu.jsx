import { useState, useRef } from "react";
import { helados, batidos, cafeteria, postres } from "../data/heladeriaProducts";
import FlavorSelectionModal from "./FlavorSelectionModal";
import FlavorsViewModal from "./FlavorsViewModal";

export default function Menu({ onAddToCart, isClosed }) {
  const categories = [
    { id: "helados", label: "Helados", products: helados },
    { id: "batidos", label: "Batidos", products: batidos },
  ];

  // categoría abierta en MOBILE (ya no tan necesario si es todo grid, pero lo mantenemos por si acaso o simplificamos)
  // Al cambiar a un diseño más "landing" con secciones claras, podemos mostrar todo abierto o mantener la navegación.
  // La referencia sugiere una vista tipo catálogo. Vamos a mostrar todo en secciones verticales.
  
  const [openCategory, setOpenCategory] = useState("helados"); // Default open or unused if we show all
  const categoryRefs = useRef({});

  // Estado para el modal de gustos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewFlavorsOpen, setIsViewFlavorsOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

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

  const handleFlavorConfirm = (flavors) => {
    if (selectedProductForModal) {
      const itemWithFlavors = {
        ...selectedProductForModal,
        description: `${selectedProductForModal.description} Gustos: ${flavors.join(", ")}.`,
      };
      onAddToCart(itemWithFlavors);
    }
    setIsModalOpen(false);
    setSelectedProductForModal(null);
  };

  // Renderizado de tarjeta VERTICAL (Grid)
  const renderProductCard = (item) => (
    <div key={item.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card h-100 border-0 shadow-sm product-card">
        <div className="position-relative" style={{ height: "220px", overflow: "hidden" }}>
            <img
            src={item.img}
            alt={item.name}
            className="w-100 h-100"
            style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
            />
        </div>
        
        <div className="card-body d-flex flex-column text-center p-4">
          <h5 className="card-title fw-bold mb-2 text-dark">{item.name}</h5>
          {item.description && (
            <p className="card-text text-muted small mb-3 flex-grow-1">
              {item.description}
            </p>
          )}
          
          <div className="mt-auto">
            <h5 className="fw-bold text-primary mb-3">${item.price}</h5>
            <button
                className="btn btn-outline-dark rounded-pill w-100 fw-semibold"
                disabled={isClosed}
                onClick={() => handleAddToCartClick(item)}
            >
                {isClosed ? "Cerrado" : "Agregar +"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="menu" className="py-5 bg-light">
      <div className="container">
        {/* Cabecera minimalista */}
        <div className="text-center mb-5">
           <h2 className="display-4 fw-bold text-uppercase ls-1">Nuestro Menú</h2>
           <div className="d-inline-block bg-warning mb-3" style={{width: '60px', height: '4px'}}></div>
           <div>
             <button 
               className="btn btn-outline-dark rounded-pill px-4 fw-bold"
               onClick={() => setIsViewFlavorsOpen(true)}
             >
               Ver Todos los Gustos 🍦
             </button>
           </div>
        </div>

        {categories.map((cat) => (
          <div key={cat.id} className="mb-5" ref={(el) => (categoryRefs.current[cat.id] = el)}>
            <h3 className="mb-4 fw-bold text-start border-start border-4 border-warning ps-3">
              {cat.label}
            </h3>
            
            <div className="row">
              {cat.products.map((item) => renderProductCard(item))}
            </div>
          </div>
        ))}
      </div>
      
      <FlavorSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleFlavorConfirm}
        product={selectedProductForModal}
      />
      <FlavorsViewModal
        isOpen={isViewFlavorsOpen}
        onClose={() => setIsViewFlavorsOpen(false)}
      />
    </section>
  );
}

