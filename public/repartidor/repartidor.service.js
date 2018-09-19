
function buscarRepartidor(pNombre){
    let listaRepartidores=obtenerDatoLocal('listaRepartidoresLS');
    let repartidorEncontrado=[];
    for(let i=0;i<listaRepartidores.length;i++){
    if(pNombre == listaRepartidores[i][0]){
        repartidorEncontrado=listaRepartidores[i];
    }}
    return repartidorEncontrado;
}


function agregarSucursales() {
    let lista = obtenerListaSucursales();
    let datosUsuario = obtenerDatoLocal('usuario');

    if (document.getElementById('sltSucursal')){
        if (datosUsuario && datosUsuario[12] === '4') {
            let opcion = document.createElement('option');
            opcion.value = datosUsuario[10];
            opcion.innerText = datosUsuario[10];
            document.getElementById('sltSucursal').appendChild(opcion);
            return true;
        }
     
        for(let i = 0; i < lista.length; i++) {
            let opcion = document.createElement('option');
            opcion.value = lista[i][1];
            opcion.innerText = lista[i][1];
            document.getElementById('sltSucursal').appendChild(opcion);
        }
    }
}

agregarSucursales();

function setTemp(data){
    localStorage.setItem('tempLs', JSON.stringify(data));
}
function getTemp(){
    return JSON.parse(localStorage.getItem('tempLs'));
}

function removeTemp(){
   localStorage.removeItem('tempLs');
}


function actualizarListaRepartidores(pinfoRepartidores){
    let listaRepartidores=obtenerDatoLocal('listaRepartidoresLS');
    for(let i=0;i<listaRepartidores.length;i++){
        if(listaRepartidores[i][5]==pinfoRepartidores[5]){
            listaRepartidores[i]=pinfoRepartidores;
        }
    }
    localStorage.setItem('listaRepartidoresLS',JSON.stringify(listaRepartidores));

}

function actualizarListaUsuarios(pListaUsuarios) {
    let listaUsuarios = obtenerDatoLocal('listaUsuarios');
    for(let i =0; i < listaUsuarios.length; i++) {
        if(listaUsuarios[i][5] == pListaUsuarios[5]) {
            listaUsuarios[i]=pListaUsuarios;
        }
    }
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
}

