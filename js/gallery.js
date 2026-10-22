/**
 * GAMZE DURMAZ NAIL STUDIO - GALLERY & LOOKBOOK ENGINE
 * Handles filter tabs, modal preview & direct WhatsApp model booking (No Emojis)
 */

const NAIL_COLLECTION = [
  {
    id: "nail-01",
    title: "Turkuaz Jel Badem Tırnak",
    category: "nude",
    shape: "Badem",
    image: "assets/images/nails/nail-01-turquoise-almond.jpg",
    desc: "Canlı turkuaz rengi, kusursuz tırnak eti (kuru/medikal manikür) freze temizliği ve yüksek parlaklıkta üst kaplama.",
    duration: "75 dk",
    durability: "4+ Hafta",
    tags: ["Jel Tırnak", "Turkuaz", "Badem Form", "Kalıcı Parlaklık"]
  },
  {
    id: "nail-02",
    title: "Kedi Gözü (Cat Eye) Velvet Shimmer",
    category: "cat-eye",
    shape: "Badem",
    image: "assets/images/nails/nail-02-cat-eye-velvet.jpg",
    desc: "Işık açısına göre dalgalanan manyetik kedi gözü ışıltısı, kadife parlaklık ve zarif pudra alt tonu.",
    duration: "85 dk",
    durability: "4+ Hafta",
    tags: ["Cat Eye", "Manyetik Işıltı", "Velvet", "Zarif"]
  },
  {
    id: "nail-03",
    title: "Swarovski Kristal Taşlı Nude",
    category: "3d",
    shape: "Badem",
    image: "assets/images/nails/nail-03-swarovski-crystal.jpg",
    desc: "Porselen transparan nude taban üzerine tek tek elle yerleştirilen ışıltılı Swarovski kristal taş tasarımı.",
    duration: "90 dk",
    durability: "4-5 Hafta",
    tags: ["Kristal Taş", "Nude Badem", "Lüks Tasarım", "Gelin Tırnağı"]
  },
  {
    id: "nail-04",
    title: "3D Kabartma Çiçek & Puantiyeli French",
    category: "3d",
    shape: "Badem",
    image: "assets/images/nails/nail-04-3d-flower-polka.jpg",
    desc: "Yüzük parmağında altın boncuk göbekli 3D akrilik çiçek kabartması ve mikro puantiyeli modern French manikür.",
    duration: "100 dk",
    durability: "4+ Hafta",
    tags: ["3D Çiçek", "El Çizimi", "Polka French", "Özel Gün"]
  },
  {
    id: "nail-05",
    title: "Badem Form Leopar French Protez",
    category: "leopard",
    shape: "Badem",
    image: "assets/images/nails/nail-05-leopard-french.jpg",
    desc: "Klasik Fransız manikürüne vahşi ve lüks bir dokunuş: El çizimi leopar desenli French uçlar ve doğal pembe taban.",
    duration: "95 dk",
    durability: "4+ Hafta",
    tags: ["Animal Print", "Leopar French", "Özel Tasarım", "Trend"]
  },
  {
    id: "nail-06",
    title: "Leopar French Çift El Tasarımı",
    category: "leopard",
    shape: "Badem",
    image: "assets/images/nails/nail-06-leopard-pose.jpg",
    desc: "Her iki elde simetrik ve kusursuz leopar desen işçiliği, güçlendirilmiş jel koruyucu tabaka.",
    duration: "95 dk",
    durability: "4+ Hafta",
    tags: ["Leopar", "Çift El Uyum", "Kusursuz Simetri", "Protez Tırnak"]
  },
  {
    id: "nail-07",
    title: "Küt / Coffin Leopar French",
    category: "leopard",
    shape: "Küt / Coffin",
    image: "assets/images/nails/nail-07-coffin-leopard.jpg",
    desc: "Mat kadife nude zemin ve keskin hatlı küt uçlarda leopar deseni. Modern ve iddialı bir stil.",
    duration: "90 dk",
    durability: "4+ Hafta",
    tags: ["Coffin Form", "Mat & Parlak", "Leopar", "Şık"]
  },
  {
    id: "nail-08",
    title: "Doğal Pudra Nude Badem Tırnak",
    category: "nude",
    shape: "Badem",
    image: "assets/images/nails/nail-08-powder-nude.jpg",
    desc: "Asil, temiz ve zamansız bir görünüm. Doğal tırnak yapısıyla kusursuz kaynaşan pudra pembe kalıcı oje.",
    duration: "65 dk",
    durability: "3-4 Hafta",
    tags: ["Old Money", "Doğal Nude", "Günlük Lüks", "Kalıcı Oje"]
  },
  {
    id: "nail-09",
    title: "Kusursuz Klasik Küt French",
    category: "french",
    shape: "Küt",
    image: "assets/images/nails/nail-09-classic-french.jpg",
    desc: "Milimetrik beyaz gülüş hattı ve cam parlaklığında doğal tırnak yatağı ile kusursuz klasik French manikür.",
    duration: "75 dk",
    durability: "3-4 Hafta",
    tags: ["Klasik French", "Küt Tırnak", "Zarif", "Temiz Görünüm"]
  },
  {
    id: "nail-10",
    title: "3D Çiçekli Kobalt Mavi Mermer",
    category: "3d",
    shape: "Badem",
    image: "assets/images/nails/nail-10-blue-marble-flower.jpg",
    desc: "Kobalt mavi bulutlu mermer desen geçişleri, altın boncuk detaylı 3D çiçek aplikasyonu ve yüksek parlaklık.",
    duration: "105 dk",
    durability: "4+ Hafta",
    tags: ["Kobalt Mavi", "3D Kabartma", "Mermer Efekti", "Sanat"]
  }
];

const WHATSAPP_PHONE = "905000000000"; // Gamze Durmaz İletişim Hattı

function initGallery() {
  const grid = document.getElementById("galleryGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!grid) return;

  renderNails("all");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderNails(filter);
    });
  });

  initLightbox();
}

function renderNails(filter) {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const filtered = filter === "all" 
    ? NAIL_COLLECTION 
    : NAIL_COLLECTION.filter(item => item.category === filter || (filter === "french" && (item.category === "french" || item.tags.some(t => t.toLowerCase().includes("french")))));

  grid.innerHTML = "";

  filtered.forEach(nail => {
    const card = document.createElement("div");
    card.className = "nail-card";
    const webpImg = nail.image.replace('.jpg', '.webp');
    card.innerHTML = `
      <div class="nail-img-wrapper" onclick="openLightbox('${nail.id}')">
        <img src="${webpImg}" alt="${nail.title} - Gamze Durmaz Nail Studio" class="nail-img" width="380" height="380" loading="lazy" decoding="async">
        <span class="nail-card-badge">${nail.shape}</span>
        <button class="nail-zoom-btn" title="Büyüt ve İncele" aria-label="Büyüt">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
        </button>
      </div>
      <div class="nail-card-body">
        <h3 class="nail-card-title">${nail.title}</h3>
        <p class="nail-card-desc">${nail.desc}</p>
        <div class="nail-card-meta">
          <span class="nail-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${nail.duration}
          </span>
          <span class="nail-meta-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ${nail.durability}
          </span>
        </div>
        <div class="nail-card-action">
          <a href="https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Merhaba Gamze Durmaz Nail Studio! Web sitenizdeki "${nail.title}" tasarimi icin randevu almak istiyorum.`)}" 
             target="_blank" 
             rel="noopener" 
             class="btn btn-gold btn-sm" 
             style="width: 100%;">
            Bu Modeli İstiyorum
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initLightbox() {
  const modal = document.getElementById("lightboxModal");
  const closeBtn = document.getElementById("lightboxClose");
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeLightbox();
    }
  });
}

function openLightbox(id) {
  const nail = NAIL_COLLECTION.find(n => n.id === id);
  if (!nail) return;

  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const title = document.getElementById("lightboxTitle");
  const desc = document.getElementById("lightboxDesc");
  const shape = document.getElementById("lightboxShape");
  const duration = document.getElementById("lightboxDuration");
  const bookBtn = document.getElementById("lightboxBookBtn");

  if (!modal) return;

  img.src = nail.image.replace('.jpg', '.webp');
  img.alt = nail.title + " - Gamze Durmaz Nail Studio";
  title.textContent = nail.title;
  desc.textContent = nail.desc;
  shape.textContent = nail.shape;
  duration.textContent = nail.duration;

  bookBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(`Merhaba Gamze Durmaz Nail Studio! Web sitenizdeki "${nail.title}" tasarimi icin randevu olusturmak istiyorum.`)}`;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("lightboxModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

document.addEventListener("DOMContentLoaded", initGallery);
