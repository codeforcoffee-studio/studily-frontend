import React, { Component, Fragment, useState } from "react";
import Graph from "vis-react";

function getInitialGraphData() {
    return {
      nodes: [
        { id: 1, label: "Node 1" },
        { id: 2, label: "Node 2" },
        { id: 3, label: "Node 3" }
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 }
      ]
    };
  }
  
  function getNewGraphData() {
    return {
      nodes: [
        { id: 4, label: "Node 4" },
        { id: 5, label: "Node 5" },
        { id: 6, label: "Node 6" },
        { id: 7, label: "Node 7" }
      ],
      edges: [
        { from: 4, to: 7 },
        { from: 7, to: 5 },
        { from: 6, to: 4 },
        { from: 5, to: 4 }
      ]
    };
  }

const MyGraph = () => {
  const [graphData, setGraphData] = useState(getInitialGraphData());
  const [selectedNode, setSelectedNode] = useState(null);

  function handleButtonClick() {
    const newGraphData = getNewGraphData()
    setGraphData(newGraphData);
  }

  const handleSelectNode = (event) => {
    const { nodes } = event;
    console.log("selected node: ", nodes[0]);
    setSelectedNode(nodes[0]);
  };

  
  let options = {
    layout: {
      randomSeed: 2
    },
    nodes: {
      fixed: {
        x: false,
        y: false
      },
      shape: "dot",
      size: 13,
      borderWidth: 1.5,
      borderWidthSelected: 2,
      font: {
        size: 15,
        align: "center",
        bold: {
          color: "#bbbdc0",
          size: 15,
          vadjust: 0,
          mod: "bold"
        }
      }
    },
    edges: {
      width: 0.01,
      color: {
        color: "#D3D3D3",
        highlight: "#797979",
        hover: "#797979",
        opacity: 1.0
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" },
        middle: { enabled: false, scaleFactor: 1, type: "arrow" },
        from: { enabled: true, scaleFactor: 1, type: "arrow" }
      },
      smooth: {
        type: "continuous",
        roundness: 0
      }
    },
    // physics: {
    //   forceAtlas2Based: {
    //       gravitationalConstant: -200,
    //       centralGravity: 0.05,
    //       springLength: 230,
    //       springConstant: 0.08,
    //       avoidOverlap:9
    //   },
    //   solver: 'forceAtlas2Based',
    //   timestep: 0.35,
    //   stabilization: {enabled:true,iterations: 10}
    // },
    physics: {
      barnesHut: {
        gravitationalConstant: -30000,
        centralGravity: 1,
        springLength: 70,
        avoidOverlap: 1
      },
      stabilization: { iterations: 2500 }
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      hoverEdges: true,
      selectable: true,
      selectConnectedEdges: false,
      zoomView: false,
      dragView: false
    }
  };

  let events = {
    selectNode: handleSelectNode
  }

  return (
    <Fragment>
      <button onClick={handleButtonClick}>Load new graph</button>
      <Graph 
        graph={graphData} 
        options={options} 
        events={events}
    />
    </Fragment>
  );
};

export default MyGraph;