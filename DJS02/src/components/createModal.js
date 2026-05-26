import { GenreService } from "../GenreService.js";
import { DateUtils } from "../DataUtils.js";
import { seasons } from "../data.js";

/**
 * Component for managing the modal UI and its detailed podcast content.
 */
export const createModal = {
  open(show) {
    const modal = document.getElementById("modal");
    const content = document.getElementById("modal-body");

    // Retrieve season data associated with this specific podcast
    const showSeasons = seasons.find(s => s.id === show.id);
    const seasonEntries = showSeasons ? showSeasons.seasonDetails : [];

    // Map genre IDs to pill-style tags
    const genres = GenreService.getNames(show.genres)
      .map(g => `<span class="tag">${g}</span>`).join("");

    // Inject structured content into the modal body
    content.innerHTML = `
      <div class="modal-header">
        <img src="${show.image}" alt="${show.title}" class="modal-large-img">
        <div class="modal-header-text">
          <h2>${show.title}</h2>
          
          <p><strong>Description</strong></p>
          <p class="description">${show.description}</p>
          
          <p><strong>Genres</strong></p>
          <div class="genre-tags">${genres}</div>
          
          <p class="last-updated">
            <span>📅</span> ${DateUtils.format(show.updated)}
          </p>
        </div>
      </div>

      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 2rem 0;">

      <h3>Seasons</h3>
      <div class="seasons-list">
        ${seasonEntries.map(s => `
          <div class="season-item">
            <div class="season-info">
              <h4>${s.title}</h4>
              <p>Introduction to the fundamentals</p> 
            </div>
            <div class="episode-count">${s.episodes} episodes</div>
          </div>
        `).join("")}
      </div>
    `;

    modal.classList.add("active");
  },

  close() {
    document.getElementById("modal").classList.remove("active");
  }
};