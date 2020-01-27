const theme = document.getElementById("theme");
theme.addEventListener("click", () => {
    theme.innerHTML = theme.innerHTML == "Light" ? "Dark" : "Light";
    if (theme.innerHTML == "Light") {
        document.body.style.background = "#0e0e25";
        document.body.style.color = "#fff";
        document.body.style.transition = "all 0.4s linear"
    } else {
        document.body.style.background = "#f1f1f1";
        document.body.style.color = "#333";
        document.body.style.transition = "all 0.4s linear"
    }
});
