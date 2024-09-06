import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../api/auth";
import { setUser } from "../../redux/actions";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!id || !password) {
      alert("아이디와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    try {
      const result = await login(id, password);
      dispatch(setUser(result));
      if (result.role === "student") {
        navigate("/student-home");
      } else {
        navigate("/professor-home");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <h1 className="font-9black italic text-[48px]">WHITEBOARD</h1>
      <h1 className="font-5medium text-[18px]">
        <span className="text-[#DC143C]">KWEB</span> KWEB KWEB KWEB
      </h1>
      <form className="w-1/5 mt-[50px]" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          className="font-6semibold text-[18px] w-full px-[20px] py-[10px] border-2 rounded-[20px] border-[#D9D9D9] mb-[10px] text-black"
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
        <button
          type="submit"
          className="font-6semibold text-[18px] cursor-pointer w-full px-[20px] py-[10px] rounded-[20px] bg-[#DC143C] text-white hover:bg-[#a30f2e] transition duration-300"
        >
          로그인
        </button>
        {errorMessage && (
          <p className="font-6semibold text-[16px] text-red-500 mt-[10px] text-center">
            {errorMessage}
          </p>
        )}
      </form>
      <Link
        to="/select-role"
        className="font-6semibold text-[18px] cursor-pointer mt-[10px] text-black underline hover:text-[#DC143C] transition duration-300"
      >
        회원가입
      </Link>
    </div>
  );
};

export default LoginPage;
