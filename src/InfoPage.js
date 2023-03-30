import React, {useState, useEffect} from 'react';
import { Card, Text} from '@geist-ui/core'

import nodeDetails from "./mockData.json";

const InfoPage = ({node}) => {
    return (
        <Card hoverable width="100%" height="100%" >
            {
                node !== undefined ? 
                <>
                    <Text h1>{nodeDetails[node].title}</Text>  
                    <Text h3>{nodeDetails[node].info}</Text>  
                </>
                :
                <></>
            }
           
        </Card>
    );
}


export default InfoPage;