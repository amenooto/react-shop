##vite

vite는 개발 환경에서는 Esmodule을 그대로 쓴다
그 의미는 번들리을 안한다

웹팩 자체는 가볍지만 설치해야하는 플로그인 많다
번들링 유뮤에서 차이가 나온다


main page -> main.jsx, page1.jsx
products page -> products.jsxm productList.jsx
main page에 있을때 products page를 불러올 필요가 없고
products page에 접근할때 정보가 있으면 되는데
웹팩은 어느 페이지를 가던지 번들링을 하면서 모든 정보를 가지고 있다

그래서 초기로딩에 성능이 느릴수밖에 없다


map에 담는것과 오브젝트에 담는것 차이
const obj = {a:1, b:2, c:3}
const arr = Object.entries(obj) // 이렇게 별개의 메소드를 사용해서 변환

const map = new Map([['a', 1], ['b', 2], ['c', 3]])
[...map.entries()] // 이렇게 바로 사용이 가능
편리한 점이 많음
맵에는 키값에 문자열이 아닌것도 들어갈수 있어서 사용하기 좋음
