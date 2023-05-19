import React, {useState, useEffect} from 'react';
import { Card, Text, Spacer, Button, Spinner } from '@geist-ui/core'
import { Copy, Info, Flag, Settings, Moon, Zap, Youtube, BookOpen } from '@geist-ui/icons';
import "../styles/info.css";
import axios from 'axios';

const WikiListComponent = ({ items }) => {
    const [summaries, setSummaries] = useState({});
    const [waitingIndex, setWaitingIndex] = useState(-1);

    const styles = {
        divcol: {
            background: '#f5f5f5', 
            padding: '2px', 
            borderRadius: '10px',
            margin: '5px',
            display: 'flex', 
            flexDirection: 'column',
            alignContent: "center"
        },
        divrow: {
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'center'
        },
        link: {
            textDecoration: 'none', 
            color: '#333', 
            // fontWeight: 'bold'
        },
        button: {
            marginLeft: '10px'
        }
    }

    function truncateString(string, maxLength) {
        if (string.length > maxLength) {
          return string.substring(0, maxLength - 3) + '...';
        }
        return string;
      }

    const handleClick = (pageid, index) => {
        setWaitingIndex(index);
        axios.post('http://140.99.171.75:8000/api/wiki_api', { "type": "page_summary", "keyword": pageid })
        .then(res => {
          console.log(res);
          console.log("summary: ", res.data.message);
          setSummaries({...summaries, [pageid]: res.data.message});
          setWaitingIndex(-1);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    return (
      <div>
        {items.map((item, index) => (
          index < 5 ? 
          <div style={styles.divcol}>
            <div style={styles.divrow}> 
                <Button icon={<BookOpen />} auto>
                    <a key={index} href={item.original_link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        {truncateString(item.title, 15)}
                    </a>
                </Button>
                {
                    waitingIndex === index ? 
                    // <Button auto style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    //     <Spinner />
                    // </Button>
                    <Button loading scale={0.75}></Button>
                    :
                    <Button icon={<Zap />} auto scale={0.8} onClick={() => handleClick(item.pageid, index)} style={styles.button}>Summarize</Button>
                }
            </div>
            {
                summaries[item.pageid] ? 
                <Text>{summaries[item.pageid]}</Text>
                :
                <></>
            }
          </div>
          :
          <></>
        ))}
      </div>
    );
  };

const YouTubeListComponent = ({ items }) => {
    const [summaries, setSummaries] = useState({});
    const [waitingIndex, setWaitingIndex] = useState(-1);

    const styles = {
        divcol: {
            background: '#E4C9C9', 
            padding: '4px', 
            borderRadius: '10px',
            margin: '5px',
            display: 'flex', 
            flexDirection: 'column',
            alignContent: "center"
        },
        divrow: {
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'center'
        },
        link: {
            textDecoration: 'none', 
            color: '#333', 
            // fontWeight: 'bold'
        },
        button: {
            marginLeft: '10px'
        }
    }

    function truncateString(string, maxLength) {
        if (string.length > maxLength) {
          return string.substring(0, maxLength - 3) + '...';
        }
        return string;
      }

    const handleClick = (videoId, index) => {
        setWaitingIndex(index);
        axios.post('http://140.99.171.75:8000/api/youtube_api', { "type": "video_transcript", "keyword": videoId })
        .then(res => {
          console.log(res);
          console.log("summary: ", res.data.message);
          setSummaries({...summaries, [videoId]: res.data.message});
          setWaitingIndex(-1);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    return (
      <div>
        {items.map((item, index) => (
          index < 5 ? 
          <div style={styles.divcol}>
            <div style={styles.divrow}> 
                <Button icon={<Youtube />} auto>
                    <a key={index} href={"https://www.youtube.com/watch?v="+item.videoId} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        {truncateString(item.title, 30)}
                    </a>
                </Button>
                {
                    waitingIndex === index ? 
                    // <Button auto style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    //     <Spinner />
                    // </Button>
                    <Button loading scale={0.75}></Button>
                    :
                    <Button icon={<Zap />} auto scale={0.8} onClick={() => handleClick(item.videoId, index)} style={styles.button}>Summarize</Button>
                }
            </div>
            {
                summaries[item.videoId] ? 
                <Text>{summaries[item.videoId]}</Text>
                :
                <></>
            }
          </div>
          :
          <></>
        ))}
      </div>
    );
  };

  

const InfoPage = ({initNode}) => {
    const [node, setNode] = useState(null);
    const [wikiLinks, setWikiLinks] = useState([]);
    const [waiting, setWaiting] = useState(false);
    const [youtubeLinks, setYoutubeLinks] = useState([]);

    useEffect(()=>{
        setNode(initNode);
        if(initNode){
            setWaiting(true);
            axios.post('http://140.99.171.75:8000/api/wiki_api', { "type": "keyword_search", "keyword": initNode.label })
            .then(res => {
              console.log(res);
              console.log("wiki links: ", res.data.message);
              setWikiLinks(res.data.message)
              setWaiting(false);
            })
            .catch(error => {
                console.log(error);
            })

            axios.post('http://140.99.171.75:8000/api/youtube_api', { "type": "keyword_search", "keyword": initNode.label })
            .then(res => {
              console.log(res);
              console.log("youtube links: ", res.data.message);
              setYoutubeLinks(res.data.message)
              setWaiting(false);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [initNode]);
    

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
                node != null ? 
                    waiting ? 
                    <div style={styles.div}>
                        <Spacer h={5}/>
                        <Spinner/>
                    </div>
                    :
                    <div style={styles.div}>
                        <Spacer h={3}/>
                        <Text h3>{node.label}</Text>  
                        <Text p>Definition: {node.definition}</Text>  

                        <WikiListComponent items={wikiLinks}/>
                        <YouTubeListComponent items={youtubeLinks}/>
                        
                        {/* <div class="video">
                            <Button icon={<Youtube />} auto scale={0.8}>The Heart, Part 1 - Under Pressure: Crash Course Anatomy & Physiology #25</Button>
                            <Spacer h={0.5}/>
                            <Button icon={<Zap />} auto scale={0.8}>Summarize</Button>
                        </div>
                        <div class="video">
                            <Button icon={<Youtube />} auto scale={0.8}> The Heart, Part 2 - Heart Throbs: Crash Course Anatomy & Physiology #26</Button>
                            <Spacer h={0.5}/>
                            <Button icon={<Zap />} auto scale={0.8}>Summarize</Button>
                        </div> */}
                    </div>
                :
                <></>
            }
           
        </Card>
    );
}


export default InfoPage;