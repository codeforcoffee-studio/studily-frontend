import React, {useState} from 'react';
import './styles/App.css';

import "./styles/styles.css";
import { Grid, Card, Text, Spacer, Input, Button, Spinner, Toggle, Select,  } from '@geist-ui/core';
import { CornerDownLeft, Coffee, CornerLeftDown, CornerRightUp } from '@geist-ui/icons'

import logo from "./imgs/Studily.png"
import InfoPage from './components/infoPage';

import axios from 'axios';
import KnowledgeGraph from './components/knowledgeGraph';
import SearchButton from './components/searchButton';

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [node, setNode] = useState(null);
  const [path, setPath] = useState([]);
  const [graph, setGraph] = useState(null);
  const [definitions, setDefinitions] = useState({});
  const [waiting, setWaiting] = useState(false);
  const [dragNode, setDragNode] = useState(null);
  const [gravity, setGravity] = useState(true);
  const [nodeSize, setNodeSize] = useState(13);

  const styles = {
    grid: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    img: {
      width: '15%',
      height: 'auto',
    },
    input: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      width: "100%",
      justifyContent: 'center',
      alignContent: 'center'
    },
    scroll: {
      // margin:"4px, 4px",
      // padding:"4px",
      // backgroundColor: "green",
      width: "100%",
      height: "100%",
      overflowX: "hidden",
      overflowY: "auto",
      textAlign: "center"
    },
    divrow: {
      display: 'flex', 
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: "center"
  },
  }

  const onInputChange = (e) => {
    setSearchValue(e.target.value);
  }

  const onSubmitButtonPressed = () => {
    console.log("submitting ", searchValue);
    setWaiting(true);

    axios.post('http://140.99.171.75:8000/api/chatgpt_api', { "type": "keyword-list", "keyword": `${searchValue}` })
    .then(res => {
      console.log(res);
      console.log(res.data.message);
      let relatedKeywords = res.data.message.replace(/\./g, '').split(', ');

      let nodes = [];
      let edges = [];
      // nodes: [
      //   { id: 1, label: "Node 1" },
      //   { id: 2, label: "Node 2" },
      //   { id: 3, label: "Node 3" }
      // ],
      // edges: [
      //   { from: 1, to: 2 },
      //   { from: 1, to: 3 }
      // ]
      nodes.push({id: 0, label: `${searchValue}`, color: "#874d99"});
      for(var i = 0; i < relatedKeywords.length; i+=1){
        nodes.push({id: i+1, label: `${relatedKeywords[i]}`, color: "#D4D4D4"});
        edges.push({from: 0, to: i+1, arrows: { from: { enabled: false, type: 'arrow' } }});
      }
      console.log(nodes);
      console.log(edges); 

      let newGraph = {nodes: nodes, edges: edges};
      console.log(newGraph);
      setGraph(newGraph);
      setWaiting(false);
    })
    .catch(error => {
      console.error(error);
    });
  }

  const breadcrumbs = (node_id) => {
    // return a list of node starting from root_node to node_id
    var current_node = node_id;
    var path = []
    while(current_node !== 0){ // while current_node is not root
      for(var i = 0; i < graph.edges.length; i++){
        if(graph.edges[i].to === current_node){
          path.push(current_node);
          current_node = graph.edges[i].from;
          break;
        }
      }
    }
    path.push(0);

    return path.reverse();
  }

  const selectNode = (node_id) => {
    console.log("Selected nodes: ", graph.nodes[node_id]);
    const keyword = graph.nodes[node_id].label;

    const bread = breadcrumbs(node_id);

    if(!definitions[keyword]){
      axios.post('http://140.99.171.75:8000/api/chatgpt_api', { "type": "keyword-explanation", "keyword": keyword + " in the context of " + `${searchValue} ` })
      .then(res => {
        console.log(res.data.message);
        setDefinitions({[searchValue]: res.data.message});
        const nodeObj = {
          ...graph.nodes[node_id],
          'definition': res.data.message
        }
        setNode(nodeObj);
      })
    }
  
    const nodeObj = {
      ...graph.nodes[node_id],
      'definition': definitions[keyword]
    }
    setNode(nodeObj);
    setPath(bread);
  }

  const centerNode = (node_id) => {
    console.log("centering node: ", node_id);
    //graph.nodes[node_id] = {...graph.nodes[node_id], x: 0, y: 0}
  }

  const handleDragNode = (node_id) => {
    const nodeObj = {
      ...graph.nodes[node_id],
    }
    setDragNode(nodeObj);
  }

  const addGraph = (node, type, depth) => {
    console.log("searching: " + node.label + " with id " + node.id + " " + type + " " + depth);
    if(type === "breath"){
      axios.post('http://140.99.171.75:8000/api/chatgpt_api', { "type": "keyword-list", "keyword": `${node.label}` })
      .then(res => {
        console.log(res);
        console.log(res.data.message);
        let relatedKeywords = res.data.message.replace(/\./g, '').split(', ');
  
        let nodes = [];
        let edges = [];
        // nodes: [
        //   { id: 1, label: "Node 1" },
        //   { id: 2, label: "Node 2" },
        //   { id: 3, label: "Node 3" }
        // ],
        // edges: [
        //   { from: 1, to: 2 },
        //   { from: 1, to: 3 }
        // ]
        for(var i = 0; i < 5; i+=1){
          nodes.push({id: graph.nodes.length + (i+1), label: `${relatedKeywords[i]}`, color: "#D4D4D4"});
          edges.push({from: node.id, to: graph.nodes.length + (i+1), arrows: { from: { enabled: false, type: 'arrow' } }});
        }
        console.log(nodes);
        console.log(edges); 
  
        let newGraph = {nodes: graph.nodes.concat(nodes), edges: graph.edges.concat(edges)};
        console.log(newGraph);
        setGraph(newGraph);
      })
      .catch(error => {
        console.error(error);
      });
    }
    else if(type === "depth"){
      const bread = breadcrumbs(node.id);
      const searchWords = [];
      searchWords.push(graph.nodes[bread.length-2].label)
      searchWords.push(graph.nodes[bread.length-1].label)
      
      axios.post('http://140.99.171.75:8000/api/chatgpt_api', { "type": "keyword-list-dfs", "keyword": searchWords })
      .then(res => {
        console.log(res);
        console.log(res.data.message);
        let relatedKeywords = res.data.message.replace(/\./g, '').split(', ');
  
        let nodes = [];
        let edges = [];
        // nodes: [
        //   { id: 1, label: "Node 1" },
        //   { id: 2, label: "Node 2" },
        //   { id: 3, label: "Node 3" }
        // ],
        // edges: [
        //   { from: 1, to: 2 },
        //   { from: 1, to: 3 }
        // ]
        console.log("graph nodes length: ",graph.nodes.length);
        var prev_node = node.id;
        for(var i = 0; i < 3; i+=1){
          nodes.push({id: graph.nodes.length + (i+1), label: `${relatedKeywords[i]}`, color: "#D4D4D4"});
          edges.push({from: prev_node, to: graph.nodes.length + (i+1), arrows: { from: { enabled: false, type: 'arrow' } }});
          prev_node = graph.nodes.length + (i+1);
        }
        console.log(nodes);
        console.log(edges); 
  
        let newGraph = {nodes: graph.nodes.concat(nodes), edges: graph.edges.concat(edges)};
        console.log(newGraph);
        setGraph(newGraph);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }  

  const toggleGravity = () => {
    //console.log("toggling gravity...", !gravity);
    setGravity(!gravity);
  }

  const nodeSizeChange = (op) =>{
    if(op === "add"){
      setNodeSize(nodeSize+1)
    }
    else{ // op === "minus"
      if(nodeSize > 0)
        setNodeSize(nodeSize-1)
    }
  }

  return (
    <div className="App">
      <Grid.Container gap={0} justify="center" align='center' height="100%">
        <Grid xs={24} md={12} width="100%" style={styles.grid}>
          <Spacer h={1}/>
          {/* <img src={logo} alt="Logo" style={styles.img}/> */}
          <div style={styles.input}>
            Studily by
            <Spacer w={0.5}/>
            <Button icon={<Coffee />} auto><a href='https://github.com/codeforcoffee-studio' target="_blank" rel="noreferrer">Code for Coffee</a></Button>
          </div>

          <Spacer h={1}/>
          <div style={styles.input}>
            <input 
                style={{
                borderRadius:"10px",
                padding: "10px",
                border: "0px solid #ccc",
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"}} 
                type='text'
                value={searchValue}
                onChange={onInputChange}
            />
            <Spacer w={1}/>
            <Button icon={<CornerDownLeft />} auto onClick={onSubmitButtonPressed}></Button>
          </div>
        
            {/* <div className="vis-react">
              <VisReact selectNode={selectNode} initialGraph={initialGraph}/>
            </div> */}
          
          {/* <div className="vis-react">
            <MyGraph />
          </div> */}
          <SearchButton node={dragNode} addGraph={addGraph}/>
          <div style={styles.divrow}>
            <Text small>gravity</Text>
            <Spacer w={0.5}/>
            <Toggle type="secondary" initialChecked checked={gravity} onChange={toggleGravity}/>
            <Spacer w={0.5}/>
            <Text small>node size</Text>
            <Spacer w={0.5}/>
            <Button icon={<CornerLeftDown /> } auto onClick={()=>nodeSizeChange("minus")}></Button>
            <Spacer w={0.5}/>
            <Text small>{nodeSize}</Text>
            <Spacer w={0.5}/>
            <Button icon={<CornerRightUp />} auto onClick={()=>nodeSizeChange("add")}></Button>
          </div>
          {
            waiting ? 
            <div>
              <Spacer h={5}/>
              <Spinner />
            </div>
            :
            <div className="vis-react">
              <KnowledgeGraph initGraph={graph} selectNode={selectNode} handleDragNode={handleDragNode} gravity={gravity} nodeSize={nodeSize}/>
            </div>
          }

         
        </Grid>
        <Grid xs={24} md={12}>
            <div style={styles.scroll}>
              <InfoPage  initNode={node} path={path} graph={graph} centerNode={centerNode}/>
            </div>
        </Grid>
      </Grid.Container>
    </div>
  );
}


export default App;
