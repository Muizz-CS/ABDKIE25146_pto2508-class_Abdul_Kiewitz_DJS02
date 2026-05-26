import { GenreService } from "../GenreService.js";
import { DateUtils } from "../DataUtils.js";

export class PodcastPreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["id", "title", "image", "seasons", "genres", "updated"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this._handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._handleClick);
  }

  _handleClick = () => {
    const podcastData = {
      id: this.getAttribute("id"),
      title: this.getAttribute("title"),
      image: this.getAttribute("image"),
      seasons: this.getAttribute("seasons"),
      genres: this.getAttribute("genres") ? this.getAttribute("genres").split(",") : [],
      updated: this.getAttribute("updated")
    };

    this.dispatchEvent(
      new CustomEvent("podcast-select", {
        detail: podcastData,
        bubbles: true,
        composed: true
      })
    );
  };

  render() {
    const title = this.getAttribute("title") || "Unknown Podcast";
    const image = this.getAttribute("image") || "https://via.placeholder.com/150";
    const seasons = this.getAttribute("seasons") || "0";
    const updatedRaw = this.getAttribute("updated");
    
    const rawGenres = this.getAttribute("genres");
    const genreIds = rawGenres ? rawGenres.split(",").map(id => id.trim()) : [];
    const genresFormatted = GenreService.getNames ? GenreService.getNames(genreIds).join(", ") : "";

    const dateFormatted = (DateUtils.format && updatedRaw) ? DateUtils.format(updatedRaw) : updatedRaw || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          transition: transform 0.2s ease-in-out;
          cursor: pointer;
        }

        :host(:hover) {
          transform: translateY(-5px);
        }

        img {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
        }

        h3 {
          padding: 1rem 1rem 0.5rem;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1e293b;
        }

        p, small {
          padding: 0 1rem 1rem;
          display: block;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #1e293b;
        }

        .genres {
          color: #475569;
          font-size: 0.9rem;
          padding-bottom: 0.5rem;
        }

        small {
          color: #64748b;
          font-size: 0.8rem;
        }
      </style>

      <img src="${image}" alt="${title}">
      <h3>${title}</h3>
      <p>${seasons} Seasons</p>
      <p class="genres">${genresFormatted}</p>
      <small>${dateFormatted}</small>
    `;
  }
}

customElements.define("podcast-preview", PodcastPreview);