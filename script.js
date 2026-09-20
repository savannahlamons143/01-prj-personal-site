
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("research-modal");
  const openButton = document.querySelector("[data-open-research]");
  const closeButton = document.querySelector("[data-close-research]");

  if (!modal || !openButton || !closeButton) {
    return;
  }

  const panel = modal.querySelector(".research-modal-panel");

  let previousFocus = null;

  function openModal() {
    previousFocus = document.activeElement;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    closeButton.focus();
  }

  function closeModal() {
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (previousFocus) {
      previousFocus.focus();
    }
  }

  openButton.addEventListener("click", openModal);

  closeButton.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "Tab") {
      const focusableElements = [
        ...panel.querySelectorAll(
          'a[href], button:not([disabled]), ' +
          'input:not([disabled]), select:not([disabled]), ' +
          'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ].filter((element) => element.getClientRects().length > 0);

      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  });
});
