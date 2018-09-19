
document.querySelector('#txtFiltro').addEventListener('keyup',mostrarRutas);

mostrarRutas();

function mostrarRutas() {
    let listaRutas = getListaRutas();

    let cuerpoTabla = document.querySelector('#tblbase tbody');
    let sFiltro = document.querySelector('#txtFiltro').value;

    cuerpoTabla.innerHTML = '';

    for (let i = 0; i < listaRutas.length; i++) {
        if(listaRutas [i][4]=="1"){
        if (listaRutas[i][0].toLowerCase().includes(sFiltro.toLowerCase())||listaRutas [i][1].toLowerCase().includes(sFiltro.toLowerCase())||listaRutas[i][2].toLowerCase().includes(sFiltro.toLowerCase())) {
            let fila = cuerpoTabla.insertRow();

            let cCodigo=fila.insertCell();
            let cSucursal =fila.insertCell();
            let cNombrederuta = fila.insertCell();
            //let cDescripcion= fila.insertCell();
            
            let cModificar = fila.insertCell();
            let cDesactivar = fila.insertCell();
            cModificar.classList.add('acciones');
            cDesactivar.classList.add('acciones');
            console.log('h',listaRutas);
           
           
            

            cCodigo.appendChild(document.createTextNode(listaRutas[i][0]));
            cSucursal.appendChild(document.createTextNode(listaRutas[i][1]));
            cNombrederuta.appendChild(document.createTextNode(listaRutas[i][2]));
            //cDescripcion.appendChild(document.createTextNode(listaRutas[i][3]));
            
            //Modificar
            let botonEditar  = document.createElement('i');
            botonEditar.classList.add("far","fa-edit");
            let elementa = document.createElement('a');
            elementa.setAttribute("href" , "modificar.html");
            elementa.appendChild(botonEditar);
            elementa.addEventListener('click', redirect);
            elementa.dataset.nombre = listaRutas[i][1];
            cModificar.appendChild(elementa);
            
        
            //Eliminar
            let botonDesactivar = document.createElement('i');
            botonDesactivar.classList.add("fas","fa-times");
            botonDesactivar.dataset.indice = i;
            botonDesactivar.addEventListener('click',Eliminar);
            cDesactivar.appendChild(botonDesactivar);          

        }}

    }
}


function redirect(){
    let sNombre = this.dataset.nombre;
    setTemp(sNombre);
}

function Eliminar(){

    swal({
        title:'¿Está seguro de eliminar la ruta?',
        text:'Si lo hace, el registro de la ruta desaparecerá por completo',
        icon:'warning',
        buttons:{
            catch:{
                text:'Eliminar',
                value:'Eliminar',
                className:'button',
            },
            cancel:'Cancelar',
        },

    })
    .then((botonUsuario) =>{
        if(botonUsuario ==="Eliminar"){
            let listaRutas= getListaRutas();
            if( listaRutas[this.dataset.indice][4]=="1"){
                listaRutas[this.dataset.indice][4]="0"
            } else{listaRutas[this.dataset.indice][4]="1"}
            actualizarListaRutas(listaRutas[this.dataset.indice]); 
            mostrarRutas();


     
    }})}
    



    


