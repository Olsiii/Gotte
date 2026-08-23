/* ═══════════════════════════════════════════════════════
   gotte.eco — main.js
   • EN / SQ language switcher
   • Marquee / ticker builder
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

    clients_label: 'Trusted by',
    clients_aria:  'Our clients',

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

    ct_label:     'Get in touch',
    ct_title:     'Let\'s create something together',
    ct_det_title: 'Contact details',
    ct_address:   'Radovan Zogoviq, 25 - Arberi (Dragodan)<br>Prishtina, Kosovë',
    ct_hours:     'Mon – Fri · 9:00 – 18:00',

    form_title:    'Send us a message',
    form_name:     'Your name',
    form_email:    'Email address',
    form_msg:      'Tell us about your project...',
    form_btn:      'Send message',
    form_btn_sent: 'Sent ✓',
    form_btn_err:  'Error — try again',
    err_name:      'Please enter your name.',
    err_email:     'Please enter a valid email address.',
    err_msg:       'Please enter a message.',
    sent_ok:       'Message sent — we\'ll be in touch soon.',
    sent_err:      'Something went wrong. Please try again or email us directly.',

    footer_copy:    '© 2026 gotte.eco · All rights reserved',
    footer_privacy: 'Privacy Policy',
    footer_back:    'Back to home',

    privacy_label:            'Legal',
    privacy_title:            'Privacy Policy',
    privacy_updated:          'Last updated: 23 August 2026',
    privacy_intro:            'This policy explains what information gotte.eco collects when you use this website, and how it\'s used. We keep this simple: we only collect what\'s needed to respond to your enquiries.',
    privacy_collect_title:    'Information we collect',
    privacy_collect_body:     'When you submit our contact form, we collect the name, email address, and message you provide. We don\'t collect any other personal information through this site, and we don\'t use tracking cookies or analytics scripts.',
    privacy_use_title:        'How we use it',
    privacy_use_body:         'We use the information you submit only to respond to your enquiry — for example, to give you a quote or answer a question about our products. We don\'t sell, rent, or share your information with third parties for marketing purposes.',
    privacy_thirdparty_title: 'Third-party services',
    privacy_thirdparty_body:  'Our contact form is processed by Formspree, a third-party form service. This page also loads Google Fonts and embeds a Google Map, both of which may load resources from Google\'s servers.',
    privacy_retention_title:  'Data retention',
    privacy_retention_body:   'We keep contact form submissions only as long as needed to respond to your enquiry, unless you become a customer, in which case we retain what\'s needed for that business relationship.',
    privacy_rights_title:     'Your rights',
    privacy_rights_body:      'You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, at any time — just email us using the address below.',
    privacy_contact_title:    'Contact us',
    privacy_contact_body:     'Questions about this policy or your data? Email us at',

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

    clients_label: 'Na besojnë',
    clients_aria:  'Klientët tanë',

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

    ct_label:     'Na kontaktoni',
    ct_title:     'Le të krijojmë diçka së bashku',
    ct_det_title: 'Detajet e kontaktit',
    ct_address:   'Radovan Zogoviq, 25 - Arberi (Dragodan)<br>Prishtina, Kosovë',
    ct_hours:     'Hëne – Shtunë · 9:00 – 18:00',

    form_title:    'Na dërgoni mesazh',
    form_name:     'Emri juaj',
    form_email:    'Adresa e emailit',
    form_msg:      'Na tregoni për projektin tuaj...',
    form_btn:      'Dërgo mesazhin',
    form_btn_sent: 'U dërgua ✓',
    form_btn_err:  'Gabim — riprovo',
    err_name:      'Ju lutem shënoni emrin tuaj.',
    err_email:     'Ju lutem shënoni një adresë email të vlefshme.',
    err_msg:       'Ju lutem shkruani një mesazh.',
    sent_ok:       'Mesazhi u dërgua — do t\'ju kontaktojmë së shpejti.',
    sent_err:      'Diçka shkoi keq. Ju lutem provoni përsëri ose na shkruani direkt.',

    footer_copy:    '© 2026 gotte.eco · Të gjitha të drejtat e rezervuara',
    footer_privacy: 'Politika e Privatësisë',
    footer_back:    'Kthehu në kryefaqe',

    privacy_label:            'Ligjore',
    privacy_title:            'Politika e Privatësisë',
    privacy_updated:          'Përditësuar më: 23 gusht 2026',
    privacy_intro:            'Kjo politikë shpjegon çfarë informacioni mbledh gotte.eco kur përdorni këtë faqe interneti, dhe si përdoret. E mbajmë të thjeshtë: mbledhim vetëm atë që na duhet për t\'iu përgjigjur kërkesave tuaja.',
    privacy_collect_title:    'Informacioni që mbledhim',
    privacy_collect_body:     'Kur dërgoni formularin tonë të kontaktit, mbledhim emrin, adresën e emailit dhe mesazhin që na jepni. Nuk mbledhim asnjë informacion tjetër personal përmes kësaj faqeje, dhe nuk përdorim cookies gjurmuese apo skripte analitike.',
    privacy_use_title:        'Si e përdorim',
    privacy_use_body:         'Informacionin që dërgoni e përdorim vetëm për t\'iu përgjigjur kërkesës suaj — për shembull, për t\'ju dhënë një ofertë ose për t\'iu përgjigjur një pyetjeje rreth produkteve tona. Nuk e shesim, japim me qira, apo ndajmë informacionin tuaj me palë të treta për qëllime marketingu.',
    privacy_thirdparty_title: 'Shërbimet e palëve të treta',
    privacy_thirdparty_body:  'Formulari ynë i kontaktit përpunohet nga Formspree, një shërbim formularësh i palës së tretë. Kjo faqe gjithashtu ngarkon Google Fonts dhe përfshin një hartë të Google, të cilat mund të ngarkojnë burime nga serverët e Google.',
    privacy_retention_title:  'Ruajtja e të dhënave',
    privacy_retention_body:   'I ruajmë mesazhet e formularit të kontaktit vetëm sa kohë që nevojitet për t\'iu përgjigjur kërkesës suaj, përveç nëse bëheni klient, në atë rast ruajmë atë që nevojitet për atë marrëdhënie biznesi.',
    privacy_rights_title:     'Të drejtat tuaja',
    privacy_rights_body:      'Mund të na pyesni çfarë informacioni ruajmë për ju, të na kërkoni ta korrigjojmë, apo ta fshijmë, në çdo kohë — thjesht na shkruani në adresën më poshtë.',
    privacy_contact_title:    'Na kontaktoni',
    privacy_contact_body:     'Pyetje rreth kësaj politike apo të dhënave tuaja? Na shkruani në',

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

  // Update aria-label-keyed elements
  document.querySelectorAll('[data-key-aria]').forEach(el => {
    const key = el.dataset.keyAria;
    if (dict[key] !== undefined) {
      el.setAttribute('aria-label', dict[key]);
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
  const form   = document.getElementById('contact-form');
  const btn    = document.getElementById('form-btn');
  const status = document.getElementById('form-status');
  if (!form || !btn) return;

  const nameEl  = form.querySelector('#f-name');
  const emailEl = form.querySelector('#f-email');
  const msgEl   = form.querySelector('#f-msg');
  const honeypot = form.querySelector('[name="_gotcha"]');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (message) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
      if (errorEl) { errorEl.textContent = message; errorEl.hidden = false; }
    } else {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
      if (errorEl) { errorEl.textContent = ''; errorEl.hidden = true; }
    }
  }

  function validate() {
    const dict = T[currentLang];
    let firstInvalid = null;

    const name    = nameEl.value.trim();
    const email   = emailEl.value.trim();
    const message = msgEl.value.trim();

    setFieldError(nameEl, 'f-name-error', name ? '' : dict.err_name);
    if (!name) firstInvalid = firstInvalid || nameEl;

    const emailValid = email && EMAIL_RE.test(email);
    setFieldError(emailEl, 'f-email-error', emailValid ? '' : dict.err_email);
    if (!emailValid) firstInvalid = firstInvalid || emailEl;

    setFieldError(msgEl, 'f-msg-error', message ? '' : dict.err_msg);
    if (!message) firstInvalid = firstInvalid || msgEl;

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!validate()) return;

    const dict      = T[currentLang];
    const btnLabel  = btn.querySelector('[data-key="form_btn"]');
    const origText  = btnLabel ? btnLabel.textContent : btn.textContent;

    // Honeypot filled → almost certainly a bot. Fake a normal success without
    // submitting, so bots don't learn the field is being checked.
    if (honeypot && honeypot.value) {
      form.reset();
      if (status) status.textContent = dict.sent_ok;
      return;
    }

    btn.disabled = true;
    if (btnLabel) btnLabel.textContent = '…';
    if (status) status.textContent = '';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });

      if (res.ok) {
        form.reset();
        if (btnLabel) btnLabel.textContent = dict.form_btn_sent;
        if (status) status.textContent = dict.sent_ok;
        setTimeout(() => {
          btn.disabled = false;
          if (btnLabel) btnLabel.textContent = origText;
        }, 4000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      if (btnLabel) btnLabel.textContent = dict.form_btn_err;
      if (status) status.textContent = dict.sent_err;
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

  // Pages with no dark hero (e.g. privacy.html) should always show the
  // solid "scrolled" nav style, since there's nothing for it to overlay.
  if (!document.getElementById('home')) {
    nav.classList.add('scrolled');
    return;
  }

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
    const imgSrc   = photo?.getAttribute('data-full') || photo?.getAttribute('src') || '';
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
