import { IoArrowBack } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { FaIdBadge } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { MdEditNote } from "react-icons/md";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getCourseByCourseId,
  getStudentsByCourseId,
  removeStudentFromCourse,
  getPostsByCourseId,
} from "../api/course";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { courseId } = location.state || {};

  const [category, setCategory] = useState("게시물 목록");
  const [students, setStudents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [course, setCourse] = useState(null);

  const fetchCourseInfo = async (courseId) => {
    try {
      const response = await getCourseByCourseId(courseId);
      setCourse(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = async (courseId) => {
    try {
      const response = await getStudentsByCourseId(courseId);
      console.log(response);
      setStudents(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async (courseId) => {
    try {
      const response = await getPostsByCourseId(courseId);
      setPosts(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveStudent = async (courseId, studentId) => {
    try {
      await removeStudentFromCourse(courseId, studentId);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== studentId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPostClick = () => {
    navigate("/add-post", { state: { courseId } });
  };

  const handlePostClick = (postId) => {
    navigate("/post-detail", {
      state: {
        courseId,
        courseTitle: course.title,
        postId,
        from: "/course-detail",
      },
    });
  };

  const handleBackClick = () => {
    if (user.role === "professor") {
      navigate("/professor-home");
    } else {
      navigate("/student-home");
    }
  };

  useEffect(() => {
    fetchStudents(courseId);
    fetchCourseInfo(courseId);
    fetchPosts(courseId);
  }, []);

  return (
    <div className="flex flex-col items-center w-[720px] mx-auto my-[20px] px-[20px]">
      {user.role === "professor" && (
        <div className="fixed w-[130px] left-[280px] top-[310px] flex flex-col">
          <div
            onClick={() => setCategory("게시물 목록")}
            className={`flex items-center cursor-pointer font-8extrabold text-[18px] mb-[10px] ${
              category === "게시물 목록" ? "text-[#000]" : "text-[#aaa]"
            }`}
          >
            <FaList className="mr-[10px]" />
            <span className="mr-[5px]">게시물 목록</span>
            {category === "게시물 목록" && (
              <MdOutlineKeyboardArrowRight className="ml-auto" />
            )}
          </div>
          <div
            onClick={() => setCategory("학생 관리")}
            className={`flex items-center cursor-pointer font-8extrabold text-[18px] mb-[10px] ${
              category === "학생 관리" ? "text-[#000]" : "text-[#aaa]"
            }`}
          >
            <FaIdBadge className="mr-[10px]" />
            <span className="mr-[5px]">학생 관리</span>
            {category === "학생 관리" && (
              <MdOutlineKeyboardArrowRight className="ml-auto" />
            )}
          </div>
        </div>
      )}
      <IoArrowBack
        onClick={handleBackClick}
        className="text-[48px] mr-auto mt-[30px] mb-[10px] ml-[-10px] p-1 rounded-[50%] text-[#aaa] hover:bg-[#f1f1f1]"
      />
      <div className="font-8extrabold text-[36px] mr-auto">
        <span className="text-[#DC143C]">{course?.courseId}</span>{" "}
        {course?.title}
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="px-[10px] py-[5px] mr-[5px] font-6semibold bg-[#e7e7e7] text-[14px] text-[#aaa] bg-white rounded-[10px]">
            {course?.classificaton === "major" ? "전공" : "교양"}
          </h1>
          <h1 className="px-[10px] py-[5px] mr-[5px] font-6semibold bg-[#e7e7e7] text-[14px] text-[#aaa] bg-white rounded-[10px]">
            {course?.department}
          </h1>
        </div>
        {user.role === "student" ? (
          <h1 className="font-8extrabold text-[16px] mt-[5px]">
            {course?.professor.name}
            <span className="font-4regular"> 교수님</span>
          </h1>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full h-[1px] bg-[#eee] my-[15px]" />

      {category === "학생 관리" ? (
        <div className="w-full mt-[-4px]">
          {students.length > 0 ? (
            students.map((student) => (
              <div
                key={student.studentId}
                className="flex items-center justify-between py-[10px] border-b border-[#eee]"
              >
                <div>
                  <span className="font-8extrabold text-[16px] mr-[5px]">
                    {student.studentId}
                  </span>
                  <span className="font-4regular text-[16px]">
                    {student.name}
                  </span>
                </div>
                <IoIosRemoveCircleOutline
                  onClick={() => handleRemoveStudent(courseId, student.id)}
                  className="text-[20px] cursor-pointer hover:text-[#aaa]"
                />
              </div>
            ))
          ) : (
            <p className="text-[#aaa] text-center font-6semibold mt-[5px]">
              등록된 학생이 없습니다.
            </p>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col">
          {user.role === "professor" ? (
            <div
              className="ml-auto flex items-center cursor-pointer text-[#aaa] text-[14px] font-7bold bg-[#eee] rounded-[10px] px-[10px] py-[5px] mb-[10px] hover:text-black"
              onClick={handleAddPostClick}
            >
              <MdEditNote className="mr-[5px]" />새 게시물 작성하기
            </div>
          ) : null}
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.postId}
                onClick={() => handlePostClick(post.postId)}
                className="cursor-pointer hover:bg-[#eeeeee] flex items-center justify-between px-[10px] py-[10px] border-b border-[#eee]"
              >
                <span className="font-6semibold text-[16px]">{post.title}</span>
                <span className="font-4regular text-[12px] text-[#aaa]">
                  {new Date(post.timestamp)
                    .toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/\./g, "")
                    .replace(/ /g, ".")}
                </span>
              </div>
            ))
          ) : (
            <p className="text-[#aaa] text-center font-6semibold mt-[5px]">
              등록된 게시물이 없습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseDetailPage;
