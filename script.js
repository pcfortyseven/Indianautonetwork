document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('commentForm');
    const postsContainer = document.getElementById('posts-container');

    // Load posts on page load
    loadPosts();

    commentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = "New Post";  // You can customize this
        const author = "Anonymous";  // You can customize this
        const content = document.getElementById('comment').value;

        if (content.trim() !== '') {
            createPost({ title, author, content });
        }

        // Clear the form
        commentForm.reset();
    });

    async function loadPosts() {
        const response = await fetch('/api/posts');
        const posts = await response.json();

        // Display posts on the page
        displayPosts(posts);
    }

    async function createPost(postData) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        const newPost = await response.json();

        // Add the new post to the UI
        displayPost(newPost);
    }

    function displayPosts(posts) {
        postsContainer.innerHTML = '';
        posts.forEach(post => displayPost(post));
    }

    function displayPost(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p><strong>${post.author}</strong></p>
            <p>${post.content}</p>
            <p>${new Date(post.timestamp).toLocaleString()}</p>
            <hr>
        `;

        postsContainer.appendChild(postDiv);
    }
});
