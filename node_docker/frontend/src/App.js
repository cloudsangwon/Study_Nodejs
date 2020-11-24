import {useState,useEffect} from 'react';
import './App.css';
import Axios from 'axios';
function App() {

  const [serviceName,SetServiceName]=useState('');
  const [serviceReview,SetServiceReview] = useState('');
  const [serviceReviewList, setServiceList] = useState([]);
  const [newReview, setNewReview] =  useState('');

   useEffect(()=>{
      Axios.get('http://localhost:5000/api/get').then((response)=>{
        setServiceList(response.data);
      })
    })
  const submitReview = () => {
    Axios.post('http://localhost:5000/api/insert', {
      serviceName:serviceName,
      serviceReview:serviceReview
    }) 
    setServiceList([
      ...serviceReviewList,
      {serviceName:serviceName,serviceReview:serviceReview}
    ]);
    //.then(()=>{

      //console.log("submitReview!!!");
      //alert("Success Insert");
  };

  const deleteReview = (service) => {
    Axios.delete(`http://localhost:5000/api/delete/${service}`);
  }

  const updateReview = (service) => {
    Axios.put("http://localhost:5000/api/update", {
      serviceName:service,
      serviceReview:newReview
    });
    setNewReview("");
  }
  return (
    <div className="App">
      <h1>CRUD NodeJs + React </h1>
        <div className="form">
          <label> Service Name :</label>
          <input type="text" name="serviceName" onChange={(e)=>{
            SetServiceName(e.target.value);
          }}/>
          <label> Service Review :</label>
          <input type="text" name="serviceReview" onChange={(e)=>{
            SetServiceReview(e.target.value);
          }}/>
          <button onClick={submitReview}>Submit</button>
          {serviceReviewList.map((val)=>{
              return(
                <div className="card">
                  <h1>{val.serviceName}</h1>
                  <p>{val.serviceReview}</p>
                  <button onClick={()=>{deleteReview(val.serviceName)}}>Delete</button>
                  <input type="text" id="updateInput" onChange={(e)=> {
                    setNewReview(e.target.value);
                  }}/>
                  <button onClick={() => {updateReview(val.serviceName)}}>Update</button>
                </div>
              );

          })}
        </div>
    </div>
  );
}

export default App;
