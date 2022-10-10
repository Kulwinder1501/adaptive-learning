import React from "react";
import Autocomplete from "react-autocomplete";

function SelectInput(props) {
  const { options, placeholder, value, name, handleChange } = props;

  return (
    <>
      <Autocomplete
        getItemValue={(item) => item.label}
        items={options}
        renderItem={(item, isHighlighted) => (
          <div
            style={{
              background: isHighlighted ? "#61dafb" : "white",
              borderRadius: "5px",
            }}
          >
            {item.label}
          </div>
        )}
        inputProps={{ placeholder: placeholder, className: "form-control" }}
        value={value}
        onChange={(e) => handleChange(name, e.target.value)}
        onSelect={(val) => handleChange(name, val)}
      />
    </>
  );
}

export default SelectInput;

{
  /* <Autocomplete
getItemValue={(item) => item.label}
items={[{ label: "apple" }, { label: "banana" }, { label: "pear" }]}
renderItem={(item, isHighlighted) => (
  <div style={{ background: isHighlighted ? "skyblue" : "white" }}>
    {item.label}
  </div>
)}
inputProps={{ placeholder: "test", className: "form-control" }}
value={value.test}
onChange={(e) => handleChange("test", e.target.value)}
onSelect={(val) => handleChange("test", val)}
/> */
}
