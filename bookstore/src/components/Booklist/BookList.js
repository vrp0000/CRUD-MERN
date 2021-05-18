import React, { useEffect, useState } from "react";

import HomePage from "./HomePage";

const BookList = (props) => {
  const [data, setData] = useState("");

  useEffect(() => {
    console.log("Data is empty", data === "");
    if (data === "") getData();
  }, []);

  const getData = async () => {
    await fetch("/getbooks")
      .then((resp) => resp.json())
      .then((list) => {
        setData(list.booklist);
        for (let i = 0; i < list.booklist.length; i++) {
          data[i] = list.booklist[i];
        }
      })
      .catch((error) => console.error());
  };

  const deleteRecord = (event) => {
    console.log(event.target.id);
    fetch("/deletebook", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: event.target.id }),
    })
      .then((response) => {
        console.log("Delete result ", response.status === 200);
        if (response.status === 200) getData();
        return response.json();
      })
      .then((response) => {
        console.log(response.message);
      });
  };

  return (
    <div>
      {console.log("Sending data = ", data)}
      <HomePage books={data} ondelete={deleteRecord} />
    </div>
  );
};

export default BookList;
