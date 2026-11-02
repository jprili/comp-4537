import USER_MSGS from "../lang/messages/en/user.js";

const main = () => { 
    const sendBtn = document.getElementById("send-prompt");
    const verifyBtn = document.getElementById("verify-btn");
    const promptArea = document.getElementById("prompt-area");
    const responseArea = document.getElementById("response-area");
    const responseRecv = document.getElementById("response-receive-time");
    const verifyInput = document.getElementById("verify-input");
    const verifyResult = document.getElementById("verify-result");

    sendBtn.innerText   = USER_MSGS.sendPrompt;
    verifyBtn.innerText = USER_MSGS.verifyBtn;

    sendBtn.addEventListener("click", async () => {
        responseRecv.innerText = `prompt sent at ${new Date()}`
        let resp = await fetch(
            "https://prompt-access-control.onrender.com/prompt",
            {
                method: "POST",
                body: JSON.stringify({
                    input: promptArea.value,
                }),
                headers: {
                "Content-type": "application/json",
                },
            });
        resp = await resp.json();
        responseRecv.innerText = `response received at ${new Date()}`
        responseArea.innerText = resp.response;
    })

    verifyBtn.addEventListener("click", async () => {
        let resp = await fetch(
            "https://prompt-access-control.onrender.com/verify"
            + `?value=${verifyInput.value.trim()}`
        )
        resp = await resp.json();
        if (resp.result === "hello") {
            verifyResult.innerText = "hello";
        } else {
            verifyResult.innerText = resp.result 
            ? USER_MSGS.verifySuccessMsg 
            : USER_MSGS.verifyFailMsg;
        }
    })
}

main();