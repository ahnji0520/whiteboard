import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import Header from "./components/Header";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SelectRolePage from "./pages/auth/SelectRolePage";

import CourseDetailPage from "./pages/CourseDetailPage";
import PostDetailPage from "./pages/postDetailPage";

import StudentHomePage from "./pages/student/StudentHomePage";
import RegisterCoursePage from "./pages/student/RegisterCoursePage";

import ProfessorHomePage from "./pages/professor/ProfessorHomePage";
import AddCoursePage from "./pages/professor/AddCoursePage";
import AddPostPage from "./pages/professor/AddPostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="select-role" element={<SelectRolePage />} />
        <Route element={<Header />}>
          <Route path="student-home" element={<StudentHomePage />} />
          <Route path="professor-home" element={<ProfessorHomePage />} />
          <Route path="register-course" element={<RegisterCoursePage />} />
          <Route path="add-course" element={<AddCoursePage />} />
          <Route path="course-detail" element={<CourseDetailPage />} />
          <Route path="add-post" element={<AddPostPage />} />
          <Route path="post-detail" element={<PostDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
