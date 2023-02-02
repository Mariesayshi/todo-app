const darkDesk = "url(./images/bg-desktop-dark.jpg)";
const darkMob = "url(./images/bg-mobile-dark.jpg)";
const lightMob = "url(./images/bg-mobile-light.jpg)";
const lightDesk = "url(./images/bg-desktop-light.jpg)";


window.addEventListener('click', (e) => {
    if (e.target.classList.contains("themeSwitch")) {
        if (app.classList.contains("lightTheme")) {
          app.classList.remove("lightTheme");
          app.classList.add("darkTheme");
          e.target.src = "./images/icon-sun.svg";
          document.body.style.backgroundColor = "#161722";
          if (window.innerWidth <= 640) {
            document.body.style.backgroundImage = darkMob;
          } else {
            document.body.style.backgroundImage = darkDesk;
          }
        } else if (app.classList.contains("darkTheme")) {
          app.classList.remove("darkTheme");
          app.classList.add("lightTheme");
          e.target.src = "./images/icon-moon.svg";
          document.body.style.backgroundColor = "#fafafa";
    
          if (window.innerWidth <= 640) {
            document.body.style.backgroundImage = lightMob;
          } else {
            document.body.style.backgroundImage = lightDesk;
          }
        }
      }
})

window.addEventListener("resize", () => {
    if (window.innerWidth >= 640 && app.classList.contains("darkTheme")) {
      document.body.style.backgroundImage = darkDesk;
    } else if (window.innerWidth <= 640 && app.classList.contains("darkTheme")) {
      document.body.style.backgroundImage = darkMob;
    } else if (window.innerWidth >= 640 && app.classList.contains("lightTheme")) {
      document.body.style.backgroundImage = lightDesk;
    } else if (
      window.innerWidth <= 640 &&
      app.classList.contains("lightTheme")
    ){
      document.body.style.backgroundImage = lightMob;
    }
  });