## Studily is a 
<img width="300" alt="image" src="https://github.com/codeforcoffee-studio/studily-frontend/assets/26547344/dc6b489c-7d04-4339-8b87-191610433244">  

## Product Design
<img width="701" alt="image" src="https://github.com/codeforcoffee-studio/studily-frontend/assets/26547344/c74c12d9-8f53-4698-a95d-008872b50e2b">
<img width="720" alt="image" src="https://github.com/codeforcoffee-studio/studily-frontend/assets/26547344/cbf64568-0333-41b7-a9d4-90a3cfecde57">
<img width="727" alt="image" src="https://github.com/codeforcoffee-studio/studily-frontend/assets/26547344/62aaa1d4-f56c-4884-9570-9ad959df3400">

The user interface can be split into 5 main components.  
<img width="500" alt="image" src="https://github.com/codeforcoffee-studio/studily-frontend/assets/26547344/01555109-87db-402a-b067-d411b0ea8545">  
Where:
1. Search bar - enter key term here
2. Knowledge graph - a knowledge graph is generated based on the key term, clicking on a node will generate the information on the right
3. Knowledge graph options - options to manipulate the knowledge (1) center graph with gravity toggle (2) increase node size (3) perform depth first search / breadth first search on a specific node
4. Key term summary - uses ChatGPT to provide a simple definition of the word.
5. Related Sources - a list of related sources generated from API's like Wikipedia, YouTube, Bing, etc. The sources can be directly opened or if possible, summarized.


## run locally
- `npm install --force`  
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
