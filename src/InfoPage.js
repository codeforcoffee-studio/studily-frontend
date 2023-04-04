import React, {useState, useEffect} from 'react';
import { Card, Text, Spacer, Button } from '@geist-ui/core'
import { Copy, Info, Flag, Settings, Moon, Zap, Youtube } from '@geist-ui/icons';
import "./styles/info.css";

import nodeDetails from "./mockData.json";

const InfoPage = ({node}) => {

    const styles = {
        div: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            justifyContent: 'center',
            alignContent: 'center'
        },
        p: {
            textAlign: "left",
            margin: "20px",
            padding: "10px"
        }
    }

    return (
        <Card width="100%" height="100%" style={styles.definition}>
            <Button icon={<Copy />} auto>Copy</Button>
            <Button icon={<Moon />} auto>Mode</Button>
            <Button icon={<Info />} auto>Info</Button>
            <Button icon={<Flag />} auto>Flag</Button>
            <Button icon={<Settings />} auto>Settings</Button>
            {
                node !== undefined ? 
                <div style={styles.div}>
                   
                    <Spacer h={3}/>
                    <Text h3>{nodeDetails[node].topic}</Text>  
                    
                    <div class="box">
                        <p>Definition: {nodeDetails[node].definition}</p>  
                    </div>

                    <div class="video">
                        <Button icon={<Youtube />} auto scale={0.8}>The Heart, Part 1 - Under Pressure: Crash Course Anatomy & Physiology #25</Button>
                        <Spacer h={0.5}/>
                        <Button icon={<Zap />} auto scale={0.8}>Summarize</Button>
                    </div>
                    <div class="video">
                        <Button icon={<Youtube />} auto scale={0.8}> The Heart, Part 2 - Heart Throbs: Crash Course Anatomy & Physiology #26</Button>
                        <Spacer h={0.5}/>
                        <Button icon={<Zap />} auto scale={0.8}>Summarize</Button>
                    </div>
                    <p style={styles.p}>{nodeDetails[node].details}</p> 
                </div>
                :
                <></>
            }
           
        </Card>
    );
}


export default InfoPage;