import {
  Col,
  Row,
  Button,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import React, { useState } from "react";
import SelectInput from "../components/AutoComplete";
import Sidebar from "../components/Sidebar";

const options = [{ label: "apple" }, { label: "banana" }, { label: "pear" }];

function AddExam() {
  const [values, setValues] = useState("");
  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    console.log(values);
  };

  return (
    <>
      <Sidebar />
      <main className="content">
        <div className="py-4">
          <h5 className="py-2">Add Exam</h5>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="exam_types"
                placeholder="Exam"
                handleChange={handleChange}
                options={options}
                value={values.exam_types}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="classes"
                placeholder="Class"
                handleChange={handleChange}
                options={options}
                value={values.classes}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="subjects"
                placeholder="Subject"
                handleChange={handleChange}
                options={options}
                value={values.subjects}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="units"
                placeholder="Unit"
                handleChange={handleChange}
                options={options}
                value={values.units}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="chapters"
                placeholder="Chapter"
                handleChange={handleChange}
                options={options}
                value={values.chapters}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="topics"
                placeholder="Topic"
                handleChange={handleChange}
                options={options}
                value={values.topics}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="subtopics"
                placeholder="Sub topic"
                handleChange={handleChange}
                options={options}
                value={values.subtopics}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="questiontypes"
                placeholder="Question Type"
                handleChange={handleChange}
                options={options}
                value={values.questiontypes}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="temp1"
                placeholder="Temp1"
                handleChange={handleChange}
                options={options}
                value={values.temp1}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="temp2"
                placeholder="Temp2"
                handleChange={handleChange}
                options={options}
                value={values.temp2}
              />
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <SelectInput
                name="temp3"
                placeholder="Temp3"
                handleChange={handleChange}
                options={options}
                value={values.temp3}
              />
            </Col>
          </Row>
          <Row>
            <Button onClick={handleSubmit}>Submit</Button>
          </Row>
        </div>
      </main>
    </>
  );
}

export default AddExam;
