import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import p5Types from "p5";
import "./syl.scss";
// import { isConstructorDeclaration } from 'typescript';
import { ReactP5Wrapper } from "react-p5-wrapper";
import { Game_instance} from './game_flow_sketch';
// import { ContextSocket, socket } from './socket_setup/client-connect';
import { Websocket_render } from './components/render_game_sketch_components';
import { InfoBorad } from './info_board'
import randomLogo from '../addons/assets/logo.svg';
export default function Setup(){

	const animationStyle = `
		@keyframes rotate {
			50% { transform: rotate(360deg); }
		}`;


  return (
      <div style={{background: '#333C54', overflow: 'hidden',display: 'flex', justifyContent: 'flex-start',alignItems: 'flex-start'}} id="global_div">
      	<a href="/home" title="Home">
  		<style>{animationStyle}</style>
        	<img src={randomLogo} title={"Back To Home"} style={{ margin: '20px',width: '50px',height: '50px',animation: 'rotate 10s infinite'}}/>
      	</a>
      <Game_instance/>
      <InfoBorad/>
    </div>
  )

}


 /* <ContextSocket.Provider value={socket}>
      <Websocket_render/>
      </ContextSocket.Provider> */
    // </div>
  // <div id='Parent'>
  {/* <div id='canvas_renderer'> */}
    {/* <h1>DIV</h1> */}
    {/* <Game_instance/> */}
    {/* <div id = 'child_canvas'> */}
    {/* <ContextSocket.Provider value={socket}> */}
    {/* <Websocket_render/> */}
    {/* </ContextSocket.Provider>  */}
    {/* </div> */}