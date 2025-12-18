// src/components/Cart.jsx
export default function Cart({ cart, total, onRemove, onChangeQty }) {
  return (
    <div className="card mb-4">
      <div className="card-header bg-dark text-white">
        Mi pedido
      </div>
      <div className="card-body">
        {cart.length === 0 ? (
          <p className="text-muted mb-0">
            Todavía no agregaste productos a tu pedido 🍦
          </p>
        ) : (
          <>
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div className="fw-semibold">{item.name}</div>
                    <small className="text-muted">
                      ${item.price} c/u
                    </small>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() =>
                        onChangeQty(item.id, item.qty - 1)
                      }
                      disabled={item.qty <= 1}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() =>
                        onChangeQty(item.id, item.qty + 1)
                      }
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger ms-3"
                      onClick={() => onRemove(item.id)}
                    >
                      x
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">${total}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
