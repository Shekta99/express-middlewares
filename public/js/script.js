const boton = document.getElementById("boton");
const estilos = document.getElementById("styles");
let theme = "light";

boton.onclick = () => {
  if (theme === "light") {
    theme = "dark";
    estilos.href = "css/dark.css";
  } else {
    theme = "light";
    estilos.href = "css/light.css";
  }
};
