import { IoArrowBack } from "react-icons/io5";

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { getCourseByCourseId, addPost } from "../../api/course";

const AddPostPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId } = location.state || {};

  const [course, setCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchCourseInfo = async (courseId) => {
    try {
      const response = await getCourseByCourseId(courseId);
      setCourse(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    try {
      const timestamp = new Date();
      await addPost(courseId, title, content, timestamp);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    console.log("Content value:", value);
  };

  useEffect(() => {
    fetchCourseInfo(courseId);
  }, []);

  return (
    <div className="flex flex-col items-center w-[720px] mx-auto my-[20px] px-[20px]">
      <IoArrowBack
        onClick={() => navigate(-1)}
        className="text-[48px] mr-auto mt-[30px] mb-[10px] ml-[-10px] p-1 rounded-[50%] text-[#aaa] hover:bg-[#f1f1f1]"
      />
      <div className="font-8extrabold text-[36px] mr-auto">
        <span className="text-[#DC143C]">{course?.courseId}</span>{" "}
        {course?.title}
      </div>
      <input
        type="text"
        placeholder="제목"
        className="font-6semibold text-[36px] w-full outline-none border-none text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="w-full h-[1px] bg-[#eee] my-[15px]" />
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        className="w-full h-[300px] mb-[15px]"
        placeholder="내용을 입력하세요"
      />
      <div
        onClick={handleAdd}
        className="my-[50px] font-6semibold text-center text-[18px] cursor-pointer w-full px-[20px] py-[10px] rounded-[20px] bg-[#DC143C] text-white hover:bg-[#a30f2e] transition duration-300"
      >
        등록하기
      </div>
    </div>
  );
};

export default AddPostPage;
