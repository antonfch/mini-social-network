// Chemin vers le fichier JSON
const jsonUrl = "./data/posts.json";

// Sélectionner le conteneur des posts
const feedContainer = document.getElementById("feed-container");

// Fonction pour charger les posts depuis le JSON
async function loadPosts() {
  try {
    const response = await fetch(jsonUrl);
    const posts = await response.json();

    // Parcourir chaque post et l'afficher
    posts.forEach((post) => {
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

  // Ajouter les éléments au conteneur du post
  postDiv.appendChild(postTitle);
  postDiv.appendChild(postAuthor);
  postDiv.appendChild(postContent);

  return postDiv;
}

// Charger les posts au chargement de la page
window.addEventListener("DOMContentLoaded", loadPosts);
