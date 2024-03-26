let blogPost = window.location.pathname.split("/");

// function to edit blog post from blog post page
const editPost = async (event) => {
  event.preventDefault();
  console.log("clicked me");

  const comment_body = document.getElementById("editBtn").value.trim();

  console.log(blogPost);

  document.location.assign(`/create/${blogPost[2]}`);
};

const editButton = document.querySelectorAll("#editBtn");

// Iterates over all buttons on the page allowing for edit functionality
for (let i = 0; i < editButton.length; i++) {
  editButton[i].addEventListener("click", editPost);
}