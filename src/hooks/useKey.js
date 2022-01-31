import { useState, useEffect } from "react";

const useKey = (callback) => {
  const [keyPressed, setKeyPressed] = useState();

  useEffect(() => {
    //creating a function for the "keydown" event listener
    const keyDownHandler = (e) => {
      const { key, keyCode } = e;

      //prevents a key to be pressed repetitively
      if (e.repeat) {
        return false;
      }

      //prevents number key press
      if ((keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 107)) {
        e.preventDefault();
        return false;
      }

	  if(key === "Enter"){
		  e.preventDefault();
	  }

      //prevents number codes and checks if the backspace is pressed
      if (key.length === 1 || key === "Backspace") {
        setKeyPressed(key);
        callback && callback(key);
      }

      //prevents the spacebar from scrolling the page
      if (key === " " && e.target === document.body) {
        e.preventDefault();
      }
    };

    const keyUpHandler = () => {
      //sets the key pressed to null
      setKeyPressed(null);
    };

    //adds event listener
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      //removes event listener
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [callback]);
  return keyPressed;
};

export default useKey;
