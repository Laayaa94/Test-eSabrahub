import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faMessage, faMapMarkerAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import './Posts.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedPosts, setLikedPosts] = useState({}); // Track liked posts

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (!postId) {
      console.error('Post ID is missing');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`);
      setLikedPosts(prevLikedPosts => {
        const newLikedPosts = { ...prevLikedPosts };
        newLikedPosts[postId] = !newLikedPosts[postId];

        const updatedPosts = posts.map(post => 
          post._id === postId ? {
            ...post,
            likes: response.data.likes // Ensure this is an array or number
          } : post
        );

        setPosts(updatedPosts);
        return newLikedPosts;
      });
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const Post = ({ _id, postType, user, text, photos, location, backgroundColor, likes }) => {
    const userName = user?.username || 'Unknown User';
    const userProfile = user?.profilePicture || 'https://via.placeholder.com/50';
    
    const likeCount = Array.isArray(likes) ? likes.length : likes; // Ensure likes is a number for rendering

    return (
      <div className="post">
        <div className="post-header">
          <img src={userProfile} alt="User Profile" className="user-profile" />
          <div className="user-info">
            <span className="user-name">{userName}</span>
          </div>
          {location && (
            <div className="post-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
              <span className="location-name">{location}</span>
              <FontAwesomeIcon icon={faUserPlus} className="follow-icon" />
            </div>
          )}
        </div>

        {postType === 'text' && (
          <div className="text-post" style={{ backgroundColor: backgroundColor || '#f0f0f0' }}>
            <p className="text-content">{text}</p>
          </div>
        )}

        {postType === 'media' && (
          <div className="media-gallery">
            <p className='post-content'>{text}</p>
            {photos.length === 1 ? (
              <img src={`http://localhost:5000/${photos[0]}`} alt="Post Media" className="media-image" />
            ) : (
              <div className="media-collage">
                {photos.map((item, index) => (
                  <img key={index} src={`http://localhost:5000/${item}`} alt={`Post Media ${index}`} className="media-image" />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="post-footer">
          <div className="post-actions">
            <div className="post-actions-icons-div" onClick={() => handleLike(_id)}>
              <FontAwesomeIcon icon={faHeart} className="like-icon" />
              <span className="likes-count">{likeCount} Likes</span>
            </div>
            <div className="post-actions-icons-div">
              <FontAwesomeIcon icon={faComment} className="comment-icon" />
              <span className="comments-count">15 Comments</span>
            </div>
            <div className="post-actions-icons-div">
              <FontAwesomeIcon icon={faMessage} className="share-icon" />
              <span className="likes-count">Chat</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post
          key={post._id}
          _id={post._id}
          postType={post.postType}
          user={post.user || {}}
          text={post.text}
          photos={post.photos || []}
          location={post.location || 'none'}
          backgroundColor={post.backgroundColor}
          likes={post.likes || 0} // Ensure likes is a number or array
        />
      ))}
    </div>
  );
};

export default Posts;
