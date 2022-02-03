import { useEffect, useRef } from "react";

export default function Modal({ open, setOpen, children }) {
  const closeBtn = useRef();

  if (open === undefined) {
    throw new Error("open을 전달하세요. open은 boolean 타입입니다.");
  }

  if (typeof open !== "boolean") {
    console.warn("open은 boolean 타입입니다.");
  }

  if (typeof setOpen !== "function") {
    console.warn(
      "setOpen을 전달하세요. setOpen은 React.Dispatch<SetStateAction<boolean>> 타입입니다."
    );
  }

  useEffect(() => {
    if (open && closeBtn.current) {
      closeBtn.current.focus();
    }
    if (open) {
      document.documentElement.classList.add("overflow-hidden", "pr-[15px]");
    } else {
      document.documentElement.classList.remove("overflow-hidden", "pr-[15px]");
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden", "pr-[15px]");
    };
  }, [open]);

  return (
    open && (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center p-0 flex">
          <div>
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={() => setOpen(false)}
            />
          </div>
          <div className="inline-block bg-white rounded-lg p-8 overflow-hidden shadow-xl relative max-w-lg w-full">
            <div className="block">
              <button
                ref={closeBtn}
                type="button"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">닫기</span>
                <span className="text-gray-400 hover:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    )
  );
}
