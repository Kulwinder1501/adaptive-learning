import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import UserAnalyticsTable from "../components/UserAnalyticsTable";
import { httpClient } from "../constants/api";
import { ACTIVITY } from "../constants/AppConst";
import Preloader from "../components/Preloader";

function Users() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState("");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllActivity();
  }, []);

  const getAllActivity = async (search_text = "") => {
    try {
      setLoading(true);
      const result = await httpClient.post(
        `${
          ACTIVITY.ALL_ACTIVITY
        }?page=${page}&size=${10}&adminId=${search_text}`
      );
      setData(result.data.activities);
      setTotalPages(result.data.totalPages);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchText("");
    getAllActivity();
  };

  return (
    <>
      <Sidebar />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          {/* <Form className="navbar-search"> */}
          <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search By Name or Email"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
            </InputGroup>
          </Form.Group>
          {/* </Form> */}

          <div>
            <Button variant="secondary" onClick={handleReset} className="mx-2">
              Reset
            </Button>

            <Button
              variant="light"
              size="md"
              onClick={() => getAllActivity(searchText)}
            >
              Search
            </Button>
          </div>
        </div>

        <UserAnalyticsTable
          data={data}
          totalPages={totalPages}
          handlePage={setPage}
        />
        <Preloader show={loading} />
      </main>
    </>
  );
}

export default Users;
