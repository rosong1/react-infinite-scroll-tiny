# react-infinite-scroll-tiny
A tiny Infinite Scroll component in react like [react-infinite-scroll-component](https://github.com/ankeetmaini/react-infinite-scroll-component)

try on [stackblitz](https://stackblitz.com/edit/vitejs-vite-wsadms?file=src%2Fmain.tsx&terminal=dev)

# Install

```bash
npm install react-infinite-scroll-tiny
```

# Usage

```ts
import React from "react";
import InfiniteScrollTiny from "react-infinite-scroll-tiny";

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
```