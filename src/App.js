import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
const [posts, setPosts] = useState([])
const [Heading, setHeading] = useState([])

  useEffect(()=>{
    const displayPage = async () =>{
      try{
        const response = await axios.get('http://localhost:5000/');
        setHeading(response.data)
      }catch(error){
        console.log(error)
      }
    }
    displayPage();
    },[]);
    

    //this is to handle get request
    async function handleGet(){
      try{
        const response = await axios.get('/posts');
        setPosts(response.data.sort((a, b) => b.id - a.id));
      }catch(error){
        console.log(error)
      }
    
    }


    const handlePost = async() =>{
      let reponse = await fetch('/post', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
       body: JSON.stringify({
        title: 'RRR',
        body: 'Freedom fighters',
        userId: '10',
      }),
    });
    let data = await reponse.json();
    console.log(data)
    setPosts((prev) => [data, ...prev]);
    } 

    const handlePut = async () =>{
      try {
        const response = await axios.put('/replace',{
          title: 'RRR',
          body: 'Freedom fighters',
          userId: '10',
        });
        setPosts((prev) => [response.data, ...prev]);
      }catch (error) {
        console.log(error)
      }

    }

    const handleDelete = async() =>{
    fetch('/remove',{
          method: 'DELETE',
        }).then(res => {
          if(res.status === 200) console.log('Deleted')
          else console.log('Not Deleted');
        })
    }


  return (
    <div className="App">
    <h1>{Heading}</h1>
      <div style={{margin:'20px'}}>
      <button style={{margin:'10px'}} onClick={handleGet}>GET</button>
      <button style={{margin:'10px'}} onClick={handlePost}>POST</button>
      <button  style={{margin:'10px'}} onClick={handlePut}>PUT</button>
      <button style={{margin:'10px'}} onClick={handleDelete}>DELETE</button>
      </div>
        <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Tile</th>
          <th>Body</th>
        </tr>
        </thead>
        <tbody>
        {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
     </table>
    </div>
  );
}

export default App;
