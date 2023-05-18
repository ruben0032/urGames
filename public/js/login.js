import {$} from "./library.js";

const postForm = async (data)=> {   //verificar datos
    try {
        const response = await fetch('/user/login',
        {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
        return response.json();
    } catch (error) {
        console.log(`Error: ${err}`)
    }
};

const saveToken = (token, user)=> {
    localStorage.setItem("gamescore-jwt", token);
    localStorage.setItem("gamescore-userId", user.id);
    localStorage.setItem("gamescore-userName", user.userName);
    window.open("/", '_self');
};

const removeToken = () => {
    localStorage.removeItem("gamescore-jwt");   //Eliminar token existente
    localStorage.removeItem("gamescore-userId");   //Eliminar info usuario existente
    localStorage.removeItem("gamescore-userName");   //Eliminar info usuario existente
}

$("#formLogin").event("submit", async (e)=> {
    e.preventDefault();
    const dataForm = Object.fromEntries(new FormData(e.target));    //Extraer info de formulario
    const response = await postForm(dataForm);
    removeToken();
    console.log(response)
    const user = response.infoUser;
    if (response.code == 200) { //guardar token
        saveToken(response.token, user)
    } else {
        $("#msgError")[0].innerText = response.message; //mensaje de error
        setTimeout(()=> {
            $("#msgError")[0].innerText = "";
        }, 3000)
    }
});

(()=> { //Funcion autoejecutable para ocultar menu
    $(".login")[0].classList.add("hidden")
})();