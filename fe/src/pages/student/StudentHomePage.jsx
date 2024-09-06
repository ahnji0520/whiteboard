import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { getCourseByStudentId, getPostsByDate } from "../../api/course";
import StudentCourseCard from "../../components/StudentCourseCard";

const StudentHomePage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [category, setCategory] = useState("나의 강의");

  const fetchCourses = async (studentId) => {
    try {
      const response = await getCourseByStudentId(studentId);
      setCourses(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTodayPosts = async (studentId) => {
    try {
      const response = await getPostsByDate(studentId);
      console.log(response);
      setRecentPosts(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostClick = (courseId, courseName, postId) => {
    console.log(postId);
    navigate("/post-detail", {
      state: {
        courseId,
        courseTitle: courseName,
        postId,
        from: "/student-home",
      },
    });
  };

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
      setCategory("활동 스트림");
    }
    if (user?.id) {
      fetchCourses(user.id);
    }
    fetchTodayPosts(user.id);
  }, [user, location.state]);

  return (
    <div className="flex flex-col items-center w-[1024px] mx-auto my-[20px] px-[20px]">
      <div className="flex items-center mr-auto">
        <div
          className={`font-8extrabold text-[20px] mr-[30px] cursor-pointer transition-all duration-300 ${
            category === "나의 강의"
              ? "text-black border-b-[4px] border-black"
              : "text-[#aaa] border-b-[4px] border-transparent"
          }`}
          onClick={() => setCategory("나의 강의")}
        >
          나의 강의
        </div>
        <div
          className={`font-8extrabold text-[20px] cursor-pointer transition-all duration-300 ${
            category === "활동 스트림"
              ? "text-black border-b-[4px] border-black"
              : "text-[#aaa] border-b-[4px] border-transparent"
          }`}
          onClick={() => setCategory("활동 스트림")}
        >
          활동 스트림
        </div>
      </div>
      {category === "나의 강의" ? (
        courses.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-[20px] mt-[30px] w-full">
            {courses.map((course) => (
              <StudentCourseCard
                key={course.courseId}
                title={course.title}
                courseId={course.courseId}
                classification={course.classification}
                department={course.department}
                professorName={course.professor.name}
                addLecture={false}
                enrolled={true}
              />
            ))}
          </div>
        ) : (
          <div className="font-6semibold text-[18px] text-[#bbb] mt-[30px]">
            수강중인 강의가 없습니다
          </div>
        )
      ) : (
        <div className="flex w-full mt-[40px]">
          <div>
            <h1 className="font-9black text-[48px] mr-left">RECENT</h1>
          </div>
          <div className="flex flex-col flex-grow ml-[40px] mt-[10px]">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div
                  key={post.postId}
                  onClick={() =>
                    handlePostClick(post.courseId, post.courseName, post.postId)
                  }
                  className="cursor-pointer hover:bg-[#eeeeee] flex items-center justify-between px-[10px] py-[10px] border-b border-[#eee]"
                >
                  <div>
                    <span className="font-9black text-[16px] text-[#DC143C] mr-[5px]">
                      {post.courseId}
                    </span>
                    <span className="font-9black text-[16px] mr-[10px]">
                      {post.courseName}
                    </span>
                    <span className="font-9black text-[16px] mr-[10px]">|</span>
                    <span className="font-6semibold text-[16px]">
                      {post.title}
                    </span>
                  </div>
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
              <p className="text-[#bbb] text-center font-6semibold text-[18px] mt-[15px]">
                등록된 게시물이 없습니다
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentHomePage;
