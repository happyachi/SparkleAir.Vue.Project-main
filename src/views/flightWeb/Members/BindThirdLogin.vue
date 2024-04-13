<script setup>
///////////////////////////Line///////////////////////
import axios from "axios";
const checkLineLoginCallBack = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("state") && urlParams.has("code")) {
    const state = urlParams.get("state");
    const code = urlParams.get("code");

    if (state === "abcde") {
      const URL = "https://api.line.me/oauth2/v2.1/token";
      const getTokenUrl = `${URL}`;
      const getTokenBody = {
        grant_type: "authorization_code",
        code,
        redirect_uri: "http://localhost:8888/login",
        client_id: "2004013922",
        client_secret: "7bf0ccd16f6fcc579a5c63055bb66dd2",
      };

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
                      document.location.href = "/MemberCenter/MemberInfo";
                    }, 1000);
                  } else {
                    loginFail();
                  }
                })
                .catch((e) => {
                  console.log(e);
                  loginFail();
                });
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
checkLineLoginCallBack();
</script>
<template></template>
<style scoped></style>
