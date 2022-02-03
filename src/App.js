import Toggle from "./components/Toggle";
import Modal from "./components/Modal";
import Tab from "./components/Tab";
import Tag from "./components/Tag";
import AutoComplete from "./components/AutoComplete";
import ClickToEdit from "./components/ClickToEdit";
import { useState } from "react";

function App() {
  const [toggleEnable, setToggleEnable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const tabs = ["첫번째 탭 1", "두번째 탭 2", "세번째 탭 3", "네번째 탭 4"];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const [tags, setTags] = useState([]);

  const data = [
    "Destiney Donnelly",
    "Duane Kunze",
    "Kirsten Marks",
    "Miss Chesley Bartoletti",
    "Karson Blick",
    "Efrain Lueilwitz",
    "Keenan Botsford",
    "Destini Jacobi",
    "Darian Ryan",
    "Miss Brenda Jacobi",
    "Sammie Paucek II",
    "Eduardo Mayer",
    "Garett Botsford",
    "London Deckow",
    "Webster Morissette",
    "Loma Witting",
    "Valentin Hahn Jr.",
    "Mercedes Zemlak",
    "Dayne Schoen",
    "Justus Muller DVM",
    "Lourdes Cassin",
    "Cedrick Klein",
    "Adrienne Toy",
    "Cierra Pacocha",
    "Mariane Stroman",
    "Beaulah Collier I",
    "Marcus Roob",
    "Boyd Cole",
    "Miss Felipa Doyle",
    "Tanya Murphy",
    "Jean Towne DDS",
    "Genevieve Hickle",
    "Valentina Flatley",
    "Lucio Batz",
    "Jacey Rutherford",
    "Cleora Hermann",
    "Milton Leuschke",
    "Dr. Tad Herman",
    "Julius Morissette",
    "Keara Terry",
    "Sibyl Bernier",
    "Lexi Larkin",
    "Dr. Heaven Bartoletti",
    "Jessy Jenkins",
    "Daren Kautzer",
    "Ms. Adella Champlin",
    "Ramiro Ruecker",
    "Alexzander Lynch PhD",
    "Frederic Koss",
    "Herbert Koepp",
  ];

  const [name, setName] = useState("김해커");
  const [age, setAge] = useState("20");

  return (
    <div className="max-w-3xl mx-auto px-8 py-6">
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
          <div>
            <p>Toggle Switch {toggleEnable ? "ON" : "OFF"}</p>
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
            <Modal open={modalOpen} setOpen={setModalOpen}>
              <div className="py-8">Hello Modal !</div>
            </Modal>
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
        <li>
          <h3 className="py-4 font-semibold text-xl">4. 태그</h3>
          <div className="py-2">
            <Tag tags={tags} setTags={setTags} />
          </div>
        </li>
        <li>
          <h3 className="py-4 font-semibold text-xl">5. 자동완성</h3>
          <div className="py-2">
            <AutoComplete data={data} placeholder={"사용자 이름 검색"} />
          </div>
        </li>
        <li>
          <h3 className="py-4 font-semibold text-xl">6. 클릭하여 수정</h3>
          <div className="py-2 space-y-4">
            <div className="flex space-x-3 items-center">
              <span>이름</span>
              <ClickToEdit text={name} setText={setName} placeholder={"이름"} />
            </div>
            <div className="flex space-x-3 items-center">
              <span>나이</span>
              <ClickToEdit text={age} setText={setAge} placeholder={"나이"} />
            </div>
          </div>
          <div className="flex space-x-2 mt-6">
            <span>이름</span>
            <span className="font-bold">{name}</span>
            <span>나이</span>
            <span className="font-bold">{age}</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
