import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Button,
  Form,
  InputGroup,
} from "@themesberg/react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import DataTable from "../components/Table";
import { httpClient } from "../constants/api";
import { QUESTION } from "../constants/AppConst";
import Preloader from "../components/Preloader";

const initialData = {
  examTypeName: "",
  className: "",
  subjectName: "",
  unitName: "",
  chapterName: "",
  topicName: "",
  subtopicName: "",
  temp1Name: "",
  temp2Name: "",
  temp3Name: "",
};

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [fields, setFields] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState("");
  const [values, setValues] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    viewAllFields();
    handleGetAllQuestions();
  }, [page]);

  const handleGetAllQuestions = async (filters) => {
    try {
      setLoading(true);
      console.log(page);
      const result = await httpClient.post(
        `${QUESTION.GET_ALL}?page=${page}&size=${10}`,
        filters
      );
      setData(result.data.questions);
      setTotalPages(result.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getQuestionById = async () => {
    try {
      setLoading(true);
      const result = await httpClient.get(
        QUESTION.VIEW_QUESTION.replace("{id}", searchText)
      );
      setData([result.data]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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

  const handleSearch = () => {
    handleGetAllQuestions(values);
  };

  const handleReset = () => {
    setValues(initialData);
    setSearchText("");
    handleGetAllQuestions("");
  };

  return (
    <>
      <Sidebar />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          {/* <Form className="navbar-search" onKeyDown={handleKeyDown}> */}
          <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search By Question Id"
                onChange={(e) => setSearchText(e.target.value)}
                // onKeyDown={handleKeyDown}
                value={searchText}
              />
            </InputGroup>
          </Form.Group>
          {/* </Form> */}

          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate("/add-question")}
          >
            Add Question
          </Button>
        </div>

        <Form>
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
                  name="subtopicName"
                  value={values.subtopicName}
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
            <Col xs={12} xl={6} className="mb-4 text-end">
              <Button
                variant="secondary"
                onClick={handleReset}
                className="mx-2"
              >
                Reset
              </Button>
              <Button
                variant="light"
                onClick={searchText ? getQuestionById : handleSearch}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        <DataTable data={data} totalPages={totalPages} handlePage={setPage} />
      </main>
      <Preloader show={loading} />
    </>
  );
}

export default Dashboard;
