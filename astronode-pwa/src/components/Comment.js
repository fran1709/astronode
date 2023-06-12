import React, {useState} from 'react'
import './Comment.css'

function Comment({ comment }) {
    const [showResponses, setShowResponses] = useState(false);
    const [liked, setLiked] = useState(false);
  
    const handleToggleResponses = () => {
      setShowResponses(!showResponses);
    };
  
    const handleLike = () => {
      setLiked(!liked);
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
          <button className="button" onClick={handleToggleResponses}>{showResponses ? 'Hide Responses' : 'Show Responses'}</button>
          <button className="button" onClick={handleLike}>{liked ? 'Unlike' : 'Like'}</button>
        </div>
      </div>
    );
}

export default Comment