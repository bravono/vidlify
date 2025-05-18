import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="w-full">
      {items.map((item, index) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty] || index}
          className={`cursor-pointer px-4 py-2 rounded mb-2 transition-colors
            ${
              item === selectedItem
                ? "bg-blue-600 text-white font-semibold"
                : "bg-gray-100 hover:bg-blue-100 text-gray-800"
            }`}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
