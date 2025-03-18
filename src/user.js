import React, { useState, useEffect } from "react";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("id") || "");

  // Fetch posts based on userId
  const fetchPosts = async (id) => {
    if (!id) return;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
    const postsData = await response.json();
    setPosts(postsData);
  };

  // Handle the change in the search input
  const handleSearchChange = (event) => {
    const id = event.target.value;
    setUserId(id);
  };

  // Fetch posts whenever the userId changes
  useEffect(() => {
    fetchPosts(userId);
  }, [userId]);

  // Render a single post
  const renderPost = (post) => (
    <div className="post" key={post.id}>
      <div className="post__title">{post.title}</div>
      <p className="post__body">{post.body}</p>
    </div>
  );

  return (
    <div>
      <input
        type="text"
        value={userId}
        onChange={handleSearchChange}
        placeholder="Search by User ID"
      />

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => renderPost(post))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
