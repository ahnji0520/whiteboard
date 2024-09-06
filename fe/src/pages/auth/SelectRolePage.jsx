import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectRolePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleNextClick = () => {
    if (!selectedRole) {
      alert("가입 유형을 선택해 주세요!");
    } else {
      navigate("/register", { state: { role: selectedRole } });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-[100vh]">
      <IoClose
        onClick={() => navigate(-1)}
        className="
        fixed right-[200px] top-[30px] text-[50px] cursor-pointer p-[5px]
        hover:bg-[#f1f1f1] hover:rounded-[50%]"
      />

      <h1 className="font-9black italic text-[36px]">WHITEBOARD</h1>
      <div
        onClick={() => setSelectedRole("professor")}
        className={`
        flex items-center justify-center cursor-pointer font-6semibold text-[18px] w-1/5 bg-[#f1f1f1] rounded-[20px] text-center text-[#aaa] py-[10px] mt-[30px]
        ${selectedRole === "professor" ? "text-black" : "text-[#aaa]"}
        hover:bg-[#D8D9DA] hover:text-[#686D76] transition-all duration-300`}
      >
        <FaChalkboardTeacher className="mr-[8px]" />
        교수자로 가입합니다
      </div>
      <div
        onClick={() => setSelectedRole("student")}
        className={`
        flex items-center justify-center cursor-pointer font-6semibold text-[18px] w-1/5 bg-[#f1f1f1] rounded-[20px] text-center text-[#aaa] py-[10px] my-[10px]
        ${selectedRole === "student" ? "text-black" : "text-[#aaa]"}
        hover:bg-[#D8D9DA] hover:text-[#686D76] transition-all duration-300`}
      >
        <PiStudentBold className="mr-[5px]" />
        학생으로 가입합니다
      </div>
      <button
        onClick={handleNextClick}
        className="font-6semibold cursor-pointer text-center text-[18px] w-1/5 px-[20px] py-[10px] rounded-[20px] bg-[#DC143C] text-white hover:bg-[#a30f2e] transition duration-300"
      >
        다음으로
      </button>
    </div>
  );
};

export default SelectRolePage;
