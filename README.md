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

<u>[데모](https://madstone-dev.github.io/wanted_pre_onboarding)</u>

<br/>

##### 1. Toggle

> 토글은 상태를 공유하는 다른 컴포넌트와 종종 같이 사용됩니다.
> enabled, setEnabled, srOnly 부모로부터 상속받습니다.
>
> --
>
> 토글은 명시적 label이 없기 때문에 srOnly를 활용했습니다.

- 사용예시

```jsx
const [toggleEnable, setToggleEnable] = useState(false);

<Toggle enabled={toggleEnable} setEnabled={setToggleEnable} />;
```

- 속성

| 속성       | 필수     | 기본값    | 타입                                                    |
| ---------- | -------- | --------- | ------------------------------------------------------- |
| enabled    | required | undefined | boolean                                                 |
| setEnabled | required | undefined | React.Dispatch&lt;SetStateAction&lt;**boolean**&gt;&gt; |
| srOnly     | optional | "토글"    | string                                                  |

<br/>
<br/>

##### 2. Modal

> 모달은 버튼 또는 모달을 호출하는 요소와 함께 쓰입니다.
> 모달 내 컨텐츠는 children으로 전달합니다.
>
> open, setOpen, children을 부모로부터 상속받습니다.
>
> --
>
> 모달이 열린 후 닫기 버튼으로 포커스가 이동됩니다.
> 모달이 닫힐시 처음 모달을 호출 했던 요소로 포커스가 되돌아갑니다.
> Tab을 사용하여 포커스 이동시 모달내 포커스를 잃지 않기 위해 다이얼로그의 최상단과 최하단에 포커스트랩을 만들어두었습니다.

- 사용예시

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

      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="py-8">Hello Modal !</div>
      </Modal>
    </>
  );
}
```

- 속성

| 속성     | 필수     | 기본값    | 타입                                                    |
| -------- | -------- | --------- | ------------------------------------------------------- |
| open     | required | undefined | boolean                                                 |
| setOpen  | required | undefined | React.Dispatch&lt;SetStateAction&lt;**boolean**&gt;&gt; |
| children | optional | undefined | ReactNode                                               |

<br/>
<br/>

##### 3. Tab

> 탭은 현재탭에 따라 다른 내용의 컴포넌트를 렌더링 할 때 종종 사용됩니다.
> tabs, currentTab, setCurrentTab를 부모로부터 상속받습니다.
>
> currentTab은 tabs중 하나입니다.
>
> --
>
> 라우팅에 대한 내용이 없었으므로, string[] 타입으로 구현하였습니다.

- 사용예시

```jsx
const tabs = ["첫번째 탭 1", "두번째 탭 2", "세번째 탭 3", "네번째 탭 4"];
const [currentTab, setCurrentTab] = useState(tabs[0]);

<Tab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />;
```

- 속성

| 속성          | 필수     | 기본값    | 타입                                                   |
| ------------- | -------- | --------- | ------------------------------------------------------ |
| tabs          | required | undefined | string[]                                               |
| currentTab    | required | undefined | string                                                 |
| setCurrentTab | required | undefined | React.Dispatch&lt;SetStateAction&lt;**string**&gt;&gt; |

<br/>
<br/>

##### 4. Tag

> 콘텐츠의 작성 또는 수정 시 태그의 현재상태를 입력 받기도 합니다.
> tags, setTags를 부모로부터 상속받습니다.
>
> --
>
> 엔터를 눌러 태그를 작성하는 컴포넌트이기에 form 요소와 input 요소를 활용했습니다.
> 각 태그는 배열의 인덱스로 구분합니다.

- 사용예시

```jsx
const [tags, setTags] = useState([]);

<Tag tags={tags} setTags={setTags} />;
```

- 속성

| 속성    | 필수     | 기본값    | 타입                                                   |
| ------- | -------- | --------- | ------------------------------------------------------ |
| tags    | required | undefined | string[]                                               |
| setTags | required | undefined | React.Dispatch&lt;SetStateAction&lt;**string**&gt;&gt; |

<br/>
<br/>

##### 5. AutoComplete

> 자동완성은 검색과 같은 이벤트에 자주 활용됩니다.
> data, keyword, setKeyword, placeholder, handleSubmit, absolute 를 부모로부터 상속받습니다.
>
> data는 자동완성에 사용할 목록입니다.
> absolute는 리스트를 position:absolute 시킵니다.
>
> --
>
> form, input 요소를 활용하여 구현하였으며, submit시 전달받은 이벤트가 있다면 실행합니다.
> 클릭 또는 Tab으로 포커스가 AutoComplete 요소 밖으로 벗어나면 자동완성 리스트를 닫습니다.
> 자동완성 리스트는 Tab으로 접근 가능합니다.

- 사용예시

```jsx
const data = [
    "Destiney Donnelly",
    "Duane Kunze",
    ...
];
const [keyword, setKeyword] = useState("");
const handleSubmit = () => {
  alert(`${keyword} 검색!`);
};

<AutoComplete
  data={data}
  keyword={keyword}
  setKeyword={setKeyword}
  placeholder={"사용자 이름 검색"}
  handleSubmit={handleSubmit}
/>
```

- 속성

| 속성         | 필수     | 기본값    | 타입                                                   |
| ------------ | -------- | --------- | ------------------------------------------------------ |
| data         | optional | []        | string[]                                               |
| keyword      | required | undefined | string[]                                               |
| setKeyword   | required | undefined | React.Dispatch&lt;SetStateAction&lt;**string**&gt;&gt; |
| placeholder  | optional | ""        | string                                                 |
| absolute     | optional | true      | boolean                                                |
| handleSubmit | optional | undefined | function                                               |

<br/>
<br/>

##### 6. ClickToEdit

> text, setText, placeholder를 부모로부터 상속받습니다

- 사용예시

```jsx
const [name, setName] = useState("김해커");

<ClickToEdit text={name} setText={setName} placeholder={"이름"} />;
```

- 속성

| 속성        | 필수     | 기본값    | 타입                                                   |
| ----------- | -------- | --------- | ------------------------------------------------------ |
| text        | optional | ""        | string[]                                               |
| setText     | required | undefined | React.Dispatch&lt;SetStateAction&lt;**string**&gt;&gt; |
| placeholder | optional | ""        | string                                                 |

---
