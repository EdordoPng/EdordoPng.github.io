/**
 * Connect Page JavaScript
 * Handles Fullscreen QR Modal and Internal CV Selection Navigation.
 * Built for speed, zero dependencies, complete accessibility, and 60fps native History API routing.
 */

document.addEventListener('DOMContentLoaded', () => {
  initQrModal();
  initCvNavigation();
});

/**
 * Internal CV Selection Navigation Manager (Synchronized Dual-View Horizontal Page Navigation)
 */
function initCvNavigation() {
  const mainView = document.getElementById('main-view');
  const cvView = document.getElementById('cv-view');
  const openBtn = document.getElementById('cv-open-btn');
  const backBtn = document.getElementById('cv-back-btn');

  if (!mainView || !cvView || !openBtn || !backBtn) return;

  // Keep cvView permanently mounted in DOM for GPU layer translation
  cvView.removeAttribute('hidden');

  let isTransitioning = false;

  function openCvView() {
    if (isTransitioning) return;
    isTransitioning = true;

    requestAnimationFrame(() => {
      // Single synchronized state change: Main translates LEFT (-100vw), CV translates IN (0)
      document.body.classList.add('is-cv-open');
      cvView.removeAttribute('aria-hidden');
      mainView.setAttribute('aria-hidden', 'true');

      const handleOpenEnd = (e) => {
        if (e.target === cvView && e.propertyName === 'transform') {
          cvView.removeEventListener('transitionend', handleOpenEnd);
          backBtn.focus({ preventScroll: true });
          isTransitioning = false;
        }
      };
      cvView.addEventListener('transitionend', handleOpenEnd);
    });
  }

  function closeCvView() {
    if (isTransitioning) return;
    isTransitioning = true;

    requestAnimationFrame(() => {
      // Single synchronized state change: Main translates IN from LEFT (0), CV translates OUT to RIGHT (+100vw)
      document.body.classList.remove('is-cv-open');
      cvView.setAttribute('aria-hidden', 'true');
      mainView.removeAttribute('aria-hidden');

      const handleCloseEnd = (e) => {
        if (e.target === cvView && e.propertyName === 'transform') {
          cvView.removeEventListener('transitionend', handleCloseEnd);
          openBtn.focus({ preventScroll: true });
          isTransitioning = false;
        }
      };
      cvView.addEventListener('transitionend', handleCloseEnd);
    });
  }

  // Tap CV on Main Screen -> Push state #cv & slide in
  openBtn.addEventListener('click', () => {
    if (window.location.hash !== '#cv') {
      history.pushState({ view: 'cv' }, '', '#cv');
    }
    openCvView();
  });

  // Tap Visual Back Button -> history.back() if pushed, or fallback to main view
  backBtn.addEventListener('click', () => {
    if (history.state && history.state.view === 'cv') {
      history.back();
    } else if (window.location.hash === '#cv') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
      closeCvView();
    } else {
      closeCvView();
    }
  });

  // Native History popstate listener (handles browser back, mobile swipe back)
  window.addEventListener('popstate', () => {
    if (window.location.hash === '#cv') {
      openCvView();
    } else {
      closeCvView();
    }
  });

  // Initial Direct Load Check (e.g. /connect/#cv)
  if (window.location.hash === '#cv') {
    document.body.classList.add('is-cv-open');
    cvView.removeAttribute('aria-hidden');
    mainView.setAttribute('aria-hidden', 'true');
    backBtn.focus({ preventScroll: true });
  }
}

/**
 * Fullscreen QR Modal Manager
 * Manages modal visibility, background body scroll lock, focus trap, and Escape key listeners.
 */
function initQrModal() {
  const openBtn = document.getElementById('qr-open-btn');
  const modal = document.getElementById('qr-modal');
  const backdrop = document.getElementById('qr-modal-backdrop');
  const closeBtn = document.getElementById('qr-close-btn');

  if (!openBtn || !modal || !closeBtn) return;

  function openModal() {
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
      const focusables = modal.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
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
