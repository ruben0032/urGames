import {$} from "./library.js";

const gamesCards = $("#gamesCards")[0];
const page = $("#page")[0];
const previewPage = $("#previewPage")[0];

const goPage = (id)=> {   //Funcion para mostrar info de cada card
    window.open(`/game/${id}`, '_self');
};

const goProfile = (id, token)=>{
    window.open(`/user/${id}/${token}`, '_self');
};

const reloadGames = async (page)=> {  //Funciòn para reemplazar cards
    try {
        const request = await fetch('/game/page/next',
        {
          method:'GET',
          headers: {'Content-Type': 'application/json', 
            'page': page
            }
        })
        const response = await request.json();
        return response;
    } catch (err) {
        console.log(`Error: ${err}`)
    }
};

const seachGames = async (title) =>{
    try {
        const request = await fetch('/game/api/seach',
        {
          method:'GET',
          headers: {'Content-Type': 'application/json', 
            'title': title
            }
        })
        const response = await request.json();
        return response;
    } catch (err) {
        console.log(`Error: ${err}`)
    }
}

const reloadCards = async (games)=> {
    gamesCards.innerHTML = "";
    games.forEach(element => {
        let newDiv = document.createElement("div"); //Crear división
        newDiv.setAttribute("data-info", `${element.id}`)   //integrar atributos a la div
        newDiv.setAttribute("class", "card bg-secondary-100 flex flex-col items-center text-center p-2 shadow-lg rounded-lg hover:cursor-pointer")
        let newP1 = document.createElement("p");    //Crear parrafo
        newP1.setAttribute("class", "text-xl font-semibold py-4");
        newP1.innerText = `${element.title}`;
        newDiv.appendChild(newP1);  //Insertar elementos en div
        let newImg = document.createElement("img"); //Crear imagen
        newImg.setAttribute("class", "h-60 xl:h-52 rounded-lg");
        newImg.setAttribute("src", `${element.urlImage}`);
        newDiv.appendChild(newImg); //Insertar elementos en div
        let newP2 = document.createElement("p");    //Crear parrafo
        newP2.setAttribute("class", "pt-2");
        newP2.innerText = `${element.studio}`;
        newDiv.appendChild(newP2);  //Insertar elementos en div

        gamesCards.appendChild(newDiv); //Agregar juego a nueva div
    });
    $(".card").event("click", (e)=>{    //Evento para redirigir info de juego
        const idGame = e.currentTarget.dataset.info ;  //currentTarget: traer elemento padre HTML seleccionado; dataset:extraer un campo 'data-' de HTML
        goPage(idGame);
    });
    previewPage.classList.toggle("hidden");
};

// let card = document.getElementsByClassName("card")   //forma de obtener info de las card sin libreria
// card = [...card];    //... : para extraer arrays
// card.forEach((e)=>{
//     e.addEventListener("click", ()=>{
//         console.log(e)
//     })
// })

$(".card").event("click", (e)=>{    //Evento para redirigir info de juego
    const idGame = e.currentTarget.dataset.info ;  //currentTarget: traer elemento padre HTML seleccionado; dataset:extraer un campo 'data-' de HTML
    goPage(idGame);
});

$("#nextPage").event("click", async (e)=> { //evento para cambiar de pagina
    const numberPage = Number(page.innerText);  
    const games = await reloadGames(numberPage);
    await reloadCards(games);
    page.innerText ++;
    if (games.length<9) {
        $("#nextPage")[0].classList.add("hidden")    //Ocultar nextPage
    } else {
        $("#nextPage")[0].classList.remove("hidden")
    };
    $("#previewPage")[0].classList.remove("hidden");
});

$("#previewPage").event("click", async (e)=> {  //Evento para regresar de pagina
    let numberPage = Number(page.innerText);
    const games = await reloadGames(numberPage-2);
    await reloadCards(games);
    page.innerText --;
    if (numberPage-2 == 0) {
        $("#previewPage")[0].classList.add("hidden");   //Ocultar previewPage
    } else {
        $("#previewPage")[0].classList.remove("hidden");
    };
    $("#nextPage")[0].classList.remove("hidden")
});

$(".logout").event("click", async (e)=> {
    localStorage.removeItem("gamescore-jwt");   //Eliminar token existente
    $(".login")[0].classList.remove("hidden");
    $("#menuUser")[0].classList.add("hidden");
    $(".menuBtn")[0].classList.add("hidden");
    alert("Sesión cerrada con éxito");
    location.reload();
});

$("#seach").event("change", async (e)=>{    //Evento para cambio en input por busqueda
    if (e.target.value == "") {
        location.reload();
    }
    const gameByTitle = await seachGames(e.target.value);
    if (gameByTitle[0]) {
        reloadCards(gameByTitle);
        $("#nextPage")[0].classList.add("hidden")    //Ocultar nextPage
        $("#previewPage")[0].classList.add("hidden");   //Ocultar previewPage
        page.innerText = 1;
    } else {
        alert(gameByTitle.message)
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




