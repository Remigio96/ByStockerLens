// Espera a que todo el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtiene los elementos del toggle (botón) y del menú lateral
  const toggler = document.getElementById("customToggle");
  const menu = document.getElementById("sidebarMenu");
  // Verifica que ambos elementos existan
  if (toggler && menu) {
    // Al hacer clic en el botón de menú (hamburguesa)
    toggler.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");

      if (isOpen) {
        // Cierra el menú suavemente
        const height = menu.scrollHeight;
        menu.style.maxHeight = height + "px";

        requestAnimationFrame(() => {
          // Anima la transición para cerrar
          menu.style.transition = "max-height 0.5s ease, opacity 0.4s ease";
          menu.style.maxHeight = "0px";
          menu.style.opacity = "0";
          menu.style.overflow = "hidden";
        });

        menu.classList.remove("open");
      } else {
        // Abre el menú con animación
        menu.classList.add("open");
        menu.style.opacity = "0";
        menu.style.maxHeight = "0px";
        menu.style.overflow = "hidden";

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const targetHeight = menu.scrollHeight;
            menu.style.transition = "max-height 0.7s ease, opacity 0.5s ease";
            menu.style.maxHeight = targetHeight + "px";
            menu.style.opacity = "1";
          });
        });
      }
    });
    // Cierra el menú automáticamente cuando se hace clic en algún enlace
    document.querySelectorAll('.link-sidebar').forEach(link => {
      link.addEventListener('click', () => {
        if (menu.classList.contains("open")) {
          menu.style.transition = "max-height 0.5s ease, opacity 0.4s ease";
          menu.style.maxHeight = "0px";
          menu.style.opacity = "0";
          menu.style.overflow = "hidden";
          menu.classList.remove("open");
        }
      });
    });
    // Limpia estilos en línea una vez terminada la animación
    menu.addEventListener("transitionend", (e) => {
      if (e.propertyName === "max-height") {
        if (!menu.classList.contains("open")) {
          // Si está cerrado, limpia estilos para que no afecten otras cosas
          menu.style.maxHeight = "";
          menu.style.opacity = "";
          menu.style.transition = "";
          menu.style.overflow = "";
        } else {
          // Si está abierto, ajusta para mantener el tamaño correcto
          menu.style.maxHeight = menu.scrollHeight + "px";
          menu.style.overflow = "visible";
        }
      }
    });
  }
  // Ocultar y mostrar la navbar al hacer scroll
  let lastScrollTop = 0;
  const navbar = document.getElementById("mainNavbar");
  const scrollThreshold = 60;

  if (navbar) {
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDiff = currentScroll - lastScrollTop;
      // Si el usuario baja, se oculta la navbar
      if (scrollDiff > scrollThreshold) {
        navbar.classList.add("navbar-hidden");
        lastScrollTop = currentScroll;
      } else if (scrollDiff < -scrollThreshold) {
        // Si el usuario sube, vuelve a aparecer la navbar
        navbar.classList.remove("navbar-hidden");
        lastScrollTop = currentScroll;
      }
    }, false);
  }
});
