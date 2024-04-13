import { ref } from "vue";
import { googleTokenLogin } from "vue3-google-login";

export const GOOGLE_CLIENT_ID = "";

export const data = ref();

//測試街口
import { loginApi, BindGoogleLogin } from "@/apis/loginApis";
// googleLogin().then((res) => {
//   data.value =res
// });

export const handleGoogleAuthTokenLogin = () => {
  const result = googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID,
  }).then((response) => {
    data.value = response;

    console.log(response, memberToken);
    console.log(response.access_token);

    // todo
    // 這要修改成其他登入呼叫

    BindGoogleLogin({
      accessToken: response.access_token,
      memberToken: memberToken,
    }).then((r) => {
      console.log(r);
      return r;
    });
  });
};

export const BindGoogle = async (memberToken) => {
  const result = await googleTokenLogin({
    clientId: GOOGLE_CLIENT_ID,
  }).then((response) => {
    data.value = response;

    console.log(response, memberToken);
    console.log(response.access_token);

    // todo
    // 這要修改成其他登入呼叫

    BindGoogleLogin({
      accessToken: response.access_token,
      memberToken: memberToken,
    }).then((r) => {
      console.log(r);
      return r;
    });
  });

  return result;
};
