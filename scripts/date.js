// 日付と著作権年の出力
const year = new Date().getFullYear();
document.querySelector("footer p").innerHTML = `&copy; ${year} RIRIKU SHIRAKAWA • Tokyo, Japan`;

document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
