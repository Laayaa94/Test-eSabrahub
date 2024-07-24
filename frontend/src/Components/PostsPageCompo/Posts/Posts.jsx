import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShareAlt, faMapMarkerAlt, faUserPlus, faMessage } from '@fortawesome/free-solid-svg-icons';
import './Posts.css';

const Post = ({ type, userProfile, userName, caption, media, location, timeAgo }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={userProfile} alt="User Profile" className="user-profile" />
        <div className="user-info">
          <span className="user-name">{userName}</span>
        </div>

        <div className="post-location">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="location-icon" />
        <span className="location-name">{location}</span>
        <FontAwesomeIcon icon={faUserPlus} className="follow-icon" />

      </div>
      </div>
     
      {type === 'text' && (
        <>
          
          <div className="text-post" style={{ backgroundColor: '#f0f0f0' }}>
            <p className="text-content">This is a text post with a background color.</p>
          </div>
        </>
      )}
      {type === 'media' && (
        <>
          <div className="media-gallery">
            <p className='post-content'>Caption for media</p>
            {media.length === 1 ? (
              <img src={media[0]} alt="Post Media" className="media-image" />
            ) : (
              <div className="media-collage">

                {media.map((item, index) => (
                  <img key={index} src={item} alt={`Post Media ${index}`} className="media-image" />
                ))}
              </div>
            )}
          </div>
        </>
      )}
      <div className="post-footer">
        <div className="post-actions">
          <div className="post-actions-icons-div">
          <FontAwesomeIcon icon={faHeart} className="like-icon" />
          <span className="likes-count">14 Likes</span>
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

const Posts = () => {
  // Sample data for demonstration
  const samplePosts = [
    {
      type: 'text',
      userProfile: 'https://via.placeholder.com/50',
      userName: 'John Doe',
      caption: 'This is a text post caption.',
      location: 'New York',
      timeAgo: '5 minutes ago'
    },
    {
      type: 'media',
      userProfile: 'https://via.placeholder.com/50',
      userName: 'Jane Smith',
      caption: 'This is a text post caption.',
      media: [
        'https://via.placeholder.com/200',
        'https://via.placeholder.com/200',
        'https://via.placeholder.com/200'
      ],
      location: 'Los Angeles',
      timeAgo: '10 minutes ago'
    }
  ];

  return (
    <div className="posts-container">
      {samplePosts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
};

export default Posts;
