import { useCallback, useEffect, useRef, useState } from "react";

export default function Modal({ open, setOpen, children }) {
  const [prevActiveEl, setPrevActiveEl] = useState();
  const [lastFocusableEl, setLastFocusableEl] = useState();
  const contentRef = useRef();
  const focusTrapHead = useRef();
  const focusTrapFoot = useRef();
  const focusTrapStyle = {
    width: "1px",
    height: "1px",
  };
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

  const setLastFocus = useCallback(() => {
    const focusableEls = [
      ...contentRef.current.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      ),
    ].filter(
      (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden")
    );
    const lastEl = focusableEls[focusableEls.length - 1];
    if (lastEl) {
      setLastFocusableEl(lastEl);
    }
  }, [contentRef]);

  const escapeClose = useCallback(
    (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        if (prevActiveEl) {
          prevActiveEl.focus();
        }
      }
    },
    [setOpen]
  );

  useEffect(() => {
    if (open && closeBtn.current) {
      setPrevActiveEl(document.activeElement);
      closeBtn.current.focus();
    }
    if (open && contentRef.current) {
      setLastFocus();
    }
    if (open) {
      document.documentElement.classList.add("overflow-hidden", "pr-[15px]");
      document.documentElement.addEventListener("keydown", escapeClose);
    } else {
      document.documentElement.classList.remove("overflow-hidden", "pr-[15px]");
      document.documentElement.removeEventListener("keydown", escapeClose);
      if (prevActiveEl) {
        prevActiveEl.focus();
      }
    }
    return () => {
      document.documentElement.classList.remove("overflow-hidden", "pr-[15px]");
      document.documentElement.removeEventListener("keydown", escapeClose);
    };
  }, [open, contentRef, escapeClose, setLastFocus]);

  const focusLastEl = useCallback(
    (event) => {
      if (event.target === focusTrapHead.current) {
        if (lastFocusableEl) {
          lastFocusableEl.focus();
        } else {
          closeBtn.current.focus();
        }
      }
    },
    [focusTrapHead, lastFocusableEl]
  );

  const focusFirstEl = useCallback(
    (event) => {
      if (event.target === focusTrapFoot.current) {
        closeBtn.current.focus();
      }
    },
    [focusTrapFoot]
  );

  useEffect(() => {
    const focusHead = focusTrapHead.current;
    const focusFoot = focusTrapFoot.current;
    if (focusHead) {
      focusHead.addEventListener("focusin", focusLastEl);
    }
    if (focusFoot) {
      focusFoot.addEventListener("focusin", focusFirstEl);
    }
    return () => {
      if (focusFoot) {
        focusFoot.removeEventListener("focusin", focusLastEl);
      }
      if (focusHead) {
        focusHead.removeEventListener("focusin", focusFirstEl);
      }
    };
  }, [focusTrapHead, focusTrapFoot, open, focusFirstEl, focusLastEl]);

  return (
    open && (
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-0 px-4 pt-4 pb-20 text-center">
          <div>
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75"
              onClick={() => setOpen(false)}
            />
          </div>
          <div
            role="dialog"
            aria-labelledby="dialog1_label"
            aria-modal="true"
            className="relative inline-block w-full max-w-lg p-8 overflow-hidden bg-white rounded-lg shadow-xl"
          >
            <div className="block">
              <div
                ref={focusTrapHead}
                tabIndex={0}
                className="fixed bg-transparent -top-10"
                style={focusTrapStyle}
              />
              <button
                ref={closeBtn}
                type="button"
                className="rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">닫기</span>
                <span className="text-gray-400 hover:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
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
            <div ref={contentRef}>{children}</div>
            <div
              ref={focusTrapFoot}
              tabIndex={0}
              className="fixed bg-transparent -top-10"
              style={focusTrapStyle}
            />
          </div>
        </div>
      </div>
    )
  );
}
