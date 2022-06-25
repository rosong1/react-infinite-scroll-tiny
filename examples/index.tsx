import React from "react";
import ReactDOM from "react-dom";
import InfiniteScrollTiny from "../src";

const App = () => {
  const [count, setCount] = React.useState(20);
  const isFetching = React.useRef(false);
  const next = React.useCallback(() => {
    if (isFetching.current) return;
    isFetching.current = true;
    setTimeout(() => {
      setCount((count) => count + 5);
      isFetching.current = false;
    }, 600);
  }, []);
  return (
    <InfiniteScrollTiny
      hasMore={true}
      next={next}
      loader={<p style={{ fontSize: 14, margin: 10 }}>loading...</p>}
      height={400}
      style={{ border: "1px solid red" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <li>item #{i + 1}</li>
      ))}
    </InfiniteScrollTiny>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
