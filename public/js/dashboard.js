// function to delete a blog post
const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log("clicked me");
    console.log(event.target);
  
    let blogPostId = event.target.getAttribute("data-id");
    console.log(blogPostId);
  
    const response = await fetch(`/api/blogPost/${blogPostId}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.assign(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  };
  
  // Function to edit blog posts
  const editBlogPost = async (event) => {
    event.preventDefault();
    console.log("clicked me");
  
    let blogPostId = event.target.getAttribute("data-id");
  
    document.location.assign(`/create/${blogPostId}`);
  };
  
  const editButton = document.querySelectorAll("#editBtn");
  
  // Iterates over all buttons on the page and allows for edit functionality
  for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener("click", editBlogPost);
  }
  
  const deleteButton = document.querySelectorAll("#deleteBtn");
  
  // Iterates over all buttons on the page and allows for delete functionality
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePostHandler);
  }