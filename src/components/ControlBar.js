import React from "react";

export default class ControlBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hour: 0,
            min: 0,
            sec: 0,
        };
    }
    tick(timeState) {
        timeState.sec++;
        if (timeState.sec === 60) {
            timeState.sec = 0;
            timeState.min++;
        }
        if (timeState.min === 60) {
            timeState.min = 0;
            timeState.hour++;
        }
        return timeState;
    }
    startClock() {
        this.timer = setInterval(() => {
            this.setState((prevState) => this.tick(prevState));
        }, 1000);
    }
    stopClock() {
        clearInterval(this.timer);
    }
    componentDidMount() {
        this.startClock();
    }
    componentWillUnmount() {
        this.stopClock();
    }
    resetClock() {
        this.setState({
            hour: 0,
            min: 0,
            sec: 0,
        });
        this.stopClock();
        this.startClock();
    }
    padZero(number) {
        return ("0" + number).slice(-2);
    }

    render() {
        let btn =
            "bg-sky-600 text-white w-24 rounded p-1 text-bold text-center mx-1 cursor-pointer";
        return (
            <div className="flex m-2 items-center">
                <img
                    src="./logo192.png"
                    className="w-[32px] rounded mr-3"
                    alt="minesweeper logo"
                />
                <span className="flex items-center">
                    <span
                        className={btn}
                        onClick={() => this.props.onRestart()}
                    >
                        Restart
                    </span>
                    {!this.props.hidePause && (
                        <span
                            className={btn}
                            onClick={() => this.props.onPause()}
                        >
                            Pause
                        </span>
                    )}
                </span>

                <img
                    src="./images/bomb.png"
                    className="w-[30px] ml-2"
                    alt="bomb"
                ></img>
                <span className="text-2xl ml-1">{this.props.bombs}</span>
                <img
                    src="./images/stopwatch.png"
                    className="w-[30px] ml-2"
                    alt="stopwatch"
                ></img>
                <span className="text-2xl ml-1">
                    {this.padZero(this.state.hour)}:
                    {this.padZero(this.state.min)}:
                    {this.padZero(this.state.sec)}
                </span>
            </div>
        );
    }
}
