import React, { useEffect, useState } from "react";
import { Button, Row, Col, Form } from "@themesberg/react-bootstrap";
import Sidebar from "../components/Sidebar";
import { httpClient } from "../constants/api";
import { QUESTION } from "../constants/AppConst";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/manage_user.css";
import Preloader from "../components/Preloader";
import { MathJax, MathJaxContext } from "better-react-mathjax";

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

function ViewQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userType = localStorage.getItem("adminType");
  const [values, setValues] = useState("");
  const [loading, setLoading] = useState("");
  const [fields, setFields] = useState("");

  useEffect(() => {
    viewAllFields();
    getQuestionById();
  }, [id]);

  const getQuestionById = async () => {
    try {
      setLoading(true);
      const result = await httpClient.get(
        QUESTION.VIEW_QUESTION.replace("{id}", id)
      );
      manageOptions(result.data);
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      const result = await httpClient.delete(
        QUESTION.DELETE_QUESTION.replace("{id}", id)
      );
      navigate("/dashboard");
      console.log({ result });
    } catch (err) {
    } finally {
      setLoading(false);
    }
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

      const result = await httpClient.patch(
        QUESTION.UPDATE_QUESTION.replace("{id}", id),
        values,
        values
      );

      navigate("/dashboard");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const handleChecked = (value) => {
    if (value && values.correctAns) {
      return values.correctAns === value ? true : false;
    } else return false;
  };

  const handleLatexData = (text) => {
    const test = text.replace(new RegExp("\f"), "\\f");
    let find = "<latex>";
    let re = new RegExp(find, "g");
    let str = test.replace(re, "\\(");

    let find2 = "</latex>";
    let re2 = new RegExp(find2, "g");

    let str2 = str.replace(re2, `\\)`);

    let find3 = "//";
    let re3 = new RegExp(find3, "g");

    let str3 = str2.replace(re3, "/");

    return <div dangerouslySetInnerHTML={{ __html: str3 }} />;
  };

  // const testi = (data) => {
  //   return parse(test);
  //   //  return `\\(\\frac{25x}{10} = 2^{10}\\)`
  //   // return "You don't have to worry about nesting components inside a MathJax component, the math will be found and converted <span>{`($10 / 3 \\approx 3.33$)`}</span> <br />{`\\(\\frac{25x}{10} = 2^{10}\\)`} {`\\(\\vec{B}\\)`}"
  // };
  console.log({ values });
  return (
    <>
      <Sidebar />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <h5>
            QUES ID:<span>{values.id ? values.id : ""}</span>{" "}
          </h5>
          {id && userType === "superadmin" && (
            <Button variant="danger" size="md" onClick={handleDelete}>
              Delete
            </Button>
          )}
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
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>QUESTION LATEX (TEXT BOX)</Form.Label>
                <Form.Control
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
                {/* <MathJax.Provider >
                  <div className="view_question_latex">
                    {values.quesLatex && (
                      <MathJax.Node
                      config={config}
                        formula={handleLatexData(values.quesLatex)}
                      />
                    )}
                  </div>
                </MathJax.Provider> */}

                {/* <div className="view_question_latex">
                  <LatexHandler rawLatex={"frac{1}{4}"} />
                </div> */}
                <div className="view_question_latex">
                  {values.quesLatex && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.quesLatex)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
                {/* <div className="view_question_latex">
                  <MathJaxContext version={3} config={config}>
                    <MathJax hideUntilTypeset={"first"}>
                      <div>
                        <div>
                          You don't have to worry about nesting components
                          inside a MathJax component, the math will be found and
                          converted <span>{`($10 / 3 \\approx 3.33$)`}</span>
                          <br />
                          {`\\(\\frac{25x}{10} = 2^{10}\\)`}
                          {`\\(\\vec{B}\\)`}
                        </div>
                        <div>
                          <p style={{ textAlign: "center" }}>
                            <i>Equation:</i> <span>{`$10 + 2x = 150$`}</span>
                          </p>
                        </div>
                      </div>
                    </MathJax>
                  </MathJaxContext>
                </div> */}
              </Form.Group>
            </Col>
          </Row>
          <fieldset>
            <Row>
              <Form.Label>OPTION LATEX</Form.Label>
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
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
                  {/* <Form.Control type="text" /> */}
                  {/* <MathJax.Provider>
                    <div className="view_option_latex">
                      {values.option1 && (
                        <MathJax.Node
                          formula={handleLatexData(values.option1)}
                        />
                      )}
                    </div>
                  </MathJax.Provider> */}
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
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
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
                    type="text"
                    placeholder="option2"
                    onChange={handleChange}
                    name="option2"
                    value={values.option2}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={6} className="mt-2">
                {/* <MathJax.Provider>
                  <div className="view_option_latex">
                    {values.option2 && (
                      <>
                        <MathJax.Node
                          formula={handleLatexData(values.option2)}
                        />
                      </>
                    )}
                  </div>
                </MathJax.Provider> */}
                <div className="view_option_latex">
                  {values.option2 && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.option2)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
              </Col>
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
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
                    type="text"
                    placeholder="option3"
                    onChange={handleChange}
                    name="option3"
                    value={values.option3}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={6} className="mt-2">
                {/* <MathJax.Provider>
                  <div className="view_option_latex">
                    {values.option3 && (
                      <MathJax.Node formula={handleLatexData(values.option3)} />
                    )}
                  </div>
                </MathJax.Provider> */}
                <div className="view_option_latex">
                  {values.option3 && (
                    <MathJaxContext version={3} config={config}>
                      <MathJax inline dynamic>
                        {handleLatexData(values.option3)}
                      </MathJax>
                    </MathJaxContext>
                  )}
                </div>
              </Col>
              <Col md={1} xs={1} className="mt-3">
                <Form.Check
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
                    type="text"
                    placeholder="option4"
                    onChange={handleChange}
                    name="option4"
                    value={values.option4}
                  />
                </Form.Group>
              </Col>
              <Col md={6} xs={6} className="mt-2">
                {/* <MathJax.Provider>
                  <div className="view_option_latex">
                    {values.option4 && (
                      <MathJax.Node formula={handleLatexData(values.option4)} />
                    )}
                  </div>
                </MathJax.Provider> */}
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
                <Form.Control
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
              <Button variant="success" className="m-1" size="lg" type="submit">
                {id ? "Update" : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </main>
      <Preloader show={loading} />
    </>
  );
}

export default ViewQuestion;
