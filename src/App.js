import Toggle from "./components/Toggle";
import Modal from "./components/Modal";
import Tab from "./components/Tab";
import { useState } from "react";

function App() {
  const [toggleEnable, setToggleEnable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const tabs = [
    { name: "첫번째 탭 1" },
    { name: "두번째 탭 2" },
    { name: "세번째 탭 3" },
    { name: "네번째 탭 4" },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  return (
    <div className="max-w-3xl mx-auto px-8">
      <h1 className="py-8 font-bold text-3xl">
        원디트 프리온보딩 프론트엔드 코스
      </h1>
      <hr />
      <ul className="py-8 space-y-16">
        <li>
          <h3 className="py-4 font-semibold text-xl">1. 토글</h3>
          <div className="py-2">
            <Toggle enabled={toggleEnable} setEnabled={setToggleEnable} />
          </div>
        </li>
        <li>
          <h3 className="py-4 font-semibold text-xl">2. 모달</h3>
          <div className="py-2">
            <button
              onClick={() => setModalOpen(true)}
              type="button"
              className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              모달 열기
            </button>
            <Modal open={modalOpen} setOpen={setModalOpen} />
          </div>
        </li>
        <li>
          <h3 className="py-4 font-semibold text-xl">3. 탭</h3>
          <div className="py-2">
            <Tab
              tabs={tabs}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
          <div className="py-16 border rounded-md my-4 text-center">
            {currentTab.name} 콘텐츠
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
