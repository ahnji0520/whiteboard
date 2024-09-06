# 노션 링크 🔗
**[WHITEBOARD 노션](https://verbose-coral-c94.notion.site/WHITEBOARD-4ba97bf6741d4ac49c9008f699da3668)**  
(노션 페이지에 리포트 첨부했습니다!)

# 로컬 환경 구성 방법
git bash 기준
<br />
### 0.
```
mkdir new-folder
cd new-folder
cd whiteboard
```
whiteboard 안에 fe, be 폴더가 있습니다!
<br />
### 1. 의존성 설치 및 실행
**로컬 mongodb 서버 실행**
<br />
connect to localhost:27017

**백엔드(Nest.js)**
```
cd be
npm install
npm run start:dev 
```
(실행 후 mongodb compass에서 새로고침하면<br />whiteboard db가 생성되고 seed data들이 들어가 있는 것을 확인할 수 있음)
<br />
**프론트엔드(Vite + React + Tailwind)**
```
cd fe
npm install
npm run dev 
```

### 2. 프로젝트 접속 url
**백엔드**
<br />
http://localhost:3000
<br />
**프론트엔드**
<br />
http://localhost:5173

### 3. seed 데이터
**학생 계정**
<br />
id: heart
<br />
password: 1111
<br />
**교수자 계정**
<br />
id: sjbaek
<br />
password: 1111
