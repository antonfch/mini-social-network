import { getPostById } from "./dataStore.js";

export function handleReaction(postId, reaction, button) {
  console.log("ID du post:", postId);
  const post = getPostById(postId);

  if (post) {
    // Initialiser le compteur des réactions si nécessaire
    if (!post.reactions) {
      post.reactions = { Like: 0, Dislike: 0, Love: 0 };
    }

    // Incrémenter la réaction choisie
    post.reactions[reaction] += 1;

    // Afficher les données mises à jour dans la console (optionnel)
    console.log(
      `Réactions mises à jour pour le post ${postId}:`,
      post.reactions
    );

    // Ajouter une animation visuelle (optionnel)
    createParticleEffect(button, reaction);
  } else {
    console.error(`Post avec ID ${postId} non trouvé.`);
  }
}

// Animation de particules (optionnelle)
function createParticleEffect(button, reaction) {
  const particles = document.createElement("div");
  particles.classList.add("particles", reaction.toLowerCase());

  // Positionner les particules sur le bouton
  const rect = button.getBoundingClientRect();
  particles.style.left = `${rect.left + rect.width / 2}px`;
  particles.style.top = `${rect.top + rect.height / 2}px`;

  document.body.appendChild(particles);

  // Animation avec un délai pour retirer les particules
  setTimeout(() => {
    particles.remove();
  }, 1000);
}
