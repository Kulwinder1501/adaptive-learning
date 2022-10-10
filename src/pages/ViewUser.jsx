import React, { useState, useEffect } from "react";
import { Card, Table } from "@themesberg/react-bootstrap";

import { Link, useParams } from "react-router-dom";
import moment from "moment-timezone";
import Preloader from "../components/Preloader";
import Sidebar from "../components/Sidebar";
import { httpClient } from "../constants/api";
import { ACTIVITY } from "../constants/AppConst";

function ViewUser() {
  const { id, name } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    if (id) getUserActivity();
  }, [date]);

  const getUserActivity = async () => {
    try {
      setLoading(true);
      const result = await httpClient.post(
        `${ACTIVITY.ACTIVITY_BY_ID}?id=${id}&date=${moment(date).format(
          "YYYY-MM-D"
        )}`
      );
      setData(result.data);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <h5> USER : {name.toUpperCase()}</h5>
        </div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
          <div>
            <h5> View Number :{data?.viewNumber ? data?.viewNumber : 0}</h5>
            <h5>
              {" "}
              Create Number:{data?.createNumber ? data?.createNumber : 0}{" "}
            </h5>
            <h5>
              {" "}
              Modify Number:{data?.modifyNumber ? data?.modifyNumber : 0}
            </h5>
          </div>
          <input
            type="date"
            className="form-control w-50"
            value={date}
            onChange={(e) =>
              setDate(moment(e.target.value).format("YYYY-MM-DD"))
            }
          />
        </div>

        <UserTable data={data} />
        <Preloader show={loading} />
      </main>
    </>
  );
}

export default ViewUser;

function UserTable({ data }) {
  const TableRow = ({ act }) => {
    return (
      <tr>
        <td>
          <Card.Link
            as={Link}
            to={`/view-question/${act.questionId}`}
            className="fw-normal"
          >
            {act.questionId}
          </Card.Link>
        </td>
        <td>{act.activityType}</td>
        <td>{moment(act.createdAt).format("DD-MM-YYYY")}</td>
      </tr>
    );
  };
  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body>
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#Question Id</th>
              <th className="border-0">Activity Type</th>
              <th className="border-0">Activity Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.activityHistory?.map((act, i) => (
              <TableRow key={i} act={act} />
            ))}
          </tbody>
        </Table>
        {!data && <div className="text-center mt-3">No Records to Display</div>}
      </Card.Body>
    </Card>
  );
}
