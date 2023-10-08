import React from 'react'
import './errorPage.scss'
import "xp.css/dist/XP.css";
import ErrorIcon from './assets/error_icon.png'
import Draggable from 'react-draggable';
import { Navigate, useNavigate } from 'react-router-dom';


const ErrorPage = () => {

    const navigate = useNavigate();
    return (
        <div className="container">

        <Draggable>
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Error</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body">
                    <div className="windowBodyImg">
                        <img src={ErrorIcon} alt="Error Icon" width={65} height={60} />
                        <p>Error happend from our side</p>
                    </div>
                    <div className='ReportProgressBar'>
                        <p>Report is being sent to PixelPong team</p>
                        <div className="progressBar">
                        <progress></progress>
                    </div>
                </div>
                <div className="directionButtons">
                    <div className="homeButton">
                        <button onClick={() => navigate('/home')}>Home Page</button>
                    </div>
                    <div className="preButton">
                        <button onClick={() => navigate(-1)}>Previous Page</button>
                    </div>
                </div>
            </div>
        </div>
        </Draggable>
    </div>
  )
}

export default ErrorPage