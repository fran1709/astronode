import React, {useState} from 'react'
import './Stack.css'
import AddComment from '../components/AddComment';
import Comment from '../components/Comment'
import './Settings.css'
import { API } from '../Api_Astronode';

const Settings = () => {

  const [comments, setComments] = useState([]);
  const [showResponseMap, setShowResponseMap] = useState({});
  
  // Función para obtener los datos y actualizar el comments
  async function obtenerDatos() {
    try {
      const response = await API.get('/astroApi/coments');
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Llamada inicial para obtener los datos
  obtenerDatos();
    
  const handleNewComment = (comment) => {
    console.log('New comment:', comment);
    API.post('/astroApi/coments', comment); // se envia a la API el comentario con toda su info inicial.
    //console.log(arrayData);
    //setComments([...comments, comment]);
  };

  const handleToggleResponses = (commentId) => {
    setShowResponseMap((prevMap) => ({
      ...prevMap,
      [commentId]: !prevMap[commentId],
    }));
  };

  return (
    <div className="scroll-container">
      <div className="header">
        <img className="logo" src={require("../media/appLogoS.png")} alt="LogoS" />
      </div>
      <div className="input-container">
        <AddComment onAddComment={handleNewComment} />
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment
              comment={comment}
              onToggleResponses={handleToggleResponses}
            />
            {showResponseMap[comment.id] && (
              <>
                {comment.responses.map((response) => (
                  <Comment key={response.id} comment={response} onToggleResponses={handleToggleResponses} /> 
                ))}
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
    
  );
  
};

export default Settings