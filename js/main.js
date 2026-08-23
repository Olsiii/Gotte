/* ═══════════════════════════════════════════════════════
   gotte.eco — main.js
   • EN / SQ language switcher
   • Marquee / ticker builder
   • Three.js 3D paper-cup hero
   • Count-up on scroll (IntersectionObserver)
   • Contact form (Formspree)
   • Sticky nav + hamburger
═══════════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────────
   1.  TRANSLATIONS
────────────────────────────────────────────────────── */
const T = {
  en: {
    nav_home:     'Home',
    nav_about:    'About',
    nav_products: 'Products',
    nav_contact:  'Contact',

    hero_sub:   'eco-friendly · custom printed',
    hero_title: 'Your brand,<br>better for<br>the planet.',
    hero_body:  'Custom printed paper cups that carry your logo — and your values. 100% eco-friendly and biodegradable.',
    hero_cta1:  'Get a quote',
    hero_cta2:  'See products ↓',

    about_label: 'About us',
    about_title: 'Cups that tell your story —<br>without costing the earth.',
    about_p1:    'GOTTË is a new business specialized in the production of branded paper cups and paper bags using eco-friendly bio paper and water-based printing technology. We provide modern, high-quality packaging solutions for cafés, restaurants, events, and businesses looking for unique and sustainable branding.',
    about_p2:    'GOTTË continues the long-standing experience of Foto Gagi and Gagi Print, companies with many years of expertise in photo printing, professional printing, and branding services. With a strong commitment to quality, design, and customer satisfaction, our goal is to deliver functional, aesthetic, and environmentally friendly products for both the local and international market.',

    badge1: 'FSC Certified',
    badge2: 'PLA Lined',
    badge3: 'CO₂ Neutral',
    badge4: 'Biodegradable',

    stat1_label: 'Compostable materials',
    stat2_label: 'Happy clients',
    stat3_label: 'Avg. turnaround',

    prod_label: 'Our products',
    prod_title: 'Custom cups for every occasion',

    p1_name: 'Classic White',
    p1_desc: 'Single wall · 4 oz',
    p1_long: 'A compact single-wall cup in a clean white finish. Ideal for espresso, macchiato, or short drinks. Lightweight and fully customisable with your brand logo and colours — perfect for cafés, events, and daily takeaway service.',
    p2_name: 'Kraft Natural',
    p2_desc: 'Single wall · 8 oz',
    p2_long: 'Our most versatile cup, crafted from natural kraft paper with a warm brown finish. Great for lattes, americanos, and cold beverages. The earthy tone pairs beautifully with any brand identity and prints crisp, vivid colours.',
    p3_name: 'Signature Olive',
    p3_desc: 'Double wall · 12 oz',
    p3_long: 'A double-wall cup in our signature olive finish — designed for long drinks and customers on the move. Extra insulation keeps beverages hot longer while keeping hands comfortable. Ideal for tea, flat whites, and specialty drinks.',
    p4_name: 'Premium Dark',
    p4_desc: 'Double wall · 16 oz',
    p4_long: 'Our flagship XL double-wall cup for bold brand statements. The sleek dark finish creates a premium look that elevates any brand. Perfect for large lattes, cold brews, and smoothies. Our best-selling size — and our customers\' favourite.',

    bestseller: 'Best seller',
    photo_ph:   'Product photo',

    ct_label:     'Get in touch',
    ct_title:     'Let\'s create something together',
    ct_det_title: 'Contact details',
    ct_address:   'Radovan Zogoviq, 25 - Arberi (Dragodan)<br>Prishtina, Kosovë',
    ct_hours:     'Mon – Fri · 9:00 – 18:00',

    form_title: 'Send us a message',
    form_name:  'Your name',
    form_msg:   'Tell us about your project...',
    form_btn:   'Send message',
    form_note:  '* Connect Formspree by replacing YOUR_FORM_ID in index.html',

    footer_copy: '© 2026 gotte.eco · All rights reserved',

    ticker: [
      { icon: 'ti-leaf',      text: 'Full Custom Print'   },
      { icon: 'ti-truck',     text: 'Fast Delivery'        },
      { icon: 'ti-recycle',   text: '100% Biodegradable'   },
      { icon: 'ti-certificate', text: 'FSC Certified'      },
      { icon: 'ti-palette',   text: 'Any Quantity'         },
      { icon: 'ti-sun',       text: 'CO₂ Neutral'          },
      { icon: 'ti-star',      text: '500+ Happy Clients'   },
      { icon: 'ti-droplet',   text: 'PLA Lined'            },
    ],
  },

  sq: {
    nav_home:     'Kryefaqja',
    nav_about:    'Rreth nesh',
    nav_products: 'Produktet',
    nav_contact:  'Kontakti',

    hero_sub:   'miqësor me natyrën · printim me porosi',
    hero_title: 'Brendi juaj,<br>më mirë për<br>planetin.',
    hero_body:  'Gota letre me printim të personalizuar që bartin logon tuaj — dhe vlerat tuaja. 100% miqësore me mjedisin dhe të biodegradueshme.',
    hero_cta1:  'Merr ofertë',
    hero_cta2:  'Shiko produktet ↓',

    about_label: 'Rreth nesh',
    about_title: 'Gota që tregojnë historinë tuaj —<br>pa dëmtuar planetin.',
    about_p1:    'GOTTË është biznes i ri i specializuar në prodhimin e gotave dhe qeseve të letrës me brendim profesional, duke përdorur ngjyra water-based dhe materiale bio të përshtatshme për ambientin. Ne ofrojmë zgjidhje moderne dhe cilësore për kafiteri, restorante, evente dhe biznese që kërkojnë identitet unik dhe produkte ekologjike.',
    about_p2:    'GOTTË është vazhdimësi e përvojës shumëvjeçare të Foto Gagi dhe Gagi Print në industrinë e foto printimit, shtypit dhe brendimit profesional. Me përkushtim ndaj cilësisë, dizajnit dhe korrektësisë, synimi ynë është të sjellim produkte funksionale, estetike dhe miqësore me mjedisin për tregun vendor dhe më gjerë.',

    badge1: 'Certifikuar FSC',
    badge2: 'Vija PLA',
    badge3: 'Neutral CO₂',
    badge4: 'E biodegradueshme',

    stat1_label: 'Materiale të kompostueshme',
    stat2_label: 'Klientë të kënaqur',
    stat3_label: 'Koha mesatare e dërgimit',

    prod_label: 'Produktet tona',
    prod_title: 'Gota me porosi për çdo rast',

    p1_name: 'Klasike e Bardhë',
    p1_desc: 'Mur i vetëm · 4 oz',
    p1_long: 'Gotë kompakte me mur të vetëm në ngjyrë të bardhë të pastër. Ideale për espresso, macchiato apo pije të shkurtra. E lehtë dhe plotësisht e personalizueshme me logon dhe ngjyrat e markës suaj — perfekte për kafene, evente dhe shërbim çdo ditë.',
    p2_name: 'Kraft Natyrale',
    p2_desc: 'Mur i vetëm · 8 oz',
    p2_long: 'Gota jonë më e gjithanshme, e punuar nga letra kraft natyrale me ngjyrë kafe të ngrohtë. E shkëlqyer për latte, americano dhe pije të ftohta. Toni i tokës kombinohet bukur me çdo identitet marke dhe printon ngjyra të qarta dhe të gjalla.',
    p3_name: 'Signature Olive',
    p3_desc: 'Mur i dyfishtë · 12 oz',
    p3_long: 'Gotë me mur të dyfishtë në ngjyrën tonë karakteristike të ullirit — e dizajnuar për pije të gjata dhe klientë në lëvizje. Izolimi shtesë e mban pijen të ngrohtë më gjatë, duke e mbajtur dorën rehat. Ideale për çaj, flat white dhe pije speciale.',
    p4_name: 'Premium Dark',
    p4_desc: 'Mur i dyfishtë · 16 oz',
    p4_long: 'Gota jonë kryesore XL me mur të dyfishtë për deklarata të guximshme marke. Finishi elegant i errët krijon një pamje premium që ngre çdo markë. Perfekte për latte të mëdha, cold brew dhe smoothie. Madhësia jonë më e shitur — dhe e preferuara e klientëve.',

    bestseller: 'Më e shitur',
    photo_ph:   'Foto produkti',

    ct_label:     'Na kontaktoni',
    ct_title:     'Le të krijojmë diçka së bashku',
    ct_det_title: 'Detajet e kontaktit',
    ct_address:   'Radovan Zogoviq, 25 - Arberi (Dragodan)<br>Prishtina, Kosovë',
    ct_hours:     'Hëne – Shtunë · 9:00 – 18:00',

    form_title: 'Na dërgoni mesazh',
    form_name:  'Emri juaj',
    form_msg:   'Na tregoni për projektin tuaj...',
    form_btn:   'Dërgo mesazhin',
    form_note:  '* Lidhni Formspree duke zëvendësuar YOUR_FORM_ID në index.html',

    footer_copy: '© 2026 gotte.eco · Të gjitha të drejtat e rezervuara',

    ticker: [
      { icon: 'ti-leaf',        text: 'Printim i Plotë'          },
      { icon: 'ti-truck',       text: 'Dërgesë e Shpejtë'        },
      { icon: 'ti-recycle',     text: '100% e Biodegradueshme'   },
      { icon: 'ti-certificate', text: 'Certifikuar FSC'           },
      { icon: 'ti-palette',     text: 'Çdo Sasi'                  },
      { icon: 'ti-sun',         text: 'Neutral CO₂'               },
      { icon: 'ti-star',        text: '500+ Klientë të Kënaqur'  },
      { icon: 'ti-droplet',     text: 'Vija PLA'                  },
    ],
  },
};

/* ──────────────────────────────────────────────────────
   2.  LANGUAGE SWITCHER
────────────────────────────────────────────────────── */
let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === 'sq' ? 'sq' : 'en';

  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-sq').classList.toggle('active', lang === 'sq');

  const dict = T[lang];

  // Update all data-key elements (innerHTML so <br> works)
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Update placeholder-keyed inputs / textareas
  document.querySelectorAll('[data-placeholder-key]').forEach(el => {
    const key = el.dataset.placeholderKey;
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  buildMarquee();
}

function syncLangUrl(lang) {
  const url = new URL(window.location.href);
  if (lang === 'sq') {
    url.searchParams.set('lang', 'sq');
  } else {
    url.searchParams.delete('lang');
  }
  history.replaceState(null, '', url);
}

function switchLang(lang) {
  if (lang !== 'en' && lang !== 'sq') return;
  if (lang === currentLang) return;
  applyLang(lang);
  syncLangUrl(lang);
}

function initLang() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang') === 'sq' ? 'sq' : 'en';
  if (lang !== currentLang) applyLang(lang);
  else document.documentElement.lang = lang === 'sq' ? 'sq' : 'en';
}

/* ──────────────────────────────────────────────────────
   3.  CLIENTS STRIP BUILDER
────────────────────────────────────────────────────── */
const CLIENTS = [
  'Café Riviera', 'Hotel Grand', 'Barista Bar', 'La Piazza',
  'Sky Lounge', 'Green Bowl', 'The Coffee Lab', 'Brasserie 21',
  'Espresso House', 'Pura Vida', 'Urban Brew', 'The Roastery',
];

function buildClientsStrip() {
  const track = document.getElementById('clients-track');
  if (!track) return;

  function renderSet() {
    return CLIENTS.map(name => `
      <span class="client-item">${name}</span>
      <span class="client-dot" aria-hidden="true"></span>
    `).join('');
  }

  // 4 copies so the track is always wider than the viewport — no blank gaps
  track.innerHTML = renderSet() + renderSet() + renderSet() + renderSet();
}

/* ──────────────────────────────────────────────────────
   4.  MARQUEE BUILDER
────────────────────────────────────────────────────── */
function buildMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;

  const items = T[currentLang].ticker;

  // Build one set of items as HTML
  function renderSet() {
    return items.map(item => `
      <span class="marquee-item">
        <i class="ti ${item.icon}" aria-hidden="true"></i>
        ${item.text}
      </span>
      <span class="marquee-dot" aria-hidden="true">✦</span>
    `).join('');
  }

  // Duplicate so the seamless loop works (animate -50%)
  track.innerHTML = renderSet() + renderSet();
}

/* ──────────────────────────────────────────────────────
   4.  THREE.JS 3D CUP
────────────────────────────────────────────────────── */
function initCup() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const wrap = canvas.parentElement;
  let W = wrap.clientWidth;
  let H = wrap.clientHeight;

  // ── Renderer
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);

  // ── Scene & Camera
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
  camera.position.set(0, 0.2, 5.4);

  // ── Lights
  scene.add(new THREE.AmbientLight(0xfff5e0, 0.8));

  const sun = new THREE.DirectionalLight(0xfffaf0, 2.2);
  sun.position.set(4, 6, 5);
  scene.add(sun);

  const fill = new THREE.PointLight(0xb0d070, 0.7, 18);
  fill.position.set(-3, 2, 3);
  scene.add(fill);

  const backLight = new THREE.PointLight(0xffe0a0, 0.4, 12);
  backLight.position.set(2, -3, -3);
  scene.add(backLight);

  // ── Canvas texture — "Gotte" printed on the cup body
  const texCanvas = document.createElement('canvas');
  texCanvas.width  = 1024;
  texCanvas.height = 1024;
  const ctx = texCanvas.getContext('2d');

  // Cream body background
  ctx.fillStyle = '#f4efe0';
  ctx.fillRect(0, 0, 1024, 1024);

  // Olive top band
  ctx.fillStyle = '#5c6e2e';
  ctx.fillRect(0, 0, 1024, 160);

  // Subtle diagonal grain lines
  ctx.strokeStyle = 'rgba(92,110,46,0.06)';
  ctx.lineWidth = 2;
  for (let i = -1024; i < 2048; i += 36) {
    ctx.beginPath();
    ctx.moveTo(i, 160);
    ctx.lineTo(i + 864, 1024);
    ctx.stroke();
  }

  // Wood accent stripe near bottom
  ctx.fillStyle = '#a0784a';
  ctx.fillRect(0, 910, 1024, 38);

  // Thin olive line above wood stripe
  ctx.fillStyle = '#5c6e2e';
  ctx.fillRect(0, 872, 1024, 16);

  const bodyTexture = new THREE.CanvasTexture(texCanvas);

  // Load Gotte logo onto the cup texture (replaces text)
  const logoImg = new Image();
  logoImg.onload = () => {
    // Draw the logo centred in the cream body area
    const lw = 340, lh = Math.round(lw * (logoImg.naturalHeight / logoImg.naturalWidth));
    const lx = 580 - lw / 2;
    const ly = 440;
    ctx.save();
    ctx.globalCompositeOperation = 'multiply'; // blends black bg with cream
    ctx.drawImage(logoImg, lx, ly, lw, lh);
    ctx.restore();
    bodyTexture.needsUpdate = true;
  };
  logoImg.onerror = () => {
    // Fallback: draw text if logo not found
    ctx.fillStyle = '#2c2015';
    ctx.font = '800 112px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('Gotte', 580, 600);
    ctx.fillStyle = '#5c6e2e';
    ctx.font = '400 38px Montserrat, sans-serif';
    ctx.fillText('✦', 580, 455);
    bodyTexture.needsUpdate = true;
  };
  logoImg.src = 'images/gotte_logo.png';

  // ── Materials
  const matBody = new THREE.MeshStandardMaterial({
    map:       bodyTexture,
    roughness: 0.50,
    metalness: 0.02,
  });
  const matRimMat = new THREE.MeshStandardMaterial({
    color:     0xd8d0b0,
    roughness: 0.22,
    metalness: 0.10,
  });
  const matBottom = new THREE.MeshStandardMaterial({
    color:     0xe8e0c8,
    roughness: 0.60,
  });

  // ── Background glow plane (sits behind the cup)
  const glowCvs = document.createElement('canvas');
  glowCvs.width = glowCvs.height = 512;
  const gCtx = glowCvs.getContext('2d');
  const grd  = gCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
  grd.addColorStop(0,    'rgba(255, 248, 210, 0.42)');
  grd.addColorStop(0.30, 'rgba(230, 200, 130, 0.22)');
  grd.addColorStop(0.65, 'rgba(160, 120,  55, 0.08)');
  grd.addColorStop(1,    'rgba(0,     0,   0, 0)');
  gCtx.fillStyle = grd;
  gCtx.fillRect(0, 0, 512, 512);

  const glowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(7.5, 7.5),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(glowCvs),
      transparent: true,
      depthWrite: false,
    })
  );
  glowMesh.position.z = -0.8;
  scene.add(glowMesh);

  // ── Cup group
  const cup = new THREE.Group();
  scene.add(cup);

  // Body — tapered cylinder (wide top, narrow bottom), open ends so texture shows
  const bodyGeo = new THREE.CylinderGeometry(1.0, 0.72, 2.6, 64, 1, true);
  cup.add(new THREE.Mesh(bodyGeo, matBody));

  // Bottom cap
  const botGeo = new THREE.CircleGeometry(0.72, 64);
  const bot    = new THREE.Mesh(botGeo, matBottom);
  bot.rotation.x = -Math.PI / 2;
  bot.position.y = -1.3;
  cup.add(bot);

  // Rolled rim — short outward-flare cylinder (not a torus, so no "handle" arc)
  const rimCylGeo = new THREE.CylinderGeometry(1.09, 1.01, 0.14, 64, 1, true);
  const rimCyl    = new THREE.Mesh(rimCylGeo, matRimMat);
  rimCyl.position.y = 1.3;
  cup.add(rimCyl);

  // Rim top flat ring
  const rimCapGeo = new THREE.RingGeometry(1.01, 1.09, 64);
  const rimCap    = new THREE.Mesh(rimCapGeo, matRimMat);
  rimCap.rotation.x = -Math.PI / 2;
  rimCap.position.y  = 1.37;
  cup.add(rimCap);

  // ── Leaf texture factory (canvas-drawn, two colour families)
  function makeLeafTex(fill) {
    const c   = document.createElement('canvas');
    c.width   = c.height = 128;
    const cx  = c.getContext('2d');
    cx.clearRect(0, 0, 128, 128);
    // Leaf body
    cx.fillStyle = fill;
    cx.beginPath();
    cx.moveTo(64, 6);
    cx.bezierCurveTo(106, 16, 112, 72, 64, 120);
    cx.bezierCurveTo(16, 72, 22, 16, 64, 6);
    cx.closePath();
    cx.fill();
    // Midrib vein
    cx.strokeStyle = 'rgba(255,255,255,0.18)';
    cx.lineWidth = 2.5;
    cx.beginPath();
    cx.moveTo(64, 10);
    cx.lineTo(64, 116);
    cx.stroke();
    return new THREE.CanvasTexture(c);
  }

  // Mix of olive-green and wood-brown leaves
  const leafPalette = [
    '#6a7f32', '#5c6e2e', '#7a9040',   // greens
    '#a0784a', '#b88848', '#c9975f',   // wood / amber
  ];
  const leafTextures = leafPalette.map(makeLeafTex);

  // ── Leaf particles
  const leaves = [];
  for (let i = 0; i < 20; i++) {
    const tex  = leafTextures[Math.floor(Math.random() * leafTextures.length)];
    const w    = 0.13 + Math.random() * 0.14;
    const leaf = new THREE.Mesh(
      new THREE.PlaneGeometry(w, w * 1.65),
      new THREE.MeshBasicMaterial({
        map: tex, transparent: true,
        opacity: 0.65 + Math.random() * 0.30,
        depthWrite: false,
        side: THREE.DoubleSide,
      })
    );
    const angle  = Math.random() * Math.PI * 2;
    const radius = 1.3 + Math.random() * 1.6;
    leaf.position.set(
      Math.cos(angle) * radius,
      -1.6 + Math.random() * 3.2,
      Math.sin(angle) * radius - 0.3,
    );
    leaf.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
    );
    leaf.userData = {
      angle,
      radius,
      orbitSpeed: (0.002 + Math.random() * 0.004) * (Math.random() < 0.5 ? 1 : -1),
      riseSpeed:  0.0025 + Math.random() * 0.004,
      yMin: -1.8,
      yMax:  2.0,
      rotZ: (Math.random() - 0.5) * 0.022,
      rotX: (Math.random() - 0.5) * 0.012,
    };
    scene.add(leaf);
    leaves.push(leaf);
  }

  // ── Mouse parallax — track cursor to tilt cup
  let mouseX = 0, mouseY = 0;
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener('mousemove', e => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width  - 0.5) * 2; // -1 → 1
      mouseY = ((e.clientY - rect.top)  / rect.height - 0.5) * 2; // -1 → 1
    });
    heroSection.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });
  }

  // ── Spring easing for entrance (easeOutBack — overshoots slightly then settles)
  function easeOutBack(t) {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  // Entrance state
  const ENTRANCE_DUR = 1.3; // seconds
  let   entranceT    = 0;
  cup.position.y     = -5;   // start below viewport
  cup.scale.setScalar(0.25); // start small

  // Smooth rotation targets — offset by PI so the textured face looks at the camera
  let rotX = 0.10, rotY = Math.PI - 0.35;
  let floatT = 0;

  // ── Animate
  function animate() {
    requestAnimationFrame(animate);
    floatT += 0.016;

    // Spring entrance for the first ENTRANCE_DUR seconds
    if (entranceT < 1) {
      entranceT = Math.min(entranceT + 0.016 / ENTRANCE_DUR, 1);
      const e = easeOutBack(entranceT);
      cup.scale.setScalar(0.25 + 0.75 * e);
      cup.position.y = -5 + 5 * e + Math.sin(floatT) * 0.04;
    } else {
      // Normal float — rests at centre of canvas
      cup.position.y = 0.0 + Math.sin(floatT) * 0.07;
    }

    // Target: base tilt + subtle mouse parallax (kept small so text stays visible)
    const tgtX =  0.10 - mouseY * 0.10;
    const tgtY = Math.PI - 0.35 + mouseX * 0.14;

    // Smooth lerp toward target
    rotX += (tgtX - rotX) * 0.06;
    rotY += (tgtY - rotY) * 0.06;

    cup.rotation.x = rotX;
    cup.rotation.y = rotY;

    // Leaf particles — orbit, drift upward, tumble
    leaves.forEach(l => {
      l.userData.angle += l.userData.orbitSpeed;
      l.position.x  = Math.cos(l.userData.angle) * l.userData.radius;
      l.position.z  = Math.sin(l.userData.angle) * l.userData.radius - 0.3;
      l.position.y += l.userData.riseSpeed;
      if (l.position.y > l.userData.yMax) l.position.y = l.userData.yMin;
      l.rotation.z += l.userData.rotZ;
      l.rotation.x += l.userData.rotX;
      // Gentle fade as they rise
      l.material.opacity = 0.35 + Math.abs(Math.sin(l.userData.angle * 1.5)) * 0.55;
    });

    renderer.render(scene, camera);
  }
  animate();

  // ── Resize
  function onResize() {
    W = wrap.clientWidth;
    H = wrap.clientHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  }
  window.addEventListener('resize', onResize);
}

/* ──────────────────────────────────────────────────────
   5.  COUNT-UP ANIMATION (IntersectionObserver)
────────────────────────────────────────────────────── */
function initCountUp() {
  const elements = document.querySelectorAll('.count-up');
  if (!elements.length) return;

  const DURATION = 1800; // ms

  function animateCount(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';

    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const start  = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      // Cubic ease-out
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.round(target * eased);

      el.textContent = value + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  elements.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────
   6.  CONTACT FORM (Formspree)
────────────────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const btn  = document.getElementById('form-btn');
  if (!form || !btn) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Basic validation
    const name    = form.querySelector('#f-name').value.trim();
    const email   = form.querySelector('#f-email').value.trim();
    const message = form.querySelector('#f-msg').value.trim();
    if (!name || !email || !message) return;

    const btnLabel = btn.querySelector('[data-key="form_btn"]');
    const origText = btnLabel ? btnLabel.textContent : btn.textContent;

    btn.disabled = true;
    if (btnLabel) btnLabel.textContent = '…';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });

      if (res.ok) {
        form.reset();
        if (btnLabel) btnLabel.textContent = currentLang === 'sq' ? 'U dërgua ✓' : 'Sent ✓';
        setTimeout(() => {
          btn.disabled = false;
          if (btnLabel) btnLabel.textContent = origText;
        }, 4000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      if (btnLabel) btnLabel.textContent = currentLang === 'sq' ? 'Gabim — riprovo' : 'Error — try again';
      btn.disabled = false;
    }
  });
}

/* ──────────────────────────────────────────────────────
   7.  STICKY NAV
────────────────────────────────────────────────────── */
function initStickyNav() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once in case page loads scrolled
}

/* ──────────────────────────────────────────────────────
   8.  HAMBURGER / MOBILE MENU
────────────────────────────────────────────────────── */
function closeMobileMenu() {
  const nav       = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  if (!nav || !hamburger) return;

  nav.classList.remove('nav-open');
  document.body.classList.remove('menu-open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.querySelector('i').className = 'ti ti-menu-2';
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav       = document.getElementById('navbar');
  const navLinks  = document.getElementById('nav-links');
  const backdrop  = document.getElementById('nav-backdrop');
  if (!hamburger || !nav || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    hamburger.querySelector('i').className = isOpen ? 'ti ti-x' : 'ti ti-menu-2';
  });

  backdrop?.addEventListener('click', closeMobileMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });
}

/* ──────────────────────────────────────────────────────
   9.  PRODUCT MODAL
────────────────────────────────────────────────────── */
// SVG markup pulled from each card's .cup-mockup
function initProductModal() {
  const modal    = document.getElementById('product-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  if (!modal) return;

  // Map product IDs to their background class and size+name keys
  const prodMeta = {
    1: { sizeKey: 'S · 4 oz', nameKey: 'p1_name', wallKey: 'p1_desc', descKey: 'p1_long', bgClass: 'prod-img-white' },
    2: { sizeKey: 'M · 8 oz', nameKey: 'p2_name', wallKey: 'p2_desc', descKey: 'p2_long', bgClass: 'prod-img-kraft' },
    3: { sizeKey: 'L · 12 oz', nameKey: 'p3_name', wallKey: 'p3_desc', descKey: 'p3_long', bgClass: 'prod-img-olive' },
    4: { sizeKey: 'XL · 16 oz', nameKey: 'p4_name', wallKey: 'p4_desc', descKey: 'p4_long', bgClass: 'prod-img-dark' },
  };

  function openModal(card) {
    const id   = parseInt(card.dataset.product, 10);
    const meta = prodMeta[id];
    if (!meta) return;

    const dict = T[currentLang];

    // Show the same product image as the clicked card
    const modalSvg = document.getElementById('modal-svg');
    const photo    = card.querySelector('.prod-photo');
    const imgSrc   = photo?.getAttribute('src') || '';
    const imgAlt   = photo?.alt || dict[meta.nameKey] || 'Product photo';

    modalSvg.innerHTML = imgSrc
      ? `<img src="${imgSrc}" alt="${imgAlt}" class="prod-modal-photo" loading="lazy" decoding="async" />`
      : '';
    modalSvg.className = `prod-modal-svg prod-modal-svg--photo ${meta.bgClass}`;

    // Fill text fields
    document.getElementById('modal-size').textContent     = meta.sizeKey;
    document.getElementById('modal-prod-name').textContent = dict[meta.nameKey] || '';
    document.getElementById('modal-wall').textContent      = dict[meta.wallKey] || '';
    document.getElementById('modal-desc').textContent      = dict[meta.descKey] || '';

    // Show
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  // Attach click to each product card
  document.querySelectorAll('.prod-card[data-product]').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card); }
    });
  });

  // Close triggers
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

/* ──────────────────────────────────────────────────────
   10. PRODUCTS CAROUSEL ARROW (mobile)
────────────────────────────────────────────────────── */
function initProductsCarousel() {
  const grid  = document.getElementById('products-grid');
  const arrow = document.querySelector('.prod-carousel-arrow');
  if (!grid || !arrow) return;

  const MOBILE_MAX = 768;
  const SCROLL_END = 4;

  function updateArrow() {
    if (window.innerWidth > MOBILE_MAX) {
      arrow.classList.remove('is-visible');
      return;
    }

    const canScroll = grid.scrollWidth - grid.clientWidth > SCROLL_END;
    const atEnd     = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - SCROLL_END;

    arrow.classList.toggle('is-visible', canScroll && !atEnd);
  }

  grid.addEventListener('scroll', updateArrow, { passive: true });
  window.addEventListener('resize', updateArrow, { passive: true });

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(updateArrow).observe(grid);
  }

  grid.querySelectorAll('.prod-photo').forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', updateArrow, { once: true });
  });

  updateArrow();
}

/* ──────────────────────────────────────────────────────
   11. BOOT
────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLang();
  buildMarquee();
  buildClientsStrip();
  initCountUp();
  initContactForm();
  initStickyNav();
  initHamburger();
  initProductModal();
  initProductsCarousel();
});
