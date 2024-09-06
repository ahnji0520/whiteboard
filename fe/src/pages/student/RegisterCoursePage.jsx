import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import StudentCourseCard from "../../components/StudentCourseCard";
import { getCourse, getCourseByStudentId } from "../../api/course";

const RegisterCoursePage = () => {
  const user = useSelector((state) => state.user);

  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const allCourses = await getCourse();
      const myCourses = await getCourseByStudentId(user.id);
      setCourses(allCourses);
      setMyCourses(myCourses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const isCourseEnrolled = (courseId) => {
    return myCourses.some((course) => course.courseId === courseId);
  };

  return (
    <div className="flex flex-col items-center w-[1024px] mx-auto my-[20px] px-[20px]">
      <div className="flex flex-wrap justify-start gap-[20px] mt-[20px] w-full">
        {courses.length > 0 ? (
          courses.map((course) => (
            <StudentCourseCard
              key={course.courseId}
              title={course.title}
              courseId={course.courseId}
              classification={course.classification}
              department={course.department}
              professorName={course.professor.name}
              addLecture={true}
              enrolled={isCourseEnrolled(course.courseId)}
            />
          ))
        ) : (
          <div className="text-center font-6semibold w-full mt-[20px] text-[18px] text-[#bbb]">
            아직 등록된 강의가 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterCoursePage;
