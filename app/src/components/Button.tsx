import React from "react";
import "./Button.scss";
interface ButtonProps {
    onClick: () => void;
    text: string;
}
const Button = ({ onClick, text }: ButtonProps) => {
    return (
        <a className="btn" onClick={onClick}>
            {text}
        </a>
    );
};
export default Button;
