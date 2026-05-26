Registration
---------------------
To use the custom <podcast-preview> tag, import the component JavaScript file into your main file (like index.js). This registers the new tag with the browser.

import './components/PodcastPreview.js';
---------------------

Passing Data
---------------------
The component is stateless, meaning it doesn't fetch or store data. It simply displays whatever data its parent component passes down to it. You can pass data in two ways:

1. Directly in HTML
You can write the tag right into your HTML file and pass data through standard attributes:

<podcast-preview 
  id="12345"
  title="The Dev Tech Podcast" 
  image="https://example.com/cover.jpg" 
  seasons="3" 
  genres="1,4,7" 
  updated="2026-05-20T14:30:00.000Z">
</podcast-preview>

2. Dynamically with JavaScript
If you are looping through an array of data or an API response, you can create the element and set its attributes dynamically:

const card = document.createElement('podcast-preview');

card.setAttribute('id', show.id);
card.setAttribute('title', show.title);
card.setAttribute('image', show.image);
card.setAttribute('seasons', show.seasons);
card.setAttribute('genres', show.genres.join(','));
card.setAttribute('updated', show.updated);

document.getElementById('podcast-grid').appendChild(card);
---------------------

Handling Interaction Events
---------------------
To keep the component reusable, it does not open modals or change pages on its own. Instead, when a user clicks on the card, it triggers a custom DOM event named podcast-select.

Because this event has bubbles: true and composed: true turned on, it can pass through the Shadow DOM wall. You can set up an event listener on the parent container to catch this event and open your modal:

document.getElementById('podcast-grid').addEventListener('podcast-select', (event) => {
  const { id, title, image, seasons, genres, updated } = event.detail;
  
  console.log('User clicked podcast ID:', id);
  console.log('Podcast details:', event.detail);
});