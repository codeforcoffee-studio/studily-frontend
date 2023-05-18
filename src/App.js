import React, {useState} from 'react';
import './App.css';
import VisReact from "./visreact";

import "./styles.css";
import { Grid, Card, Text, Spacer, Input, Button, Spinner } from '@geist-ui/core';
import { CornerDownLeft, Coffee } from '@geist-ui/icons'

import logo from "./imgs/Studily.png"
import InfoPage from './InfoPage';
import initialGraph from "./data.json";
import initialGraph2 from "./data2.json";
import MyGraph from './graph-experiment';
import axios from 'axios';
import KnowledgeGraph from './knowledgeGraph';
import VisGraph from './drag-experiment';
import HighlightOnDragComponent from './drag-experiment';
import SearchButton from './components/searchButton';

const App = () => {
  const [searchValue, setSearchValue] = useState("")
  const [node, setNode] = useState(null)
  const [graph, setGraph] = useState(null);
  const [definitions, setDefinitions] = useState({});
  const [waiting, setWaiting] = useState(false);
  const [dragNode, setDragNode] = useState(null);

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
    }
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

  const selectNode = (node_id) => {
    console.log("Selected nodes: ", graph.nodes[node_id]);
    const keyword = graph.nodes[node_id].label;
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
  }

  const handleDragNode = (node_id) => {
    const nodeObj = {
      ...graph.nodes[node_id],
    }
    setDragNode(nodeObj);
  }

  return (
    <div className="App">
      <Grid.Container gap={0} justify="center" align='center' height="100%">
        <Grid xs={24} md={12} width="100%" style={styles.grid}>
          <Spacer h={1}/>
          {/* <img src={logo} alt="Logo" style={styles.img}/> */}
          <div style={styles.input}>
            Studily by
            <Button icon={<Coffee />} auto>Code for Coffee</Button>
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
          {
            waiting ? 
            <div>
              <Spacer h={5}/>
              <Spinner />
            </div>
            :
            <div className="vis-react">
              <KnowledgeGraph initGraph={graph} selectNode={selectNode} handleDragNode={handleDragNode}/>
            </div>
          }

          <SearchButton node={dragNode}/>
          

         
        </Grid>
        <Grid xs={24} md={12}>
            <div style={styles.scroll}>
              <InfoPage  initNode={node}/>
            </div>
        </Grid>
      </Grid.Container>
    </div>
  );
}


export default App;
