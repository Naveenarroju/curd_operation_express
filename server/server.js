const express = require('express');
const axios = require('axios');
const cors = require('cors');
const logger = require('winston');


const app = express();
const Port = process.env.Port || 5000;

 // Enable CORS for all routes
 app.use(cors());
 app.use(express.json());

function getHostName(){
const port = window.location.port;
const hostName = window.location.hostname;
if(hostName === "localhost"){
    return 'http://localhost:3000'
}
const formUrl = window.location.protocol + '//' + port + hostName;
const location = port ? formUrl + ':' + port : formUrl;
const urlParsed = new URL(location);
const { origin } = urlParsed;
return origin;
}

/*
const postApiFunction = async (url, payload) =>{
    const options = {
        method:'POST',
        headers: {'Content-Type' : 'applicaton/json'},
        body: JSON.stringify(payload)
    };
    const response = await fetch(url, options);
    if(!response.ok){
        const message = `An error has occured: ${response.status}`;
        throw new Error(message, {cause:response.status});
    }
    const result = await response.json();
    return result;
};

const getApiFunction = async (url) =>{
    const response = await fetch(url);
    if(!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message, {cause:response.status});
    }
    const result = await response.json();
    return result;
}

async function getDemo() {
    const url = getHostName() + '/someEndpoint';
    return getApiFunction(url);
}

async function postDemo(){
    const URL = getHostName() + '/api/somePostEndPoint/postCall';
    const domain = 'someService';
    const params = { adminFlag : adminFlag, userId: userId};
    return postApiFunction(URL, {url:'Endpoint', domain, params}) 

}
*/

app.get('/',(req,res)=>{
    res.send('express server')
})

app.get('/posts',async (req,res)=>{
    try{
        const response =await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;
        res.json(posts);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
})

app.post('/post', async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title,
            body,
            userId
        });
        console.log(response);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
});


app.put('/replace', async (req, res) =>{
    const { title, body, userId } = req.body;
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/100',{
        method:'PUT',
        body:JSON.stringify({
            title,
            body,
            userId
        }),
        headers:{
            'content-type':'application/json'
        },
    });
    let data = await response.json();
    console.log(data);
    res.json(data)
} )

app.delete('/remove', async (req, res)=>{
    fetch('https://jsonplaceholder.typicode.com/posts/100', {
        method: 'DELETE',
    })
})

app.listen(Port, ()=>{
    console.log('I am lisiting on port '+Port)
})