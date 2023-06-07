import React, {useState, useEffect} from 'react';
import { Card, Text, Spacer, Button, Spinner, Tabs } from '@geist-ui/core'
import { Copy, Info, Flag, Settings, Moon, Zap, Youtube, BookOpen, Circle, Search, ArrowRight, Play } from '@geist-ui/icons';
import {  } from '@geist-ui/icons';
import "../styles/info.css";
import axios from 'axios';

const WikiListComponent = ({initNode}) => {
    const [summaries, setSummaries] = useState({});
    const [waitingIndex, setWaitingIndex] = useState(-1);
    const [items, setItems] = useState([])
    const [waiting, setWaiting] = useState(false);

    useEffect(()=>{
        if(initNode && items.length === 0){
            setWaiting(true);
            axios.post('http://140.99.171.75:8000/api/wiki_api', { "type": "keyword_search", "keyword": initNode.label })
            .then(res => {
              console.log(res);
              console.log("wiki links: ", res.data.message);
              setItems(res.data.message)
              setWaiting(false);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [initNode])

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
        },
        div: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'left'
        },
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
        {
        waiting ? 
            <div style={styles.div}>
                <Spacer h={1}/>
                <Spinner/>
            </div>
            :
        items.map((item, index) => (
          index < 5 ? 
          <div style={styles.divcol} key={index}>
            <div style={styles.divrow}> 
                <Button icon={<BookOpen />} style={{width:"300px"}}>
                    <a key={index} href={item.original_link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        {truncateString(item.title, 40)}
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
                <div style={{textAlign: 'left'}}><Text>{summaries[item.pageid]}</Text></div>
                :
                <></>
            }
          </div>
          :
          <></>
        ))
        }
      </div>    
    );
};

const YouTubeListComponent = ({ initNode }) => {
    const [summaries, setSummaries] = useState({});
    const [waitingIndex, setWaitingIndex] = useState(-1);
    const [items, setItems] = useState([])
    const [waiting, setWaiting] = useState(false);

    useEffect(()=>{
        setWaiting(true);
        if(initNode){
            axios.post('http://140.99.171.75:8000/api/youtube_api', { "type": "keyword_search", "keyword": initNode.label })
            .then(res => {
              console.log(res);
              console.log("youtube links: ", res.data.message);
              setItems(res.data.message)
              setWaiting(false);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [initNode])

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
        },
        div: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'left'
        },
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
        {
        waiting ? 
            <div style={styles.div}>
                <Spacer h={1}/>
                <Spinner/>
            </div>
            :
        items.map((item, index) => (
          index < 5 ? 
          <div style={styles.divcol} key={index}>
            <div style={styles.divrow}> 
                <Button icon={<Youtube />} style={{width:"300px"}}>
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
                <div style={{textAlign: 'left'}}><Text>{summaries[item.videoId]}</Text></div>
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

const BingListComponent = ({ initNode }) => {
    const [summaries, setSummaries] = useState({});
    const [waitingIndex, setWaitingIndex] = useState(-1);
    const [items, setItems] = useState([])
    const [waiting, setWaiting] = useState(false);

    useEffect(()=>{
        setWaiting(true);
        if(initNode){
            axios.post('http://140.99.171.75:8000/api/serpapi_api', { "engine": "bing", "query": initNode.label })
            .then(res => {
              console.log(res);
              console.log("bing links: ", res.data.message);
              setItems(res.data.message)
              setWaiting(false);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [initNode])

    const styles = {
        divcol: {
            background: '#e5f3fd', 
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
        },
        div: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'left'
        },
    }

    function truncateString(string, maxLength) {
        if (string.length > maxLength) {
          return string.substring(0, maxLength - 3) + '...';
        }
        return string;
      }

    const handleClick = (videoId, index) => {
        
    }
    
    return (
      <div>
        {
        waiting ? 
            <div style={styles.div}>
                <Spacer h={1}/>
                <Spinner/>
            </div>
            :
        items.map((item, index) => (
          index < 5 ? 
          <div style={styles.divcol} key={index}>
            <div style={styles.divrow}> 
                <Button icon={<Search />} style={{width:"300px"}}>
                    <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        {truncateString(item.title, 30)}
                    </a>
                </Button>
                {/* {
                    waitingIndex === index ? 
                    // <Button auto style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    //     <Spinner />
                    // </Button>
                    <Button loading scale={0.75}></Button>
                    :
                    <Button icon={<Zap />} auto scale={0.8} onClick={() => handleClick(item.videoId, index)} style={styles.button}>Summarize</Button>
                } */}
            </div>
          </div>
          :
          <></>
        ))}
      </div>
    );
};

const BaiduListComponent = ({ initNode }) => {
    const [summaries, setSummaries] = useState({});
    const [waitingIndex, setWaitingIndex] = useState(-1);
    const [items, setItems] = useState([])
    const [waiting, setWaiting] = useState(false);

    useEffect(()=>{
        console.log("baidu search node: ", initNode.label);
        setWaiting(true);
        if(initNode){
            axios.post('http://140.99.171.75:8000/api/serpapi_api', { "engine": "baidu", "query": initNode.label })
            .then(res => {
              console.log(res);
              console.log("bing links: ", res.data.message);
              setItems(res.data.message)
              setWaiting(false);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [initNode])

    const styles = {
        divcol: {
            background: '#f5fbff', 
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
        },
        div: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'left'
        },
    }

    function truncateString(string, maxLength) {
        if (string.length > maxLength) {
          return string.substring(0, maxLength - 3) + '...';
        }
        return string;
      }

    const handleClick = (videoId, index) => {
        
    }
    
    return (
      <div>
        {
        waiting ? 
            <div style={styles.div}>
                <Spacer h={1}/>
                <Spinner/>
            </div>
            :
        items.map((item, index) => (
          index < 5 ? 
          <div style={styles.divcol} key={index}>
            <div style={styles.divrow}> 
                <Button icon={<Search />} style={{width:"300px"}}>
                    <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        {truncateString(item.title, 25)}
                    </a>
                </Button>
                {/* {
                    waitingIndex === index ? 
                    // <Button auto style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    //     <Spinner />
                    // </Button>
                    <Button loading scale={0.75}></Button>
                    :
                    <Button icon={<Zap />} auto scale={0.8} onClick={() => handleClick(item.videoId, index)} style={styles.button}>Summarize</Button>
                } */}
            </div>
          </div>
          :
          <></>
        ))}
      </div>
    );
};

const BilibiliListComponent = ({ initNode }) => {
    const [summaries, setSummaries] = useState({});
    const [waitingIndex, setWaitingIndex] = useState(-1);
    const [items, setItems] = useState([])
    const [waiting, setWaiting] = useState(false);

    useEffect(()=>{
        console.log("baidu search node: ", initNode.label);
        setWaiting(true);
        if(initNode){
            axios.post('http://140.99.171.75:8000/api/bilibili_api', { "type": "video", "keyword": initNode.label })
            .then(res => {
              console.log(res);
              console.log("bing links: ", res.data.message);
              setItems(res.data.message)
              setWaiting(false);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [initNode])

    const styles = {
        divcol: {
            background: '#f6eeee', 
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
        },
        div: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'left'
        },
    }

    function truncateString(string, maxLength) {
        if (string.length > maxLength) {
          return string.substring(0, maxLength - 3) + '...';
        }
        return string;
      }

    const handleClick = (videoId, index) => {
        
    }
    
    return (
      <div>
        {
        waiting ? 
            <div style={styles.div}>
                <Spacer h={1}/>
                <Spinner/>
            </div>
            :
        items.map((item, index) => (
          index < 5 ? 
          <div style={styles.divcol} key={index}>
            <div style={styles.divrow}> 
                <Button icon={<Play />} style={{width:"300px"}}>
                    <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                        {truncateString(item.title, 25)}
                    </a>
                </Button>
                {/* {
                    waitingIndex === index ? 
                    // <Button auto style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    //     <Spinner />
                    // </Button>
                    <Button loading scale={0.75}></Button>
                    :
                    <Button icon={<Zap />} auto scale={0.8} onClick={() => handleClick(item.videoId, index)} style={styles.button}>Summarize</Button>
                } */}
            </div>
          </div>
          :
          <></>
        ))}
      </div>
    );
};


const InfoPage = ({initNode, path, graph, centerNode}) => {
    const [node, setNode] = useState(null);
    const [wikiLinks, setWikiLinks] = useState([]);
    const [waiting, setWaiting] = useState(false);
    const [youtubeLinks, setYoutubeLinks] = useState([]);
    const [bingLinks, setBingLinks] = useState([]);
    const [bilibiliLinks, setBilibiliLinks] = useState([]);

    useEffect(()=>{
        if(initNode){
            setNode(initNode);
          

            // axios.post('http://140.99.171.75:8000/api/bilibili_api_api', { "type": "video", "keyword": initNode.label })
            // .then(res => {
            //   console.log(res);
            //   console.log("bilibili links: ", res.data.message);
            //   setBilibiliLinks(res.data.message)
            //   setWaiting(false);
            // })
            // .catch(error => {
            //     console.log(error);
            // })
        }
    }, [initNode]);
    

    const styles = {
        div: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
            justifyContent: 'center',
            alignContent: 'center',
            textAlign: 'left'
        },
        p: {
            textAlign: "left",
            margin: "20px",
            padding: "10px"
        },
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
    }


    return (
        <Card width="100%" height="100%" style={styles.definition}>
            <Button icon={<Copy />} auto>Copy</Button>
            <Button icon={<Moon />} auto>Mode</Button>
            <Button icon={<Info />} auto>Info</Button>
            <Button icon={<Flag />} auto>Flag</Button>
            <Button icon={<Settings />} auto>Settings</Button>
            <Spacer h={1}/>
            <div style={styles.divrow}>
                {path.map((item, index) => (
               
                <div style={styles.divrow}>
                    {item !== 0 ?
                        <Button icon={<ArrowRight />} auto></Button>    
                        :
                        <></>
                    }
                    <Button icon={<Circle />} auto onClick={()=>{centerNode(item)}}>{graph.nodes[item].label}</Button>
                </div>
               
                ))}
            </div>
            {
                node != null ? 
                    waiting ? 
                    <div style={styles.div}>
                        <Spacer h={1}/>
                        <Spinner/>
                    </div>
                    :
                    <div style={styles.div}>
                        <Spacer h={1}/>
                        <Text h3>{node.label}</Text>  
                        <Text p><b>Definition</b>: {node.definition}</Text>  
                        
                        <Tabs initialValue="1">
                            <Tabs.Item label="Wikipedia" value="1">
                                <WikiListComponent initNode={initNode}/>
                            </Tabs.Item>
                            <Tabs.Item label="YouTube" value="2">
                                <YouTubeListComponent initNode={initNode}/> 
                            </Tabs.Item>
                            <Tabs.Item label="Bing" value="3">
                                <BingListComponent initNode={initNode}/>
                            </Tabs.Item>
                            <Tabs.Item label="Baidu" value="4">
                                <BaiduListComponent initNode={initNode}/>
                            </Tabs.Item>
                            <Tabs.Item label="Bilibili" value="5">
                                <BilibiliListComponent initNode={initNode}/>
                            </Tabs.Item>
                        </Tabs>
                    </div>
                :
                <></>
            }
        </Card>
    );
}


export default InfoPage;