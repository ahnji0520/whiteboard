import apiClient from "./apiClient";

// 로그인
export const login = async (id, password) => {
  const response = await apiClient.post("/user/login", {
    id,
    password,
  });
  return response.data;
};

// 회원가입
export const register = async (id, password, name, studentId, role) => {
  const response = await apiClient.post("/user/register", {
    id,
    password,
    name,
    studentId,
    role,
  });
  return response.data;
};
