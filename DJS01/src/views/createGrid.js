import { GenreService } from "../GenreService.js";
import { DateUtils } from "../DataUtils.js";
import { createModal } from "../components/createModal.js";

/**
 * Component for creating and managing the podcast grid display.
 */
export const createGrid = () => {
  const container = document.getElementById("podcast-grid");

  return {
    render(podcasts) {
      if (!container) return;
      container.innerHTML = ""; // Clear grid before rendering

      podcasts.forEach((show) => {
        const card = document.createElement("div");
        card.className = "podcast-card";
        
        const genres = GenreService.getNames(show.genres).join(", ");
        
        // Build the card HTML structure
        card.innerHTML = `
          <img src="${show.image}" alt="${show.title}">
          <h3>${show.title}</h3>
          <p>${show.seasons} Seasons</p>
          <p class="genres">${genres}</p>
          <small>${DateUtils.format(show.updated)}</small>
        `;

        // Click event to view specific podcast details
        card.addEventListener("click", () => createModal.open(show));
        container.appendChild(card);
      });
    },
  };
};