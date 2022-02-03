import { classNames } from "../utils/cssUtils";

export default function Tab({ tabs, currentTab, setCurrentTab }) {
  if (typeof tabs !== "object") {
    console.warn("tabs를 전달하세요. tabs는 string[] 타입입니다.");
  }

  if (typeof currentTab !== "string") {
    console.warn("currentTab을 전달하세요. currentTab은 tabs 중 하나입니다.");
  }

  if (typeof setCurrentTab !== "function") {
    console.warn(
      "setCurrentTab을 전달하세요. setCurrentTab은 React.Dispatch<SetStateAction<string>> 타입입니다."
    );
  }

  return (
    <div className="block">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTab(tab);
              }}
              className={classNames(
                tab == currentTab
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
              )}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
