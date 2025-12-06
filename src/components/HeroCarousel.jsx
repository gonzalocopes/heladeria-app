// src/components/HeroCarousel.jsx
import { clientConfig } from "../config/clientConfig";

export default function HeroCarousel() {
  const { hero, nombre } = clientConfig;

  // Imagen de fondo: si no hay en config, usamos la de Pexels
  const imageSrc =
    hero?.fondo ||
    "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg";

  // Textos con fallback: si no hay en config, usamos los que ya tenías
  const slide1Title = hero?.slides?.[0]?.titulo || `${nombre} 🍕`;
  const slide1Subtitle =
    hero?.slides?.[0]?.subtitulo ||
    "Pedí tus hamburgesas favoritas y mandá el pedido por WhatsApp.";

  const slide2Title = hero?.slides?.[1]?.titulo || "Hamburgesas que si llenan";
  const slide2Subtitle =
    hero?.slides?.[1]?.subtitulo ||
    "Las mejores hamburgesas de zona sur.";

  const slide3Title = hero?.slides?.[2]?.titulo || "Promos todos los días";
  const slide3Subtitle =
    hero?.slides?.[2]?.subtitulo ||
    "2x1, combos individuales, familiares y mucho más.";

  return (
    <section id="hero" className="bg-dark">
      <div className="container-fluid px-0">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active">
              <img
                src={imageSrc}
                className="d-block w-100"
                alt="Slide 1"
                style={{ maxHeight: "520px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-block">
                <div className="bg-dark bg-opacity-50 rounded-3 px-3 py-2 d-inline-block">
                  <h2 className="fw-bold text-shadow fs-4">{slide1Title}</h2>
                  <p className="mb-0 small">{slide1Subtitle}</p>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src={imageSrc}
                className="d-block w-100"
                alt="Slide 2"
                style={{ maxHeight: "520px", objectFit: "cover" }}
                loading="lazy"
              />
              <div className="carousel-caption d-block">
                <div className="bg-dark bg-opacity-50 rounded-3 px-3 py-2 d-inline-block">
                  <h2 className="fw-bold text-shadow fs-4">{slide2Title}</h2>
                  <p className="mb-0 small">{slide2Subtitle}</p>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src={imageSrc}
                className="d-block w-100"
                alt="Slide 3"
                style={{ maxHeight: "520px", objectFit: "cover" }}
                loading="lazy"
              />
              <div className="carousel-caption d-block">
                <div className="bg-dark bg-opacity-50 rounded-3 px-3 py-2 d-inline-block">
                  <h2 className="fw-bold text-shadow fs-4">{slide3Title}</h2>
                  <p className="mb-0 small">{slide3Subtitle}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controles */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </section>
  );
}
