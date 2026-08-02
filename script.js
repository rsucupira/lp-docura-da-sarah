const phone = "5585988208245";

function whatsappUrl(message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message = link.dataset.message || "Olá! Vim pelo site da Doçura da Sarah.";
  link.href = whatsappUrl(message);
});

document.querySelectorAll(".whatsapp-product").forEach((element) => {
  const product = element.dataset.product;
  const message = `Olá! Vim pelo site da Doçura da Sarah e gostaria de consultar disponibilidade e valor de: ${product}.`;
  const url = whatsappUrl(message);

  if (element.tagName === "A") {
    element.href = url;
  } else {
    element.addEventListener("click", () => {
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
