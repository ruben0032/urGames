const $ = (arg)=>{  //Libreria $:seleccionar elemento y realizar un evento
    let element;
    if (typeof arg === "string") {  //Si es string
        element = document.querySelectorAll(arg);
    };
    if (arg instanceof HTMLElement) {   //Si es HTML
        element = [arg];
    };
    element.event = (evento, callback)=>{   //propiedad .evento
        element.forEach(elemento => {
            elemento.addEventListener(evento, callback);
        });
        return element;
    };
    return element;
};

export {$};