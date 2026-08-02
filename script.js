(() => {
  "use strict";

  const phone = "5585988208245";
  const whatsappUrl = (message) =>
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const configureWhatsApp = (root = document) => {
    root.querySelectorAll(".whatsapp-link").forEach((link) => {
      const message = link.dataset.message || "Olá! Vim pelo site da Doçura da Sarah.";
      link.href = whatsappUrl(message);
    });

    root.querySelectorAll(".whatsapp-product, [data-product]").forEach((element) => {
      const product = element.dataset.product;
      if (!product || element.dataset.whatsappReady === "true") return;

      const message = `Olá, Sarah! Vi no site o produto \"${product}\" e gostaria de consultar valor e disponibilidade.`;
      const url = whatsappUrl(message);
      element.dataset.whatsappReady = "true";

      if (element.tagName === "A") {
        element.href = url;
        element.target = "_blank";
        element.rel = "noopener";
      } else {
        element.addEventListener("click", () => {
          window.open(url, "_blank", "noopener,noreferrer");
        });
      }
    });
  };

  const addEnhancementStyles = () => {
    const style = document.createElement("style");
    style.id = "docura-image-enhancements";
    style.textContent = `
      .hero-grid{grid-template-columns:minmax(0,1.12fr) minmax(320px,480px);gap:54px}
      .hero-visual{width:100%;max-width:480px;justify-self:end}
      .hero-visual img{max-height:480px}
      .product-grid{grid-template-columns:repeat(3,minmax(250px,360px));justify-content:center}
      .product-card{width:100%;max-width:360px}
      .product-card img{height:245px;aspect-ratio:auto;object-fit:cover}
      .gallery{grid-template-rows:repeat(2,235px);max-width:1000px;margin-inline:auto}
      .offers-section{padding:92px 0;background:#fff0f5}
      .offers-heading{max-width:760px;margin:0 auto 38px;text-align:center}
      .offers-heading .eyebrow{display:block}
      .offers-heading p:last-child{color:#67423a;margin:0 auto;max-width:680px}
      .offers-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:18px;align-items:start}
      .offer-card{grid-column:span 4;display:block;overflow:hidden;background:#fff;border:1px solid rgba(59,31,26,.1);border-radius:22px;box-shadow:0 14px 34px rgba(76,32,39,.09);transition:transform .2s ease,box-shadow .2s ease}
      .offer-card:hover{transform:translateY(-4px);box-shadow:0 20px 45px rgba(76,32,39,.14)}
      .offer-card img{display:block;width:100%;height:auto;max-height:560px;object-fit:cover;object-position:top center}
      .offer-card.offer-square img{aspect-ratio:1/1;max-height:none}
      .offers-note{margin:22px 0 0;text-align:center;color:#67423a;font-size:.88rem}
      @media(max-width:900px){
        .hero-grid{grid-template-columns:1fr;gap:38px}
        .hero-visual{justify-self:center;max-width:430px}
        .product-grid{grid-template-columns:repeat(2,minmax(240px,360px))}
        .offer-card{grid-column:span 6}
      }
      @media(max-width:640px){
        .hero-visual{max-width:340px}
        .hero-visual img{max-height:340px}
        .product-grid{grid-template-columns:1fr}
        .product-card{max-width:340px;margin-inline:auto}
        .product-card img{height:220px}
        .gallery{grid-template-columns:1fr;grid-template-rows:none}
        .gallery-large{grid-row:auto}
        .gallery figure{height:230px}
        .offers-section{padding:72px 0}
        .offers-grid{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 2px 18px;scrollbar-width:thin}
        .offer-card{flex:0 0 min(82vw,330px);scroll-snap-align:start}
        .offer-card img{max-height:none}
      }
    `;
    document.head.appendChild(style);
  };

  const useHighQualityImages = () => {
    const replacements = {
      "assets/images/hero-brownie-castanha.webp": "assets/images/brownie-castanha-hq.webp",
      "assets/images/mini-brownies.webp": "assets/images/mini-brownies-ninho-hq.webp",
      "assets/images/pao-recheado.webp": "assets/images/pao-recheado-hq.webp",
      "assets/images/brownies-embalados.webp": "assets/images/brownies-embalados-hq.webp",
      "assets/images/brownies-producao.webp": "assets/images/brownies-producao-hq.webp",
      "assets/images/mini-pudim-gourmet.webp": "assets/images/mini-pudim-hq.webp",
      "assets/images/logo-docura-da-sarah.webp": "assets/images/logo.webp"
    };

    document.querySelectorAll("img").forEach((image) => {
      const current = image.getAttribute("src");
      const highQuality = replacements[current];
      if (!highQuality) return;

      image.dataset.fallbackSrc = current;
      image.addEventListener("error", () => {
        if (image.dataset.fallbackUsed === "true") return;
        image.dataset.fallbackUsed = "true";
        image.src = image.dataset.fallbackSrc;
      }, { once: true });
      image.src = highQuality;
    });
  };

  const createOffersSection = () => {
    if (document.querySelector("#ofertas")) return;

    const offers = [
      ["Pão recheado de frango com Catupiry", "assets/images/promo-pao-recheado-hq.webp", "Oferta de pão recheado de frango com Catupiry", true],
      ["Brownie sabor Ninho", "assets/images/promo-brownie-ninho-hq.webp", "Oferta de brownie sabor Ninho", false],
      ["Bolo mole", "assets/images/promo-bolo-mole-hq.webp", "Oferta de fatia de bolo mole", false],
      ["Torta de frango com Guaraná Antártica", "assets/images/promo-torta-frango-hq.webp", "Oferta de torta de frango com Guaraná Antártica", false],
      ["Bolo mesclado", "assets/images/promo-bolo-mesclado-hq.webp", "Oferta de bolo mesclado", false]
    ];

    const section = document.createElement("section");
    section.className = "offers-section";
    section.id = "ofertas";
    section.innerHTML = `
      <div class="container">
        <div class="offers-heading">
          <p class="eyebrow">Ofertas e destaques</p>
          <h2>Opções para escolher com os olhos</h2>
          <p>Veja alguns produtos e ofertas divulgados pela Doçura da Sarah. Toque em uma imagem para consultar diretamente pelo WhatsApp.</p>
        </div>
        <div class="offers-grid"></div>
        <p class="offers-note">Valores e disponibilidade podem mudar. Confirme as condições atuais antes de concluir o pedido.</p>
      </div>
    `;

    const grid = section.querySelector(".offers-grid");
    let loadedCount = 0;
    let finishedCount = 0;

    const finishImage = (loaded) => {
      finishedCount += 1;
      if (loaded) loadedCount += 1;
      if (finishedCount === offers.length && loadedCount === 0) {
        section.remove();
        document.querySelector('.nav-links a[href="#ofertas"]')?.remove();
      }
    };

    offers.forEach(([product, source, alt, square]) => {
      const card = document.createElement("a");
      card.className = `offer-card${square ? " offer-square" : ""}`;
      card.dataset.product = product;
      card.href = "#";

      const image = document.createElement("img");
      image.src = source;
      image.alt = alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("load", () => finishImage(true), { once: true });
      image.addEventListener("error", () => {
        card.remove();
        finishImage(false);
      }, { once: true });

      card.appendChild(image);
      grid.appendChild(card);
    });

    const cardapio = document.querySelector("#cardapio");
    const destaques = document.querySelector("#destaques");
    if (cardapio) cardapio.before(section);
    else if (destaques) destaques.after(section);
    else document.querySelector("main")?.appendChild(section);

    const nav = document.querySelector(".nav-links");
    if (nav && !nav.querySelector('a[href="#ofertas"]')) {
      const link = document.createElement("a");
      link.href = "#ofertas";
      link.textContent = "Ofertas";
      const cardapioLink = nav.querySelector('a[href="#cardapio"]');
      nav.insertBefore(link, cardapioLink || null);
    }

    configureWhatsApp(section);
  };

  document.addEventListener("DOMContentLoaded", () => {
    addEnhancementStyles();
    useHighQualityImages();
    createOffersSection();
    configureWhatsApp();
    const year = document.querySelector("#year");
    if (year) year.textContent = new Date().getFullYear();
  });
})();
