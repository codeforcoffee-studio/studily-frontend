import React, { Component, Fragment, useEffect, useState } from "react";
import Graph from "vis-react";

const KnowledgeGraph = ({initGraph, selectNode}) => {
  const [graph, setGraph] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(()=>{
    setGraph(initGraph);
  }, [initGraph]);

  const handleSelectNode = (event) => {
    const { nodes } = event;
    console.log("selected node: ", nodes[0]);
    setSelectedNode(nodes[0]);
    selectNode(nodes);
  };

  const handleDragEnd = (event) => {
    const nodeId = event.nodes[0]; // Get the ID of the dragged node
    const targetNode = event.event.target; // Get the target DOM element where the node is dropped

    console.log('Dragged Node ID:', nodeId);
    console.log('Target DOM Element:', targetNode);
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
    selectNode: handleSelectNode,
    dragEnd: handleDragEnd
  }

  return (
    <Fragment>
      {
        graph != null ? 
        <Graph 
          graph={graph} 
          options={options} 
          events={events}
        />
        :
        <></>
      }
    </Fragment>
  );
};

export default KnowledgeGraph;