import apiClient from "./apiClient";

// 강의 등록
export const addCourse = async (
  title,
  courseId,
  classification,
  department,
  professorId,
  professorName
) => {
  const response = await apiClient.post("/course", {
    title,
    courseId,
    classification,
    department,
    professor: {
      id: professorId,
      name: professorName,
    },
  });
  return response.data;
};

// 강의 조회
export const getCourse = async () => {
  const response = await apiClient.get("/course");
  return response.data;
};

// 교수 - 내 강의 조회
export const getCourseByProfessorId = async (id) => {
  const response = await apiClient.get(`/course/professor/${id}`);
  return response.data;
};

// 학생 - 내 강의 조회
export const getCourseByStudentId = async (id) => {
  const response = await apiClient.get(`/course/student/${id}`);
  return response.data;
};

// 수강신청
export const registerCourse = async (courseId, id, studentId, name) => {
  const response = await apiClient.post(`/course/${courseId}/register`, {
    id,
    studentId,
    name,
  });
  return response.data;
};

// 강의 수강 중인 학생 목록 조회
export const getStudentsByCourseId = async (courseId) => {
  const response = await apiClient.get(`/course/${courseId}/students`);
  return response.data;
};

// 강의 게시물 조회
export const getPostsByCourseId = async (courseId) => {
  const response = await apiClient.get(`/course/${courseId}/posts`);
  return response.data;
};

// 강의 세부정보 조회
export const getCourseByCourseId = async (courseId) => {
  const response = await apiClient.get(`/course/${courseId}`);
  return response.data;
};

// 학생 수강취소
export const removeStudentFromCourse = async (courseId, studentId) => {
  const response = await apiClient.post(`/course/${courseId}/unregister`, {
    studentId,
  });
  return response.data;
};

// 게시물 등록
export const addPost = async (courseId, title, content, timestamp) => {
  const response = await apiClient.post(`/course/${courseId}/posts`, {
    title,
    content,
    timestamp,
  });
  return response.data;
};

export const getPostByPostId = async (courseId, postId) => {
  const response = await apiClient.get(`/course/${courseId}/${postId}`);
  return response.data;
};

export const getPostsByDate = async (studentId) => {
  const response = await apiClient.get(`/course/post/${studentId}/recent`);
  return response.data;
};
