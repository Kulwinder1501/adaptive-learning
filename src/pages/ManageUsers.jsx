import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Col,
  Row,
  Card,
  Form,
  InputGroup,
  Button,
  Table,
  Modal,
  FormCheck,
  Alert,
} from "@themesberg/react-bootstrap";
import {
  faEnvelope,
  faEdit,
  faTrashAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import { httpClient } from "../constants/api";
import { ADMIN } from "../constants/AppConst";
import "../assets/manage_user.css";
import Preloader from "../components/Preloader";
import CustomPagination from "../components/Pagination";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ name: "", email: "" });
  const [openDialog, setOpenDialog] = useState({ open: false, data: "" });
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState("");
  const admin = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getAllAdmins();
  }, [page]);

  const getAllAdmins = async () => {
    try {
      setLoading(true);
      const users = await httpClient.get(
        `${ADMIN.VIEW_ALL}?page=${page}&size=${10}`
      );
      setUsers(users.data.Admins);
      setTotalPages(users.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const authentication = getAuth();
      const user = await createUserWithEmailAndPassword(
        authentication,
        values.email,
        "test123#"
      );
      await httpClient.post(ADMIN.CREATE_ADMIN, {
        email: values.email,
        name: values.name,
        firebaseId: user._tokenResponse.localId,
      });
      getAllAdmins();
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await httpClient.delete(ADMIN.DELETE_ADMIN.replace("{id}", id));
      getAllAdmins();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const TableRow = (props) => {
    const { id, name, createAccess, readAccess, deleteAccess, modifyAccess } =
      props;

    return (
      <tr>
        <td>{name}</td>
        <td>
          {createAccess ? (
            <FontAwesomeIcon icon={faCheck} className="me-2" />
          ) : (
            ""
          )}
        </td>
        <td>
          {readAccess ? (
            <FontAwesomeIcon icon={faCheck} className="me-2" />
          ) : (
            ""
          )}
        </td>
        <td>
          {deleteAccess ? (
            <FontAwesomeIcon icon={faCheck} className="me-2" />
          ) : (
            ""
          )}
        </td>
        <td>
          {modifyAccess ? (
            <FontAwesomeIcon icon={faCheck} className="me-2" />
          ) : (
            ""
          )}
        </td>
        <td>
          <div>
            <FontAwesomeIcon
              icon={faEdit}
              className="mx-1"
              style={{ cursor: "pointer" }}
              onClick={() =>
                setOpenDialog({
                  open: true,
                  data: {
                    createAccess: createAccess,
                    readAccess: readAccess,
                    modifyAccess: modifyAccess,
                    deleteAccess: deleteAccess,
                  },
                  id: id,
                })
              }
            />
            <FontAwesomeIcon
              icon={faTrashAlt}
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(id)}
            />
          </div>
        </td>
      </tr>
    );
  };

  const handleClose = () => {
    setOpenDialog(false);
    getAllAdmins();
  };

  return (
    <>
      {" "}
      <Sidebar />
      <main className="content">
        <div className="py-4">
          <Card border="light" className="shadow-sm mb-4">
            <Card.Header>Invite Members</Card.Header>
            <Card.Body>
              <Form className="mt-4" onSubmit={handleCreateAdmin}>
                <Row>
                  <Col md={10}>
                    <Form.Group id="email" className="mb-4">
                      {/* <Form.Label>Your Email</Form.Label> */}
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faEnvelope} />
                        </InputGroup.Text>
                        <Form.Control
                          name="name"
                          autoFocus
                          required
                          type="text"
                          placeholder="john"
                          onChange={(e) =>
                            setValues({ ...values, name: e.target.value })
                          }
                          value={values.name}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={10}>
                    <Form.Group id="email" className="mb-4">
                      {/* <Form.Label>Your Email</Form.Label> */}
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
                          onChange={(e) => {
                            setValues({ ...values, email: e.target.value });
                            setError(false);
                          }}
                          value={values.email}
                        />
                      </InputGroup>
                    </Form.Group>
                    {error && (
                      <Alert variant="warning">Email Already Exist</Alert>
                    )}
                  </Col>
                  <Col md={2} className="text-end">
                    <Button variant="primary" type="submit">
                      Send Invite
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </div>
        <Card border="light" className="shadow-sm mb-4">
          <Card.Body>
            <Table
              responsive
              className="table-centered table-nowrap rounded mb-0"
            >
              <thead className="thead-light">
                <tr>
                  <th className="border-0">Member</th>
                  <th className="border-0">Create</th>
                  <th className="border-0">Read</th>
                  <th className="border-0">Delete</th>
                  <th className="border-0">Modify</th>
                  <th className="border-0"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((pt) => (
                  <TableRow key={`page-traffic-${pt.id}`} {...pt} />
                ))}
              </tbody>
            </Table>
            {users.length > 0 && (
              <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
                <CustomPagination
                  handlePage={setPage}
                  totalPages={totalPages}
                />

                {/* <small className="fw-bold">
            Showing <b>10</b> out of <b>25</b> entries
          </small> */}
              </Card.Footer>
            )}
          </Card.Body>
        </Card>
      </main>
      {openDialog.open && (
        <EditPermissions open={openDialog} handleClose={handleClose} />
      )}
      <Preloader show={loading} />
    </>
  );
}

export default ManageUsers;

const EditPermissions = ({ open, handleClose }) => {
  const [values, setValues] = useState(open.data);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await httpClient.patch(
        ADMIN.CHANGE_ADMIN_ROLE.replace("{id}", open.id),
        values
      );
      handleClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal as={Modal.Dialog} centered show={open.open} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header>
            <Modal.Title className="h6">Edit Permissions</Modal.Title>
            <Button variant="close" aria-label="Close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Check type="checkbox">
                <FormCheck.Input
                  id="defaultCheck5"
                  className="me-2"
                  name="createAccess"
                  checked={values.createAccess}
                  onChange={handleChange}
                />
                <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
                  Create
                </FormCheck.Label>
              </Form.Check>
              <Form.Check type="checkbox" className="my-1">
                <FormCheck.Input
                  id="defaultCheck5"
                  className="me-2"
                  name="modifyAccess"
                  checked={values.modifyAccess}
                  onChange={handleChange}
                />
                <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
                  Edit
                </FormCheck.Label>
              </Form.Check>
              <Form.Check type="checkbox" className="my-1">
                <FormCheck.Input
                  id="defaultCheck5"
                  className="me-2"
                  name="deleteAccess"
                  checked={values.deleteAccess}
                  onChange={handleChange}
                />
                <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
                  Delete
                </FormCheck.Label>
              </Form.Check>
              <Form.Check type="checkbox">
                <FormCheck.Input
                  id="defaultCheck5"
                  className="me-2"
                  checked={values.readAccess}
                  name="readAccess"
                  onChange={handleChange}
                />
                <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">
                  Read
                </FormCheck.Label>
              </Form.Check>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className=""
              type="submit"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
