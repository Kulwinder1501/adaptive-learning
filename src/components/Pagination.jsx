import React, { useState } from "react";
import { Pagination } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const CustomPagination = (props) => {
  const {
    handlePage,
    totalPages,
    size = "md",
    withIcons = false,
    disablePrev = false,
  } = props;

  const [activeItem, setActiveItem] = useState(1);

  const onPrevItem = () => {
    const prevActiveItem = activeItem === 1 ? activeItem : activeItem - 1;
    setActiveItem(prevActiveItem);
    handlePage(prevActiveItem);
  };

  const onNextItem = (totalPages) => {
    const nextActiveItem =
      activeItem === totalPages ? activeItem : activeItem + 1;
    setActiveItem(nextActiveItem);
    handlePage(nextActiveItem);
  };

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    const isItemActive = activeItem === number;

    const handlePaginationChange = () => {
      setActiveItem(number);
      handlePage(number);
    };

    items.push(
      <Pagination.Item
        active={isItemActive}
        key={number}
        onClick={handlePaginationChange}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination size={size} className="mt-3">
      <Pagination.Prev
        disabled={activeItem === 1 ? true : false}
        onClick={onPrevItem}
      >
        {withIcons ? <FontAwesomeIcon icon={faAngleDoubleLeft} /> : "Previous"}
      </Pagination.Prev>
      {items}
      <Pagination.Next
        onClick={() => onNextItem(totalPages)}
        disabled={totalPages === activeItem ? true : false}
      >
        {withIcons ? <FontAwesomeIcon icon={faAngleDoubleRight} /> : "Next"}
      </Pagination.Next>
    </Pagination>
  );
};

export default CustomPagination;
