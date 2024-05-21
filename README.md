Đây là sản phẩm sau khi tôi tham gia khoá học về Vuejs, Firebase, Pinia trên udemy.com. Link khoá học ở [đây](https://www.udemy.com/course/vue-js-3-composition-api/)

Nếu bạn clone về thì chắc chắn không thế chạy được.

- Đầu tiên bạn phải xác định firebase.js như mình có để linh ở dưới 
- Thứ hai, vì dùng firebase để hosting nên bạn cũng tìm qua về cách build rồi hosting với fire, nó gồm một lệnh cơ bản thôi. Ngoài ra bạn hoàn toàn có thể hosting bằng các nền tảng khác như notify,.. Một số lệnh mình dùng để hoàn thành ứng dụng.
    - firebase login
    - firebase init
    - npm run build
    - firebase deploy
- Mình đã deploy và app có sẵn tại [đây](http://localhost:5173/#/auth)
- Nếu các bạn có câu hỏi gì, mình sẵn sàng trả lời,

Bạn cần cấu hình ./src/js/firebase.js như sau: 
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
```
