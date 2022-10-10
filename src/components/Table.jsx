import React from "react";
import { Card, Table } from "@themesberg/react-bootstrap";

import { Link } from "react-router-dom";
import CustomPagination from "./Pagination";

function DataTable({ data, handlePage, totalPages }) {
  const TableRow = (props) => {
    const {
      id,
      examTypeName,
      subjectName,
      className,
      unitName,
      chapterName,
      topicName,
      subTopicName,
      temp1Name,
      temp2Name,
      temp3Name,
    } = props;

    return (
      <tr>
        <td>
          <Card.Link
            as={Link}
            to={`/view-question/${id}`}
            className="fw-normal"
          >
            {id}
          </Card.Link>
        </td>
        <td>{examTypeName}</td>
        <td>{subjectName}</td>
        <td>{className}</td>
        <td>{unitName}</td>
        <td>{chapterName}</td>
        <td>{topicName}</td>
        <td>{subTopicName}</td>
        <td>{temp1Name}</td>
        <td>{temp2Name}</td>
        <td>{temp3Name}</td>
      </tr>
    );
  };
  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body>
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#Id</th>
              <th className="border-0">Exam Type</th>
              <th className="border-0">Class</th>
              <th className="border-0">Subject</th>
              <th className="border-0">Unit</th>
              <th className="border-0">Chapter</th>
              <th className="border-0">Topic</th>
              <th className="border-0">Sub-Topic</th>
              <th className="border-0">TEMP1</th>
              <th className="border-0">TEMP2</th>
              <th className="border-0">TEMP3</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((q) => (
              <TableRow key={q.id} {...q} />
            ))}
          </tbody>
        </Table>
        {data.length > 0 && (
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
            <CustomPagination handlePage={handlePage} totalPages={totalPages} />

            {/* <small className="fw-bold">
            Showing <b>10</b> out of <b>25</b> entries
          </small> */}
          </Card.Footer>
        )}
      </Card.Body>
    </Card>
  );
}

export default DataTable;
