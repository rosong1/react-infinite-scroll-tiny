import React from "react";
import { render } from "@testing-library/react";
import InfiniteScroll from "../index";
import { describe, it, expect } from "vitest";

describe("React Infinite Scroll Component", () => {
  it("renders .infinite-scroll-wrap", () => {
    const { container } = render(
      <InfiniteScroll
        loader={"Loading..."}
        hasMore={false}
        next={() => {}}
        className="infinite-scroll-wrap"
      >
        <div />
      </InfiniteScroll>
    );
    expect(container.querySelectorAll(".infinite-scroll-wrap").length).toBe(1);
  });

  it("renders children when passed in", () => {
    const { container } = render(
      <InfiniteScroll loader={"Loading..."} hasMore={false} next={() => {}}>
        <div className="child" />
      </InfiniteScroll>
    );
    expect(container.querySelectorAll(".child").length).toBe(1);
  });
});

describe("When user scrolls to the bottom", () => {
  it("does not show loader if hasMore is false", () => {
    const { container, queryByText } = render(
      <InfiniteScroll
        loader={"Loading..."}
        hasMore={false}
        scrollThreshold={0}
        next={() => {}}
        className="infinite-scroll-wrap"
      >
        <div />
      </InfiniteScroll>
    );

    const scrollEvent = new Event("scroll");
    const node = container.querySelector(
      ".infinite-scroll-wrap"
    ) as HTMLElement;
    node.dispatchEvent(scrollEvent);
    expect(queryByText("Loading...")).toBeFalsy();
  });

  it("shows loader if hasMore is true", () => {
    const { container, getByText } = render(
      <InfiniteScroll
        loader={"Loading..."}
        hasMore={true}
        scrollThreshold={0}
        next={() => {}}
        height={100}
        className="infinite-scroll-wrap"
      >
        <div />
      </InfiniteScroll>
    );

    const scrollEvent = new Event("scroll");
    const node = container.querySelector(
      ".infinite-scroll-wrap"
    ) as HTMLElement;
    node.dispatchEvent(scrollEvent);
    expect(getByText("Loading...")).toBeTruthy();
  });
});
