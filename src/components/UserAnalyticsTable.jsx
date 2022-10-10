import React from "react";
import { Card, Table } from "@themesberg/react-bootstrap";

import { Link } from "react-router-dom";
import CustomPagination from "./Pagination";

function UserAnalyticsTable({ data, handlePage, totalPages }) {
  const TableRow = (props) => {
    const { Admin, viewsNumber, creationNumber, modNumber } = props;

    return (
      <tr>
        <td>
          <Card.Link
            as={Link}
            to={`/view-user/${Admin.id}/${Admin.name}`}
            className="fw-normal"
          >
            {Admin.id}
          </Card.Link>
        </td>
        <td>{Admin.name}</td>
        <td>{Admin.email}</td>
        <td>{viewsNumber}</td>
        <td>{creationNumber}</td>
        <td>{modNumber}</td>
      </tr>
    );
  };
  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body>
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Admin Id</th>
              <th className="border-0">Admin Name</th>
              <th className="border-0">Admin Email</th>
              <th className="border-0">Views</th>
              <th className="border-0">Creation</th>
              <th className="border-0">Modification</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((q) => (
              <TableRow key={q.id} {...q} />
            ))}
          </tbody>
        </Table>
        {!data && <div className="text-center mt-3">No Records to Display</div>}
        {data?.length > 0 && (
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <CustomPagination handlePage={handlePage} totalPages={totalPages} />
          </Card.Footer>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserAnalyticsTable;
