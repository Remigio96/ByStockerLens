document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.getElementById("customToggle");
  const menu = document.getElementById("sidebarMenu");

  if (toggler && menu) {
    toggler.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");

      if (isOpen) {
        const height = menu.scrollHeight;
        menu.style.maxHeight = height + "px";

        requestAnimationFrame(() => {
          menu.style.transition = "max-height 0.5s ease, opacity 0.4s ease";
          menu.style.maxHeight = "0px";
          menu.style.opacity = "0";
          menu.style.overflow = "hidden";
        });

        menu.classList.remove("open");
      } else {
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

    menu.addEventListener("transitionend", (e) => {
      if (e.propertyName === "max-height") {
        if (!menu.classList.contains("open")) {
          menu.style.maxHeight = "";
          menu.style.opacity = "";
          menu.style.transition = "";
          menu.style.overflow = "";
        } else {
          menu.style.maxHeight = menu.scrollHeight + "px";
          menu.style.overflow = "visible";
        }
      }
    });
  }

  let lastScrollTop = 0;
  const navbar = document.getElementById("mainNavbar");
  const scrollThreshold = 60;

  if (navbar) {
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDiff = currentScroll - lastScrollTop;

      if (scrollDiff > scrollThreshold) {
        navbar.classList.add("navbar-hidden");
        lastScrollTop = currentScroll;
      } else if (scrollDiff < -scrollThreshold) {
        navbar.classList.remove("navbar-hidden");
        lastScrollTop = currentScroll;
      }
    }, false);
  }
});
