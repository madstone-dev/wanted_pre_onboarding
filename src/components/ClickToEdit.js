import { useState } from "react";

export default function ClickToEdit({ text = "", setText, placeholder = "" }) {
  if (typeof setText !== "function") {
    throw new Error(
      "setText를 전달하세요. setText는 React.Dispatch<SetStateAction<string>> 타입입니다."
    );
  }

  const [editable, setEditable] = useState(false);
  const [inputText, setInputText] = useState(text);

  const onFocus = () => {
    setEditable(true);
  };

  const onBlur = () => {
    setText(inputText);
    setEditable(false);
  };

  const onChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        readOnly={!editable}
        type="text"
        value={inputText}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
}
