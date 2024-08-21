
# 코드 피드백 요약 노트

## 1. 함수 및 변수 이름
- **명확한 네이밍**: 함수와 변수 이름은 그 역할을 명확하게 표현해야 합니다.
  - 예: `createTaskObj` → `createTask`, `returnTaskTier` → `determineTaskPriority`
- **상수화**: 자주 사용되는 값은 상수로 정의하여 코드의 가독성을 높이고 실수를 줄입니다.
  - 예: `const PRIORITY_FIRST = "first";`

## 2. 코드 중복 제거 및 재사용성
- **중복 제거**: 반복되는 코드를 함수로 추출하여 재사용 가능하게 하고, 코드의 간결성을 유지합니다.
  - 예: `taskList`를 전역에서 한 번만 선택하고, 여러 함수에서 재사용

## 3. 순차적 코드 흐름
- **책처럼 읽히는 코드**: 코드가 위에서 아래로 자연스럽게 읽히도록 작성하여 가독성을 높이고 논리적인 순서를 유지합니다.
  - **구조 예시**:
    1. 상수 및 전역 변수 선언
    2. 이벤트 핸들러 함수 정의
    3. 지원 함수 정의
    4. 초기화 함수 호출

## 4. 코드 구조 개선
- **단일 책임 원칙 준수**: 각 함수는 하나의 책임만 가지도록 설계하여 유지보수성을 높입니다.
  - 예: `renderTask`는 오직 DOM에 새로운 할 일을 추가하는 역할만 수행
- **에러 핸들링**: JSON 파싱 시 발생할 수 있는 오류에 대비하여 try-catch 구문을 추가하는 등, 예외 상황을 고려한 코드 작성
  - **구현 예시**:
    ```javascript
    function loadSavedTasks() {
      const savedTasks = localStorage.getItem(LOCAL_STORAGE_TASKS_KEY);

      if (savedTasks) {
        try {
          tasks = JSON.parse(savedTasks);
          tasks.forEach(renderTask);
        } catch (error) {
          console.error("Failed to parse tasks from localStorage", error);
        }
      }
    }
    ```

## 5. 확장성 및 유지보수성
- **확장성을 고려한 설계**: 프로젝트가 확장될 가능성을 염두에 두고, 코드 구조를 설계합니다.
  - **우선순위 상수 객체화 예시**:
    ```javascript
    const PRIORITY = {
      FIRST: "first",
      SECOND: "second",
      THIRD: "third",
      FOURTH: "fourth"
    };
    ```
- **전역 변수와 상수의 배치**: 전역 변수와 상수는 파일 상단에 위치시켜 코드 가독성을 높이고 유지보수성을 향상시킵니다.

## 6. 파일 구조 및 모듈화
- **모듈화**: 코드가 커질 경우, 파일을 기능별로 분리하여 모듈화함으로써 유지보수성을 높입니다.

이와 같은 원칙을 따라 코드 작성 시, 가독성과 유지보수성이 향상될 수 있습니다. 각 함수와 변수는 명확한 이름으로 정의되고, 중복 코드가 제거되며, 코드가 자연스럽게 읽히는 흐름을 가지도록 작성해야 합니다.
