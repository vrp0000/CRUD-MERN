import React, { useState, useEffect } from "react";
import PageScroller from "./PageScroller";
import BookData from "./Bookdata";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";

const HomePage = (props) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [Page, setPage] = useState(0);
  const [Current, setCurrentDataSet] = useState(0);
  const [pageContent, setContent] = useState([]);

  useEffect(() => {
    console.log("In first use effect");
    console.log("Props.books=", props.books);
    if (props.books !== "") {
      setData(props.books);
    }
  }, [props.books]);

  useEffect(() => {
    console.log("In second use effect");
    setContent(data.slice(0, 5));
  }, [data]);

  /*   useEffect(
    (Current) => {
      console.log("Current");
    },
    [Current]
  ); */
  const changePage = (event) => {
    if (event.target.id === "Previous") {
      setCurrentDataSet((Current) => {
        if (Page - 1 <= 0) return 0;
        return Current - 5;
      });

      setPage((Page) => {
        if (Page - 1 < 0) {
          return 0;
        }
        return Page - 1;
      });
    } else if (event.target.id === "Next") {
      if (Current + 5 < data.length) {
        setPage((Page) => {
          return Page + 1;
        });
        setCurrentDataSet((Current) => {
          return Current + 5;
        });
      }
    }
    console.log("Slicied data = ", Current, data.slice(Current, Current + 5));
    console.log("Length = ", data.length);
    setContent(
      data.slice(
        Current,
        Current + 5 < data.length - 1 ? Current + 5 : data.length
      )
    );
  };

  return (
    <>
      {console.log("Rendering")}
      {console.log("Book data sent = ", pageContent)}
      <Header />
      <BookData books={pageContent} deleteRecord={props.ondelete} />
      <PageScroller change={changePage} />
    </>
  );
};

export default HomePage;
