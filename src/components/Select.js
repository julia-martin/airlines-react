import React from "react";

const Select = ({ selected, id, onSelect, options, optConfig }) => {
  const { key, value, allOption } = optConfig;
  return (
    <select value={selected} id={id} onChange={onSelect}>
      <option value={allOption.value}>{allOption.name}</option>
      {options.map((opt) => {
        return (
          <option key={opt[key]} value={opt[value]}>
            {opt[value]}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
