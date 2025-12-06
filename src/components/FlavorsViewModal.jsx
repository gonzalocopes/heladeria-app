import { flavors } from "../data/flavors";

export default function FlavorsViewModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold text-uppercase ls-1">Gustos Disponibles</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-muted small mb-3">Conocé nuestra variedad de sabores artesanales.</p>
            <div className="row g-2">
              {flavors.map((flavor, index) => (
                <div key={index} className="col-12 col-md-6">
                  <div className="p-2 border rounded bg-light text-center h-100 d-flex align-items-center justify-content-center">
                    <span className="fw-medium">{flavor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-dark rounded-pill px-4" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
