// function to delete blog post from blog post page
const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log("clicked me");
    console.log(event.target);
  
    let blogPost = window.location.pathname.split("/");
    console.log(blogPost);
  
    const response = await fetch(`/api/blogPost/${blogPost[2]}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.assign(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  };
  
  const deleteButton = document.querySelectorAll("#deleteBtn");
  
  // loop through all delete buttons on the page to enable delete functionality
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", deletePostHandler);
  }