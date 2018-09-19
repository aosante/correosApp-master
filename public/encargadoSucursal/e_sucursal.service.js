//retorna un arreglo con los correos de los encargados de sucursal
//se llama al darle click al boton de editar
function buscarEncargadoPorCorreo(pCorreo) {
let listaClientes = obtenerDatoLocal('listaUsuarios');
let encargadoEncontrado = [];

for(let i = 0; i < listaClientes.length; i++) {
    if(pCorreo == listaClientes[i][5]) {
       encargadoEncontrado = listaClientes[i];
       break; 
        }//if
    }//for
    return encargadoEncontrado;
}

function setTemp(data){
    localStorage.setItem('tempLS', JSON.stringify(data));
}

function getTemp (){
    return JSON.parse(localStorage.getItem('tempLS'));
}


//esta funcion se llama una vez actualizados los datos
function removeTemp (){
    localStorage.removeItem('tempLS');
}

function actualizarEncargado(pInfoEncargado) {
    let listaEncargados = obtenerDatoLocal('listaEncargadosLS');

    for(let i = 0; i < listaEncargados.length; i++) {
        //si los correos coinciden, los datos se sobre escriben
        if(pInfoEncargado[5] == listaEncargados[i][5]) {
            listaEncargados[i] = pInfoEncargado;  
        }//if
    }//for loop
    localStorage.setItem('listaEncargadosLS', JSON.stringify(listaEncargados));
}

function actualizarListaUsuarios(pListaUsuarios) {
    let listaUsuarios = obtenerDatoLocal('listaUsuarios');

    for(let i = 0; i < listaUsuarios.length; i++) {
        if(pListaUsuarios[5] == listaUsuarios[i][5]) {
            listaUsuarios[i] = pListaUsuarios;
        }
    }
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}


