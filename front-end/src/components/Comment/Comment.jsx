import React, {useContext} from "react";
import "./Comment.scss";
import { Link } from "react-router-dom";
import { FaStar, FaReplyAll } from "react-icons/fa";

const Comment = (props) => {
  const counter = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="comment">
        <div className="comment-author-avatar">
          <img
            src={`${process.env.REACT_APP_API_URL}/${props.avatar}`}
            alt={props.name}
          />
        </div>
        <div className="comment-content">
          <div className="comment-content-top">
            <div className="comment-national">
              <p>{props.name}</p>
            </div>
            <div className="comment-rate">
              {counter.map((i) => {
                if (i <= props.rating) {
                  return <FaStar className="yellow-stars" />;
                } else {
                  return <FaStar className="gray-stars" />;
                }
              })}
            </div>
          </div>
          <div className="comment-content-body">
            <p className="content">{props.content}</p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
