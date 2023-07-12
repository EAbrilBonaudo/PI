import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
    const history = useHistory();

    const handleEnterClick = () => {
        history.push('/home');
    };

    return (
        <div>
            <img src='https://www.chiquipedia.com/images/fondos-pantalla-videojuegos-mario-800.jpg?phpMyAdmin=9ea091c51a5aa3cf876fb3cf0a5f7f3d' alt='Background'/>
            <button onClick={handleEnterClick}>Ingresar a la página de inicio</button>
        </div>
    );
};

export default LandingPage;