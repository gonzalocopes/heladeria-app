import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import WhatsAppButton from "./WhatsAppButton";

export default function MobileCartModal({
    isOpen,
    onClose,
    cart,
    total,
    onRemove,
    onChangeQty,
    customer,
    setCustomer,
    isClosed
}) {
    if (!isOpen) return null;

    return (
        <div
            className="modal fade show d-block"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1060,
            }}
            tabIndex="-1"
            role="dialog"
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-dialog-scrollable modal-fullscreen-sm-down m-0 h-100"
                style={{
                    maxWidth: '500px',
                    marginLeft: 'auto',
                    height: '100%'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content h-100 border-0 rounded-0">
                    <div className="modal-header border-0 bg-light">
                        <h5 className="modal-title fw-bold">Tu Pedido</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body bg-light p-0">
                        <div className="p-3">
                            <Cart
                                cart={cart}
                                total={total}
                                onRemove={onRemove}
                                onChangeQty={onChangeQty}
                            />
                            <div className="mt-4">
                                <CheckoutForm
                                    customer={customer}
                                    onChange={setCustomer}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-0 p-3 bg-white shadow-lg-top">
                        <WhatsAppButton
                            cart={cart}
                            total={total}
                            customer={customer}
                            isClosed={isClosed}
                            className="w-100 btn-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
