const loadCommentBtnElement = document.getElementById("load-comments-btn");
const commentSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");

const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
        <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
        </article>`;

    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentForPost() {
  const postId = loadCommentBtnElement.dataset.postid;

  try {
    const response = await fetch(`/posts/${postId.trim()}/comments`);

    if (!response.ok) {
      alert("Fetching comments failed!");
      return;
    }
    const responseData = await response.json();

    if (responseData && responseData.length > 0) {
      const commentListElement = createCommentList(responseData);
      commentSectionElement.innerHTML = "";
      commentSectionElement.appendChild(commentListElement);
    } else {
      commentSectionElement.firstElementChild.textContent =
        "We could not find any comment, Maybe add one!";
    }
  } catch (error) {
    alert("Getting Comments Failed!");
  }
}

async function saveComment(event) {
  event.preventDefault();
  const postId = commentsFormElement.dataset.postid;

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;

  const comment = { title: enteredTitle, text: enteredText };

  try {
    const response = await fetch(`/posts/${postId.trim()}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // for status(500),handle the error
      fetchCommentForPost();
    } else {
      alert("Error Message");
    }
  } catch (error) {
    alert("could not send request - maybe try again later!");
  }
}

loadCommentBtnElement.addEventListener("click", fetchCommentForPost);
commentsFormElement.addEventListener("submit", saveComment);
