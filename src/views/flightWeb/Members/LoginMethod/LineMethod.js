import axios from "axios";
import { loginApi } from "@/apis/loginApis.js";

export const handleLineLoginButtonClick = () => {
  let URL = "https://access.line.me/oauth2/v2.1/authorize?";
  URL += "response_type=code";

  //channel id
  URL += "&client_id=";

  // 與Line Developer Channel設定的一樣就好，驗證完就會經過瀏覽器轉址回來
  URL += "&redirect_uri=http://localhost:8888/login";

  // 狀態碼是會從client呼叫端帶到驗證端，再從驗證端帶回
  // 因此應該可以作為一個亂數卡控確保是自   已丟出去的交易碼
  URL += "&state=abcde";

  //要求存取的範圍
  URL += "&scope=profile%20openid%20email";
  window.location.href = URL;
  console.log(URL);
};

export const checkLineLoginCallBack = () => {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams);
  if (urlParams.has("state") && urlParams.has("code")) {
    const state = urlParams.get("state");
    const code = urlParams.get("code");
    console.log(state);
    console.log(code);

    let queryString;
    if (state === "abcde") {
      const URL = "https://api.line.me/oauth2/v2.1/token";
      const getTokenUrl = `${URL}`;
      const getTokenBody = {
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:8888/login",
        client_id: "",
        client_secret: "",
      };

      console.log(getTokenBody);
      axios
        .post(getTokenUrl, getTokenBody, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((e1) => {
          const token = e1.data.access_token;
          const idToken = e1.data.id_token;
          console.log(e1);
          const getProfileApiUrl = "https://api.line.me/v2/profile";
          axios({
            method: "GET",
            url: getProfileApiUrl,
            responseType: "json", // responseType 也可以寫在 header 裡面
            headers: {
              Authorization: `Bearer ${token}`, // Bearer 跟 token 中間有一個空格
            },
          })
            .then((e2) => {
              alert(
                `line user id: ${e2.data.userId}, display name:${e2.data.displayName}`
              );
              console.log(JSON.stringify(e2));
              loginApi({
                loginMethod: "Line",
                account: "",
                password: "",
                passwordConfirm: "",
                googleAccessToken: "",
                lineCode: e2.data.userId,
              })
                .then((response) => {
                  if (response.isVerify == true) {
                    sessionStorage.setItem("memberToken", response.token);
                    memberStore.memberInfo = response.token;
                    loginSuccess();
                    setTimeout(() => {
                      // 要導向首頁;
                      document.location.href = "/";
                      //router.replace({ path: "/" });
                    }, 1000);
                  } else {
                    loginFail();
                  }
                })
                .catch((e) => {
                  console.log(e);
                  loginFail();
                });
              // const getVerifyApiUrl = "https://api.line.me/oauth2/v2.1/verify";
              // const getVerifyBody = queryString.stringify({
              //   client_id: "2004013922",
              //   id_token: idToken,
              // });
              // axios
              //   .post(getVerifyApiUrl, getVerifyBody)
              //   .then((e3) => {
              //     alert(`line email: ${e3.data.email}`);
              //     console.log(JSON.stringify(e3));
              //   })
              //   .catch((error) => {
              //     console.log(`錯誤: ${error}`);
              //   });
            })
            .catch((error) => {
              console.log(`錯誤: ${error}`);
            });
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  }
};
