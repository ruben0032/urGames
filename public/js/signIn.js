import {$} from "./library.js";

const postNewUser = async (data)=> {   //verificar datos
    try {
        const response = await fetch('/user',
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

$("#formSign").event("submit", async (e)=> {
    e.preventDefault();
    const dataForm = Object.fromEntries(new FormData(e.target));    //Extraer info de formulario
    const response = await postNewUser(dataForm);
    console.log(response)
    if (response.code == 200) {
        alert("Usuario registrado con éxito")
        window.open("/user/sesion", '_self');
    } else {
        $("#msgError")[0].innerText = response.message; //mensaje de error
        setTimeout(()=> {
            $("#msgError")[0].innerText = "";
        }, 3000)
    }
});

