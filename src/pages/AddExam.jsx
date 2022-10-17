import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "@themesberg/react-bootstrap";
import Sidebar from "../components/Sidebar";
import { httpClient } from "../constants/api";
import { EXAM } from "../constants/AppConst";
import { useParams } from "react-router-dom";
import "../assets/manage_user.css";
import Preloader from "../components/Preloader";
import { Formik } from "formik";
import {
  initialValues,
  responseData,
  showblock,
  Schema1,
  Schema2,
  Schema3,
  Schema4,
  Schema5,
  Schema6,
} from "../constants/add-exam";
import { app } from "../firebase/fireabseConfig";

function AddExam() {
  const { id } = useParams();
  const [allData, setAllData] = useState([]);
  const [show, setShow] = useState(showblock);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(Schema1);

  const obj = async () => {
    const result = await httpClient.get(EXAM.GET_ALL).then((res) => {
      setAllData(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    var storageRef = app;
    console.log(storageRef);
  }, []);

  const postData = async (values) => {
    try {
      setLoading(true);

      await httpClient.post(EXAM.ADD_EXAM, values);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const filterArray = (i) => {
    const result = showblock.map((value, index) => {
      if (index == i) {
        value = true;
      }
      return value;
    });
    setShow(result);
  };

  useEffect(() => {
    obj();
  }, []);
  const search = (index, searchTerm) => {
    const results = [];
    const filterData = responseData[index];
    const dat = allData[filterData]?.map((item) => {
      const name = item.name.toString().toLowerCase();
      const newName = item.name.toString().toUpperCase();
      if (name.includes(searchTerm) || newName.includes(searchTerm)) {
        results.push(item);
      }
    });
    return results;
  };
  var d = initialValues;
  const validationCheck = (da, e) => {
    const { name, value } = e.target;
    d = { ...d, [name]: value };
    console.log(value);
    if ((name === "subTopic" && value !== "") || da.subTopic !== "") {
      setValidation(Schema6);
    } else if ((name == "topic" && value !== "") || da.topic !== "") {
      setValidation(Schema5);
    } else if ((name == "chapter" && value !== "") || da.chapter !== "") {
      setValidation(Schema4);
    } else if ((name == "unit" && value !== "") || da.unit !== "") {
      setValidation(Schema3);
    } else if ((name == "subject" && value !== "") || da.subject !== "") {
      setValidation(Schema2);
    } else if ((name == "class" && value !== "") || da.class !== "") {
      setValidation(Schema1);
    } else if ((name == "examType" && value !== "") || da.examType !== "") {
      setValidation(Schema1);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={(values, { resetForm }) =>
        // alert("Submit Worked")
        {
          postData(values);
          resetForm({ values: initialValues });
        }
      }
    >
      {({ handleChange, errors, setFieldValue, handleSubmit, values }) => (
        <>
          <Sidebar />
          <main
            className="content main-class"
            onClick={() => setShow(showblock)}
          >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
              <h5>Add Exam:</h5>
            </div>
            <Form>
              <Row>
                {Object.keys(initialValues).map((value, index) => (
                  <Col xs={12} xl={3} className="mb-4">
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder={value}
                        required
                        name={value}
                        value={values[value]}
                        onBlur={(e) => {
                          filterArray(index);
                          console.log("Blur", e);
                          // filterArray(index);
                        }}
                        onChange={(e) => {
                          handleChange(e);
                          search(e.target.value);
                          filterArray(index);
                          validationCheck(values, e);
                        }}
                        autoComplete="off"
                        style={{ width: "auto" }}
                        className="inputj"
                      />

                      <div style={{ display: show[index] ? "block" : "none" }}>
                        <p
                          style={{
                            position: "absolute",
                            backgroundColor: "white",
                          }}
                        >
                          {search(index, values[value]).map((valuee, index) => (
                            <li
                              className="lili"
                              key={index}
                              onClick={() => {
                                setFieldValue(value.toString(), valuee.name);
                                setShow(showblock);
                              }}
                            >
                              {valuee.name ? valuee.name : "No Search Results"}
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
                  <Button
                    variant="success"
                    onClick={handleSubmit}
                    className="m-1"
                    size="lg"
                    type="submit"
                  >
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
