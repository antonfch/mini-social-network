export let postsData = [];

// Fonction pour mettre à jour postsData
export function setPostsData(data) {
  postsData = data;
}

// Fonction pour obtenir un post par son ID
export function getPostById(postId) {
  return postsData.find((post) => post.id === postId);
}
