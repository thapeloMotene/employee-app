const express = require('express');
const httpProxy = require('http-proxy');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const BackendURL = process.env.BackendURL || "https://techtestapi.azurewebsites.net";


apiProxy = httpProxy.createProxyServer();


app.use(express.static(path.join(__dirname, 'dist/employee-app')));

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Proxies all api request to techtestapi
app.all("/api/*", function(req, res) {

    apiProxy.web(req, res, {changeOrigin: true,target: BackendURL});
});

app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/employee-app/index.html'));
});

app.listen(3000, ()=>{
  console.log('express server running on port 3000');
})



 


