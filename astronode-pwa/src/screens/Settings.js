import React, {useState} from 'react'
import './Stack.css'
import AddComment from '../components/AddComment';
import Comment from '../components/Comment'
import './Settings.css'

const Settings = () => {

  const [comments, setComments] = useState([]);

  const handleNewComment = (comment) => {
    console.log('New comment:', comment);
    setComments([...comments, comment]);
  };

  return (
    <div>
      <div className='header'>
        <img className='logo' src={require('../media/appLogoS.png')} alt="LogoS" />
      </div>
      <div className='input-container'>
      <AddComment onAddComment={handleNewComment}/>
      {comments.map((comment) => (
        <Comment key={comment.title} comment={comment} />
      ))}
      </div>
    </div>
    
  );
  
};

export default Settings