import React from 'react'
import {Canvas} from "@react-three/fiber"
import {Model} from "./../render/Model";
import { Scroll, ScrollControls } from '@react-three/drei';
import CameraAnimation from './AnimatedCam';
import Home from '../pages/Home';

function Render() {
  return (
<div style={{width: "100vw", height: "100vh"}}>

    <Canvas>
        <ScrollControls pages={2} damping={1}>
            <CameraAnimation />
        <Model />
        <Scroll html>
            <div style={{width: '100vw', height: '100vh'}}>
                {/* <Navbar /> */}
                <Home />
            </div>
        
            <div style={{width: '100vw', height: '100vh'}}>
                
            </div>
        </Scroll>
        </ScrollControls>
    </Canvas>
</div>
  )
}

export default Render