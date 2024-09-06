import { IoArrowBack } from "react-icons/io5";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getPostByPostId } from "../api/course";

const PostDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseId, courseTitle, postId } = location.state || {};
  const [post, setPost] = useState(null);
  const [previousPage, setPreviousPage] = useState("");

  const getPost = async (courseId, postId) => {
    try {
      const response = await getPostByPostId(courseId, postId);
      setPost(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.from) {
      setPreviousPage(location.state.from);
    } else {
      setPreviousPage(document.referrer);
    }
    console.log(previousPage);
  }, [location.state]);

  const handleBackClick = () => {
    if (previousPage.includes("/student-home")) {
      navigate("/student-home", { state: { courseId } });
    } else if (previousPage.includes("/course-detail")) {
      navigate("/course-detail", { state: { courseId } });
    }
  };

  useEffect(() => {
    getPost(courseId, postId);
  }, []);

  return (
    <div className="flex flex-col items-center w-[720px] mx-auto my-[20px] px-[20px]">
      <IoArrowBack
        onClick={handleBackClick}
        className="text-[48px] mr-auto mt-[30px] mb-[10px] ml-[-10px] p-1 rounded-[50%] text-[#aaa] hover:bg-[#f1f1f1]"
      />
      <div className="font-8extrabold text-[36px] mr-auto">
        <span className="text-[#DC143C]">{courseId}</span> {courseTitle}
      </div>
      <div className="w-full flex justify-between items-center">
        <h1 className="font-6semibold text-[24px]">{post?.title}</h1>
        <h1 className="font-4regular text-[14px] text-[#aaa]">
          {new Date(post?.timestamp)
            .toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\./g, "")
            .replace(/ /g, ".")}
        </h1>
      </div>
      <div className="w-full h-[1px] bg-[#eee] my-[15px]" />
      <div
        className="rich-text-content mr-auto prose prose-lg font-4regular text-[16px]"
        style={{ lineHeight: "0.2" }}
        dangerouslySetInnerHTML={{ __html: post?.content }}
      />
      {/* <div>{post?.content}</div> */}
    </div>
  );
};

export default PostDetailPage;
