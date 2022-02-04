import { useCallback, useEffect, useRef, useState } from "react";

export default function AutoComplete({
  data = [],
  keyword,
  setKeyword,
  placeholder = "",
  absolute = true,
  handleSubmit,
}) {
  if (typeof keyword !== "string") {
    throw new Error("keyword를 전달하세요. keyword는 string 타입입니다.");
  }

  if (typeof setKeyword !== "function") {
    console.warn(
      "setKeyword를 전달하세요. setKeyword는 React.Dispatch<SetStateAction<string>> 타입입니다."
    );
  }

  const formRef = useRef();
  const ulRef = useRef();
  const inputRef = useRef();
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  const keywordChange = (event) => {
    setKeyword(event.target.value);
    setOpen(true);
  };

  const inputFocus = () => {
    setOpen(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (handleSubmit) {
      handleSubmit();
    }
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

  const trackFocus = useCallback(
    (event) => {
      if (event.target.offsetParent !== formRef.current) {
        setOpen(false);
      }
    },
    [setOpen, formRef]
  );

  const trackKey = useCallback(() => {
    setTimeout(() => {
      if (
        document.activeElement.offsetParent !== formRef.current &&
        document.activeElement.offsetParent !== ulRef.current
      ) {
        setOpen(false);
      }
    });
  }, [setOpen, ulRef]);

  useEffect(() => {
    document.addEventListener("click", trackFocus);
    document.addEventListener("keydown", trackKey);
    return () => {
      document.removeEventListener("click", trackFocus);
      document.removeEventListener("keydown", trackKey);
    };
  }, [trackFocus, trackKey]);

  const onListClick = (item) => {
    setKeyword(item);
    setOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form className="relative" onSubmit={onSubmit} ref={formRef}>
      <input
        ref={inputRef}
        type="search"
        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder={placeholder}
        value={keyword}
        onChange={keywordChange}
        onFocus={inputFocus}
      />
      {list.length > 0 && open && (
        <ul
          ref={ulRef}
          className={`${
            absolute ? "absolute" : "static"
          } origin-top-left left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto`}
        >
          {list.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-50 focus:outline-none"
                onClick={() => {
                  onListClick(item);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
