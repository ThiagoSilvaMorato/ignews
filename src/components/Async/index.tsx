import { useEffect, useState } from "react";
import "@testing-library/jest-dom";

export function Async() {
  const [isButtonInvisible, setIsButtonInvisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsButtonInvisible(true);
      setIsButtonVisible(true);
    }, 500);
  }, []);

  return (
    <div>
      <div>Hello World</div>
      {!isButtonInvisible && <button>Button</button>}
      {isButtonVisible && <button>Visible Button</button>}
    </div>
  );
}
