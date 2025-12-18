import { useState, useEffect } from "react";
import "./cards.css"; // Nuevos estilos de tarjetas
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import WhatsAppButton from "./components/WhatsAppButton";
import MobileCartButton from "./components/MobileCartButton";
import MobileCartModal from "./components/MobileCartModal";




import { clientConfig } from "./config/clientConfig";

function App() {
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    address2: "",
    phone: "",
    deliveryMethod: "Delivery",
    paymentMethod: "Efectivo",
    comments: "",
  });



  const [isClosed, setIsClosed] = useState(false);

  // 🔔 Horario
  useEffect(() => {
    if (!clientConfig.horario?.enabled) return;

    const checkClosed = () => {
      const now = new Date();
      const [openH, openM] = clientConfig.horario.apertura
        .split(":")
        .map(Number);
      const [closeH, closeM] = clientConfig.horario.cierre
        .split(":")
        .map(Number);

      const minutesNow = now.getHours() * 60 + now.getMinutes();
      const minutesOpen = openH * 60 + openM;
      const minutesClose = closeH * 60 + closeM;

      let closedNow;

      if (minutesClose > minutesOpen) {
        closedNow =
          minutesNow < minutesOpen || minutesNow >= minutesClose;
      } else {
        closedNow =
          minutesNow < minutesOpen && minutesNow >= minutesClose;
      }

      setIsClosed(closedNow);
    };

    checkClosed();
    const id = setInterval(checkClosed, 60000);
    return () => clearInterval(id);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product, { fromUpsell = false } = {}) => {
    if (isClosed && clientConfig.horario?.enabled) {
      alert(
        clientConfig.horario.mensajeCerrado ||
        "En este momento el local está cerrado."
      );
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });



  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const changeQty = (id, newQty) => {
    if (newQty <= 0) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: newQty } : item
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );



  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  return (
    <div className="bg-body-tertiary min-vh-100">
      <Navbar cartCount={cartCount} />

      {clientConfig.horario?.enabled && isClosed && (
        <div className="bg-dark text-light text-center py-2">
          <small>{clientConfig.horario.mensajeCerrado}</small>
        </div>
      )}

      <HeroCarousel />

      <main
        className="py-3"
        id="pedido"
        style={{ paddingBottom: "80px" }}
      >
        <div className="container-fluid px-0 px-lg-5">
          <div className="row g-0 g-lg-4">
            {/* Menú */}
            <div className="col-12 col-lg-8 mb-4 mb-lg-0">
              <Menu onAddToCart={addToCart} isClosed={isClosed} />
            </div>

            {/* Carrito Desktop */}
            <section id="cart" className="d-none d-lg-block col-lg-4">
              <div className="sticky-top" style={{ top: "90px", zIndex: 1000 }}>
                <Cart
                  cart={cart}
                  total={total}
                  onRemove={removeFromCart}
                  onChangeQty={changeQty}
                />
                <CheckoutForm
                  customer={customer}
                  onChange={setCustomer}
                />
                <WhatsAppButton
                  cart={cart}
                  total={total}
                  customer={customer}
                  isClosed={isClosed}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Mobile Cart Integration */}
      <MobileCartButton
        cart={cart}
        onClick={() => setIsMobileCartOpen(true)}
      />

      <MobileCartModal
        isOpen={isMobileCartOpen}
        onClose={() => setIsMobileCartOpen(false)}
        cart={cart}
        total={total}
        onRemove={removeFromCart}
        onChangeQty={changeQty}
        customer={customer}
        setCustomer={setCustomer}
        isClosed={isClosed}
      />

      <footer className="bg-dark text-light text-center py-4 mt-auto">
        <div className="container">
          <p className="mb-0 small">
            © {new Date().getFullYear()} Desarrollado por{" "}
            <a
              href="https://magozitsolutions.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-info fw-bold"
            >
              MagoZ IT Solutions
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
