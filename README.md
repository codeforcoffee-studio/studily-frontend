## run locally
- `npm install --force`  
- `npm install --force react-bootstrap`
- `npm start`

## project structure
- main component: `App.js`, which splits the page into two parts
    - search & knowledge graph
        - /components/`searchButton.js` - breath & depth search
        - /components/`knowledgeGraph.js` - graph & nodes
    - information display 
        - /components/`infoPage.js`: definition, wiki, youtube

## libraries
- React: https://react.dev/
- Geist UI: https://geist-ui.dev/en-us 
- Vis-React: https://github.com/anishmprasad/vis-react
    - more on vis: https://visjs.github.io/vis-network/docs/network/index.html
- Axios: https://axios-http.com/
- React bootstrap: https://react-bootstrap.netlify.app/