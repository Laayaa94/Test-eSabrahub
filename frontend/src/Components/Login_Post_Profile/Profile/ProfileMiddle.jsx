import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faMessage, faMapMarkerAlt, faTrash, faEdit, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../../Context/AuthContext';
import UpdatePost from '../../../Components/PostsPageCompo/UpdatePost/UpdatePost';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProfileMiddle = () => {
  const { authState } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPost, setEditPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState({});

  const fetchPosts = useCallback(async () => {
    if (!authState || !authState.user) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    const userId = authState.user._id;
    if (!userId) {
      setError('User ID is not available');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/posts/user/${userId}`);
      const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      // Initialize likedPosts state
      const initialLikedPosts = {};
      response.data.forEach(post => {
        initialLikedPosts[post._id] = post.likes.some(like => like.userId === authState.user._id); // Adjust user ID check as needed
      });
      setLikedPosts(initialLikedPosts);

      setPosts(sortedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authState]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleEditPost = async (updatedPost) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/posts/${updatedPost._id}`, updatedPost, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authState.token}`
        }
      });
      setPosts(prevPosts => prevPosts.map(post => (post._id === updatedPost._id ? response.data : post)));
      setEditPost(null);
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${authState.token}` }
      });
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleLike = async (postId) => {
    if (!postId) {
      console.error('Post ID is missing');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${authState.token}` }
      });
      const updatedPost = response.data;

      // Update the like status
      setLikedPosts(prevLikedPosts => ({
        ...prevLikedPosts,
        [postId]: !prevLikedPosts[postId]
      }));

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const openEditModal = (post) => {
    setEditPost(post);
  };

  const closeEditModal = () => {
    setEditPost(null);
  };

  const Post = ({ _id, postType, user, text, photos, videos, location, backgroundColor, likes, caption }) => {
    const userName = user?.username || 'Unknown User';
    const userProfile = user?.profileImage || 'https://via.placeholder.com/50';

    const likeCount = Array.isArray(likes) ? likes.length : likes;
    const isLiked = likedPosts[_id] || false;

    const renderMedia = () => (
      <>
        {photos.length === 1 ? (
          <img src={`http://localhost:5000/${photos[0]}`} alt="Post Media" className="media-image" />
        ) : (
          <div className="media-collage">
            {photos.map((item, index) => (
              <img key={index} src={`http://localhost:5000/${item}`} alt={`Post Media ${index}`} className="media-image" />
            ))}
          </div>
        )}
        {videos.map((video, index) => (
          <video key={index} controls className="media-video">
            <source src={`http://localhost:5000/${video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </>
    );

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
            </div>
          )}
          <div className="post-actions-icons-div">
            <FontAwesomeIcon icon={faEdit} className="edit-icon" onClick={() => openEditModal({ _id, text, location, postType, photos, videos, caption })} />
          </div>
          <div className="post-actions-icons-div">
            <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => handleDeletePost(_id)} />
          </div>
        </div>

        {postType === 'text' && (
          <div className="text-post" style={{ backgroundColor: backgroundColor || '#f0f0f0' }}>
            <p className="text-content">{text}</p>
          </div>
        )}

        {postType === 'media' && (
          <div className="media-gallery">
            <p className='post-content'>{caption}</p>
            {renderMedia()}
          </div>
        )}

        <div className="post-footer">
          <div className="post-actions">
            <div className="post-actions-icons-div" onClick={() => handleLike(_id)}>
              <FontAwesomeIcon icon={faHeart} className={`like-icon ${isLiked ? 'liked' : ''}`} />
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

  return (
    <div className="posts-container">
      <Modal
        isOpen={!!editPost}
        onRequestClose={closeEditModal}
        contentLabel="Edit Post Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeEditModal} className="close-modal-button">X</button>
        {editPost && (
          <UpdatePost
            post={editPost}
            onClose={closeEditModal}
            onSave={fetchPosts}
          />
        )}
      </Modal>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        posts.map(post => (
          <Post
            key={post._id}
            _id={post._id}
            postType={post.postType}
            user={post.user || {}}
            text={post.text}
            caption={post.caption}
            photos={post.photos || []}
            videos={post.videos || []}
            location={post.location || 'none'}
            backgroundColor={post.backgroundColor}
            likes={post.likes || []}
          />
        ))
      )}
    </div>
  );
};

export default ProfileMiddle
