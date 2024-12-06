import { getPostById } from "./dataStore.js";
export function handleComment(event, postId, commentsDiv) {
  event.preventDefault();

  const textarea = event.target.querySelector("textarea");
  const commentText = textarea.value.trim();

  if (commentText) {
    const post = getPostById(postId);
    if (post) {
      if (!post.comments) post.comments = [];
      post.comments.push(commentText);

      const newComment = document.createElement("p");
      newComment.textContent = commentText;
      newComment.classList.add("comment");
      commentsDiv.appendChild(newComment);

      textarea.value = "";
      console.log("Commentaire ajouté :", post.comments);
    } else {
      console.error(`Post avec ID ${postId} non trouvé.`);
    }
  } else {
    alert("Veuillez écrire un commentaire avant de publier.");
  }
}
