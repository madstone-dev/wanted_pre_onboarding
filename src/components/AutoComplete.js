import { useEffect, useState } from "react";

export default function AutoComplete({
  data = [],
  placeholder = "",
  absolute = true,
}) {
  const [list, setList] = useState([]);
  const [keyword, setKeyword] = useState("");

  const onChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (!keyword.trim()) {
      setList([]);
      return;
    }
    const newList = data.filter(
      (item) => item.toLowerCase().indexOf(keyword.toLowerCase()) >= 0
    );
    setList(newList);
  }, [keyword, data]);

  return (
    <div className="relative">
      <div className="mt-1">
        <input
          type="search"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder={placeholder}
          value={keyword}
          onChange={onChange}
        />
      </div>
      {list.length > 0 && (
        <ul
          className={`${
            absolute ? "absolute" : "static"
          } origin-top-left left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto`}
        >
          {list.map((item, index) => (
            <li
              key={index}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
