import React from "react";
import adds from "./add.png";
import { Link, useHistory } from "react-router-dom";
import A from "./upArrow.png";
import D from "./downArrow.png";

const Header = (props) => {
  const history = useHistory();

  console.log(props.sort);
  return (
    <>
      <div>
        <div>
          <h2>Booklist{"   "}</h2>
        </div>

        <div className="header">
          <div className="hdr2 filter">
            <div>
              <h>Group-by </h>
            </div>
            <div className="input-field col s12">
              <form>
                <select
                  id="grpby"
                  className="browser-default"
                  onChange={props.grpby}
                >
                  <option value="category">Category</option>
                  <option value="rating">Rating</option>
                </select>
              </form>
            </div>
          </div>

          <div className="hdr2 sort">
            <div>
              <h>Sort-By</h>
            </div>
            <div className="input-field col s12">
              <form>
                <select
                  id="grpby"
                  className="browser-default"
                  defaultValue="None"
                >
                  <option value="Price">Category</option>
                  <option value="Rating">Rating</option>
                </select>
              </form>
            </div>
            <div className="sort">
              <input
                type="image"
                id="sort"
                value={props.sort === "A" ? "A" : "D"}
                onClick={props.changeSort}
                src={props.sort === "A" ? A : D}
                alt="Sort"
              />
            </div>
          </div>
          <div className="addbook ">
            <div>
              <Link to="/book-add">
                <img src={adds} alt="Add Books" onClick={props.addBook} />{" "}
              </Link>
              {"   "}
            </div>
            <div>
              <Link to="/book-add">
                <button className="btn">Add</button>
              </Link>
            </div>
          </div>
          <div className="lgout">
            <button
              className="btn"
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
