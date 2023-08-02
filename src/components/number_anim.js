import {useState} from "react";

import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";

export const NumberAnim = ({num}) => {
    const [number, setNumber] = useState(0);
    setTimeout(() => {
        setNumber(num);
    });
    return (
        <>
            <AnimatedNumber
                value={number}
                hasComma={false}
                size={100}
                duration={1500}
            />
        </>
    );
};