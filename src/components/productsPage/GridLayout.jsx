import GridLayout from "react-grid-layout";
import React from "react";
class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: "a", w: 1, h: 2, static: true },
      { i: "b", w: 3, h: 2, minW: 2, maxW: 4 },
      { i: "c", w: 1, h: 2 },
    ];
    return (
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
      </GridLayout>
    );
  }
}

export default MyFirstGrid;
