import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import p5Types from "p5";
import "./index.scss";
import { isConstructorDeclaration } from 'typescript';
import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from './game_flow_sketch';
import { ContextSocket, socket } from './socket_setup/client-connect';
import { Websocket_render } from './components/render_game_sketch_components';

function Setup(){
  return (
    <div className='canvas_renderer'>
      <div id = 'child_canvas'>
      <ContextSocket.Provider value={socket}>
      <Websocket_render/>
      </ContextSocket.Provider> 
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Setup/>
  </React.StrictMode>,
)
