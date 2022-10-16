import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

function Form() {
  const [formError, setFormError] = useState({
    name: "",
    size: "",
    type: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, size, type } = event.target.elements;
    if (!name.value) {
      setFormError((prevState) => ({
        ...prevState,
        name: "The name isrequired",
      }));
    }
    if (!size.value) {
      setFormError((prevState) => ({
        ...prevState,
        size: "The size isrequired",
      }));
    }
    if (!type.value) {
      setFormError((prevState) => ({
        ...prevState,
        type: "The type isrequired",
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setFormError({
      ...formError,
      [name]: value.length ? "" : `The ${name} isrequired`,
    });
  };

  return (
    <div className="Form">
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          label="name"
          name="name"
          helperText={formError.name}
          onBlur={handleBlur}
        />
        <TextField
          id="size"
          label="size"
          name="size"
          helperText={formError.size}
          onBlur={handleBlur}
        />
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          value=""
          inputProps={{
            name: "type",
            id: "type",
          }}
        >
          <option aria-label="None" value="" />
          <option value={"electronic"}>electronic</option>
          <option value={"furniture"}>furniture</option>
          <option value={"clothing"}>clothing</option>
        </Select>
        {formError.type.length > 0 && <p>{formError.type}</p>}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Form;
