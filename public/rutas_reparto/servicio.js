function getListaRutas(){
    let listaRutas=JSON.parse(localStorage.getItem('listaRutasLS'));

    if(listaRutas==null){
        listaRutas=[];
    }
    return listaRutas;
        
    }
    function setListaRutas(pinfoRutas){
        let listaRutas=getListaRutas();
        listaRutas.push(pinfoRutas);

        localStorage.setItem('listaRutasLS',JSON.stringify(listaRutas));

    }
function buscarRuta(pNombre){
    let listaRutas=getListaRutas();
    let rutaEncontrada=[];
    for(let i=0;i<listaRutas.length;i++){
    if(pNombre == listaRutas[i][1]){
        rutaEncontrada=listaRutas[i];
    }}
    return rutaEncontrada;
}

function setTemp(data){
    localStorage.setItem('tempLs', JSON.stringify(data));

}

function getTemp(){
     return JSON.parse(localStorage.getItem('tempLs'));
}

function removeTemp(){
    localStorage.removeItem('tempLs');
}

function actualizarListaRutas(pinfoRutas){
    let listaRutas=getListaRutas();
    for(let i=0;i<listaRutas.length;i++){
        if(listaRutas[i][0]==pinfoRutas[0]){
            listaRutas[i]=pinfoRutas;
            localStorage.setItem('listaRutasLS',JSON.stringify(listaRutas));
        }
    }
}