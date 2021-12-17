import React from "react";

const Select = ({ selected, id, onSelect, options, optConfig, eligible }) => {
  const { key, value, allOption } = optConfig;
  return (
    <select value={selected} id={id} onChange={onSelect}>
      <option value={allOption.value}>{allOption.name}</option>
      {options.map((opt) => {
        return (
          <option key={opt[key]} value={opt[value]} disabled={!(eligible[opt[value]] || false)}>
            {opt[value]}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
