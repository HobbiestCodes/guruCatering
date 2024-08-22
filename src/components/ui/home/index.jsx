import React from 'react'
import './styles.scss'
import {motion} from 'framer-motion';
import { FaAnglesDown } from "react-icons/fa6";

function HomeSection() {
  return (
    <div className='child'>
        <p className='scrollme'>scroll down <FaAnglesDown size={16}/></p>
        <div className="headers">
            <motion.p
            initial={{
                opacity: 0,
                y: -100
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.8,
                delay: 2,
            }}
            viewport={{once: true}}
            ><span>Guru</span> Catering</motion.p>
            <motion.h1
            initial={{
                opacity: 0,
                x: -50
            }}
            whileInView={{
                opacity: 1,
                x: 0
            }}
            transition={{
                duration: 0.8,
                delay: 2.2,
            }}
            viewport={{once: true}}
            >Welcome, <span>To</span></motion.h1>
            <motion.h2
            initial={{
                opacity: 0,
                x: 100
            }}
            whileInView={{
                opacity: 1,
                x: 0
            }}
            transition={{
                duration: 1,
                delay: 2.6,
            }}
            viewport={{once: true}}
            >The world of <span>delicious</span> taste!</motion.h2>
            <div className="buttons">
            <motion.button
            initial={{
                scale: 0
            }}
            whileInView={{
                scale: 1,
            }}
            transition={{
                duration: 0.2,
                delay: 2.8,
            }}
            viewport={{once: true}}
            className='outline'>Order today's special</motion.button>
            <motion.button
            initial={{
                scale: 0
            }}
            whileInView={{
                scale: 1,
            }}
            transition={{
                duration: 0.2,
                delay: 2.8,
            }}
            viewport={{once: true}}
            >Look into menu</motion.button>
            </div>
        </div>
    </div>
  )
}

export default HomeSection