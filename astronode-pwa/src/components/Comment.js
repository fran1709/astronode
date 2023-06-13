import React, {useState} from 'react'
import './Comment.css';
import AddResponse from './AddResponse';

function Comment({ comment, onToggleResponses }) {
    const [showResponses, setShowResponses] = useState(false);
    const [showAddResponse, setShowAddResponse] = useState(false);
    const [liked, setLiked] = useState(false);
  
    const handleToggleResponses = () => {
      setShowResponses(!showResponses);
      onToggleResponses(comment.id); 
    };
  
    const handleLike = () => {
      setLiked(!liked);
    };

    const handleAddResponse = (response) => {
      console.log('New response:', response);
      comment.responses.push(response);
      console.log(comment.responses)
      setShowAddResponse(false);
    };
  
    return (
      <div className="comment-container">
      <div className="title">{comment.title}</div>
      <div className="user-container">
        <img className="user-picture" src={comment.userInfo.picture} alt="User" />
        <div className="user-info">
          <div className="user-name">{comment.userInfo.name}</div>
          <div className="comment-date">{comment.date}</div>
        </div>
      </div>
      <div className="comment">{comment.comment}</div>
      <div className="buttons">
        <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
          {liked ? '❤️' : '🤍'}
        </button>
        <button onClick={() => setShowAddResponse(!showAddResponse)} className="button">
          <span className="comment-symbol">&#9997;</span> Respond
        </button>
        {showAddResponse && (
          <div className="add-response-popup">
            <AddResponse parentComment={comment} onAddResponse={handleAddResponse} onClose={() => setShowAddResponse(false)} />
          </div>
        )}
        <button className="button" onClick={handleToggleResponses}>
          {showResponses ? 'Hide Responses' : 'Show Responses'}
        </button>
      </div>
    </div>
    );
}

export default Comment