import { FaRegCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { registerCourse } from "../api/course";

const StudentCourseCard = ({
  title,
  courseId,
  classification,
  department,
  professorName,
  addLecture,
  enrolled: initialEnrolled,
}) => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const [classKor, setClassKor] = useState("");
  const [enrolled, setEnrolled] = useState(initialEnrolled);

  const register = async (courseId, id, studentId, name) => {
    try {
      await registerCourse(courseId, id, studentId, name);
      setEnrolled(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegisterClick = (e) => {
    e.stopPropagation();
    if (enrolled) {
      alert("이미 수강중인 강의입니다.");
      return;
    }
    register(courseId, user.id, user.studentId, user.name);
  };

  const handleCardClick = () => {
    navigate("/course-detail", { state: { courseId } });
  };

  useEffect(() => {
    if (classification === "major") {
      setClassKor("전공");
    } else if (classification === "liberal-arts") {
      setClassKor("교양");
    } else {
      setClassKor("");
    }
  }, [classification]);

  return (
    <div
      onClick={handleCardClick}
      className="w-[231px] flex flex-col bg-[#f1f1f1] py-[15px] px-[20px] rounded-[20px] transform transition-transform duration-300 hover:scale-105"
    >
      <h1 className="font-9black text-[#DC143C] text-[18px]">{courseId}</h1>
      <h1 className="font-9black text-[18px] mt-[5px]">{title}</h1>
      <h1 className="font-8extrabold text-[14px] mt-[5px]">
        {professorName}
        <span className="font-4regular"> 교수님</span>
      </h1>
      <div className="flex flex-row items-center mt-[5px]">
        <h1 className="px-[10px] py-[5px] mr-[5px] font-6semibold text-[14px] text-[#aaa] bg-white rounded-[10px]">
          {classKor}
        </h1>
        <h1 className="px-[10px] py-[5px] font-6semibold text-[14px] text-[#aaa] bg-white rounded-[10px]">
          {department}
        </h1>
      </div>
      {addLecture && (
        <div
          onClick={handleRegisterClick}
          className={`
          flex items-center justify-center px-[10px] cursor-pointer py-[5px] mt-[10px] font-6semibold text-[14px] bg-white rounded-[10px]
          hover:bg-[#ddd] transition-all duration-300
          ${enrolled ? "text-[#DC143C]" : "text-black"}`}
        >
          {enrolled ? (
            <FaCircleCheck className="mr-[5px]" />
          ) : (
            <FaRegCheckCircle className="mr-[5px]" />
          )}
          {enrolled ? "수강중" : "수강신청"}
        </div>
      )}
    </div>
  );
};

StudentCourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  professorName: PropTypes.string.isRequired,
  addLecture: PropTypes.bool.isRequired,
  enrolled: PropTypes.bool.isRequired,
};

export default StudentCourseCard;
