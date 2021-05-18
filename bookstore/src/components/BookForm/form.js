import React from "react";
import TextInput from "./TextInput";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

const Form = (props) => {
  const history = useHistory();
  const { title, author, description, category, price, rating } = props.data;
  const { onChange } = props;
  const onSubmit = (event, props) => {
    event.preventDefault();
    let _price = "0";
    if (price !== undefined) _price = price;
    console.log(title, _price, author, description, rating, category);

    fetch("/addbooks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: _price,
        author,
        description,
        rating,
        category,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Book Saved");

          history.push("/book-list");
        }
        return response.json();
      })
      .then((resp) => {
        if (resp.error === "Book already exists in the Database")
          fetch("/updatebook", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              price,
              author,
              description,
              rating,
              category,
            }),
          }).then((response) => {
            if (response.status === 200) {
              toast.success("Book Updated");
              history.push("/book-list");
            }
          });
      });
  };

  return (
    <form className="hdr">
      <TextInput
        name="title"
        label="Title"
        value={title || " "}
        onChange={onChange}
      />

      <TextInput
        name="price"
        label="Price"
        value={price || 0}
        onChange={onChange}
      />
      <TextInput
        name="author"
        label="Author"
        value={author || ""}
        onChange={onChange}
      />
      <TextInput
        name="rating"
        label="Rating"
        value={rating || 0}
        onChange={onChange}
      />
      <TextInput
        name="category"
        label="Category"
        value={category || ""}
        onChange={onChange}
      />
      <TextInput
        name="description"
        label="Description"
        value={description || ""}
        onChange={onChange}
      />
      <div className="sbmtbtns">
        <div>
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Save
          </button>
        </div>
        <div>
          <Link to={"/book-list/"}>
            <button className="btn btn-primary">Cancel</button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Form;
