import { useState, useRef } from "react";
import { helados, batidos, cafeteria, postres } from "../data/heladeriaProducts";

export default function Menu({ onAddToCart, isClosed }) {
  const categories = [
    { id: "helados", label: "Helados 🍦", products: helados },
    { id: "batidos", label: "Batidos 🥤", products: batidos },
    { id: "cafeteria", label: "Cafetería ☕", products: cafeteria },
    { id: "postres", label: "Postres 🧁", products: postres },
  ];

  // categoría abierta en MOBILE
  const [openCategory, setOpenCategory] = useState(null);

  // refs para hacer scroll suave a la categoría abierta
  const categoryRefs = useRef({});

  const handleToggleCategory = (id) => {
    setOpenCategory((prev) => {
      // si ya está abierta → la cierro, si no → la abro
      const next = prev === id ? null : id;

      // solo hacemos scroll en mobile y si la estamos abriendo
      if (next && typeof window !== "undefined" && window.innerWidth < 768) {
        // esperamos a que termine la animación de abrir/cerrar
        setTimeout(() => {
          const el = categoryRefs.current[next];
          if (el) {
            // posición absoluta del contenedor en la página
            const offset = el.offsetTop - 120; // ajustá 120 si querés más arriba/abajo
            window.scrollTo({ top: offset, behavior: "smooth" });
          }
        }, 350); // tiempo para que se acomode el layout
      }

      return next;
    });
  };

  const renderProductCard = (item) => (
    <div key={item.id} className="card mb-3 menu-product-card shadow-sm">
      <div className="row g-0 align-items-center">
        {/* FOTO */}
        <div className="col-3">
          <img
            src={item.img}
            alt={item.name}
            className="img-fluid rounded-start"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "80px",
            }}
          />
        </div>

        {/* CONTENIDO */}
        <div className="col-9">
          <div className="card-body py-2 d-flex justify-content-between align-items-start gap-2">
            <div>
              <h6 className="card-title mb-1 fw-semibold">{item.name}</h6>
              {item.description && (
                <p className="card-text mb-1 small text-muted">
                  {item.description}
                </p>
              )}
              <div className="fw-bold">${item.price}</div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-success btn-sm"
                disabled={isClosed}
                onClick={() => onAddToCart(item)}
              >
                {isClosed ? "Cerrado" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="menu" className="py-4 bg-light">
      <div className="container-fluid px-3 px-lg-4">
        <h2 className="mb-3 text-center">Menú</h2>

        {/* === LISTA DE CATEGORÍAS (ESTILO APP) – SOLO MOBILE === */}
        <div className="d-md-none mb-3 menu-category-strip">
          {categories.map((cat) => {
            const isActive = openCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleToggleCategory(cat.id)}
                className={`menu-category-pill ${
                  isActive ? "menu-category-pill-active" : ""
                }`}
              >
                <span className="flex-grow-1 text-start">
                  <span className="d-block fw-semibold">{cat.label}</span>
                  <small className="text-muted">
                    {cat.products.length} producto
                    {cat.products.length !== 1 ? "s" : ""}
                  </small>
                </span>
                <span className="menu-cat-icon">
                  {isActive ? "−" : "+"}
                </span>
              </button>
            );
          })}
        </div>

        {/* === PRODUCTOS POR CATEGORÍA === */}
        {categories.map((cat) => {
          const isOpenMobile = openCategory === cat.id;

          return (
            <div
              key={cat.id}
              className="mb-4"
              ref={(el) => (categoryRefs.current[cat.id] = el)} // ref en el contenedor de la categoría
            >
              {/* Título de categoría (solo desktop) */}
              <div className="d-none d-md-flex align-items-baseline mb-2">
                <h4 className="me-2 mb-0">{cat.label}</h4>
                <small className="text-muted">
                  {cat.products.length} producto
                  {cat.products.length !== 1 ? "s" : ""}
                </small>
              </div>

              {/* MOBILE: contenedor con animación de apertura/cierre */}
              <div
                className={`d-md-none menu-category-collapse ${
                  isOpenMobile ? "show" : ""
                }`}
              >
                {cat.products.map((item) => renderProductCard(item))}
              </div>

              {/* DESKTOP: siempre visibles todas las categorías */}
              <div className="d-none d-md-block">
                {cat.products.map((item) => renderProductCard(item))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
