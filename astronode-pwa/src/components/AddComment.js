import {useState} from 'react';
import './AddComment.css';
import { useUser } from '../UserProvider';

const AddComment = ({ onAddComment }) => {
    const [showInputs, setShowInputs] = useState(false);
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [responses, setResponses] = useState([]);
    const { userInfo} = useUser();
    const currentDate = new Date();
    const date = currentDate.toLocaleString(); 

  
    const handleAddComment = () => {
      if (title.trim() !== '' && comment.trim() !== '') {
        onAddComment({ title, comment, userInfo, date, responses });
        setTitle('');
        setComment('');
        setShowInputs(false);
        setResponses([]);
      }
    };
  
    return (
        
          <div className="textbox-container">
            <div className="textbox-header">
              <h1 className='header-text'>Start a new conversation</h1>
              <button onClick={() => setShowInputs(!showInputs)} className="add-button">
                +
              </button>
            </div>
            {showInputs && (
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-text"
                />
                <textarea
                  placeholder="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="input-text"
                ></textarea>
                <button onClick={handleAddComment} className="submit-button">
                  Submit
                </button>
              </div>
            )}
           
          </div>
        
      );
};

export default AddComment;
