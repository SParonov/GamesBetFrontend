"use client";
import BackButton from "@/components/BackButton";
import getHighScore from "@/utils/getHighScore";
import updateGameData from "@/utils/updateGameData";
import useCheckSession from "@/utils/useCheckSession";
import styled from "@emotion/styled";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface BackgroundProps {
  height: number;
  width: number;
}

interface ObjProps {
  height: number;
  width: number;
  left: number;
  top: number;
  deg: number;
}

interface BirdProps {
  height: number;
  width: number;
  top: number;
  left: number;
}

const BIRD_HEIGHT = 28;
const BIRD_WIDTH = 33;
const WALL_HEIGHT = 600;
const WALL_WIDTH = 400;
const GRAVITY = 4;
const OBJ_WIDTH = 52;
const OBJ_SPEED = 6;
const OBJ_GAP = 200;


export default function FlappyBird() {
  const [isStart, setIsStart] = useState(false);
  const [birdpos, setBirspos] = useState(300);
  const [objHeight, setObjHeight] = useState(0);
  const [objPos, setObjPos] = useState(WALL_WIDTH);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useCheckSession(isStart);

  useEffect(() => {
    let intVal: NodeJS.Timeout;
    if (isStart && birdpos < WALL_HEIGHT - BIRD_HEIGHT) {
      intVal = setInterval(() => {
        setBirspos((birdpos) => birdpos + GRAVITY);
      }, 24);
    }
    return () => clearInterval(intVal);
  });

  useEffect(() => {
    getHighScore(setHighScore, 'game3');
  }, [])

  useEffect(() => {
    if(isStart == true) return;
    updateGameData("game3", score, highScore);
  }, [isStart])

  useEffect(() => {
    let objval: NodeJS.Timeout;
    if (isStart && objPos >= -OBJ_WIDTH) {
      objval = setInterval(() => {
        setObjPos((objPos) => objPos - OBJ_SPEED);
      }, 24);

      return () => {
        clearInterval(objval);
      };
    } else {
      setObjPos(WALL_WIDTH);
      setObjHeight(Math.floor(Math.random() * (WALL_HEIGHT - OBJ_GAP)));
      if (isStart) {
        setScore((score) => score + 1);
        if (score + 1 > highScore) {
          setHighScore(score + 1);
        }
      }
    }
  }, [isStart, objPos, score, highScore]);

  useEffect(() => {
    let topObj = birdpos >= 0 && birdpos < objHeight;
    let bottomObj =
      birdpos <= WALL_HEIGHT &&
      birdpos >=
        WALL_HEIGHT - (WALL_HEIGHT - OBJ_GAP - objHeight) - BIRD_HEIGHT;

    if (
      objPos >= OBJ_WIDTH &&
      objPos <= OBJ_WIDTH + 80 &&
      (topObj || bottomObj)
    ) {
      setBirspos(300);
      setIsStart(false);
    }
  }, [isStart, birdpos, objHeight, objPos]);

  const clickHandler = () => {
    if (!isStart) {
      setIsStart(true);
      setScore(0);
    } else if (birdpos < BIRD_HEIGHT) {
      setBirspos(0); 
    } else {
      setBirspos((birdpos) => birdpos - 100); 
    }
  };

  return <div style={{background: "linear-gradient(135deg, #00bcd4, #9c27b0)", height: '100vh'}}>
    <BackButton />
    <Typography style={{display: 'flex', justifyContent: 'center', fontSize: 60, color: 'white'}}>FLAPPY BIRD</Typography>
    <div style={{display: 'flex', justifyContent: 'center',position: 'fixed', left: 0, top: "15%", right: 0}}>
      <Typography component="span" style={{fontSize: 20, color: 'white', marginRight: 200}}>Coins: {score}</Typography>
      <Typography component="span" style={{fontSize: 20, color: 'white'}}>Highscore: {highScore}</Typography>
    </div>
    <div onClick={clickHandler} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "85%"}}>
      <Background height={WALL_HEIGHT} width={WALL_WIDTH} style={{borderStyle: 'solid', borderColor: 'white', borderWidth: 2}}>
        {!isStart ? <Button onClick={clickHandler} style = {{position: 'relative', top: '20%', color: 'white', width: '50%', marginLeft: '25%'}} variant="contained" color="secondary">Click To Start</Button> : null}
        <Obj
          height={objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={0}
          deg={180}
        />
        <Bird
          height={BIRD_HEIGHT}
          width={BIRD_WIDTH}
          top={birdpos}
          left={100}
        />
        <Obj
          height={WALL_HEIGHT - OBJ_GAP - objHeight}
          width={OBJ_WIDTH}
          left={objPos}
          top={WALL_HEIGHT - (objHeight + (WALL_HEIGHT - OBJ_GAP - objHeight))}
          deg={0}
        />
      </Background>
    </div>
  </div>
}

const Background = styled.div<BackgroundProps>`
  background-image: url("/img/flappy_bird/background-day.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  position: relative;
  overflow: hidden;
  border: 2px solid black;
`;

const Bird = styled.div<BirdProps>`
  position: absolute;
  background-image: url("/img/flappy_bird/yellowbird-upflap.png");
  background-repeat: no-repeat;
  background-size: ${(props) => props.width}px ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

const Obj = styled.div<ObjProps>`
  position: relative;
  background-image: url("/img/flappy_bird/pipe-green.png");
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  transform: rotate(${(props) => props.deg}deg);
`;

