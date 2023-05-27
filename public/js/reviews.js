import {$} from "./library.js";

const goProfile = (id, token)=>{
    window.open(`/user/${id}/${token}`, '_self');
};

const postReview = async (data)=> {   //verificar datos
    try {
        const response = await fetch('/review/verify',
        {
          method:'POST',
          headers: {'Content-Type': 'application/json', token: localStorage.getItem("gamescore-jwt")},
          body: JSON.stringify(data)
        })
        return response.json();
    } catch (error) {
        console.log(`Error: ${err}`)
    }
};

const removeToken = () => {
    localStorage.removeItem("gamescore-jwt");   //Eliminar token existente
    localStorage.removeItem("gamescore-userId");   //Eliminar info usuario existente
    localStorage.removeItem("gamescore-userName");   //Eliminar info usuario existente
}

$(".logout").event("click", async (e)=> {
    localStorage.removeItem("gamescore-jwt");   //Eliminar token existente
    $(".login")[0].classList.remove("hidden");
    $("#menuUser")[0].classList.add("hidden");
    $(".menuBtn")[0].classList.add("hidden");
    alert("Sesión cerrada con éxito");
    location.reload();
});

$("#addReview").event("click", ()=> {
    if (localStorage.getItem("gamescore-jwt")) {
        $(".divNewReview")[0].classList.remove("hidden")
    } else {
        alert("Debe iniciar sesión para comentar un juego")
    }
});

$("#formReview").event("submit", async (e)=> {
    e.preventDefault();
    const dataForm = Object.fromEntries(new FormData(e.target));    //Extraer info de formulario
    console.log(dataForm);
    dataForm.idGame = Number(dataForm.idGame);
    dataForm.score = Number(dataForm.score);
    const idUser = Number(localStorage.getItem("gamescore-userId"));
    const userName = localStorage.getItem("gamescore-userName");
    const response = await postReview({...dataForm, idUser, userName});
    if (response.code == 200) {
        $("#msgSuccess")[0].innerText = response.message; //mensaje de exito
        setTimeout(()=> {
            $("#msgSuccess")[0].innerText = "";
            location.reload();
        }, 1500)
    } else if (response.code == 401) {
        removeToken();
        alert(response.message);    //mensaje de error token expirado
        location.reload();
    } else {
        $("#msgError")[0].innerText = response.message; //mensaje de error
        setTimeout(()=> {
            $("#msgError")[0].innerText = "";
            location.reload();
        }, 3000)
    }
});

$(".profile").event("click", async (e)=>{   //Abrir pagina de perfil
    goProfile(localStorage.getItem("gamescore-userId"), localStorage.getItem("gamescore-jwt"))
});

$(".menuBtn").event("click", async (e)=>{
    $(".profile")[0].classList.toggle("hidden");
    $(".logout")[0].classList.toggle("hidden");
});

(()=> { //Funcion autoejecutable para verificar token
    if (localStorage.getItem("gamescore-jwt")) {
        $(".login")[0].classList.add("hidden")
        $(".menuBtn")[0].classList.remove("hidden"); 
    }
})();

