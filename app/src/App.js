import React,{ useEffect, useState }  from "react";
import './App.css';
import CreateUser from './components/CreateUser'

export const App = () => {
  const [iniState, setIniState] = useState([])
  useEffect(()=> {
    fetchData()
  }, [])

  const fetchData = () => {
    fetch('/getposts')
    .then(res => res.json())
    .then(data => setIniState(data))
  }
 
  const RemoveData =(id)=> {
    fetch(`/deletepost/${id}`)
    .then(res => res.json())
     .then(res =>  fetchData())
  }

  return (
    <div className="App">
      <CreateUser data={iniState} handlefetchMe={fetchData}/>
      {iniState.map((item) => <p key={item.id}>
        { item.id }{ item.title } { item.body }
        <button onClick={() => RemoveData(item.id)}>Odeber POST</button>
      </p>)}
    </div>
  );
}


  
// const AddData = () => {
  
  // const data = { title: 'dawdaw', body:'ZZZZZZZZ' };
  // fetch('/addpost', {
  //   method: 'POST', // or 'PUT'
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })
  
  
  // const article = { title: 'React Hooks POST Request Example', body:'xxxxxxxs' };
  // axios.post('/addpost', article)
  //   .then(response => console.log( response ));

  // // fetch('/addpost')
  //   .then(res => res.json())
  //   .then(res => fetchData()) 
  // }
