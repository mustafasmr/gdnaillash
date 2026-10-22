# Mobile Navigation & Accessibility Invariant

1. Mobil menü çekmecelerinde `<ul class="nav-links">` etiketinin üzerine asla `role="dialog"` veya `role="navigation"` eklemeyin. Doğal liste semantiğini koruyun (`role="list"`).
2. Off-canvas çekmece kapalıyken `visibility: hidden; pointer-events: none;` durumunda olmalı; açıldığında `visibility: visible; pointer-events: auto;` yapılmalıdır.
3. Arka plan kayması (`body.menu-open`) kilitlenirken yatay scroll oluşturacak transform taşmalarına karşı `overflow-x: hidden` korunmalıdır.
