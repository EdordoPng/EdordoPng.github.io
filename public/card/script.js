/**
 * ED CARD — DIGITAL BUSINESS CARD CONTROLLER
 * Zero-dependency JS for 3D Flip, Fullscreen QR Modal, Native Web Share, CV Selector Modal & Clipboard Fallbacks.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCardFlip();
  initQrModal();
  initCvModal();
  initMainShareAction();
  initShareFallbackModal();
  initServiceWorker();
});

/**
 * Service Worker Registration (Scoped to ./ or /card/)
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js', { scope: './' })
        .catch(() => {
          // Silent error handling for non-secure contexts or unsupported environments
        });
    });
  }
}

/**
 * 1. 3D Card Flip Controller
 * Manages accessibility attributes (aria-pressed, aria-label).
 */
function initCardFlip() {
  const cardBtn = document.getElementById('card-flip-btn');

  if (!cardBtn) return;

  function toggleFlip() {
    const isPressed = cardBtn.getAttribute('aria-pressed') === 'true';
    const nextState = !isPressed;

    cardBtn.setAttribute('aria-pressed', nextState ? 'true' : 'false');

    if (nextState) {
      cardBtn.setAttribute(
        'aria-label',
        'Biglietto da visita di Edoardo Diana. Faccia attuale: Retro. Seleziona per mostrare il fronte.'
      );
    } else {
      cardBtn.setAttribute(
        'aria-label',
        'Biglietto da visita di Edoardo Diana. Faccia attuale: Fronte. Seleziona per mostrare il retro.'
      );
    }
  }

  cardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleFlip();
  });
}

/**
 * Helper: Modal Stacking Protection
 * Closes all open modals before opening a new one.
 */
function closeAllModals() {
  const modals = document.querySelectorAll('.qr-modal');
  modals.forEach((m) => {
    m.setAttribute('hidden', '');
  });
  document.body.classList.remove('is-modal-open');
}

/**
 * 2. Fullscreen QR Modal Manager
 */
function initQrModal() {
  const openBtn = document.getElementById('action-qr-btn');
  const modal = document.getElementById('qr-modal');
  const backdrop = document.getElementById('qr-modal-backdrop');
  const closeBtn = document.getElementById('qr-close-btn');

  if (!openBtn || !modal || !closeBtn) return;

  function openModal() {
    closeAllModals();
    modal.removeAttribute('hidden');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-modal-open');
    closeBtn.focus();
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', handleKeyDown);
    openBtn.focus();
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeModal();
      return;
    }

    // Focus trap inside modal
    if (event.key === 'Tab') {
      const focusables = modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
}

/**
 * 3. CV Selector Modal Manager
 */
function initCvModal() {
  const openBtn = document.getElementById('action-cv-btn');
  const modal = document.getElementById('cv-modal');
  const backdrop = document.getElementById('cv-modal-backdrop');
  const closeBtn = document.getElementById('cv-close-btn');

  if (!openBtn || !modal || !closeBtn) return;

  function openModal() {
    closeAllModals();
    modal.removeAttribute('hidden');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-modal-open');
    closeBtn.focus();
    document.addEventListener('keydown', handleKeyDown);
  }

  function closeModal() {
    modal.setAttribute('hidden', '');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', handleKeyDown);
    openBtn.focus();
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      closeModal();
      return;
    }

    // Focus trap inside modal
    if (event.key === 'Tab') {
      const focusables = modal.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }
  }

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  // Bind Share buttons inside CV modal
  const cvShareBtns = modal.querySelectorAll('.cv-btn-share');
  cvShareBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-cv-title') || 'Edoardo Diana — CV';
      const text = btn.getAttribute('data-cv-text') || 'CV — Edoardo Diana';
      const url = btn.getAttribute('data-cv-url');
      const toastMsg = btn.getAttribute('data-cv-toast') || 'CV link copied';

      if (url) {
        shareUrl({ title, text, url, toastMsg });
      }
    });
  });
}

/**
 * 4. Main Share Action Controller
 */
function initMainShareAction() {
  const shareBtn = document.getElementById('action-share-btn');
  const mainShareUrl = 'https://edordopng.github.io/connect/';

  if (!shareBtn) return;

  shareBtn.addEventListener('click', () => {
    shareUrl({
      title: 'Edoardo Diana',
      text: 'Edoardo Diana — Blockchain, AI, Cybersecurity',
      url: mainShareUrl,
      toastMsg: 'Link copied',
    });
  });
}

/**
 * Reusable Share Logic Helper
 * Handles Web Share API, AbortError handling, Clipboard fallback & Share Modal fallback.
 */
function shareUrl({ title, text, url, toastMsg }) {
  if (navigator.share) {
    navigator
      .share({ title, text, url })
      .catch((err) => {
        // Ignore AbortError when user cancels share dialog
        if (err && err.name === 'AbortError') {
          return;
        }
        // Fallback to clipboard on error
        executeClipboardFallback(url, toastMsg);
      });
  } else {
    executeClipboardFallback(url, toastMsg);
  }
}

/**
 * Clipboard Fallback Helper & Toast Notification Trigger
 */
function executeClipboardFallback(textToCopy, toastMsg = 'Link copied') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        showToast(toastMsg);
      })
      .catch(() => {
        openShareFallbackModal(textToCopy);
      });
  } else {
    openShareFallbackModal(textToCopy);
  }
}

/**
 * Toast Notification Manager
 */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;

  toast.querySelector('span').textContent = message;
  toast.removeAttribute('hidden');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.setAttribute('hidden', '');
  }, 2500);
}

/**
 * 5. Share Fallback Modal Manager (Fallback Branch 2)
 */
function openShareFallbackModal(textToDisplay) {
  closeAllModals();
  const modal = document.getElementById('share-modal');
  if (!modal) return;

  modal.removeAttribute('hidden');
  document.body.classList.add('is-modal-open');
  const input = modal.querySelector('#share-url-input');
  if (input) {
    if (textToDisplay) input.value = textToDisplay;
    input.focus();
    input.select();
  }
}

function initShareFallbackModal() {
  const modal = document.getElementById('share-modal');
  const backdrop = document.getElementById('share-modal-backdrop');
  const closeBtn = document.getElementById('share-close-btn');

  if (!modal || !closeBtn) return;

  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.classList.remove('is-modal-open');
  }

  closeBtn.addEventListener('click', closeModal);
  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }
}
