import { useState } from "react";

export default function Tag({ tags, setTags }) {
  if (typeof tags !== "object") {
    throw new Error("tags를 전달하세요. tags는 string[] 타입입니다.");
  }

  if (typeof setTags !== "function") {
    console.warn(
      "setTags를 전달하세요. setTags는 React.Dispatch<SetStateAction<string>> 타입입니다."
    );
  }

  const [tag, setTag] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (!tag.trim()) {
      return;
    }
    setTags([...tags, tag]);
    setTag("");
  };

  const onChange = (event) => {
    setTag(event.target.value);
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, _index) => index !== _index);
    setTags(newTags);
  };

  return (
    <form
      className="flex flex-wrap items-center w-full overflow-hidden border border-gray-300 rounded-md shadow-sm focus:border-indigo-300"
      onSubmit={onSubmit}
    >
      <ul className="flex flex-wrap space-x-2 space-y-2">
        {tags.map((tag, index) => (
          <li key={index} className="my-2 ml-2">
            <div className="inline-flex items-center px-3 py-1 space-x-2 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full">
              <span>{tag}</span>
              <button
                type="button"
                className="p-1 text-indigo-600 bg-white rounded-full hover:text-indigo-700 hover:bg-gray-50 active:bg-gray-100"
                onClick={() => {
                  removeTag(index);
                }}
              >
                <span className="sr-only">태그 제거 {tag}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 h-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="엔터를 눌러 태그를 작성하세요."
        className="flex-1 px-4 py-3 border-none focus:border-none focus:outline-none focus:ring-0"
        value={tag}
        onChange={onChange}
      />
    </form>
  );
}
