import { handleComment } from "./commentaires.js";
import { handleReaction } from "./reaction.js";
import { setPostsData, postsData } from "./dataStore.js";

// Chemin vers le fichier JSON
const jsonUrl = "./data/posts.json";

// Sélectionner le conteneur des posts
const feedContainer = document.getElementById("feed-container");

// Fonction pour charger les posts depuis le JSON
async function loadPosts() {
  try {
    const response = await fetch(jsonUrl);
    const data = await response.json(); // Récupérer les données depuis le JSON
    setPostsData(data); // Mettre à jour les données dans dataStore
    data.forEach((post) => {
      const postElement = createPostElement(post);
      feedContainer.appendChild(postElement);
    });
  } catch (error) {
    console.error("Erreur lors du chargement des posts :", error);
  }
}

// Fonction pour créer un élément DOM pour un post
function createPostElement(post) {
  // Créer l'élément conteneur du post
  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  // Ajouter le titre
  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title;

  // Ajouter l'auteur
  const postAuthor = document.createElement("p");
  postAuthor.classList.add("author");
  postAuthor.textContent = `Par ${post.author}`;

  // Ajouter le contenu
  const postContent = document.createElement("p");
  postContent.textContent = post.content;

  // Ajouter l'image si elle existe
  if (post.image) {
    const postImage = document.createElement("img");
    postImage.src = post.image;
    postImage.alt = post.title;
    postDiv.appendChild(postImage);
  }

  const reactionsDiv = document.createElement("div");
  reactionsDiv.classList.add("reactions");

  // Boutons de réaction
  ["Like", "Dislike", "Love"].forEach((reaction) => {
    const button = document.createElement("button");
    button.textContent = `${reaction} (${post.reactions?.[reaction] || 0})`; // Afficher le compteur
    button.classList.add("reaction-button");
    button.addEventListener("click", () => {
      handleReaction(post.id, reaction, button);

      // Mettre à jour l'affichage du compteur après la réaction
      button.textContent = `${reaction} (${post.reactions[reaction]})`;
    });
    reactionsDiv.appendChild(button);
  });

  // Ajouter une section pour les commentaires
  const commentsDiv = document.createElement("div");
  commentsDiv.classList.add("comments");

  if (post.comments && post.comments.length > 0) {
    post.comments.forEach((comment) => {
      const commentElement = document.createElement("p");
      commentElement.textContent = comment;
      commentElement.classList.add("comment");
      commentsDiv.appendChild(commentElement);
    });
  }

  // Formulaire pour ajouter un nouveau commentaire
  const commentForm = document.createElement("form");
  commentForm.innerHTML = `
    <textarea placeholder="Écrire un commentaire..."></textarea>
    <button type="submit">Publier</button>
  `;
  commentForm.addEventListener("submit", (e) =>
    handleComment(e, post.id, commentsDiv, postsData)
  );

  // Ajouter les éléments au conteneur du post
  postDiv.appendChild(postTitle);
  postDiv.appendChild(postAuthor);
  postDiv.appendChild(postContent);
  postDiv.appendChild(reactionsDiv);
  commentsDiv.appendChild(commentForm);
  postDiv.appendChild(commentsDiv);

  return postDiv;
}

// Charger les posts au chargement de la page
window.addEventListener("DOMContentLoaded", loadPosts);
