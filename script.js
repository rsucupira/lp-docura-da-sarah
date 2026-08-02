(() => {
  "use strict";

  const phone = "5585988208245";

  const whatsappUrl = (message) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    const message =
      link.dataset.message ||
      "Olá, Sarah! Vim pelo site da Doçura da Sarah e gostaria de fazer um pedido.";

    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener";
  });

  document.querySelectorAll(".whatsapp-product").forEach((link) => {
    const product = link.dataset.product;
    const message = `Olá, Sarah! Vi no site o produto "${product}" e gostaria de consultar valor e disponibilidade.`;

    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener";
  });

  const filterButtons = document.querySelectorAll(".filter-button");
  const productCards = document.querySelectorAll(".catalog-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      productCards.forEach((card) => {
        const shouldShow =
          selectedCategory === "todos" ||
          card.dataset.category === selectedCategory;

        card.hidden = !shouldShow;
      });
    });
  });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      navigation.classList.toggle("open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navigation.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
