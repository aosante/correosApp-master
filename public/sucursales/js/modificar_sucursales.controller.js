
    obtenerSucursal();

   


    function obtenerSucursal() {
        let sNumero=getTemp();
        let infoRepartidor=buscarSucursalPorId(sNumero);
        
        document.querySelector('#numSucursal').value=infoRepartidor['numero'];
        document.querySelector('#txtDireccion').value=infoRepartidor['nombre'];
        document.querySelector('#txtTelefono').value=infoRepartidor['tel'];
    }
    
    let botonActualizar=document.querySelector('#btnGuardar');
    botonActualizar.addEventListener('click',obtenerActualizar);

    function obtenerActualizar() {
       
            let aSucursales = [];
    
            let inputSucursal = document.querySelector('#numSucursal');
            let sSucursal = inputSucursal.value;
    
            let inputDireccion = document.querySelector('#txtDireccion');
            let sDireccion = inputDireccion.value;
    
            let inputTelefono = document.querySelector('#txtTelefono');
            let sTelefono = inputTelefono.value;

            let activo = '1';
    
    
    
            aSucursales.push(sSucursal, sDireccion, sTelefono, activo);
            guardarDatoLocal('RegistroLS', aSucursales);
            actualizarSucursal(aSucursales);
            removeTemp();
            window.location.href = 'listar_sucursal.html';
        }
    

    
    