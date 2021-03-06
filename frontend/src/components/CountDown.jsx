import React, {useEffect, useState} from "react";
import '../docs/styles/root.css';
import '../docs/styles/drop.css';
import '../docs/styles/button.css';
import '../docs/styles/hero.css';
import '../docs/styles/countdown.css';

export default function CountDown({drop, headline}) {

    const [theDrop, setTheDrop] = React.useState(drop)

    const [dropped, setDropped] = useState(false);

    const countDownDate = new Date(theDrop.dropDate).getTime();

    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    useEffect(() => {
        //TODO this solution does not hide the countdown when the transition happens live
        if (countDownDate - new Date().getTime() < 0) {
            setDropped(true)
        } else {
            setDropped(false)
        }
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
        }, 1000);
        return () => clearInterval(interval);

    }, [theDrop]);

    useEffect(() => {
        setTheDrop(drop)
    }, [drop])

    function setColor() {
        switch (theDrop.rarity) {
            case "Common":
                return "#0de79a"
            case "Uncommon":
                return "#10c7f5"
            case "Rare":
                return "#f38a35"
            case "Epic":
                return "#8717e7"
            case "Legendary":
                return "#f3c22c"
            default:
                console.log("Unknown rarity " + theDrop.rarity)
        }
    }

    return (
        <div>
            {!dropped ?
                <div className="drop-header">
                    <h1>{headline}</h1>
                </div>
                : null}
            <div className="container-countdown">
                <div>
                    {theDrop.asset ?
                        <a href={`/drop/${theDrop.dropID}`}> <img alt={theDrop.name} className="drop"
                                                                  src={theDrop.asset} style={{color: setColor()}}/></a>
                        : <></>
                    }

                </div>
                {
                    theDrop.asset ? <div>
                        <h2>{theDrop.name}</h2>
                        <h1>Drops In</h1>
                    </div> : <></>
                }
                {!dropped ?
                    <div id="countdown">
                        <ul>
                            <li><span id="days"> {days.toString()}</span>days</li>
                            <li><span id="hours"> {hours.toString()}</span>Hours</li>
                            <li><span id="minutes"> {minutes.toString()}</span>Minutes</li>
                            <li><span id="seconds"> {seconds.toString()}</span>Seconds</li>
                        </ul>
                    </div> : null}
            </div>
        </div>
    );
}