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