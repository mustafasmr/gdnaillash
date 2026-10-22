/**
 * GAMZE DURMAZ NAIL STUDIO - ONLINE APPOINTMENT BOOKING ENGINE
 * Formats user inputs and redirects to WhatsApp for immediate booking confirmation (No Emojis)
 */

function initBooking() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  // Set minimum date to today
  const dateInput = document.getElementById("bookDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.min = today;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("bookName")?.value || "";
    const phone = document.getElementById("bookPhone")?.value || "";
    const service = document.getElementById("bookService")?.value || "Protez Tırnak & Nail Art";
    const date = document.getElementById("bookDate")?.value || "";
    const time = document.getElementById("bookTime")?.value || "Öğleden Önce (10:00 - 13:00)";
    const notes = document.getElementById("bookNotes")?.value || "Belirtilmedi";

    const formattedDate = date ? new Date(date).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }) : "En Yakın Tarih";

    const message = 
`*Gamze Durmaz Nail Studio - Randevu Talebi*

*Müşteri Adı:* ${name}
*Telefon:* ${phone}
*Talep Edilen Hizmet:* ${service}
*Tercih Edilen Tarih:* ${formattedDate}
*Saat Dilimi:* ${time}
*Özel İstek / Not:* ${notes}

Randevumu onaylamak ve randevu saatini netleştirmek için dönüşünüzü rica ederim.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", initBooking);
