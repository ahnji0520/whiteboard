import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addCourse } from "../../api/course";

const AddCoursePage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [selectedClassification, setSelectedClassification] = useState("");
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddCourse = async (e) => {
    e.preventDefault();

    if (!selectedClassification) {
      alert("이수구분을 선택해 주세요!");
      return;
    }

    if (!title || !courseId || !department) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    try {
      await addCourse(
        title,
        courseId,
        selectedClassification,
        department,
        user.id,
        user.name
      );
      navigate("/professor-home");
    } catch (error) {
      console.error("강의 등록 실패:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "강의 등록 중 오류가 발생했습니다. 다시 시도해 주세요."
        );
      }
    }
  };

  return (
    <div className="flex flex-col w-1/4 h-[calc(100vh-80px)] mx-auto justify-center">
      <form onSubmit={handleAddCourse}>
        <input
          type="text"
          placeholder="학수번호"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
        />
        <input
          type="text"
          placeholder="과목명"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="개설학과"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <div className="flex flex-row mb-[10px]">
          <div
            onClick={() => setSelectedClassification("major")}
            className={`
            font-6semibold text-[18px] cursor-pointer flex-1 text-center bg-[#f1f1f1] text-[#aaa] py-[10px] rounded-[20px] mr-[5px]
            ${selectedClassification === "major" ? "text-black" : "text-[#aaa]"}
            hover:bg-[#D8D9DA] hover:text-[#686D76] transition-all duration-300`}
          >
            전공
          </div>
          <div
            onClick={() => setSelectedClassification("liberal-arts")}
            className={`
              font-6semibold text-[18px] cursor-pointer flex-1 text-center bg-[#f1f1f1] text-[#aaa] py-[10px] rounded-[20px] mr-[5px]
              ${
                selectedClassification === "liberal-arts"
                  ? "text-black"
                  : "text-[#aaa]"
              }
              hover:bg-[#D8D9DA] hover:text-[#686D76] transition-all duration-300`}
          >
            교양
          </div>
        </div>
        <button
          type="submit"
          className="font-6semibold text-[18px] cursor-pointer w-full px-[20px] py-[10px] rounded-[20px] bg-[#DC143C] text-white hover:bg-[#a30f2e] transition duration-300"
        >
          강의 등록
        </button>
        {errorMessage && (
          <p className="font-6semibold text-[16px] text-red-500 mt-[10px] text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddCoursePage;
