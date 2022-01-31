import { useCallback, useEffect, useRef, useState } from "react";
import useKey from "../hooks/useKey";
import TextCharacter from "./Typography/TextCharacter";

const WPMTextArea = ({ mainText }) => {
  //Declaring states with useState hooks
  const toTypeState = {
    charIndex: -1,
    charsTyped: [],
  };
  const [typingState, setTypingState] = useState(toTypeState);
  const [charsToType, setCharsToType] = useState([]);
  const [secondsTime, setSecondsTime] = useState(0);

  //Declaring references (timer & text by lines)
  const timer = useRef(null);
  const mainTextLines = useRef(mainText.split("\n"));

  const scrollAble = {
    height: "129px",
    scrollBehavior: "smooth",
    overflowY: "scroll",
    overflowX: "hidden",
    overflow: "hidden",
    userSelect: "none",
  };

  const lineDiv = {
    marginBottom: "8px",
  };

  //using the useKey hook
  useKey((key) => {
    if (key !== "Backspace") {
      setTypingState((prevTypingState) => {
        return {
          ...prevTypingState,
          charsTyped: [...prevTypingState.charsTyped, key],
        };
      });
    } else {
      setTypingState((prevTypingState) => {
        return {
          ...prevTypingState,
          charsTyped: prevTypingState.charsTyped.filter(
            (_, i) => i !== prevTypingState.charsTyped.length - 1
          ),
        };
      });
    }
  });

  const startTimer = useCallback(() => {
    if (timer.current !== null) {
      return;
    }

    var startInterval = Date.now();
    timer.current = setInterval(() => {
      var timeStamped = Date.now() - startInterval;
      setSecondsTime(timeStamped / 1000);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = null;
  }, []);

  const lineToChars = useCallback((line) => {
    return line
      .trim()
      .concat(" ")
      .split("")
      .map((c) => c);
  }, []);

  useEffect(() => {
    const characters = mainTextLines.current
      .map((line) => lineToChars(line))
      .flat();
    setCharsToType(characters);

    let cursor = document.getElementById("cursor");
    let cursorLocation = cursor.parentNode;
    cursorLocation.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });

    var range = document.createRange()
    var sel = window.getSelection()
    
    range.setStart(cursor.childNodes[0], cursor.length)
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)

  }, [typingState.charsTyped, lineToChars]);

  if (typingState.charsTyped.length >= 1) {
    startTimer();
  }

  if (timer.current && charsToType.length <= typingState.charsTyped.length) {
    stopTimer();
  }

  let charCount = -1;

  const correct = typingState.charsTyped.reduce((acc, chr, i) => {
    return chr === charsToType[i] ? acc + 1 : acc;
  }, 0);

  const accuracy = (correct / typingState.charsTyped.length) * 100;
  const accurateText = `${correct} / ${
    typingState.charsTyped.length
  } (${accuracy.toFixed(0)}%)`;
  const wpm = typingState.charsTyped.length / 5 / (secondsTime / 60);

  return (
    <>
	<div>
		<div>
			
		</div>
        <div style={scrollAble} className="scrollableDiv">
          {mainTextLines.current.map((line, i) => (
            <div style={lineDiv} key={i}>
              {lineToChars(line).map((chr) => {
                charCount += 1;
                return (
                  <TextCharacter
                    chr={chr}
                    key={charCount}
                    id={charCount}
                    charsTyped={typingState.charsTyped}
                  />
                );
              })}
            </div>
          ))}
        </div>
        {/* <p>{accurateText}</p>
        <br />
        <p>{wpm.toFixed(0)}</p>
        <br />
        <p>{secondsTime}</p> */}
	</div>
    </>
  );
};

const WPMTextContainer = () => {
  const textToType = `There are many variations of
	but the majority have suffered alteration in sop
	randomised words which don't look even slightly
	If you are going to use a passage of Lorem Ipsum
	you need to be sure there isn't anything embarrassing
	All the Lorem Ipsum generators on the Internet 
	necessary, making this the first true generator`;
  return (
	<WPMTextArea mainText={textToType} />
  );
};

export default WPMTextContainer;
