(() => {
  "use strict";

  const motionStyle = document.createElement("link");
  motionStyle.rel = "stylesheet";
  motionStyle.href = "uebey-motion.css?v=20260825";
  document.head.appendChild(motionStyle);

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

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motionTargets = [
    ...document.querySelectorAll(".section-heading, .featured-card, .catalog-card, .trust-grid > div")
  ];
  motionTargets.forEach((element, index) => {
    element.classList.add("um-ready");
    element.style.setProperty("--um-delay", `${Math.min(index % 4, 3) * 70}ms`);
  });
  if (reduceMotion || !("IntersectionObserver" in window)) {
    motionTargets.forEach((element) => element.classList.add("um-in"));
  } else {
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("um-in");
          motionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .1, rootMargin: "70px 0px -30px" });
    motionTargets.forEach((element) => motionObserver.observe(element));
  }

  const collage = document.querySelector(".hero-collage");
  if (collage && !reduceMotion && matchMedia("(pointer:fine)").matches) {
    collage.addEventListener("pointermove", (event) => {
      const rect = collage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      collage.style.transform = `rotateY(${(x * 2.5).toFixed(2)}deg) rotateX(${(-y * 2).toFixed(2)}deg)`;
    }, { passive: true });
    collage.addEventListener("pointerleave", () => { collage.style.transform = ""; }, { passive: true });
  }

  // Assinatura discreta Uebey no rodapé
  const footerGrid = document.querySelector(".site-footer .footer-grid");
  if (footerGrid && !footerGrid.querySelector(".uebey-credit")) {
    const credit = document.createElement("a");
    credit.className = "uebey-credit";
    credit.href = "https://uebey.com";
    credit.target = "_blank";
    credit.rel = "noopener noreferrer";
    credit.setAttribute("aria-label", "Desenvolvido por Uebey");
    credit.innerHTML = `
      <span class="uebey-credit__icon" aria-hidden="true">
        <svg viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 3v17c0 8 4.6 13 11 13s11-5 11-13V3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M8 5v15c0 5.5 2.9 9 7 9s7-3.5 7-9V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".76"/>
          <path d="M12 7v13c0 2.8 1.2 4.7 3 4.7s3-1.9 3-4.7V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" opacity=".52"/>
        </svg>
      </span>
      <span>Desenvolvido por <strong>Uebey</strong></span>`;
    footerGrid.appendChild(credit);

    const style = document.createElement("style");
    style.textContent = `
      .site-footer .footer-grid{grid-template-columns:1fr auto auto auto}
      .uebey-credit{justify-self:end;display:inline-flex;align-items:center;gap:7px;color:rgba(255,255,255,.62);font-size:.76rem;text-decoration:none;white-space:nowrap;opacity:.84;transition:color .2s ease,opacity .2s ease,transform .2s ease}
      .uebey-credit__icon{width:16px;height:19px;display:inline-flex;color:var(--pink);filter:drop-shadow(0 0 7px rgba(233,77,130,.16))}
      .uebey-credit__icon svg{width:100%;height:100%;display:block}
      .uebey-credit strong{color:rgba(255,255,255,.84);font-weight:700;transition:color .2s ease}
      .uebey-credit:hover{color:#fff;opacity:1;transform:translateY(-1px)}
      .uebey-credit:hover strong{color:#ff8fb5}
      @media(max-width:900px){.site-footer .footer-grid{grid-template-columns:1fr}.uebey-credit{justify-self:end;margin-top:4px}}
    `;
    document.head.appendChild(style);
  }
})();
