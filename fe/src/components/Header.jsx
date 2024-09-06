import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { IoIosAdd } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { clearUser } from "../redux/actions";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogoClick = () => {
    if (user.role === "student") {
      navigate("/student-home");
    } else {
      navigate("/professor-home");
    }
  };

  const handleRegisterLectureClick = () => {
    navigate("/register-course");
  };

  const handleAddLectureClick = () => {
    navigate("/add-course");
  };

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  return (
    <>
      <header>
        <div className="h-[80px] w-[1024px] mx-auto bg-white flex justify-between items-center px-[20px]">
          <div
            onClick={handleLogoClick}
            className="
            font-9black italic text-[24px] cursor-pointer
            hover:text-[#DC143C] transition-all duration-300"
          >
            WHITEBOARD
          </div>
          <div className="flex items-center">
            {user.role === "student" && (
              <div
                onClick={handleRegisterLectureClick}
                className="
                font-8extrabold text-[20px] mr-[36px] flex items-center cursor-pointer bg-[#f1f1f1] rounded-[20px] py-[5px] pl-[10px] pr-[18px]
                hover:bg-[#D8D9DA] transition-all duration-300"
              >
                <IoIosAdd className="text-[28px]" />
                수강신청
              </div>
            )}
            {user.role === "professor" && (
              <div
                onClick={handleAddLectureClick}
                className="
                font-8extrabold text-[20px] mr-[36px] flex cursor-pointer items-center bg-[#f1f1f1] rounded-[20px] py-[5px] pl-[10px] pr-[18px]
                hover:bg-[#D8D9DA] transition-all duration-300"
              >
                <IoIosAdd className="text-[28px]" />
                새로운 강의 등록
              </div>
            )}
            <div className="font-8extrabold text-[20px] flex items-center">
              {user.role === "student" && (
                <PiStudentBold className="mr-[8px] mb-[1px]" />
              )}
              {user.role === "professor" && (
                <FaChalkboardTeacher className="mr-[8px] mb-[1px]" />
              )}
              {user.name}
              <span className="font-5medium ml-[5px]">
                {user.role === "student" && "학생 "}
                {user.role === "professor" && "교수자 "}
              </span>
              <MdOutlineLogout
                onClick={handleLogout}
                className="text-[33px] text-[#aaa] ml-[25px] p-[7px] hover:bg-[#f1f1f1] hover:rounded-[50%] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
