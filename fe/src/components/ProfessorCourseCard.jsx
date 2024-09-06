import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfessorCourseCard = ({
  title,
  courseId,
  classification,
  department,
}) => {
  const navigate = useNavigate();

  const [classKor, setClassKor] = useState("");

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
      <div className="flex flex-row items-center mt-[5px]">
        <h1 className="px-[10px] py-[5px] mr-[5px] font-6semibold text-[14px] text-[#aaa] bg-white rounded-[10px]">
          {classKor}
        </h1>
        <h1 className="px-[10px] py-[5px] font-6semibold text-[14px] text-[#aaa] bg-white rounded-[10px]">
          {department}
        </h1>
      </div>
    </div>
  );
};

ProfessorCourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  classification: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
};

export default ProfessorCourseCard;
