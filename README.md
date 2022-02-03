# 원티드 프리온보딩 사전과제

---

#### 구현 과제

1. Toggle
2. Modal
3. Tab
4. Tag
5. AutoComplete
6. ClickToEdit

---

#### 달성 목록

1. Toggle

   > useState를 사용하여 구현했습니다.
   >
   > 토글은 상태를 공유하는 다른 컴포넌트와 종종 같이 사용됩니다.
   > enabled와 setEnabled를 부모로부터 상속받습니다.

   ```jsx
   const [toggleEnable, setToggleEnable] = useState(false);

   <Toggle enabled={toggleEnable} setEnabled={setToggleEnable} />;
   ```

2. Modal

   > useState를 사용하여 구현했습니다.
   >
   > 모달은 버튼 또는 모달을 호출하는 다른 요소와 함께 쓰입니다.
   > open 및 setOpen를 부모로부터 상속받습니다.

   ```jsx
   const [modalOpen, setModalOpen] = useState(false);

   export default function ModalWithButton() {
     return (
       <>
         <button
           onClick={() => setModalOpen(true)}
           type="button"
           className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
         >
           모달 열기
         </button>

         <Modal open={modalOpen} setOpen={setModalOpen} />
       </>
     );
   }
   ```

3. Tab

   > useState를 사용하여 구현했습니다.
   >
   > 탭은 현재탭에 따라 다른 내용의 컴포넌트를 렌더링 할 때 종종 사용됩니다.
   > tabs, currentTab, setCurrentTab를 부모로 부터 상속받습니다.
   >
   > tabs는 name으로 구성된 객체입니다. currentTab은 tabs중 하나입니다.

   ```jsx
   const tabs = [
     { name: "첫번째 탭 1" },
     { name: "두번째 탭 2" },
     { name: "세번째 탭 3" },
     { name: "네번째 탭 4" },
   ];
   const [currentTab, setCurrentTab] = useState(tabs[0]);

   <Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />;
   ```

   >

---
