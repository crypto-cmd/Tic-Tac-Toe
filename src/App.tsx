import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Button from "./components/Button";
function App() {
    const [restart, setRestart] = useState(false);
    return (
        <div id="app">
            <Board shouldRestart={restart} />
            <Button
                text="Restart"
                onClick={() => {
                    setRestart(!restart);
                }}
            />
        </div>
    );
}

export default App;
