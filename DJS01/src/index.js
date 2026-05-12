import { podcasts } from "./data.js";
import { createModal } from "./components/createModal.js";
import { createGrid } from "./views/createGrid.js";

/**
 * Initializes the application, sets up event listeners, and renders the grid.
 */
function init() {
  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) {
    // Setup the click event to close the modal
    closeBtn.addEventListener("click", () => createModal.close());
  }

  // Initialize the grid component and render the podcast data
  const grid = createGrid();
  grid.render(podcasts);
}

init();