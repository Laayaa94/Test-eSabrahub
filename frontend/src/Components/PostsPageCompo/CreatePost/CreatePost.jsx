import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faVideo, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';
import './CreatePost.css';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [location, setLocation] = useState('');
  const [captions, setCaptions] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff'); // Default background color
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [postType, setPostType] = useState('text'); // 'text' or 'media'

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
    setCaptions((prevCaptions) => [...prevCaptions, ...files.map(() => '')]);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideos((prevVideos) => [...prevVideos, ...files]);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCaptionChange = (index, e) => {
    const newCaptions = [...captions];
    newCaptions[index] = e.target.value;
    setCaptions(newCaptions);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  };

  const handleEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handlePostTypeChange = (type) => {
    setPostType(type);
    setText('');
    setPhotos([]);
    setVideos([]);
    setLocation('');
    setCaptions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log({
      text,
      photos,
      videos,
      location,
      captions,
      postType
    });
    // Reset form
    setText('');
    setPhotos([]);
    setVideos([]);
    setLocation('');
    setCaptions([]);
    setBackgroundColor('#ffffff'); // Reset background color
  };

  return (
    <div className="create-post">
      <div className="post-type-selector">
        <button
          className={`post-type-button ${postType === 'text' ? 'active' : ''}`}
          onClick={() => handlePostTypeChange('text')}
        >
          Text Post
        </button>
        <button
          className={`post-type-button ${postType === 'media' ? 'active' : ''}`}
          onClick={() => handlePostTypeChange('media')}
        >
          Media Post
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {postType === 'text' && (
          <>
            <div className="text-area-container" style={{ backgroundColor }}>
              <textarea
                placeholder="Write something..."
                value={text}
                onChange={handleTextChange}
                required
                style={{ backgroundColor }}
              />
            </div>

            <div className="background-colors">
              <button type="button" onClick={() => handleBackgroundColorChange('#ffffff')} style={{ backgroundColor: '#ffffff' }}></button>
              <button type="button" onClick={() => handleBackgroundColorChange('#ffebcd')} style={{ backgroundColor: '#ffebcd' }}></button>
              <button type="button" onClick={() => handleBackgroundColorChange('#add8e6')} style={{ backgroundColor: '#add8e6' }}></button>
              <button type="button" onClick={() => handleBackgroundColorChange('#98fb98')} style={{ backgroundColor: '#98fb98' }}></button>
              <button type="button" onClick={() => handleBackgroundColorChange('#ffe4e1')} style={{ backgroundColor: '#ffe4e1' }}></button>
            </div>

            <button type="button" className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😊
            </button>
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          </>
        )}

        {postType === 'media' && (
          <>
            <div className="media-buttons">
              <label className="media-button">
                <FontAwesomeIcon icon={faCamera} />
                <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
              </label>
              <label className="media-button">
                <FontAwesomeIcon icon={faVideo} />
                <input type="file" multiple accept="video/*" onChange={handleVideoChange} />
              </label>
              <label className="media-button">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={handleLocationChange}
                />
              </label>
            </div>

            {photos.map((photo, index) => (
              <div key={index} className="photo-preview">
                <img src={URL.createObjectURL(photo)} alt="Preview" />
                <input
                  type="text"
                  placeholder="Add a caption"
                  value={captions[index]}
                  onChange={(e) => handleCaptionChange(index, e)}
                />
              </div>
            ))}

            {videos.map((video, index) => (
              <div key={index} className="video-preview">
                <video controls>
                  <source src={URL.createObjectURL(video)} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </>
        )}

        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
