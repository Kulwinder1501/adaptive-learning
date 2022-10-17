import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  Container,
  InputGroup,
  Alert,
} from "@themesberg/react-bootstrap";
import { useNavigate } from "react-router-dom";
import BgImage from "../assets/img/illustrations/signin.svg";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app, firebaseConfig } from "../firebase/fireabseConfig";
import { httpClient } from "../constants/api";
import { ADMIN } from "../constants/AppConst";
import { initializeApp } from "firebase/app";
// import Preloader from "../components/Preloader";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "superadmin@gmail.com",
    password: "quesportal@123456",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (error) {
      setError(false);
    }
  };
  const firebaseFunction = async () => {
    const app = initializeApp(firebaseConfig);
    var re = /\S+@\S+\.\S+/;
    const emailCheck = re.test(values.email);
    const auth = getAuth(app);
    if (emailCheck) {
      await sendPasswordResetEmail(auth, values.email)
        .then(() => {
          alert("Forget Password Email Send");
        })
        .catch((error) => {
          alert("Invalid Email: Email don't Exist");
        });
    } else {
      alert("Email Invalid");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const authentication = getAuth();
      const verifyUser = await signInWithEmailAndPassword(
        authentication,
        values.email,
        values.password
      );
      localStorage.setItem("user", JSON.stringify(verifyUser._tokenResponse));
      const checkAdminType = await httpClient.get(ADMIN.CHECK_ADMIN_TYPE);
      localStorage.setItem("adminType", checkAdminType.data.adminType);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* <Preloader show={loading} /> */}
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        autoFocus
                        required
                        name="email"
                        type="email"
                        placeholder="example@company.com"
                        onChange={handleChange}
                        value={values.email}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          name="password"
                          type="password"
                          placeholder="Password"
                          onChange={handleChange}
                          value={values.password}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  {error && (
                    <Alert variant="warning">Invalid Login Credentials</Alert>
                  )}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? "Please wait.." : "Sign in"}
                  </Button>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p></p>

                    <p></p>
                    <p
                      // variant="danger"
                      onClick={() => firebaseFunction()}
                      className=" mt-2 forget"
                      disabled={loading}
                      style={{ cursor: "pointer" }}
                    >
                      Forget Password
                    </p>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Login;
