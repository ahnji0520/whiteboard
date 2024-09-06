import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { register } from "../../api/auth";
import { setUser } from "../../redux/actions";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { role } = location.state || {};

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isPasswordMatch = password === confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!id || !password || !name || (role === "student" && !studentId)) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const result = await register(id, password, name, studentId, role);
      dispatch(setUser(result));
      if (result.role === "student") {
        navigate("/student-home");
      } else {
        navigate("/professor-home");
      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
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

      {role === "professor" && (
        <div className="flex items-center justify-center cursor-pointer font-6semibold text-[18px] w-1/5 bg-[#f1f1f1] rounded-[20px] text-center text-black py-[10px] mt-[30px]">
          <FaChalkboardTeacher className="mr-[8px]" />
          교수자로 가입합니다
        </div>
      )}

      {role === "student" && (
        <div className="flex items-center justify-center cursor-pointer font-6semibold text-[18px] w-1/5 bg-[#f1f1f1] rounded-[20px] text-center text-black py-[10px] mt-[30px]">
          <PiStudentBold className="mr-[5px]" />
          학생으로 가입합니다
        </div>
      )}

      <form className="w-1/5" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="아이디"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] my-[10px] text-black"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {confirmPassword && (
          <p
            className={`font-6semibold text-[18px] mb-[10px] text-center ${
              isPasswordMatch ? "text-[#12372A]" : "text-[#A02334]"
            }`}
          >
            {isPasswordMatch
              ? "비밀번호가 일치합니다!"
              : "비밀번호가 일치하지 않습니다!"}
          </p>
        )}
        <input
          type="text"
          placeholder="이름"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {role === "student" && (
          <input
            type="text"
            placeholder="학번"
            className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className="font-6semibold text-[18px] cursor-pointer w-full px-[20px] py-[10px] rounded-[20px] bg-[#DC143C] text-white hover:bg-[#a30f2e] transition duration-300"
        >
          회원가입
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

export default RegisterPage;
