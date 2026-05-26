import { createModal } from "../components/createModal.js";
import "../components/PodcastPreview.js";

export const createGrid = () => {
  const container = document.getElementById("podcast-grid");

  return {
    render(podcasts) {
      if (!container) return;
      container.innerHTML = ""; 

      podcasts.forEach((show) => {
        const card = document.createElement("podcast-preview");
        
        card.setAttribute("id", show.id);
        card.setAttribute("title", show.title);
        card.setAttribute("image", show.image);
        card.setAttribute("seasons", show.seasons);
        card.setAttribute("genres", show.genres.join(","));
        card.setAttribute("updated", show.updated);

        card.addEventListener("podcast-select", (event) => {
          const selectedPodcast = event.detail;
          selectedPodcast.description = show.description;
          createModal.open(selectedPodcast);
        });

        container.appendChild(card);
      });
    },
  };
};