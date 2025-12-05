// src/config/clientConfig.js
export const clientConfig = {
  nombre: "Heladería",          // Nombre del local
  tipo: "heladeria",                     // pizzeria | hamburgueseria | heladeria | etc.

  whatsapp: "+5491162123307",           // Teléfono del negocio (formato internacional)

  logo: "/images/logoburga.png",    // Ruta dentro de /public (ej: public/images/logo-pizzeria.png)

  colores: {
    primario: "#ec4899",   // rosa
    secundario: "#111827", // gris muy oscuro
    textoClaro: "#ffffff",
  },

  hero: {
    fondo: "/images/fondoburga.jpg",   // Imagen de fondo (ponela en /public/images/)
  },
  // 🔔 NUEVO: configuración de horario
  //horario: {
    //enabled: true, // si lo ponés en false, se desactiva el modo cerrado
   // apertura: "14:00", // hora de apertura (24 hs)
    //cierre: "23:30",   // hora de cierre  (24 hs)
    //mensajeCerrado:
      //"Ahora estamos cerrados. Nuestro horario: de 19:00 a 23:30 hs.",
  //},
};
