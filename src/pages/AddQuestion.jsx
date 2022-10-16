import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "@themesberg/react-bootstrap";
import Sidebar from "../components/Sidebar";
import { httpClient } from "../constants/api";
import { QUESTION } from "../constants/AppConst";
import { useParams, useNavigate } from "react-router-dom";
// import MathJax from "react-mathjax";
import "../assets/manage_user.css";
import Preloader from "../components/Preloader";
// import Latex from "react-latex";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import $ from "jquery";
import parse from "html-react-parser";
import { storage } from '../firebase/fireabseConfig';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
};
// const test =
//   "<div> You don't have to worry <br/> about nesting components inside a MathJax component, the math will be found and converted <span>($10 / 3 \\approx 3.33$)</span> <br /> \\(\\frac{25x}{10} = 2^{10}\\) \\(\\vec{B}\\) </div>";
function AddViewQuestion() {
const [imgUrl, setImgUrl] = useState();
const [progresspercent, setProgresspercent] = useState(0);

const [percent, setPercent] = useState()

  const { id } = useParams();
  const navigate = useNavigate();
  const userType = localStorage.getItem("adminType");
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState("");
  const [fields, setFields] = useState("");

  useEffect(() => {
    viewAllFields();
  }, [id]);

  const getQuestionById = async () => {
    try {
      setLoading(true);
      const result = await httpClient.get(
        QUESTION.VIEW_QUESTION.replace("{id}", id)
      );
      manageOptions(result.data);
      // setValues(result.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const manageOptions = (data) => {
    const options = data?.optionLatex.split(":|:|:");
    data["option1"] = options[0];
    data["option2"] = options[1];
    data["option3"] = options[2];
    data["option4"] = options[3];
    setValues(data);
  };

  const viewAllFields = async () => {
    try {
      setLoading(true);
      const result = await httpClient.get(QUESTION.VIEW_ALL_FIELDS);
      setFields(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    values["solution"] = "NA";
    values["optionLatex"] =
      values?.option1 +
      ":|:|:" +
      values?.option2 +
      ":|:|:" +
      values?.option3 +
      ":|:|:" +
      values?.option4;
    delete values.option1;
    delete values.option2;
    delete values.option3;
    delete values.option4;
    try {
      setLoading(true);

      const result = await httpClient.post(QUESTION.ADD_QUESTION, values);

      navigate("/dashboard");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const [file, setFile] = useState("");
  const handleChecked = (value) => {
    if (value && values.correctAns) {
      return values.correctAns === value ? true : false;
    } else return false;
  };
  function handleImageChange(event) {
    setFile(event.target.files[0]);
}
const handleUpload = (name ,check) => {
  if (!file) {
      alert("Please upload an image first!");
  }
  const storageRef = ref(storage, `/images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  console.log("Upload Task",uploadTask)
  uploadTask.on(
      "state_changed",
      (snapshot) => {
          const percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent);
      },
      (err) => console.log(err),
      () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log("Download URL",url);
              const doubleCheck = values[name] == undefined ? "":values[name]
              const dataa = doubleCheck + `\n <img src="${url}"/>`
    setValues({ ...values, [name]: dataa });
          });
      }
  );
};
  const handleLatexData = (text) => {
    // console.log({ text });
    // const test = text.replace(new RegExp("\f"), "\\f");
    // let find = "<latex>";
    // let re = new RegExp(find, "g");
    // // let str = test.replace(re, "\\(");

    // let find2 = "</latex>";
    // let re2 = new RegExp(find2, "g");

    // let str2 = str.replace(re2, `\\)`);

    // let find3 = "//";
    // let re3 = new RegExp(find3, "g");

    // let str3 = str2.replace(re3, "/");
    // // console.log({ str3 });

    // return parse(str3);
  };

  return (
    <>
      <Sidebar />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <h5>
            QUES ID:<span>{values.id ? values.id : ""}</span>{" "}
          </h5>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="examTypeName"
                  value={values.examTypeName}
                >
                  <option value={""}>Exam</option>
                  {fields?.allExamtypes?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                  {/* <option>Two</option>
                  <option>Three</option> */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="className"
                  value={values.className}
                >
                  <option value="">Class</option>
                  {fields?.allClasses?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="subjectName"
                  value={values.subjectName}
                >
                  <option value="">Subject</option>
                  {fields?.allSubjects?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="unitName"
                  value={values.unitName}
                >
                  <option value="">Unit</option>
                  {fields?.allUnit?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="chapterName"
                  value={values.chapterName}
                >
                  <option value="">Chapter</option>
                  {fields?.allChapter?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="topicName"
                  value={values.topicName}
                >
                  <option value="">Topic</option>
                  {fields?.allTopic?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="subTopicName"
                  value={values.subTopicName}
                >
                  <option value="">Sub Topic</option>
                  {fields?.allSubtopic?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="temp1Name"
                  value={values.temp1Name}
                >
                  <option value="">Temp 1</option>
                  {fields?.temp1?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="temp2Name"
                  value={values.temp2Name}
                >
                  <option value="">Temp 2</option>
                  {fields?.temp2?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Select
                  onChange={handleChange}
                  name="temp3Name"
                  value={values.temp3Name}
                >
                  <option value="">Temp 3</option>
                  {fields?.temp3?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={3} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Label>Question Type</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  name="questionTypeName"
                  value={values.questionTypeName}
                >
                  <option value="">Type</option>
                  {fields?.allQuestionType?.map((e, i) => (
                    <option value={e.name} key={i}>
                      {e.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <input type="file" onChange={handleImageChange} accept="/image/*" />
            <Button onClick={()=>handleUpload("quesLatex")}>Upload Question Latex</Button>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>QUESTION LATEX (TEXT BOX)</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows="4"
                  onChange={handleChange}
                  name="quesLatex"
                  value={values.quesLatex}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>QUESTION LATEX VIEW</Form.Label>
                <div className="view_question_latex">
                  {values.quesLatex && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.quesLatex)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <fieldset>
            <Row>
              <Form.Label>OPTION LATEX</Form.Label>
              <div style={{display:"flex"}}>

           <input type="file" onChange={handleImageChange} accept="/image/*" />
            <Button onClick={()=>handleUpload("option1")}>Option 1</Button>  
              </div>
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
                  required
                  checked={handleChecked(values.option1)}
                  type="radio"
                  value={values.option1}
                  name="correctAns"
                  id="radio1"
                  htmlFor="radio1"
                  onChange={handleChange}
                />
              </Col>
              <Col md={5} xs={5} className="mt-2">
                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="option1"
                    onChange={handleChange}
                    name="option1"
                    value={values.option1}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={6} className="mt-2">
                <Form.Group className="mb-3">
                  <div className="view_option_latex">
                    {values.option1 && (
                      <MathJaxContext version={3} config={config}>
                        <MathJax inline dynamic>
                          {handleLatexData(values.option1)}
                        </MathJax>
                      </MathJaxContext>
                    )}
                  </div>
                </Form.Group>
              </Col>
 <div style={{display:"flex"}}>

           <input type="file" onChange={handleImageChange} accept="/image/*" />
            <Button onClick={()=>handleUpload("option2")}>Option 2</Button>  
              </div>
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
                  required
                  type="radio"
                  checked={handleChecked(values.option2)}
                  name="correctAns"
                  id="radio1"
                  htmlFor="radio1"
                  onChange={handleChange}
                  value={values.option2}
                />
              </Col>
              <Col md={5} xs={5} className="mt-2">
                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="option2"
                    onChange={handleChange}
                    name="option2"
                    value={values.option2}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={6} className="mt-2">
                <div className="view_option_latex">
                  {values.option2 && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.option2)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
              </Col> <div style={{display:"flex"}}>

           <input type="file" onChange={handleImageChange} accept="/image/*" />
            <Button onClick={()=>handleUpload("option3")}>Option 3</Button>  
              </div>
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
                  required
                  type="radio"
                  checked={handleChecked(values.option3)}
                  name="correctAns"
                  id="radio1"
                  htmlFor="radio1"
                  onChange={handleChange}
                  value={values.option3}
                />
              </Col>
              <Col md={5} xs={5} className="mt-2">
                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="option3"
                    onChange={handleChange}
                    name="option3"
                    value={values.option3}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={6} className="mt-2">
                <div className="view_option_latex">
                  {values.option3 && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.option3)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
              </Col> <div style={{display:"flex"}}>

           <input type="file" onChange={handleImageChange} accept="/image/*" />
            <Button onClick={()=>handleUpload("option4")}>Option 4</Button>  
              </div>
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
                  required
                  type="radio"
                  checked={handleChecked(values.option4)}
                  name="correctAns"
                  id="radio1"
                  htmlFor="radio1"
                  onChange={handleChange}
                  value={values.option4}
                />
              </Col>
              <Col md={5} xs={5} className="mt-2">
                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    type="text"
                    placeholder="option4"
                    onChange={handleChange}
                    name="option4"
                    value={values.option4}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={6} className="mt-2">
                <div className="view_option_latex">
                  {values.option4 && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.option4)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
              </Col>
            </Row>
          </fieldset>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>SOLUTION LATEX (TEXT BOX)</Form.Label>

  <div style={{display:"flex"}}>

           <input type="file" onChange={handleImageChange} accept="/image/*" />
            <Button onClick={()=>handleUpload("solLatex")}>Upload Solution Latex</Button>  
              </div>               <Form.Control
                  required
                  as="textarea"
                  rows="4"
                  onChange={handleChange}
                  name="solLatex"
                  value={values.solLatex}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>SOLUTION LATEX VIEW</Form.Label>
                {/* <MathJax.Provider>
                  <div className="view_question_latex">
                    {values.solLatex && (
                      <MathJax.Node
                        formula={handleLatexData(values.solLatex)}
                      />
                    )}
                  </div>
                </MathJax.Provider> */}
                <div className="view_question_latex">
                  {values.solLatex && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.solLatex)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="text-end">
              <Button
                variant="danger"
                className="m-1 "
                size="lg"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
            </Col>

            <Col md={6}>
            {userType === "superadmin" && (
              <Button variant="success" className="m-1" size="lg" type="submit">
                {id ? "Update" : "Submit"}
              </Button>
            )}
            </Col>
          </Row>
        </Form>
      </main>
      <Preloader show={loading} />
    </>
  );
}

export default AddViewQuestion;
