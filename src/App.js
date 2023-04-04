import React, {useState} from 'react';
import './App.css';
import VisReact from "./visreact";

import "./styles.css";
import { Grid, Card, Text, Spacer, Input, Button} from '@geist-ui/core';
import { CornerDownLeft, Coffee } from '@geist-ui/icons'

import logo from "./imgs/Studily.png"
import InfoPage from './InfoPage';

const App = () => {
  const [value, setValue] = useState()
  const [node, setNode] = useState()

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
    }
  }

  const handler = (e) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }

  const selectNode = (nodes) => {
    const node_id = nodes[0];
    console.log("Selected nodes: ", node_id);
    setNode(node_id)
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
            <input style={{
              borderRadius:"10px",
              padding: "10px",
              border: "0px solid #ccc",
              boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
            }} ></input>
            <Spacer w={1}/>
            <Button icon={<CornerDownLeft />} auto></Button>
          </div>

 
          <div className="vis-react">
            <VisReact selectNode={selectNode}/>
          </div>
          
        </Grid>
        <Grid xs={24} md={12}>
          <InfoPage node={node}/>
        </Grid>
      </Grid.Container>
    </div>
  );
}


export default App;
