import './errorPage.scss'
import "xp.css/dist/XP.css";
import ErrorIcon from './assets/error_icon.png'
import Draggable from 'react-draggable';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useRef } from 'react';


const ErrorPage = (props : {title: string , errorType: string, msg: string}) => {

    const navigate = useNavigate();
    const nodeRef = useRef(null)
    return (
        <div className="container">
        <Draggable nodeRef={nodeRef}>
        <div ref={nodeRef} className="window">
            <div className="title-bar">
                <div className="title-bar-text">{props.title}</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body">
                    <div className="windowBodyImg">
                        <img src={ErrorIcon} alt="Error Icon" width={65} height={60} />
                        <p>{props.errorType}</p>
                    </div>
                    <div className='ReportProgressBar'>
                        <p>{props.msg}</p>
                        <div className="progressBar">
                        <progress></progress>
                    </div>
                </div>
                <div className="directionButtons">
                    <div className="homeButton">
                    <Link to="/home">
                        <button>Home Page</button>
        			</Link>
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