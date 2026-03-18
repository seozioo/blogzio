# blogzio

## Client
### 개발 서버 실행
1. `npm i`
2. `npm run dev -w client`

### API 코드 생성
1. `docker compose up -d`
2. `npm run generate`

### 빌드
1. `npm ci`
2. `npm run build -w client`

## Server
### 개발 서버 실행
1. `docker compose up -d`
2. windows `.\gradlew.bat bootRun`
   
   macos or linux `./gradlew bootRun`

## 참고 문서
- https://mangkyu.tistory.com/204
- https://alstn113.tistory.com/56#Overlap%20Period-1-10
