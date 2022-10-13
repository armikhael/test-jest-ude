import React from "react";
import { TextField } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

function Form() {
  return (
    <div className="Form">
      <h1>Form</h1>
      <form>
        <TextField id="name" label="name" />
        <TextField id="size" label="size" />
        <InputLabel htmlFor="type">Type</InputLabel>
        <Select
          native
          value=""
          inputProps={{
            name: "type",
            id: "type",
          }}
        >
          <option value={"electronic"}>electronic</option>
          <option value={"furniture"}>furniture</option>
          <option value={"clothing"}>clothing</option>
        </Select>
      </form>
    </div>
  );
}

export default Form;
