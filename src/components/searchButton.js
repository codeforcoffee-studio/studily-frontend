import React, { Fragment, useEffect, useState } from "react";
import { Grid, Card, Text, Spacer, Input, Button, Spinner, Select } from '@geist-ui/core';
import { Circle, Search } from '@geist-ui/icons';



const SearchButton = ({node, addGraph}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [select, setSelect] = useState("breath");
    const [value, setValue] = useState("1");

    const styles = {
        divcol: {
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
            justifyContent: 'center',
            alignItems: "center"
        },
    }


    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const handleSelect = (val) => {
        console.log(val);
        setSelect(val)
    }

    const onValueChange = (val) => {
        setValue(val);
    }

    const onSubmitButtonPressed = () => {
        addGraph(node, select, value);
    }

  return (
    <div style={styles.divcol}>
        <div style={styles.divrow}>
            <Select placeholder="Choose one" onChange={handleSelect} initialValue={"breath"} >
                <Select.Option value="breath">breath-first</Select.Option>
                <Select.Option value="depth">depth-first</Select.Option>
            </Select>
            <Spacer w={1}/>
            {
                select === "breath" ?
                <Text small>search on</Text>
                :
                <Text small>in the direction of</Text>
            }
            <Spacer w={1}/>
            <Button
                icon={<Circle />} auto
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ background: isHovered ? '#CBC3E3' : 'white' , border: 'none'}}
            >
                {
                    node ?
                    node.label
                    :
                    "(drag & drop)"
                }
            </Button>
            <Button icon={<Search />} auto onClick={onSubmitButtonPressed}></Button>
        </div>
        {/* <div style={styles.divrow}>
        <Fragment>
                <Spacer w={1}/>
                <Text small>for a depth of</Text>
                <Spacer w={1}/>
                <Select placeholder="Choose one" onChange={onValueChange} initialValue="1" width="20%">
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                </Select>
            </Fragment>
            <Spacer w={1}/>
            <Button icon={<Search />} auto onClick={onSubmitButtonPressed}></Button>
        </div> */}
    </div>
  );
};

export default SearchButton;