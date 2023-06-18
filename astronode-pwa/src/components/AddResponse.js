import { useState } from 'react';
import './AddComment.css';
import { useUser } from '../UserProvider';

const AddResponse = ({ parentComment, onAddResponse, onClose }) => {
  const [comment, setComment] = useState('');
  const { userInfo } = useUser();
  const currentDate = new Date();
  const date = currentDate.toLocaleString();


  const handleAddResponse = () => {
    if (comment.trim() !== '') {
      const response = {
        title: `${parentComment.responses.length + 1}: Re: ${parentComment.title}`,
        comment,
        userInfo,
        date,
        id: `${parentComment.id}`
      };
      onAddResponse(response);
      setComment('');
      onClose();
    }
  };

  return (
    <div className="textbox-container">
      <div className="textbox-header">
        <h1 className="header-text">Responding to @{parentComment.userInfo.name}</h1>
        <button className="close-btn" onClick={onClose}>
            X
        </button>
      </div>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder={`Title: Responding to ${parentComment.title}`}
          value={`${parentComment.responses.length + 1}: Re: ${parentComment.title}`}
          disabled
          className="input-text"
        />
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="input-text"
        ></textarea>
        <button onClick={handleAddResponse} className="submit-button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddResponse;
