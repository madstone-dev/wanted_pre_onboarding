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
  const inputRef = useRef();
  const ulRef = useRef();
  const liRefs = useRef([]);
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

  const focusOnInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    liRefs.current = [];
    if (!keyword.trim()) {
      setList(data);
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
    focusOnInput();
  };

  const ARROW_DOWN = "ArrowDown";
  const ARROW_UP = "ArrowUp";
  const ESCAPE = "Escape";

  const onInputkeyDown = (event) => {
    if (event.key === ARROW_DOWN) {
      if (event.keyCode === 229) {
        return;
      }
      setOpen(true);
      const first = liRefs.current[0];
      if (first) {
        first.focus();
      }
    }
    if (event.key === ESCAPE) {
      setOpen(false);
    }
  };

  const onListKeyDown = (event, index) => {
    const next = liRefs.current[index + 1];
    const prev = liRefs.current[index - 1];
    const first = liRefs.current[0];
    const last = liRefs.current[liRefs.current.length - 1];
    if (event.key === ARROW_DOWN) {
      event.preventDefault();
      if (next) {
        next.focus();
      } else {
        first && first.focus();
      }
    }
    if (event.key === ARROW_UP) {
      event.preventDefault();
      if (prev) {
        prev.focus();
      } else {
        last && last.focus();
      }
    }
    if (event.key === ESCAPE) {
      setKeyword("");
      if (inputRef.current) {
        focusOnInput();
      }
      setOpen(false);
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
        onKeyDown={onInputkeyDown}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={list.length > 0 && open ? "true" : "false"}
        autoComplete="off"
      />
      {list.length > 0 && open && (
        <ul
          ref={ulRef}
          role="listbox"
          className={`${
            absolute ? "absolute" : "static"
          } origin-top-left left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none max-h-80 overflow-y-auto`}
        >
          {list.map((item, index) => (
            <li key={index} role="option" aria-selected={keyword === item}>
              <button
                ref={(el) => (liRefs.current[index] = el)}
                type="button"
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-50 focus:outline-none"
                onClick={() => {
                  onListClick(item);
                }}
                onKeyDown={(event) => {
                  onListKeyDown(event, index);
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
