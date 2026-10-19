/* ═══════════════════════════════════════════════════════
   gotte.eco — main.js
   • EN / SQ language switcher
   • Marquee / ticker builder
   • Count-up on scroll (IntersectionObserver)
   • Contact form (/api/contact → Resend)
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

    hero_sub:    'eco-friendly · custom printed',
    hero_title:  'Your brand,<br>wrapped in <em>nature.</em>',
    hero_body:   'Custom printed paper cups and bags that carry your logo and your values. Printed with water-based inks, in any quantity.',
    hero_family: '<span>One family</span> Foto Gagi · Gagi Print · Gottë',
    hero_cta1:  'Get a quote',
    hero_cta2:  'See products ↓',

    about_label: 'About us',
    about_title: 'Eco-friendly branding that saves the planet, not just your budget.',
    about_p1:    'GOTTË is a new business specialized in the production of branded paper cups and paper bags using eco-friendly bio paper and water-based printing technology. We provide modern, high-quality packaging solutions for cafés, restaurants, events, and businesses looking for unique and sustainable branding.',
    about_p2:    'GOTTË continues the long-standing experience of Foto Gagi and Gagi Print, companies with many years of expertise in photo printing, professional printing, and branding services. With a strong commitment to quality, design, and customer satisfaction, our goal is to deliver functional, aesthetic, and environmentally friendly products for both the local and international market.',

    badge1: 'Custom print',
    badge2: 'Water-based inks',
    badge3: 'Any quantity',
    badge4: 'Made in Kosovo',

    stat1_label: 'Cup sizes',
    stat2_label: 'Happy clients',
    stat3_label: 'Avg. turnaround',

    clients_label: 'Trusted by',
    clients_aria:  'Our clients',

    prod_label: 'Our products',
    prod_title: 'Custom cups for every occasion',

    p1_name: 'Classic White',
    p1_desc: 'Single wall · 118 ml',
    p1_long: 'A compact single-wall cup in a clean white finish. Ideal for espresso, macchiato, or short drinks. Lightweight and fully customisable with your brand logo and colours — perfect for cafés, events, and daily takeaway service.',
    p2_name: 'Kraft Natural',
    p2_desc: 'Single wall · 236 ml',
    p2_long: 'Our most versatile cup, crafted from natural kraft paper with a warm brown finish. Great for lattes, americanos, and cold beverages. The earthy tone pairs beautifully with any brand identity and prints crisp, vivid colours.',
    p3_name: 'Signature Olive',
    p3_desc: 'Single wall · 355 ml',
    p3_long: 'A tall 12 oz cup in our signature olive finish — designed for long drinks and customers on the move. A generous size for tea, flat whites, and specialty drinks.',
    p4_name: 'Premium Dark',
    p4_desc: 'Single wall · 473 ml',
    p4_long: 'Our flagship XL cup for bold brand statements. The sleek dark finish creates a premium look that elevates any brand. Perfect for large lattes, cold brews, and smoothies. Our best-selling size — and our customers\' favourite.',

    bestseller: 'Best seller',

    ct_label:     'Get in touch',
    ct_title:     'Let\'s create something together',
    ct_det_title: 'Contact details',
    ct_address:   'Radovan Zogoviq, 25 - Arberi (Dragodan)<br>Prishtina, Kosovë',
    ct_hours:     'Mon – Fri · 10:00 – 18:00',

    form_title:    'Send us a message',
    form_name:     'Your name',
    form_email:    'Email address',
    form_msg:      'Tell us about your project...',
    form_btn:      'Send message',
    err_name:      'Please enter your name.',
    err_email:     'Please enter a valid email address.',
    err_msg:       'Please enter a message.',
    sent_err:      'Something went wrong. Please try again or email us directly.',

    quote_product_label: 'Product you\'re interested in',
    quote_product_any:   'Not sure yet',
    quote_product_1:     'Classic White — S · 4 oz',
    quote_product_2:     'Kraft Natural — M · 8 oz',
    quote_product_3:     'Signature Olive — L · 12 oz',
    quote_product_4:     'Premium Dark — XL · 16 oz',
    quote_qty_label:       'Estimated quantity',
    quote_qty_placeholder: 'e.g. 500, 1000, 5000+',
    quote_file_label:      'Attach your logo or artwork (optional)',
    quote_file_hint:       'PNG, JPG, PDF, AI, EPS, or SVG — up to 4MB',
    quote_file_err_size:   'That file is too large — please keep it under 4MB.',
    quote_file_remove:     'Remove',
    preview_note:          'Preview on our Kraft Natural cup (M · 8 oz)',
    preview_aria:          'Preview of your logo on a Kraft Natural cup',
    preview_unavailable:   'Live preview works with PNG, JPG and SVG — we\'ll still receive your file.',
    form_success_title: 'Message sent!',
    form_success_body:  'Thanks — we\'ll get back to you within 1 business day.',
    form_success_again: 'Send another message',

    catalog_cta: 'Download full catalog (PDF)',
    modal_quote_cta: 'Request a quote for this size',
    modal_sizes_aria: 'Choose a size',
    spec_capacity:   'Capacity',
    spec_build:      'Construction',
    spec_print:      'Print',
    spec_print_val:  'Your logo, water-based inks',
    spec_lining:     'Lining',
    spec_lining_val: 'PE coated',
    spec_dims:       'Top Ø × height',
    spec_paper:      'Paper weight',
    spec_single:     'Single wall',

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
    privacy_thirdparty_body:  'Messages from our contact form, including any file you attach, are delivered to our inbox by Resend, a third-party email service. This page also loads Google Fonts and embeds a Google Map, both of which may load resources from Google\'s servers.',
    privacy_retention_title:  'Data retention',
    privacy_retention_body:   'We keep contact form submissions only as long as needed to respond to your enquiry, unless you become a customer, in which case we retain what\'s needed for that business relationship.',
    privacy_rights_title:     'Your rights',
    privacy_rights_body:      'You can ask us what information we hold about you, ask us to correct it, or ask us to delete it, at any time — just email us using the address below.',
    privacy_contact_title:    'Contact us',
    privacy_contact_body:     'Questions about this policy or your data? Email us at',

    ticker: [
      { icon: 'ti-leaf',      text: 'Full Custom Print'   },
      { icon: 'ti-truck',     text: 'Fast Delivery'        },
      { icon: 'ti-droplet',   text: 'Water-based Inks'     },
      { icon: 'ti-cup',       text: '4 Cup Sizes'          },
      { icon: 'ti-palette',   text: 'Any Quantity'         },
      { icon: 'ti-map-pin',   text: 'Made in Kosovo'       },
      { icon: 'ti-star',      text: '500+ Happy Clients'   },
      { icon: 'ti-brush',     text: 'Your Logo, Every Cup' },
    ],
  },

  sq: {
    nav_home:     'Kryefaqja',
    nav_about:    'Rreth nesh',
    nav_products: 'Produktet',
    nav_contact:  'Kontakti',

    hero_sub:    'miqësor me natyrën · printim me porosi',
    hero_title:  'Gottë,<br>Identitet ne cdo <br><em>detaj.</em>',
    hero_body:   'Gota dhe qese letre me printim të personalizuar që bartin logon tuaj dhe vlerat tuaja. Të printuara me ngjyra me bazë uji, në çdo sasi.',
    hero_family: '<span>Një familje</span> Foto Gagi · Gagi Print · Gottë',
    hero_cta1:  'Merr ofertë',
    hero_cta2:  'Shiko produktet ↓',

    about_label: 'Rreth nesh',
    about_title: 'Nga natyra per brendin tuaj.',
    about_p1:    'Më shumë se një gotë. Më shumë se një qese. <br>Një identitet që shihet. Një cilësi që ndihet.<br><br>GOTTË sjell një qasje moderne në prodhimin dhe personalizimin e gotave dhe qeseve të letrës.<br><br>Ne besojmë se paketimi është pjesë e identitetit të çdo biznesi. Prandaj, çdo produkt që krijojmë bashkon funksionalitetin, dizajnin dhe kujdesin për natyrën.',
    about_p2:    'Të mbështetur në përvojën shumëvjeçare të Foto Gagi dhe Gagi Print, ofrojmë zgjidhje profesionale për biznese që kërkojnë cilësi dhe origjinalitet. Nga bizneset e vogla deri te brendet e mëdha, synimi ynë mbetet i njëjtë:<br><br>Ta bëjmë brendin tuaj të dallohet në çdo detaj.',

    badge1: 'Printim me porosi',
    badge2: 'Ngjyra me bazë uji',
    badge3: 'Çdo sasi',
    badge4: 'Prodhuar në Kosovë',

    stat1_label: 'Madhësi gotash',
    stat2_label: 'Klientë të kënaqur',
    stat3_label: 'Koha mesatare e dërgimit',

    clients_label: 'Na besojnë',
    clients_aria:  'Klientët tanë',

    prod_label: 'Produktet tona',
    prod_title: 'Gota me porosi për çdo rast',

    p1_name: 'Klasike e Bardhë',
    p1_desc: 'Mur i vetëm · 118 ml',
    p1_long: 'Gotë kompakte me mur të vetëm në ngjyrë të bardhë të pastër. Ideale për espresso, macchiato apo pije të shkurtra. E lehtë dhe plotësisht e personalizueshme me logon dhe ngjyrat e markës suaj — perfekte për kafene, evente dhe shërbim çdo ditë.',
    p2_name: 'Kraft Natyrale',
    p2_desc: 'Mur i vetëm · 236 ml',
    p2_long: 'Gota jonë më e gjithanshme, e punuar nga letra kraft natyrale me ngjyrë kafe të ngrohtë. E shkëlqyer për latte, americano dhe pije të ftohta. Toni i tokës kombinohet bukur me çdo identitet marke dhe printon ngjyra të qarta dhe të gjalla.',
    p3_name: 'Signature Olive',
    p3_desc: 'Mur i vetëm · 355 ml',
    p3_long: 'Gotë e gjatë 12 oz në ngjyrën tonë karakteristike të ullirit — e dizajnuar për pije të gjata dhe klientë në lëvizje. Madhësi bujare për çaj, flat white dhe pije speciale.',
    p4_name: 'Premium Dark',
    p4_desc: 'Mur i vetëm · 473 ml',
    p4_long: 'Gota jonë kryesore XL për deklarata të guximshme marke. Finishi elegant i errët krijon një pamje premium që ngre çdo markë. Perfekte për latte të mëdha, cold brew dhe smoothie. Madhësia jonë më e shitur — dhe e preferuara e klientëve.',

    bestseller: 'Më e shitur',

    ct_label:     'Na kontaktoni',
    ct_title:     'Le të krijojmë diçka së bashku',
    ct_det_title: 'Detajet e kontaktit',
    ct_address:   'Radovan Zogoviq, 25 - Arberi (Dragodan)<br>Prishtina, Kosovë',
    ct_hours:     'Hënë – Premte · 9:00 – 17:00',

    form_title:    'Na dërgoni mesazh',
    form_name:     'Emri juaj',
    form_email:    'Adresa e emailit',
    form_msg:      'Na tregoni për projektin tuaj...',
    form_btn:      'Dërgo mesazhin',
    err_name:      'Ju lutem shënoni emrin tuaj.',
    err_email:     'Ju lutem shënoni një adresë email të vlefshme.',
    err_msg:       'Ju lutem shkruani një mesazh.',
    sent_err:      'Diçka shkoi keq. Ju lutem provoni përsëri ose na shkruani direkt.',

    quote_product_label: 'Produkti që ju intereson',
    quote_product_any:   'Nuk jam i sigurt ende',
    quote_product_1:     'Klasike e Bardhë — S · 4 oz',
    quote_product_2:     'Kraft Natyrale — M · 8 oz',
    quote_product_3:     'Signature Olive — L · 12 oz',
    quote_product_4:     'Premium Dark — XL · 16 oz',
    quote_qty_label:       'Sasia e përafërt',
    quote_qty_placeholder: 'p.sh. 500, 1000, 5000+',
    quote_file_label:      'Bashkangjitni logon ose materialin tuaj (opsionale)',
    quote_file_hint:       'PNG, JPG, PDF, AI, EPS, ose SVG — deri në 4MB',
    quote_file_err_size:   'Skedari është shumë i madh — ju lutem mbajeni nën 4MB.',
    quote_file_remove:     'Hiqe',
    preview_note:          'Parapamje në gotën tonë Kraft Natyrale (M · 8 oz)',
    preview_aria:          'Parapamje e logos suaj në gotën Kraft Natyrale',
    preview_unavailable:   'Parapamja funksionon me PNG, JPG dhe SVG — skedarin tuaj e marrim gjithsesi.',
    form_success_title: 'Mesazhi u dërgua!',
    form_success_body:  'Faleminderit — do t\'ju kontaktojmë brenda 1 dite pune.',
    form_success_again: 'Dërgo një mesazh tjetër',

    catalog_cta: 'Shkarko katalogun e plotë (PDF)',
    modal_quote_cta: 'Kërko ofertë për këtë madhësi',
    modal_sizes_aria: 'Zgjidhni madhësinë',
    spec_capacity:   'Kapaciteti',
    spec_build:      'Ndërtimi',
    spec_print:      'Printimi',
    spec_print_val:  'Logoja juaj, ngjyra water-based',
    spec_lining:     'Shtresa',
    spec_lining_val: 'Shtresë PE',
    spec_dims:       'Ø lart × lartësia',
    spec_paper:      'Pesha e letrës',
    spec_single:     'Mur i vetëm',

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
    privacy_thirdparty_body:  'Mesazhet nga formulari ynë i kontaktit, përfshirë çdo skedar që bashkëngjitni, dërgohen në emailin tonë përmes Resend, një shërbim emaili i palës së tretë. Kjo faqe gjithashtu ngarkon Google Fonts dhe përfshin një hartë të Google, të cilat mund të ngarkojnë burime nga serverët e Google.',
    privacy_retention_title:  'Ruajtja e të dhënave',
    privacy_retention_body:   'I ruajmë mesazhet e formularit të kontaktit vetëm sa kohë që nevojitet për t\'iu përgjigjur kërkesës suaj, përveç nëse bëheni klient, në atë rast ruajmë atë që nevojitet për atë marrëdhënie biznesi.',
    privacy_rights_title:     'Të drejtat tuaja',
    privacy_rights_body:      'Mund të na pyesni çfarë informacioni ruajmë për ju, të na kërkoni ta korrigjojmë, apo ta fshijmë, në çdo kohë — thjesht na shkruani në adresën më poshtë.',
    privacy_contact_title:    'Na kontaktoni',
    privacy_contact_body:     'Pyetje rreth kësaj politike apo të dhënave tuaja? Na shkruani në',

    ticker: [
      { icon: 'ti-leaf',        text: 'Printim i Plotë'          },
      { icon: 'ti-truck',       text: 'Dërgesë e Shpejtë'        },
      { icon: 'ti-droplet',     text: 'Ngjyra Water-based'        },
      { icon: 'ti-cup',         text: '4 Madhësi Gotash'          },
      { icon: 'ti-palette',     text: 'Çdo Sasi'                  },
      { icon: 'ti-map-pin',     text: 'Prodhuar në Kosovë'        },
      { icon: 'ti-star',        text: '500+ Klientë të Kënaqur'  },
      { icon: 'ti-brush',       text: 'Logoja Juaj në Çdo Gotë'   },
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

  const btnEn = document.getElementById('btn-en');
  const btnSq = document.getElementById('btn-sq');
  btnEn.classList.toggle('active', lang === 'en');
  btnSq.classList.toggle('active', lang === 'sq');
  btnEn.setAttribute('aria-pressed', String(lang === 'en'));
  btnSq.setAttribute('aria-pressed', String(lang === 'sq'));

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

  syncInternalLinks(lang);
  buildMarquee();
  // Re-label finished counters (e.g. "10 days" → "10 ditë")
  document.querySelectorAll('.count-up[data-animated]').forEach(el => {
    const suffix = (lang === 'sq' && el.dataset.suffixSq) || el.dataset.suffix || '';
    el.textContent = el.dataset.target + suffix;
  });
}

// Keep cross-page links (footer "Privacy Policy", privacy.html's nav/back
// links) carrying the active language, so switching language then
// navigating doesn't silently drop you back into English.
function syncInternalLinks(lang) {
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    // Matches the bare page link whether or not a previous switch already
    // appended ?lang=sq, so repeated toggles keep updating it correctly.
    const m = href && href.match(/^(privacy\.html|index\.html)(?:\?lang=sq)?(#[\w-]+)?$/);
    if (!m) return;
    const [, page, hash = ''] = m;
    const query = lang === 'sq' ? '?lang=sq' : '';
    a.setAttribute('href', page + query + hash);
  });
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

  document.getElementById('btn-en')?.addEventListener('click', () => switchLang('en'));
  document.getElementById('btn-sq')?.addEventListener('click', () => switchLang('sq'));
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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCount(el) {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';

    const target = parseFloat(el.dataset.target);
    const suffix = (currentLang === 'sq' && el.dataset.suffixSq) || el.dataset.suffix || '';

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

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
   6.  CONTACT FORM (/api/contact)
────────────────────────────────────────────────────── */
function initContactForm() {
  const form     = document.getElementById('contact-form');
  const btn      = document.getElementById('form-btn');
  const success  = document.getElementById('form-success');
  const errBox   = document.getElementById('form-error-banner');
  const errText  = document.getElementById('form-error-banner-text');
  const againBtn = document.getElementById('form-success-again');
  if (!form || !btn) return;

  const nameEl    = form.querySelector('#f-name');
  const emailEl   = form.querySelector('#f-email');
  const msgEl     = form.querySelector('#f-msg');
  const fileEl    = form.querySelector('#f-file');
  const honeypot  = form.querySelector('[name="_gotcha"]');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Keep in step with MAX_FILE_BYTES in api/contact.js (capped by
  // Vercel's ~4.5MB request-body limit).
  const MAX_FILE_BYTES = 4 * 1024 * 1024;

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

    const file      = fileEl?.files?.[0];
    const fileValid = !file || file.size <= MAX_FILE_BYTES;
    if (fileEl) setFieldError(fileEl, 'f-file-error', fileValid ? '' : dict.quote_file_err_size);
    if (!fileValid) firstInvalid = firstInvalid || fileEl;

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function hideErrorBanner() {
    if (errBox) errBox.hidden = true;
  }

  function showErrorBanner(message) {
    if (!errBox) return;
    if (errText) errText.textContent = message;
    errBox.hidden = false;
  }

  // Swap the whole form for a success panel on submit — a status line
  // below a button is easy to miss; this isn't.
  function showSuccess() {
    form.hidden = true;
    if (success) success.hidden = false;
  }

  function resetToForm() {
    form.reset();
    hideErrorBanner();
    [[nameEl, 'f-name-error'], [emailEl, 'f-email-error'], [msgEl, 'f-msg-error'], [fileEl, 'f-file-error']]
      .forEach(([el, id]) => el && setFieldError(el, id, ''));
    const btnLabel = btn.querySelector('[data-key="form_btn"]');
    if (btnLabel) btnLabel.textContent = T[currentLang].form_btn;
    btn.disabled = false;
    form.hidden = false;
    if (success) success.hidden = true;
    nameEl?.focus();
  }

  againBtn?.addEventListener('click', resetToForm);

  form.addEventListener('submit', async e => {
    e.preventDefault();

    hideErrorBanner();
    if (!validate()) return;

    const dict     = T[currentLang];
    const btnLabel = btn.querySelector('[data-key="form_btn"]');

    // Honeypot filled → almost certainly a bot. Fake a normal success
    // without submitting, so bots don't learn the field is being checked.
    if (honeypot && honeypot.value) {
      showSuccess();
      return;
    }

    btn.disabled = true;
    if (btnLabel) btnLabel.textContent = '…';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json' },
        body:    new FormData(form),
      });

      if (res.ok) {
        showSuccess();
      } else {
        throw new Error('Server error');
      }
    } catch {
      showErrorBanner(dict.sent_err);
      btn.disabled = false;
      if (btnLabel) btnLabel.textContent = dict.form_btn;
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

  const hero = document.getElementById('home');
  function onScroll() {
    const threshold = hero.offsetTop + hero.offsetHeight - nav.offsetHeight;
    const past = window.scrollY >= threshold;
    nav.classList.toggle('scrolled', past);
    // While still over the hero, a dark glass bar keeps the links readable
    nav.classList.toggle('over-hero', !past && window.scrollY > 40);
  }
  window.addEventListener('resize', onScroll, { passive: true });
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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Everything outside the modal, so it can be made inert while open —
  // keeps keyboard/AT focus from leaking into the page behind the dialog.
  const outsideModal = [document.querySelector('header'), document.getElementById('main'), document.querySelector('.footer')]
    .filter(Boolean);

  const card    = modal.querySelector('.prod-modal-card');
  const media   = document.getElementById('modal-media');
  const photo   = document.getElementById('modal-photo');
  const body    = document.getElementById('modal-body');
  const sizeBtns = [...modal.querySelectorAll('.prod-modal-size-btn')];

  const prodMeta = {
    // Dimensions and paper weights from the supplier drawings (Nessco)
    1: { size: 'S · 4 oz',   cap: '4 oz · 118 ml',  dims: 'Ø 61 × 61 mm',  paper: '220 g/m²', wall: 'spec_single', nameKey: 'p1_name', descKey: 'p1_long', tone: 'white' },
    2: { size: 'M · 8 oz',   cap: '8 oz · 236 ml',  dims: 'Ø 80 × 93 mm',  paper: '280 g/m²', wall: 'spec_single', nameKey: 'p2_name', descKey: 'p2_long', tone: 'kraft' },
    3: { size: 'L · 12 oz',  cap: '12 oz · 355 ml', dims: 'Ø 90 × 110 mm', paper: '280 g/m²', wall: 'spec_single', nameKey: 'p3_name', descKey: 'p3_long', tone: 'olive' },
    4: { size: 'XL · 16 oz', cap: '16 oz · 473 ml', dims: 'Ø 90 × 130 mm', paper: '280 g/m²', wall: 'spec_single', nameKey: 'p4_name', descKey: 'p4_long', tone: 'dark' },
  };

  // Matches the option values in the contact form's product <select> —
  // stable English identifiers so the submitted value stays readable in
  // the recipient's inbox no matter which UI language was active.
  const quoteOptionValue = {
    1: 'Classic White — S · 4 oz',
    2: 'Kraft Natural — M · 8 oz',
    3: 'Signature Olive — L · 12 oz',
    4: 'Premium Dark — XL · 16 oz',
  };

  const cards = {};
  document.querySelectorAll('.prod-card[data-product]').forEach(c => { cards[c.dataset.product] = c; });

  let lastTrigger   = null;
  let openProductId = null;
  let closeTimer    = null;

  function fill(id) {
    const meta = prodMeta[id];
    const dict = T[currentLang];
    const src  = cards[id]?.querySelector('.prod-photo');
    photo.src = src?.getAttribute('data-full') || src?.getAttribute('src') || '';
    photo.alt = src?.alt || dict[meta.nameKey] || '';
    media.dataset.tone = meta.tone;
    document.getElementById('modal-count').textContent = `0${id} / 04`;
    document.getElementById('modal-size').textContent      = meta.size;
    document.getElementById('modal-prod-name').textContent = dict[meta.nameKey] || '';
    document.getElementById('modal-desc').textContent      = dict[meta.descKey] || '';
    document.getElementById('modal-cap').textContent       = meta.cap;
    document.getElementById('modal-build').textContent     = dict[meta.wall] || '';
    document.getElementById('modal-dims').textContent      = meta.dims;
    document.getElementById('modal-paper').textContent     = meta.paper;
    sizeBtns.forEach(b => {
      const on = Number(b.dataset.goto) === id;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    openProductId = id;
  }

  // Swap product inside the open dialog with a short crossfade
  function goTo(id) {
    if (!prodMeta[id] || id === openProductId) return;
    if (reduceMotion) { fill(id); return; }
    modal.classList.add('is-swapping');
    setTimeout(() => {
      fill(id);
      requestAnimationFrame(() => modal.classList.remove('is-swapping'));
    }, 180);
  }

  // iOS Safari ignores overflow:hidden on <body>, so swipes inside the
  // sheet scrolled the page behind it. Pinning the body in place is the
  // lock that works everywhere; the scroll position is restored on close.
  let lockedScrollY = 0;
  function lockScroll() {
    lockedScrollY = window.scrollY;
    Object.assign(document.body.style, {
      position: 'fixed', top: `-${lockedScrollY}px`, left: '0', right: '0', overflow: 'hidden',
    });
  }
  function unlockScroll() {
    Object.assign(document.body.style, { position: '', top: '', left: '', right: '', overflow: '' });
    window.scrollTo({ top: lockedScrollY, behavior: 'instant' });
  }

  function openModal(trigger) {
    const id = parseInt(trigger.dataset.product, 10);
    if (!prodMeta[id]) return;
    clearTimeout(closeTimer);
    lastTrigger = trigger;
    fill(id);
    modal.classList.remove('is-closing', 'is-swapping');
    modal.hidden = false;
    lockScroll();
    outsideModal.forEach(el => { el.inert = true; });
    card.scrollTop = 0;
    closeBtn.focus();
  }

  function closeModal() {
    if (modal.hidden || modal.classList.contains('is-closing')) return;
    const finish = () => {
      modal.hidden = true;
      modal.classList.remove('is-closing');
      unlockScroll();
      outsideModal.forEach(el => { el.inert = false; });
      lastTrigger?.focus();
      lastTrigger = null;
    };
    if (reduceMotion) { finish(); return; }
    modal.classList.add('is-closing');
    closeTimer = setTimeout(finish, 260);
  }

  Object.values(cards).forEach(c => {
    c.addEventListener('click', () => openModal(c));
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(c); }
    });
  });

  sizeBtns.forEach(b => b.addEventListener('click', () => goTo(Number(b.dataset.goto))));

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') goTo(openProductId === 4 ? 1 : openProductId + 1);
    if (e.key === 'ArrowLeft')  goTo(openProductId === 1 ? 4 : openProductId - 1);
  });

  // Re-render the open product when the language changes
  document.getElementById('btn-en')?.addEventListener('click', () => { if (!modal.hidden) fill(openProductId); });
  document.getElementById('btn-sq')?.addEventListener('click', () => { if (!modal.hidden) fill(openProductId); });

  // "Request a quote for this size" — forwards the size to the contact
  // form's Product field (no price shown anywhere) and lets the visitor
  // just fill in a quantity and send it.
  const quoteBtn = document.getElementById('modal-quote-btn');
  quoteBtn?.addEventListener('click', () => {
    const productSelect = document.getElementById('f-product');
    const qtyInput      = document.getElementById('f-qty');
    if (productSelect && openProductId && quoteOptionValue[openProductId]) {
      productSelect.value = quoteOptionValue[openProductId];
    }
    closeModal();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => qtyInput?.focus({ preventScroll: true }), 600);
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
   10b. MOTION — scroll reveals + gentle hero parallax
   Classes are added from JS so the page is fully visible without it,
   and nothing animates for visitors who prefer reduced motion.
────────────────────────────────────────────────────── */
function initReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const groups = [
    '.about .section-label, .about .section-title, .about-p, .badge-row',
    '.stat-card',
    '.products .section-header > *',
    '.prod-card',
    '.contact .section-header > *',
    '.contact-details-block, .contact-form-block, .contact-map',
  ];

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-visible');
      io.unobserve(el);
      // Drop the reveal classes once done so hover transitions stay snappy
      el.addEventListener('transitionend', function done(e) {
        if (e.target !== el || e.propertyName !== 'opacity') return;
        el.classList.remove('reveal', 'is-visible');
        el.style.removeProperty('--reveal-delay');
        el.removeEventListener('transitionend', done);
      });
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  groups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      // Anything already on screen at load stays put
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 90}ms`);
      io.observe(el);
    });
  });
}

function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const img  = document.querySelector('.hero-photo');
  const hero = document.getElementById('home');
  if (!img || !hero) return;
  const desktop = window.matchMedia('(min-width: 861px)');
  let ticking = false;
  function update() {
    ticking = false;
    if (!desktop.matches) { img.style.removeProperty('--parallax'); return; }
    const y = Math.min(window.scrollY, hero.offsetHeight);
    img.style.setProperty('--parallax', `${(y * 0.08).toFixed(1)}px`);
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
}

/* ──────────────────────────────────────────────────────
   10c. LOGO UPLOAD — remove button + live preview on a cup
   The uploaded logo is wrapped around a blank M · 8 oz kraft cup on a
   <canvas>. Dark logos are "printed" with multiply (white backgrounds
   drop out like real ink); light logos on transparent PNGs are drawn
   normally so a white logo still shows on the kraft.
────────────────────────────────────────────────────── */
function initLogoPreview() {
  const input   = document.getElementById('f-file');
  const remove  = document.getElementById('f-file-remove');
  const box     = document.getElementById('logo-preview');
  const canvas  = document.getElementById('logo-preview-canvas');
  const noPrev  = document.getElementById('logo-preview-unavailable');
  const form    = document.getElementById('contact-form');
  if (!input || !canvas) return;

  const ctx = canvas.getContext('2d');
  // Region of the 800×732 cup photo shown in the canvas, and the cup's geometry there
  const VIEW = { x: 140, y: 170, w: 520, h: 480 };
  const CUP  = { cx: 412, cy: 426, halfW: 138, maxArc: 165, maxH: 150 };

  const cup = new Image();
  cup.src = 'images/cup_M_blank.jpg';
  const cupReady = new Promise(res => { cup.onload = res; cup.onerror = res; });

  let objectUrl = null;
  let token = 0;

  function reset() {
    token++;
    if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
    box.hidden = true;
    noPrev.hidden = true;
    remove.hidden = !input.files?.length;
  }

  // Find the visible content of the logo (ignores transparent / white margins)
  function analyse(img) {
    const iw = img.naturalWidth || 600, ih = img.naturalHeight || 600;   // SVGs without a size
    const s = Math.min(1, 300 / Math.max(iw, ih));
    const w = Math.max(1, Math.round(iw * s));
    const h = Math.max(1, Math.round(ih * s));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(img, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h).data;
    let transparent = 0, minX = w, minY = h, maxX = -1, maxY = -1, lum = 0, n = 0;
    for (let i = 0, p = 0; i < d.length; i += 4, p++) {
      const a = d[i + 3];
      if (a < 250) transparent++;
      const l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      const ink = a > 30 && (a < 250 || l < 235);   // opaque near-white counts as background
      if (!ink) continue;
      const px = p % w, py = (p / w) | 0;
      if (px < minX) minX = px; if (px > maxX) maxX = px;
      if (py < minY) minY = py; if (py > maxY) maxY = py;
      lum += l; n++;
    }
    const hasAlpha = transparent > d.length / 4 * 0.02;
    if (maxX < 0) { minX = 0; minY = 0; maxX = w - 1; maxY = h - 1; }
    return {
      sx: minX / s, sy: minY / s,
      sw: (maxX - minX + 1) / s, sh: (maxY - minY + 1) / s,
      lightOnClear: hasAlpha && n > 0 && lum / n > 170,
    };
  }

  function draw(img) {
    const a = analyse(img);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(-VIEW.x, -VIEW.y);
    ctx.drawImage(cup, 0, 0);

    // Fit the logo into the print area (arc length × height)
    const scale = Math.min(CUP.maxArc / a.sw, CUP.maxH / a.sh);
    const arcW = a.sw * scale, h = a.sh * scale;
    const top = CUP.cy - h / 2;
    const r = CUP.halfW;

    ctx.save();
    ctx.globalCompositeOperation = a.lightOnClear ? 'source-over' : 'multiply';
    ctx.globalAlpha = 0.94;
    // Wrap around the cylinder: one 1px column at a time
    const half = Math.sin(Math.min(arcW / 2 / r, 1.4)) * r;
    for (let dx = -half; dx < half; dx += 1) {
      const arc = Math.asin(Math.max(-1, Math.min(1, dx / r))) * r;
      const u = (arc + arcW / 2) / arcW;
      if (u < 0 || u > 1) continue;
      const sx = a.sx + u * a.sw;
      // columns compress toward the edges, so sample a matching slice width
      const sliceW = Math.max(1, (a.sw / arcW) / Math.max(0.25, Math.cos(arc / r)));
      ctx.drawImage(img, sx, a.sy, sliceW, a.sh, CUP.cx + dx, top, 1.25, h);
    }
    ctx.restore();

    // Re-apply the cup's own light and shadow over the print
    ctx.save();
    ctx.globalCompositeOperation = 'multiply';
    const g = ctx.createLinearGradient(CUP.cx - r, 0, CUP.cx + r, 0);
    g.addColorStop(0,    'rgba(120,90,60,.55)');
    g.addColorStop(0.18, 'rgba(255,255,255,0)');
    g.addColorStop(0.75, 'rgba(255,255,255,0)');
    g.addColorStop(1,    'rgba(120,90,60,.45)');
    ctx.fillStyle = g;
    ctx.fillRect(CUP.cx - half - 2, top - 2, half * 2 + 4, h + 4);
    ctx.restore();
  }

  async function handle() {
    reset();
    const file = input.files?.[0];
    if (!file) return;
    remove.hidden = false;
    const isImage = /^image\/(png|jpe?g|svg\+xml|webp|gif)$/.test(file.type) || /\.(png|jpe?g|svg|webp)$/i.test(file.name);
    if (!isImage) { noPrev.hidden = false; return; }
    if (file.size > 10 * 1024 * 1024) return;   // the size error already explains this

    const my = ++token;
    objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.decoding = 'async';
    try {
      img.src = objectUrl;
      await img.decode();
      await cupReady;
      if (my !== token) return;
      draw(img);
      box.hidden = false;
    } catch {
      if (my === token) noPrev.hidden = false;
    }
  }

  input.addEventListener('change', handle);
  remove.addEventListener('click', () => {
    input.value = '';
    input.dispatchEvent(new Event('change'));
    const err = document.getElementById('f-file-error');
    if (err) { err.hidden = true; err.textContent = ''; }
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    input.focus();
  });
  form?.addEventListener('reset', () => setTimeout(handle, 0));
}

/* ──────────────────────────────────────────────────────
   11. CONTENT OVERRIDES (from the admin panel)
   Admin edits are stored server-side and served by /api/content.
   Fetched after the
   page renders with its hardcoded defaults, so a slow/offline fetch
   never blocks anything; it just means the defaults stand a little
   longer before any override swaps in.
────────────────────────────────────────────────────── */
async function loadContentOverrides() {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) return;
    const overrides = await res.json();
    if (overrides?.en && typeof overrides.en === 'object') Object.assign(T.en, overrides.en);
    if (overrides?.sq && typeof overrides.sq === 'object') Object.assign(T.sq, overrides.sq);
    applyLang(currentLang); // re-render now that overrides are merged in
  } catch {
    // No API (e.g. local static server) or offline — the hardcoded defaults stand.
  }
}

/* ──────────────────────────────────────────────────────
   12. BOOT
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
  initReveals();
  initHeroParallax();
  initLogoPreview();
  loadContentOverrides();
});
