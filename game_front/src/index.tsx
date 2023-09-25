import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import p5Types from "p5";
import { isConstructorDeclaration } from 'typescript';
import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from './game_flow_sketch';
import { ContextSocket, socket } from './socket_setup/client-connect';
import { Websocket_render } from './components/render_game_sketch_components';

function Setup(){
  return (
      <ContextSocket.Provider value={socket}>
      <Websocket_render/>
    </ContextSocket.Provider> 
  )
}

ReactDOM.createRoot(document.getElementById('big_root')!).render(
  <React.StrictMode>
    <Setup/>
  </React.StrictMode>,
)
