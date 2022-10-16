import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "@themesberg/react-bootstrap";
import Sidebar from "../components/Sidebar";
import { httpClient } from "../constants/api";
import { EXAM } from "../constants/AppConst";
import { useParams  } from "react-router-dom";
import "../assets/manage_user.css";
import Preloader from "../components/Preloader";
import { Formik } from "formik";
import { initialValues, responseData, showblock, Schema1,Schema2 } from "../constants/add-exam";
import { app } from "../firebase/fireabseConfig";
// import firebase from ''
function AddExam() {
  const { id } = useParams();
  const [allData, setAllData] = useState([])
  const [show,setShow] = useState(showblock)
  const [loading, setLoading] = useState(false)
  const [validation ,setValidation]=useState(Schema2)

const obj = async () => {

  const result = await httpClient.get(EXAM.GET_ALL).then((res)=> {
    setAllData(res.data)
    console.log(res.data)
  });
}
useEffect(() => {
 var storageRef = app;
console.log(storageRef)
}, [])

const postData = async (values) => {

  
  try {
    setLoading(true);
    
    await httpClient.post(EXAM.ADD_EXAM,values)
  } catch (err) {
  } finally {
    setLoading(false);
  }
  
}
 const filterArray = (i) => {
  const result = showblock.map((value,index)=> {
    if(index== i){
      value = true
    }
    return value
 })
 setShow(result)
 }
useEffect(() => {
obj()
}, [])
const search = (index,searchTerm) => {
const results = [];
const filterData = responseData[index]
console.log("Map Data"+index,allData[filterData])
 const dat = allData[filterData]?.map((item) => {
    const name = item.name.toString().toLowerCase();
    const newName = item.name.toString().toUpperCase()
    if (name.includes(searchTerm)||newName.includes(searchTerm)) {
      results.push(item)
    }

})
  return  results
};
  return (
   <Formik
     initialValues={initialValues}
     validationSchema={validation}
     onSubmit={values => 
      alert("SUbmit Worked")
      // postData(values)
    }
   >
     {({ handleChange,errors,touched ,handleBlur, setFieldValue,handleSubmit, values }) => (
    <>

      
      <Sidebar />
      <main className="content main-class" onClick={()=> setShow(showblock)}>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <h5>
            Add Exam:
          </h5>
        </div>
        <Form >
          <Row>
            {Object.keys(initialValues).map((value,index) => (


              <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                 
  <Form.Control
              type="text"
              placeholder={value}
              required
              name={value}
              value={values[value]}
              onBlur={()=> {search("");filterArray(index)}}
              onChange={(e) => {handleChange(e);search(e.target.value);filterArray(index)}}
               autoComplete="off"
              style={{width:"auto"}}
              className="inputj"
              />
            <div style={{display:show[index]?"block":"none"}}>
           <p style={{
             position:"absolute",
             backgroundColor:"white"
            }}>{
            search(index,values[value]).map((valuee,index) => (
              <li 
              className="lili"
              key={index}
              onClick={() => {setFieldValue(value.toString(),valuee.name);setShow(showblock)}}
              >
               {valuee.name?valuee.name:"No Search Results"} 
              </li>
            ))}
            
          </p>
            </div> 
              </Form.Group>
            <p className="error-message">{errors[value]}</p>
            </Col>
                
             ))} 
           
          </Row>
          
       
          <Row>
            <Col md={6}>
              <Button variant="success" onClick={handleSubmit} className="m-1" size="lg" type="submit">
                {id ? "Update" : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </main>
      <Preloader show={loading} />
    </>
                )}
                </Formik>
  );
}

export default AddExam;
