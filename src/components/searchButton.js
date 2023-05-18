import React, { Fragment, useEffect, useState } from "react";
import { Grid, Card, Text, Spacer, Input, Button, Spinner } from '@geist-ui/core';
import { Circle } from '@geist-ui/icons';



const SearchButton = ({node}) => {
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
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

  return (
    <div style={styles.divrow}>
        <Text>breath-first search on</Text>
        <Spacer w={1}/>
        <Button
            icon={<Circle />} auto
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ background: isHovered ? 'lightblue' : 'white' }}
        >
            {
                node ?
                node.label
                :
                ""
            }
        </Button>
    </div>
  );
};

export default SearchButton;