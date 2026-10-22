/**
 * GAMZE DURMAZ NAIL STUDIO - INTERACTIVE NAIL VISUALIZER & ESTIMATOR
 * Allows visitors to customize nail shape, service type, design level & extras (No Emojis)
 * Calculates estimated duration & price, and creates a clean WhatsApp booking.
 */

const CALC_STATE = {
  shape: "Badem",
  type: { name: "Jel Protez Tırnak (Sıfırdan Uzatma)", price: 850, time: 90 },
  design: { name: "Kedi Gözü (Cat Eye Velvet)", price: 200, time: 20 },
  extras: [
    { id: "manicure", name: "Medikal & Freze Kuru Manikür", price: 150, time: 15, checked: true }
  ]
};

const EXTRA_CATALOG = [
  { id: "manicure", name: "Medikal & Freze Kuru Manikür", price: 150, time: 15 },
  { id: "swarovski", name: "Swarovski Kristal Taş Süsleme", price: 100, time: 10 },
  { id: "lash", name: "İpek Kirpik / Lash Lifting (@gdnaillash)", price: 500, time: 45 }
];

function initCalculator() {
  const shapeBtns = document.querySelectorAll(".calc-shape-btn");
  const typeBtns = document.querySelectorAll(".calc-type-btn");
  const designBtns = document.querySelectorAll(".calc-design-btn");
  const extraCheckboxes = document.querySelectorAll(".calc-extra-checkbox");

  // Shape clicks
  shapeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      shapeBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      CALC_STATE.shape = btn.getAttribute("data-shape");
      updateCalcSummary();
    });
  });

  // Type clicks
  typeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      typeBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      CALC_STATE.type = {
        name: btn.getAttribute("data-name"),
        price: parseInt(btn.getAttribute("data-price"), 10),
        time: parseInt(btn.getAttribute("data-time"), 10)
      };
      updateCalcSummary();
    });
  });

  // Design clicks
  designBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      designBtns.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      CALC_STATE.design = {
        name: btn.getAttribute("data-name"),
        price: parseInt(btn.getAttribute("data-price"), 10),
        time: parseInt(btn.getAttribute("data-time"), 10)
      };
      updateCalcSummary();
    });
  });

  // Extra checkboxes
  extraCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
      const extraId = cb.getAttribute("data-id");
      const catalogItem = EXTRA_CATALOG.find(e => e.id === extraId);
      if (cb.checked) {
        if (!CALC_STATE.extras.some(e => e.id === extraId)) {
          CALC_STATE.extras.push(catalogItem);
        }
      } else {
        CALC_STATE.extras = CALC_STATE.extras.filter(e => e.id !== extraId);
      }
      updateCalcSummary();
    });
  });

  updateCalcSummary();
}

function updateCalcSummary() {
  const summaryShape = document.getElementById("summaryShape");
  const summaryType = document.getElementById("summaryType");
  const summaryDesign = document.getElementById("summaryDesign");
  const summaryExtras = document.getElementById("summaryExtras");
  const totalPriceElem = document.getElementById("calcTotalPrice");
  const totalTimeElem = document.getElementById("calcTotalTime");
  const bookBtn = document.getElementById("calcBookBtn");

  if (!totalPriceElem) return;

  let totalPrice = CALC_STATE.type.price + CALC_STATE.design.price;
  let totalTime = CALC_STATE.type.time + CALC_STATE.design.time;

  CALC_STATE.extras.forEach(ext => {
    totalPrice += ext.price;
    totalTime += ext.time;
  });

  if (summaryShape) summaryShape.textContent = CALC_STATE.shape;
  if (summaryType) summaryType.textContent = CALC_STATE.type.name;
  if (summaryDesign) summaryDesign.textContent = CALC_STATE.design.name;
  if (summaryExtras) {
    summaryExtras.textContent = CALC_STATE.extras.length > 0 
      ? CALC_STATE.extras.map(e => e.name).join(", ")
      : "Ekstra seçilmedi";
  }

  totalPriceElem.textContent = `${totalPrice} TL`;
  totalTimeElem.textContent = `Yaklaşık Süre: ${totalTime} Dakika`;

  if (bookBtn) {
    const extrasText = CALC_STATE.extras.length > 0 
      ? `\nEkstralar: ${CALC_STATE.extras.map(e => e.name).join(", ")}` 
      : "";
    
    const message = 
`Merhaba Gamze Durmaz Nail Studio! Web sitenizdeki tırnak tasarım hesaplayıcısından özel paketimi oluşturdum:

Form: ${CALC_STATE.shape}
İşlem: ${CALC_STATE.type.name}
Tasarım / Nail Art: ${CALC_STATE.design.name}${extrasText}
Tahmini Süre: Yaklaşık ${totalTime} dk
Tahmini Tutar: Yaklaşık ${totalPrice} TL

Bu paket için müsait gün ve saatleriniz hakkında bilgi alıp randevu oluşturmak istiyorum. Teşekkürler!`;

    bookBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  }
}

document.addEventListener("DOMContentLoaded", initCalculator);
