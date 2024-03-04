import { Loading } from '@components/base';
import { createContext, useContext, useState } from 'react';

export const INITIAL_USER_INFO = {
    "_id": "65d367864697cd06a2b51cc6",
    "fullName": "Admin",
    "username": "admin",
    "email": "bachtv150902@gmail.com",
    "password": "$2b$10$gd9Hbj2tIKQoOelVl7/c5uCM3.4WyaJFlh5faeuNpZm6OYZg0lmfC",
    "role": "admin",
    "courses": [
      {
        "_id": "65d9df0a42380a9159d35af6",
        "course": {
          "_id": "65d9ddb442380a9159d35912",
          "name": "Lập Trình JavaScript Nâng Cao",
          "slug": "lap-trinh-javascript-nang-cao",
          "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708776880533.jpg"
        },
        "lessons": [
          {
            "lesson": "65d9de5842380a9159d359a7",
            "status": "isStudy",
            "_id": "65d9df0a42380a9159d35af7"
          }
        ],
        "status": 1,
        "createdAt": "2024-02-24T12:20:26.166Z"
      },
      {
        "_id": "65db1fbd7408538c1e4cc604",
        "course": {
          "_id": "65da177d90acc95dd805f158",
          "name": "Node & ExpressJS",
          "slug": "node-&-expressjs",
          "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708791673649.png"
        },
        "qr": "https://img.vietqr.io/image/MB-606606868-compact2.png?amount=136174&addInfo=%C4%90%C4%83ng%20k%C3%BD%20kh%C3%B3a%20h%E1%BB%8Dc%20Coursera%20Replica&accountName=Coursera%20Replica",
        "lessons": [
          {
            "lesson": "65da256a059a4ddf9c628c26",
            "status": "isStudy",
            "_id": "65db1fbd7408538c1e4cc605"
          },
          {
            "lesson": "65da25b2059a4ddf9c628c6f",
            "status": "isLocked",
            "_id": "65db1fbd7408538c1e4cc606"
          },
          {
            "lesson": "65da25d7059a4ddf9c628cb8",
            "status": "isLocked",
            "_id": "65db1fbd7408538c1e4cc607"
          }
        ],
        "status": 0,
        "createdAt": "2024-02-25T11:08:45.199Z"
      }
    ],
    "posts": [
      {
        "_id": "65d36bde4697cd06a2b51ff4",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Authentication & Authorization trong ReactJS",
        "slug": "1708354526203-authentication-&-authorization-trong-reactjs",
        "time": 9,
        "hashtag": [
          "Front-end",
          " reactJs"
        ],
        "likes": [
          "65d367864697cd06a2b51cc6"
        ],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708354525442.jpg",
        "description": "Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền người dùng trước khi cho người dùng truy cập vào tài nguyên của ứng dụng.\r\n\r\nTrong bài viết này sẽ hướng dẫn các ReactJS thủ 🤣 cách implement Authentication và Authorization. A chị nào biết rồi giả bộ đọc hết bài viết rồi so sánh với cách đang dùng xem thế nào ha :))\r\n\r\nNẹt bô rồi gẹt gô thôi ReactJS thủ 🤣",
        "createdAt": "2024-02-19T14:55:26.204Z"
      },
      {
        "_id": "65d36c534697cd06a2b520c0",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Thạc sĩ tạo khung xương nhân tạo từ vỏ tôm và rong biển",
        "time": 0,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708354642446.jpg",
        "description": "Sử dụng chitosan từ vỏ tôm và alginate trong rong biển, thạc sĩ Vũ Thanh Bình tạo khung xương nhân tạo phục hồi phần xương bị khuyết.",
        "createdAt": "2024-02-19T14:57:23.069Z"
      },
      {
        "_id": "65d9e02a42380a9159d35d13",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Authentication & Authorization trong ReactJS",
        "slug": "1708777514830-authentication-&-authorization-trong-reactjs",
        "time": 9,
        "hashtag": [
          "Auth",
          " React"
        ],
        "likes": [
          "65d367864697cd06a2b51cc6"
        ],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708777511870.png",
        "description": "Authentication và Authorization là một phần quan trọng trong việc phát triển phần mềm, giúp chúng ta xác thực và phân quyền người dùng trước khi cho người dùng truy cập vào tài nguyên của ứng dụng.\r\n\r\nTrong bài viết này sẽ hướng dẫn các ReactJS thủ 🤣 cách implement Authentication và Authorization. A chị nào biết rồi giả bộ đọc hết bài viết rồi so sánh với cách đang dùng xem thế nào ha :))\r\n\r\nNẹt bô rồi gẹt gô thôi ReactJS thủ 🤣",
        "createdAt": "2024-02-24T12:25:14.831Z"
      },
      {
        "_id": "65d9e09742380a9159d35e2e",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Tuyển tập 101 câu chúc Tết dành cho người yêu năm 2024 hay và ý nghĩa nhất",
        "time": 0,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708777620435.webp",
        "description": "Bước sang năm mới Giáp Thìn 2024, đừng bỏ qua những lời chúc Tết vừa giản dị nhưng lại vô cùng ngọt ngào, ý nghĩa dành cho nửa kia.",
        "createdAt": "2024-02-24T12:27:03.013Z"
      },
      {
        "_id": "65d9fd9342380a9159d37597",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "`Tất tần tật` về cải thiện Performance của 1 trang web🚀",
        "slug": "1708785043399-`tat-tan-tat`-ve-cai-thien-performance-cua-1-trang-web🚀",
        "time": 2,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708785040916.png",
        "description": "Ở bài viết này, chúng ta cùng nhau tìm hiểu về các vấn đề liên quan đến Performance ở phía FE. Không dài dòng nữa, bắt đầu thôi🚀\r\nNội dung mình sắp chia sẻ:\r\nTại sao việc cải thiện Hiệu suất của 1 trang web lại quan trọng đến vậy? 🔎\r\nCải thiện Perf cho CSS.\r\nCải thiện Perf cho Javascript.\r\nCải thiện Perf cho Images.\r\nCải thiện Perf cho Fonts.",
        "createdAt": "2024-02-24T14:30:43.401Z"
      },
      {
        "_id": "65d9fdf342380a9159d37641",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "\"Kết nối trước\" với preconnect, prefetch để làm gì?",
        "slug": "1708785139967-ket-noi-truoc-voi-preconnect-prefetch-de-lam-gi?",
        "time": 3,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708785138406.png",
        "description": "Đọc bài viết này để làm cái chi\r\nTìm hiểu công dụng của rel trong thẻ link\r\nBiết được cách làm cho website trông có vẻ \"nhanh hơn\"",
        "createdAt": "2024-02-24T14:32:19.967Z"
      },
      {
        "_id": "65d9fe4c42380a9159d376e5",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Học viên Funix lạc đường tới F8",
        "slug": "1708785228465-hoc-vien-funix-lac-duong-toi-f8",
        "time": 0,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708785226754.jpg",
        "description": "Tâm sự của một bạn học viên",
        "createdAt": "2024-02-24T14:33:48.466Z"
      },
      {
        "_id": "65da1e1c059a4ddf9c6284d4",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "So sánh JavaScript với những đối thủ khác",
        "slug": "1708793372009-so-sanh-javascript-voi-nhung-doi-thu-khac",
        "time": 0,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708793369232.png",
        "description": "Trong tương lai nếu bạn không nắm được JavaScript là gì thì khó mà tiến xa được trong lĩnh vực công nghệ thông tin. Tin tốt là: JavaScript không đáng sợ như mọi người đồn. Nhưng trước hết bạn cần nắm được những điều cơ bản về JavaScript để làm nền tảng.",
        "createdAt": "2024-02-24T16:49:32.010Z"
      },
      {
        "_id": "65da1e7c059a4ddf9c628578",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Tổng quan về Git và những câu lệnh cơ bản",
        "slug": "1708793468842-tong-quan-ve-git-va-nhung-cau-lenh-co-ban",
        "time": 0,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708793467031.png",
        "description": "Xin chào mọi người, chúc mọi người một ngày cuối tuần vui vẻ. Hôm này mình sẽ chia sẻ về Git một công cụ khá quen thuộc với anh em developer. Không để mọi người chờ lâu, bắt đầu nào.",
        "createdAt": "2024-02-24T16:51:08.842Z"
      },
      {
        "_id": "65da1ee9059a4ddf9c62861c",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Lộ trình học C# .NET Core(5, 6)",
        "slug": "1708793577941-lo-trinh-hoc-c#-.net-core(5-6)",
        "time": 2,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708793576387.jpg",
        "description": "Chào mọi người,\r\nHôm nay mình sẽ chia sẻ về lộ trình học C#, .Net core (5, 6) cho những bạn mới bắt đầu. Không để mọi người chờ lâu, cùng bắt đầu nào.",
        "createdAt": "2024-02-24T16:52:57.942Z"
      },
      {
        "_id": "65da1f6e059a4ddf9c6286c0",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Tailwind css và cách cài đặt cơ bản ",
        "slug": "1708793710592-tailwind-css-va-cach-cai-dat-co-ban-",
        "time": 2,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708793708728.png",
        "description": "Bạn đang lo lắng vì đặt tên class, sợ bị trùng css không mong muốn, hay muốn một framework hỗ trợ css dễ học mà dễ tùy biến theo ý thích đã có tailwind css.",
        "createdAt": "2024-02-24T16:55:10.592Z"
      },
      {
        "_id": "65da1fe6059a4ddf9c628764",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Cấu trúc cơ bản trong HTML",
        "slug": "1708793830206-cau-truc-co-ban-trong-html",
        "time": 0,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708793828472.jpg",
        "description": "Trắc hẳn ai cũng biết một trang web thì không thể nào thiếu đi HTML và HTML làm nên cấu trúc của một trang web, như bài viết các bạn đang đọc bài viết này thì cũng được viết bằng html.\r\ncơ bản của html\r\nhôm nay mình xin giới thiệu sơ cho mọi người về cấu trúc cơ bản của một trang HTML cơ bản nhá.",
        "createdAt": "2024-02-24T16:57:10.206Z"
      },
      {
        "_id": "65da2057059a4ddf9c62882b",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "ES7 React/Redux/GraphQL/React-Native snippets v3. Cách tạo một component nhanh chóng chỉ bằng 3 ký tự",
        "slug": "1708793943767-es7-react-redux-graphql-react-native-snippets-v3.-cach-tao-mot-component-nhanh-chong-chi-bang-3-ky-tu",
        "time": 1,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708793941928.png",
        "description": "Như chúng ta đã biết việc tạo một component nhiều lúc cũng khá mất nhiều thời gian nên mình xin giới thiệu extention này cho mọi người nhé",
        "createdAt": "2024-02-24T16:59:03.768Z"
      },
      {
        "_id": "65da20cd059a4ddf9c6288cf",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "Cách đưa code lên GitHub và tạo GitHub Pages",
        "slug": "1708794061508-cach-dua-code-len-github-va-tao-github-pages",
        "time": 4,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708794059689.png",
        "description": "Xin các bạn tại F8, khi mình đọc những bài viết trên nhóm F8 thì mình thấy có nhiều bạn vẫn không biết đưa code lên GitHub, hoặc bị lỗi, hoặc có thể là những bạn mới và đặc biệt là các bạn không biết tạo GitHub Pages ( cụ thể là hiển thị ra trang web để cho mọi người xem á! ). Ok, hôm nay mình sẽ hướng dẫn cụ thể để cho những bạn không biết bấy lâu nay có thể đưa code mình lên GitHub được nhe. Mình là Kha, là một thành viên trong nhóm \"Học lập trình web (F8 - Fullstack.edu.vn)\".",
        "createdAt": "2024-02-24T17:01:01.508Z"
      },
      {
        "_id": "65da2198059a4ddf9c628950",
        "by": {
          "_id": "65d367864697cd06a2b51cc6",
          "fullName": "Admin",
          "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg"
        },
        "title": "15 Extensions Visual Studio Code cho phát triển Web ",
        "slug": "1708794264831-15-extensions-visual-studio-code-cho-phat-trien-web-",
        "time": 4,
        "hashtag": [
          ""
        ],
        "likes": [],
        "image": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708794263046.png",
        "description": "Trước khi đến những blog liên quan đến kiến thức lập trình mình muốn chia sẻ với các bạn những extensions mở rộng trong Visual Studio Code giúp bạn cải thiện hiệu suất cũng như thời gian làm việc. Nào chúng ta cùng nhau đi tìm hiểu những extensions phổ biến trong năm 2020 nhé",
        "createdAt": "2024-02-24T17:04:24.831Z"
      }
    ],
    "saves": [],
    "status": 1,
    "createdAt": "2024-02-19T14:36:54.871Z",
    "updatedAt": "2024-02-25T13:13:12.155Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzNjc4NjQ2OTdjZDA2YTJiNTFjYzYiLCJpYXQiOjE3MDg4NjY3OTJ9.KNkNEv6PRXFVRTMdmlLvJN9R21F0_aMC4WwJa0wSTHs",
    "address": "",
    "avatar": "https://storage.googleapis.com/coursera-replica.appspot.com/images/1708353715862.jpg",
    "bio": "I am admin"
}

const INITIAL_STATE = {
  userInfo: INITIAL_USER_INFO,
  isLoading: false,
  isAuthenticated: true,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false
};

const AuthContext = createContext(INITIAL_STATE);

export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const value = {
    userInfo,
    setUserInfo,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? (
        <div className="fixed inset-x-0 inset-y-0 bg-black z-50 opacity-30 flex justify-center items-center">
          <Loading size={8} border={4} />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
