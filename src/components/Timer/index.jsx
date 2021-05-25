import React, { Component, useState } from "react";
import Button from "../Button";
import Controls from "./Controls";
import TimerDisplay from "./TimerDisplay";
import style from './Timer.module.css';


function Timer(props){
  
  const msToTime = (duration = 0) => {
    const getCorrectTimeString = (v) => (v < 10 ? `0${v}` : v);
    const seconds = getCorrectTimeString(((duration / 1000) % 60).toFixed(3));
    const minutes = getCorrectTimeString(
      Math.trunc((duration / (1000 * 60)) % 60)
    );
    const hours = getCorrectTimeString(Math.trunc(duration / (1000 * 60 * 60)));
    return `${hours}:${minutes}:${seconds}`;
  };

  const tick = () => {
    if (!isRunning){
      return;
    } 
    setTimeout(tick, 10);
    setCurrentTime(msToTime(Date.now() - startTime));
  };

  const start = () => {
    console.log("Start");
    if (isRunning || startTime){
      return;
    } 
    setIsRunning(true);
    setStartTime(Date.now());
    setStartButton({
      caption: "Reset",
      isHidden: false,
      handler: reset
    });
    setPauseButton({
      caption: "Pause",
      isHidden: false,
      handler: pause,
    });
    setTimeout(tick, 10);
  };

  const pause = () => {
    console.log("Pause");
    setIsRunning(false);
    setDiff(Date.now() - startTime);
    setPauseButton({
      caption: "Resume",
      isHidden: false,
      handler: resume
    });
  };

  const reset = () => {
    console.log("Reset");
    setIsRunning(false);
    setCurrentTime(msToTime(0));
    setStartTime(null);
    setDiff(null);
    setStartButton({
      caption: "Start",
      isHidden: false,
      handler: start
    });
    setPauseButton({
      caption: "Pause",
      isHidden: true,
      handler: pause
    });
  };

  const resume = () => {
    console.log("Resume");
    setIsRunning(true);
    setStartTime(Date.now() - diff);
    setPauseButton({
      caption: "Pause",
      isHidden: false,
      handler: pause
    });
    setTimeout(tick, 10);
  };

  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [diff, setDiff] = useState(null);
  const [currentTime, setCurrentTime] = useState("00:00:00:000");
  const [startButton, setStartButton] = useState({
    caption: "Start",
    isHidden: false,
    handler: start
  });
  const [pauseButton, setPauseButton] = useState({
    caption: "Pause",
    isHidden: true,
    handler: pause
  });
  
  const { name = "Timer" } = props;
  return (
    <article className={style.container}>
      <h2>{name}</h2>
      <TimerDisplay currentTime={currentTime} />
      <Controls>
        <Button handler={startButton.handler} caption={startButton.caption} />
        {!pauseButton.isHidden && (
          <Button
            handler={pauseButton.handler}
            caption={pauseButton.caption}
          />
        )}
      </Controls>
    </article>
  );
}

export default Timer;

/*class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      startTime: null,
      diff: null,
      currentTime: "00:00:00.000",
      startButton: {
        caption: "Start",
        isHidden: false,
        handler: this.start,
      },
      pauseButton: {
        caption: "Pause",
        isHidden: true,
        handler: this.pause,
      },
    };
  }

  msToTime(duration = 0) {
    const getCorrectTimeString = (v) => (v < 10 ? `0${v}` : v);

    const seconds = getCorrectTimeString(((duration / 1000) % 60).toFixed(3));
    const minutes = getCorrectTimeString(
      Math.trunc((duration / (1000 * 60)) % 60)
    );
    const hours = getCorrectTimeString(Math.trunc(duration / (1000 * 60 * 60)));

    return `${hours}:${minutes}:${seconds}`;
  }
  tick = () => {
    const { isRunning, startTime } = this.state;
    if (!isRunning) return;
    setTimeout(this.tick, 10);
    this.setState({
      currentTime: this.msToTime(Date.now() - startTime),
    });
  };

  start = () => {
    const { isRunning, startTime } = this.state;
    if (isRunning || startTime) return;
    this.setState({
      isRunning: true,
      startTime: Date.now(),
      startButton: {
        caption: "Reset",
        isHidden: false,
        handler: this.reset,
      },
      pauseButton: {
        caption: "Pause",
        isHidden: false,
        handler: this.pause,
      },
    });
    setTimeout(this.tick, 10);
  };

  pause = () => {
    const { startTime } = this.state;
    this.setState({
      isRunning: false,
      diff: Date.now() - startTime,
      pauseButton: {
        caption: "Resume",
        isHidden: false,
        handler: this.resume,
      },
    });
  };

  reset = () => {
    this.setState({
      isRunning: false,
      currentTime: this.msToTime(0),
      startTime: null,
      diff: null,
      startButton: {
        caption: "Start",
        isHidden: false,
        handler: this.start,
      },
      pauseButton: {
        caption: "Pause",
        isHidden: true,
        handler: this.pause,
      },
    });
  };

  resume = () => {
    const { diff } = this.state;
    this.setState({
      isRunning: true,
      startTime: Date.now() - diff,
      pauseButton: {
        caption: "Pause",
        isHidden: false,
        handler: this.pause,
      },
    });
    setTimeout(this.tick, 10);
  };
  render() {
    const { name = "Timer" } = this.props;
    const { currentTime, startButton, pauseButton } = this.state;
    return (
      <article className={style.container}>
        <h2>{name}</h2>
        <TimerDisplay currentTime={currentTime} />
        <Controls>
          <Button handler={startButton.handler} caption={startButton.caption} />
          {!pauseButton.isHidden && (
            <Button
              handler={pauseButton.handler}
              caption={pauseButton.caption}
            />
          )}
        </Controls>
      </article>
    );
  }
}*/


