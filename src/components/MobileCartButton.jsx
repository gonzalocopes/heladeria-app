import { useMemo } from "react";

export default function MobileCartButton({ cart, onClick }) {
    const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.qty, 0), [cart]);
    const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

    if (totalItems === 0) return null;

    return (
        <div
            className="fixed-bottom p-3 d-lg-none"
            style={{ zIndex: 1050 }}
        >
            <button
                onClick={onClick}
                className="btn btn-primary w-100 rounded-pill shadow-lg d-flex justify-content-between align-items-center px-4 py-3"
                style={{ border: 'none', background: 'linear-gradient(90deg, #d63347 0%, #ff5252 100%)' }}
            >
                <span className="badge bg-white text-danger rounded-pill px-3 py-2 fs-6">
                    {totalItems}
                </span>
                <span className="fw-bold fs-6 text-white text-uppercase ls-1">Ver Pedido</span>
                <span className="fw-bold fs-6 text-white">
                    ${totalPrice.toLocaleString()}
                </span>
            </button>
        </div>
    );
}
