import React, { useEffect, useState } from "react";
import Form from "../BookForm/form";

const ManageBooks = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (props.match.params.name) getData(props.match.params.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    fetch("/getbookdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: props.match.params.name }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((test) => {
        setData(test.bookdata);
      });
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "price" || name === "rating" ? parseInt(value, 10) : value,
    }));
  };

  return (
    <>
      <h3>Update Book</h3>
      <Form data={data || " "} onChange={onChange} history={props.history} />
    </>
  );
};

export default ManageBooks;
