import { useState, useEffect } from "react";

export default function CategoryNav({ categories, activeCategory, onSelectCategory }) {
  return (
    <div
      className="category-nav-container py-3 bg-white shadow-sm"
      style={{
        position: "sticky",
        top: "60px", // Altura aproximada del Navbar (ajustar si es necesario)
        zIndex: 1010,
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <div className="container d-flex gap-2 px-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`btn rounded-pill px-4 fw-bold border-0 ${activeCategory === cat.id
                ? "btn-primary text-white shadow-sm"
                : "btn-light text-secondary"
              }`}
            style={{
              flexShrink: 0,
              transition: "all 0.2s ease"
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
