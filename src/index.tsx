import React from "react";

type AnyFn = (...args: any[]) => any;

function throttle<F extends AnyFn>(fn: F, waitMS = 200) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: Parameters<F>) => {
    if (timer !== undefined) return timer;
    return (timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, waitMS));
  };
}

interface IInfiniteScrollTinyProps {
  hasMore?: boolean;
  next?: AnyFn;
  loader?: React.ReactNode;
  height?: number | string;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  scrollThreshold?: number;
}
const InfiniteScrollTiny: React.FC<IInfiniteScrollTinyProps> = (props) => {
  const wrapRef = React.useRef<HTMLUListElement>(null);
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    if (!props.hasMore) {
      setShowLoader(false);
    }
  }, [props.hasMore]);

  const onScroll = React.useCallback(
    throttle(() => {
      if (!props.hasMore || !props.next || !wrapRef.current) return;

      const diff = wrapRef.current.scrollHeight - wrapRef.current.clientHeight;
      if (wrapRef.current.scrollTop > diff * (props.scrollThreshold || 0.8))
        props?.next?.();
    }),
    [props.hasMore, props.next]
  );

  return (
    <ul
      ref={wrapRef}
      className={props.className}
      style={{
        ...(props.style || {}),
        height: props.height,
        overflow: "auto",
      }}
      onScroll={onScroll}
    >
      {props.children}
      {props.hasMore && props.loader && showLoader ? props.loader : null}
    </ul>
  );
};

export default InfiniteScrollTiny;
