import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "@themesberg/react-bootstrap";
import Sidebar from "../components/Sidebar";
import { httpClient } from "../constants/api";
import { EXAM, QUESTION } from "../constants/AppConst";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/manage_user.css";
import Preloader from "../components/Preloader";
import { Formik } from "formik";
import { Dropdown } from "semantic-ui-react";
import { initialValues, responseData, showblock } from "../constants/add-exam";

function AddExam() {
  const { id } = useParams();
  const [data, setData] = useState("")
  const [allData, setAllData] = useState([])
  const [show,setShow] = useState(showblock)
const countryOptions = [
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },

]
const obj = async () => {

  const result = await httpClient.get(EXAM.GET_ALL).then((res)=> {
    setAllData(res.data)
    console.log(res.data)
  });
}
 const filterArray = (i) => {
  console.log(show)
  const result = showblock.map((value,index)=> {
    if(index== i){
      value = true
    }
    return value
 })

 Object.keys(initialValues).map((value) => console.log(value))
 console.log(result)
 setShow(result)
 }
useEffect(() => {
obj()
}, [])

console.log(show)
  return (
   <Formik
     initialValues={initialValues}
     onSubmit={values => console.log(values)}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
    <>

      
      <Sidebar />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <h5>
            Add Exam:
          </h5>
        </div>
        <Form onSubmit={() => console.log("Hello")}>
          <Row>
            {Object.keys(initialValues).map((value,index) => (


              <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                 
  <Form.Control
              type="text"
              placeholder={value}
              name={value}
              required
              value={values[value]}
              onChange={(e) => {handleChange(e);filterArray(index)}}
              // onClick={()=> setShow('block')}
              autoComplete="off"
              style={{ width: 'auto' }}
              />
             <p
            style={{
              width: 300,
              borderRadius: 7,
              border: "1px solid #f9f9f9",
              margin: 0,
              padding: 6,
              display:show[index] ? "block":"none",
              cursor: "pointer",
              position:"absolute",
              backgroundColor:"white"
            }}
          >{
            ["IIT","NEET"].map((number) => (
              <li
              style={{ listStyleType: "none" }}
              key={number}
              // onClick={() => newFunc(number.text)}
              >
                {number}
              </li>
            ))
            }
          </p>
              </Form.Group>
            </Col>
                ))}
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
             
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
               
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
            
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
              
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
              
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
               
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
               
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
           
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
               
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>QUESTION LATEX (TEXT BOX)</Form.Label>
             
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>QUESTION LATEX VIEW</Form.Label>
              </Form.Group>
            </Col>
          </Row>
       
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>SOLUTION LATEX (TEXT BOX)</Form.Label>
               
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>SOLUTION LATEX VIEW</Form.Label>
          
              
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="text-end">
              <Button
                variant="danger"
                className="m-1 "
                size="lg"
                onClick={() => console.log("/dashboard")}
              >
                Cancel
              </Button>
            </Col>

            <Col md={6}>
              <Button variant="success" className="m-1" size="lg" type="submit">
                {id ? "Update" : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </main>
      {/* <Preloader show={loading} /> */}
    </>
                )}
                </Formik>
  );
}

export default AddExam;
