import React from "react";
import "./Paginate.scss";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginate = (props) => {
  return (
    <div className="paginate wrapper pb-30">
      <nav>
        <ul className="pager">
          <li className="pager__item pager__item--prev">
            <a href="href='##" className="pager__link">
              PREV
            </a>
          </li>
          <li className="pager__item active">
            <a href="#" className="pager__link">
              1
            </a>
          </li>
          <li className="pager__item">
            <a href="#" className="pager__link">
              2
            </a>
          </li>
          <li className="pager__item">
            <a href="#" className="pager__link">
              3
            </a>
          </li>
          <li className="pager__item">
            <a href="#" className="pager__link">
              4
            </a>
          </li>
          <li className="pager__item">
            <a href="#" className="pager__link">
              5
            </a>
          </li>
          <li className="pager__item">
            <a href="#" className="pager__link">
              ...
            </a>
          </li>
          <li className="pager__item">
            <a href="#" className="pager__link">
              20
            </a>
          </li>
          <li className="pager__item pager__item--prev">
            <a href="href='##" className="pager__link">
              NEXT
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
