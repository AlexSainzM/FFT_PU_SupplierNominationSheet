/**
 * FFT México - Static Form Template
 * Template Version: 1.1.0
 *
 * TEMPLATE CORE — protected reusable infrastructure.
 * FORM-SPECIFIC CONTENT — implemented in the FORM-SPECIFIC LOGIC section below.
 * TEMPLATE CONFIGURATION lives in index.html, not here.
 */

// ======================================================
// TEMPLATE CORE — DO NOT MODIFY FOR INDIVIDUAL FORMS
// ======================================================

document.addEventListener('DOMContentLoaded', () => {
  initializeTooltips();
  initializeNominationSubmission();
  initializeDynamicYear();
});

/**
 * Initializes every Bootstrap tooltip declared in the document.
 * The guard keeps the template usable if the CDN is unavailable.
 */
function initializeTooltips() {
  if (!window.bootstrap?.Tooltip) {
    return;
  }

  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((trigger) => {
    new window.bootstrap.Tooltip(trigger);
  });
}

/**
 * Keeps the copyright year current without manual maintenance.
 */
function initializeDynamicYear() {
  const yearElement = document.getElementById('currentYear');

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

// ======================================================
// FORM-SPECIFIC LOGIC  (FORM-SPECIFIC CONTENT)

function initializeNominationSubmission() {
  const form = document.getElementById('mainForm');
  const submitButton = form.querySelector('[type="submit"]');
  const status = document.getElementById('submissionStatus');
  const thanksUrl = new URL(form.elements.namedItem('_next').value, document.baseURI);
  form.elements.namedItem('_next').value = thanksUrl.href;

  // Native constraint validation runs before the submit event.
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitButton.disabled) return;

    submitButton.disabled = true;
    status.textContent = 'Enviando evaluación…';
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission rejected');
      const result = await response.json();
      if (result.errors || result.ok === false) throw new Error('Submission rejected');
      window.location.assign(thanksUrl.href);
    } catch {
      status.textContent = 'No se pudo confirmar el envío. Tus respuestas siguen aquí. Verifica la conexión y vuelve a enviar la evaluación.';
      submitButton.disabled = false;
    }
  });

  window.addEventListener('pageshow', () => {
    submitButton.disabled = false;
    status.textContent = '';
  });
}
