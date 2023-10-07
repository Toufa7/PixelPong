import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import p5Types from "p5";
import "./syl.scss";
import { isConstructorDeclaration } from 'typescript';
import { ReactP5Wrapper } from "react-p5-wrapper";
import { Game_instance} from './game_flow_sketch';
// import { ContextSocket, socket } from './socket_setup/client-connect';
import { Websocket_render } from './components/render_game_sketch_components';

function Setup(){
  return (
    <div id='Parent'>
    <div id='canvas_renderer'>
      <h1>DIV</h1>
      {/* <Game_instance/> */}
      {/* <div id = 'child_canvas'> */}
      {/* <ContextSocket.Provider value={socket}> */}
      {/* <Websocket_render/> */}
      {/* </ContextSocket.Provider>  */}
      {/* </div> */}
    </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Setup/>
  </React.StrictMode>,
)
