# blogzio

## 개발 환경 준비

### 0. 설치 필요
- Docker / Docker Compose
- Node.js + npm
- Java JDK 17

### 1. 초기 실행
1. 컨테이너 실행

   ```bash
   docker compose up -d
   ```

2. 의존성 설치

   ```bash
   npm i
   ```

3. API 코드 생성

   ```bash
   npm run generate
   ```

### 2. Client

#### 개발 서버 실행
```bash
npm run dev -w client
```

#### 빌드
```bash
npm run build -w client
```

### 3. Server

#### 개발 서버 실행
- Windows

  ```bash
  .\gradlew.bat bootRun
  ```

- macOS / Linux

  ```bash
  ./gradlew bootRun
  ```

## 참고 문서
- https://mangkyu.tistory.com/204
- https://alstn113.tistory.com/56#Overlap%20Period-1-10
