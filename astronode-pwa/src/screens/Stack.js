import React, {useState, useEffect} from 'react'
import './Stack.css'
import { API } from '../Api_Astronode';

const Stack = () => {
    const [apod, setApod] = useState([]);

    async function obtenerDatos() {
        try {
          const response = await API.get('/astroApi/pod');
          setApod(response.data);
        } catch (error) {
          console.log(error);
        }
    }
    
    // Llamada cosntante para obtener los datos
    useEffect(() => {
    obtenerDatos();
    }, [])

    if (!apod) {
    return <div>Loading...</div>;
    }

    let mediaElement;
    //console.log(apod.date);
    const date = new Date(apod.date + 'T00:00:00');
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    if (apod.media_type === 'image') {
        mediaElement = (
            <div className='media-wrapper'>
                <img src={apod.url} alt="APOD" className='media-element' />
                <div className='explanation-text'>
                    <h1>{apod.title}</h1>
                    <p>{apod.explanation}</p>
                </div>
            </div>
        );
    } else if (apod.media_type === 'video') {
        mediaElement = (
            <div className='media-wrapper'>
            <iframe
                src={apod.url}
                title="APOD Video"
                allowFullScreen
            ></iframe>
            <div className='explanation-text'>
                <h1>{apod.title}</h1>
                <p>{apod.explanation}</p>
            </div>
            </div>
        );
    }

    return (
        <div className='scroll-container'>
            <div className='header'>
                <img className='logo' src={require('../media/appLogoS.png')} alt="LogoS" />
            </div>
            <div className="input-container">
                <h1 style={{marginTop: '10px'}}>Astronomy Picture of the Day</h1>
                <p>{formattedDate}</p>
                {mediaElement}
            </div>   
        </div>
    );
};

export default Stack