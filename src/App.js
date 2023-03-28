import './App.css';
import VisReact from "./visreact";

import "./styles.css";
import { Grid, Card, Text} from '@geist-ui/core'

const App = () => {
  return (
    <div className="App">
      <Grid.Container gap={0} justify="center" align='center' height="100%">
        <Grid xs={24} md={12}>
          {/* <Card shadow width="100%" height="200px" /> */}
          <div className="vis-react">
            <VisReact />
          </div>
        </Grid>
        <Grid xs={12} md={12}>
          <Card hoverable width="100%" height="200px" >
            <Text h1>Start our Geist journey.</Text>  
          </Card>
        </Grid>
      </Grid.Container>
    </div>
  );
}



export default App;
