import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ProfessorCourseCard from "../../components/ProfessorCourseCard";
import { getCourseByProfessorId } from "../../api/course";

const ProfessorHomePage = () => {
  const user = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);

  const fetchCourses = async (professorId) => {
    try {
      const response = await getCourseByProfessorId(professorId);
      setCourses(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCourses(user.id);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center w-[1024px] mx-auto my-[20px] px-[20px]">
      <div className="font-8extrabold text-[20px] mr-[30px] cursor-pointer mr-auto">
        나의 강의
      </div>
      <div className="flex flex-wrap justify-start gap-[20px] mt-[20px] w-full">
        {courses.length > 0 ? (
          courses.map((course) => (
            <ProfessorCourseCard
              key={course.courseId}
              title={course.title}
              courseId={course.courseId}
              classification={course.classification}
              department={course.department}
            />
          ))
        ) : (
          <div className="text-center font-6semibold w-full mt-[20px] text-[18px] text-[#bbb]">
            아직 등록한 강의가 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessorHomePage;
