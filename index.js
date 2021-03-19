// Import stylesheets
import "./style.css";

// Body element
const body = document.getElementById("body");

// Button elements
const btnSend = document.getElementById("btnSend");
const btnClose = document.getElementById("btnClose");
const btnShare = document.getElementById("btnShare");
const btnLogIn = document.getElementById("btnLogIn");
const btnLogOut = document.getElementById("btnLogOut");
const btnScanCode = document.getElementById("btnScanCode");
const btnOpenWindow = document.getElementById("btnOpenWindow");

// Profile elements
const email = document.getElementById("email");
const userId = document.getElementById("userId");
const pictureUrl = document.getElementById("pictureUrl");
const displayName = document.getElementById("displayName");
const statusMessage = document.getElementById("statusMessage");

// QR element
const code = document.getElementById("code");
const friendShip = document.getElementById("friendShip");

async function main() {
  await liff.init({ liffId: "1655776146-P0klaYBN" });
  switch (liff.getOS()) {
    case "android":
      body.style.backgroundColor = "#FFCC99";
      break;
    case "ios":
      body.style.backgroundColor = "#FFCC99";
      break;
  }

  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnShare.style.display = "block";
      btnLogIn.style.display = "none";
      btnLogOut.style.display = "block";
      getUserProfile();
      getFriendship();
    } else {
      btnLogIn.style.display = "block";
      btnLogOut.style.display = "none";
    }
  } else {
    btnShare.style.display = "block";
    btnSend.style.display = "block";
    getUserProfile();
    getFriendship();
  }

  if (liff.isInClient() && liff.getOS() === "android") {
    btnScanCode.style.display = "block";
  }

  btnOpenWindow.style.display = "block";
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = "<b>userId:</b> " + profile.userId;
  statusMessage.innerHTML = "<b>statusMessage:</b> " + profile.statusMessage;
  displayName.innerHTML = "<b>displayName:</b> " + profile.displayName;
  email.innerHTML = "<b>email:</b> " + liff.getDecodedIDToken().email;
}

btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

async function sendMsg() {
  if (
    liff.getContext().type !== "none" &&
    liff.getContext().type !== "external"
  ) {
    var message = prompt("กรอกข้อความที่ต้องการส่ง");
    await liff.sendMessages([
      {
        type: "text",
        text: message
      }
    ]);
    alert("Message sent");
  }
}
btnSend.onclick = () => {
  sendMsg();
};
async function shareMsg() {
  alert("Message sent");
  var message = prompt("กรอกข้อความที่ต้องการส่ง");
  if (message == "") {
    await liff.shareTargetPicker([
      {
        type: "image",
        originalContentUrl:
          "https://sv1.picz.in.th/images/2021/03/19/DEkRkb.jpg",
        previewImageUrl: "https://sv1.picz.in.th/images/2021/03/19/DEkRkb.jpg"
      }
    ]);
  } else {
    await liff.shareTargetPicker([
      {
        type: "image",
        originalContentUrl:
          "https://sv1.picz.in.th/images/2021/03/19/DEkRkb.jpg",
        previewImageUrl: "https://sv1.picz.in.th/images/2021/03/19/DEkRkb.jpg"
      },
      {
        type: "text",
        text: message
      }
    ]);
  }
}
btnShare.onclick = () => {
  shareMsg();
};
async function scanCode() {
  const result = await liff.scanCode();
  code.innerHTML = "<b>Code: </b>" + result.value;
}
btnScanCode.onclick = () => {
  scanCode();
};
btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: window.location.href,
    external: true
  });
};

async function getFriendship() {
  let msg = "Hello! You and our chatbot are friend.";
  const friend = await liff.getFriendship();
  if (!friend.friendFlag) {
    msg =
      '<a href="https://line.me/R/ti/p/@213nqetw">Follow our chatbot here!</a>';
  }
  friendShip.innerHTML = msg;
}
