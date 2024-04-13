import httpInstance from "@/utils/http";

export function googleLogin(accessToken) {
  return httpInstance({
    method: "post",
    url: `Members/googleLogin`,
    data: {
      accessToken,
    },
  });
}

export function BindGoogleLogin({ accessToken, memberToken }) {
  console.log({ accessToken, memberToken });
  return httpInstance({
    method: "post",
    url: `Members/BindGoogleLogin`,
    data: {
      accessToken,
      memberToken,
    },
  });
}

export function BindLineLogin({ lineId, memberToken }) {
  id;
  return httpInstance({
    method: "post",
    url: `Members/BindLineLogin`,
    data: {
      lineId,
      memberToken,
    },
  });
}

export const loginApi = ({
  loginMethod,
  account,
  password,
  passwordConfirm,
  googleAccessToken,
  lineCode,
}) => {
  return httpInstance({
    method: "post",
    url: "Members/Login",
    data: {
      loginMethod,
      account,
      password,
      passwordConfirm,
      googleAccessToken,
      lineCode,
    },
  });
};

export const checkAccountIsRegister = (account) => {
  return httpInstance({
    method: "get",
    url: `Members/checkAccountIsRegister?account=${account}`,
  });
};

export const checkEmailIsRegister = (email) => {
  return httpInstance({
    method: "get",
    url: `Members/checkEmailIsRegister?email=${email}`,
  });
};

export const RegisterMember = ({
  account,
  password,
  passwordConfirm,
  chineseLastName,
  chineseFirstName,
  englishLastName,
  englishFirstName,
  gender,
  dateOfBirth,
  phone,
  email,
  passportNumber,
  passportExpiryDate,
}) => {
  return httpInstance({
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    url: "Members/Register",
    data: JSON.stringify({
      account,
      password,
      passwordConfirm,
      chineseLastName,
      chineseFirstName,
      englishLastName,
      englishFirstName,
      gender,
      dateOfBirth,
      phone,
      email,
      passportNumber,
      passportExpiryDate,
    }),
  });
};

export const ActiveRegister = (memberId, confirmCode) => {
  return httpInstance({
    method: "get",
    url: `Members/ActiveRegister?memberId=${memberId}&confirmCode=${confirmCode}`,
  });
};

export const GetMemberInfo = (token) => {
  return httpInstance({
    method: "get",
    url: `Members/GetMemberInfo?token=${token}`,
  });
};

export const UpdateMemberInfo = ({
  chineseLastName,
  chineseFirstName,
  englishLastName,
  englishFirstName,
  phone,
  email,
  passportNumber,
  passportExpiryDate,
  token,
}) => {
  return httpInstance({
    method: "post",
    url: "Members/UpdateMemberInfo",
    data: {
      chineseLastName,
      chineseFirstName,
      englishLastName,
      englishFirstName,
      phone,
      email,
      passportNumber,
      passportExpiryDate,
      token,
    },
  });
};

export const UpdateMemberPassword = ({
  passwordOld,
  passwordNew,
  passwordConfirm,
  token,
}) => {
  return httpInstance({
    method: "post",
    url: "Members/UpdateMemberPassword",
    data: {
      passwordOld,
      passwordNew,
      passwordConfirm,
      token,
    },
  });
};
