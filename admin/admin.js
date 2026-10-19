/* ═══════════════════════════════════════════════════════
   gotte.eco — admin panel
   Password-gated editor for site text (EN/SQ).
═══════════════════════════════════════════════════════ */

'use strict';

// Every editable key from js/main.js's T.en/T.sq dictionary, grouped for
// a usable UI. Keep this in sync when keys are added/removed there —
// this file only needs the KEYS, not the copy, so it rarely needs touching.
// (The "ticker" key is a small array of {icon,text} objects, not a plain
// string, and isn't editable here yet.)
const FIELD_GROUPS = [
  {
    title: 'Navigation',
    keys: ['nav_home', 'nav_about', 'nav_products', 'nav_contact'],
  },
  {
    title: 'Hero',
    keys: ['hero_sub', 'hero_title', 'hero_body', 'hero_cta1', 'hero_cta2', 'hero_family'],
  },
  {
    title: 'About',
    keys: [
      'about_label', 'about_title', 'about_p1', 'about_p2',
      'badge1', 'badge2', 'badge3', 'badge4',
      'stat1_label', 'stat2_label', 'stat3_label',
    ],
  },
  {
    title: 'Clients strip',
    keys: ['clients_label', 'clients_aria'],
  },
  {
    title: 'Products',
    keys: [
      'prod_label', 'prod_title', 'bestseller',
      'p1_name', 'p1_desc', 'p1_long',
      'p2_name', 'p2_desc', 'p2_long',
      'p3_name', 'p3_desc', 'p3_long',
      'p4_name', 'p4_desc', 'p4_long',
      'spec_capacity', 'spec_build', 'spec_single', 'spec_dims', 'spec_paper',
      'spec_print', 'spec_print_val', 'spec_lining', 'spec_lining_val',
      'modal_sizes_aria',
    ],
  },
  {
    title: 'Contact & quote form',
    keys: [
      'ct_label', 'ct_title', 'ct_det_title', 'ct_address', 'ct_hours',
      'form_title', 'form_name', 'form_email', 'form_msg', 'form_btn',
      'err_name', 'err_email', 'err_msg', 'sent_err',
      'quote_product_label', 'quote_product_any',
      'quote_product_1', 'quote_product_2', 'quote_product_3', 'quote_product_4',
      'quote_qty_label', 'quote_qty_placeholder',
      'quote_file_label', 'quote_file_hint', 'quote_file_err_size',
      'quote_file_remove', 'preview_note', 'preview_aria', 'preview_unavailable',
      'form_success_title', 'form_success_body', 'form_success_again',
      'catalog_cta', 'modal_quote_cta',
    ],
  },
  {
    title: 'Footer',
    keys: ['footer_copy', 'footer_privacy', 'footer_back'],
  },
  {
    title: 'Privacy policy',
    keys: [
      'privacy_label', 'privacy_title', 'privacy_updated', 'privacy_intro',
      'privacy_collect_title', 'privacy_collect_body',
      'privacy_use_title', 'privacy_use_body',
      'privacy_thirdparty_title', 'privacy_thirdparty_body',
      'privacy_retention_title', 'privacy_retention_body',
      'privacy_rights_title', 'privacy_rights_body',
      'privacy_contact_title', 'privacy_contact_body',
    ],
  },
];

// Keys long enough to deserve a textarea instead of a single-line input.
const TEXTAREA_KEYS = new Set([
  'hero_body', 'about_p1', 'about_p2', 'ct_address',
  'p1_long', 'p2_long', 'p3_long', 'p4_long',
  'form_success_body',
  'privacy_intro', 'privacy_collect_body', 'privacy_use_body',
  'privacy_thirdparty_body', 'privacy_retention_body',
  'privacy_rights_body',
]);

function prettyLabel(key) {
  const productMatch = key.match(/^p([1-4])_(name|desc|long)$/);
  if (productMatch) {
    const n = productMatch[1];
    const field = { name: 'Name', desc: 'Short description', long: 'Full description' }[productMatch[2]];
    return `Product ${n} — ${field}`;
  }
  return key.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

// ── DOM refs ──────────────────────────────────────────
const loginView     = document.getElementById('login-view');
const dashboardView = document.getElementById('dashboard-view');
const loginForm     = document.getElementById('login-form');
const loginError    = document.getElementById('login-error');
const logoutBtn     = document.getElementById('logout-btn');
const tabButtons    = document.querySelectorAll('.admin-tab');
const tabPanels     = document.querySelectorAll('.admin-panel');
const contentForm   = document.getElementById('content-form');
const contentStatus = document.getElementById('content-status');
const contentSaveBtn = document.getElementById('content-save-btn');

let currentVersion = 0;
let contentLoaded = false;

function show(view) {
  loginView.hidden = view !== 'login';
  dashboardView.hidden = view !== 'dashboard';
}

async function checkSession() {
  try {
    const res = await fetch('/api/admin/session');
    const json = await res.json();
    show(json.authenticated ? 'dashboard' : 'login');
  } catch {
    show('login');
  }
}

loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  loginError.hidden = true;
  const password = document.getElementById('login-password').value;
  const submitBtn = loginForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      loginForm.reset();
      show('dashboard');
    } else {
      const json = await res.json().catch(() => ({}));
      loginError.textContent = json.error || 'Incorrect password.';
      loginError.hidden = false;
    }
  } catch {
    loginError.textContent = 'Could not reach the server. Please try again.';
    loginError.hidden = false;
  } finally {
    submitBtn.disabled = false;
  }
});

logoutBtn.addEventListener('click', async () => {
  await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
  show('login');
});

// ── Tabs ──────────────────────────────────────────────
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.toggle('active', b === btn));
    tabPanels.forEach(p => p.hidden = p.id !== `panel-${btn.dataset.tab}`);
    if (btn.dataset.tab === 'content' && !contentLoaded) loadContent();
  });
});

// ── Content editor ────────────────────────────────────
function buildContentForm(data) {
  contentForm.innerHTML = '';
  FIELD_GROUPS.forEach(group => {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'admin-group';
    const legend = document.createElement('legend');
    legend.textContent = group.title;
    fieldset.appendChild(legend);

    group.keys.forEach(key => {
      const row = document.createElement('div');
      row.className = 'admin-field-row';

      const label = document.createElement('label');
      label.className = 'admin-field-label';
      label.textContent = prettyLabel(key);
      row.appendChild(label);

      const pair = document.createElement('div');
      pair.className = 'admin-field-pair';

      ['en', 'sq'].forEach(lang => {
        const wrap = document.createElement('div');
        wrap.className = 'admin-field-lang';

        const tag = document.createElement('span');
        tag.className = 'admin-field-lang-tag';
        tag.textContent = lang.toUpperCase();
        wrap.appendChild(tag);

        const value = (data[lang] && data[lang][key]) || '';
        const useTextarea = TEXTAREA_KEYS.has(key);
        const input = document.createElement(useTextarea ? 'textarea' : 'input');
        if (!useTextarea) input.type = 'text';
        else input.rows = 3;
        input.className = 'admin-field-input';
        input.dataset.lang = lang;
        input.dataset.key = key;
        input.value = value;
        input.placeholder = 'Using default copy — type here to override';
        wrap.appendChild(input);

        pair.appendChild(wrap);
      });

      row.appendChild(pair);
      fieldset.appendChild(row);
    });

    contentForm.appendChild(fieldset);
  });
}

async function loadContent() {
  contentStatus.textContent = 'Loading…';
  contentStatus.className = 'admin-status';
  try {
    const res = await fetch('/api/admin/content');
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Failed to load content');
    const json = await res.json();
    currentVersion = json.version;
    buildContentForm(json.data || { en: {}, sq: {} });
    contentLoaded = true;
    contentStatus.textContent = '';
  } catch (err) {
    contentStatus.textContent = err.message;
    contentStatus.className = 'admin-status admin-status-error';
  }
}

contentForm?.addEventListener('submit', async e => {
  e.preventDefault();
  contentSaveBtn.disabled = true;
  contentStatus.textContent = 'Saving…';
  contentStatus.className = 'admin-status';

  const data = { en: {}, sq: {} };
  contentForm.querySelectorAll('.admin-field-input').forEach(input => {
    const value = input.value.trim();
    if (value) data[input.dataset.lang][input.dataset.key] = value;
  });

  try {
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, version: currentVersion }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Save failed');
    currentVersion = json.version;
    contentStatus.textContent = 'Saved — live on the site within a few seconds.';
    contentStatus.className = 'admin-status admin-status-success';
  } catch (err) {
    contentStatus.textContent = err.message;
    contentStatus.className = 'admin-status admin-status-error';
  } finally {
    contentSaveBtn.disabled = false;
  }
});

checkSession();
