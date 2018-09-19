obtenerDatos();
//obtener los datos de la factura
    function obtenerDatos(){
        //let sNombre=getTemp();
        //let infoDatos=buscarRuta(sNombre);

        //console.log(datosPaquete);

        //let randomFactura = '';
        randomFactura = Math.ceil(Math.random()*10000)+10000;
        //console.log(random);
        
        let datosPaquete = ["72348623",+ randomFactura , "12345678", "Sucursal #1", "tp08", "# tarjeta", "123", "123", null, "estado 1"];
        let datosUsuario =["Carla","","Arias","","213123123","test02@gmail.com","23123123123","","1999-11-11","femenino","lugar de habitación",false,"2","1"];

        document.querySelector('#textSucursal').innerText =datosPaquete[0];
        document.querySelector('#textNumerofactura').innerText =datosPaquete[1];    
        document.querySelector('#textNombrecliente').innerText=datosPaquete[2];
        document.querySelector('#textNombrecliente').innerText=datosUsuario[0] + " "+ datosUsuario[2] ;
        document.querySelector('#textDireccioncliente').innerText=datosPaquete[4];

        document.querySelector('#textNumbertracking').innerText=datosPaquete[0];
        document.querySelector('#textMontocategoria').innerText=datosPaquete[6];
        document.querySelector('#textMontokilometros').innerText=datosPaquete[7];
        document.querySelector('#textMontokilos').innerText=datosPaquete[8];
        // document.querySelector('#textMontototal').innerText=datosPaquete[9];
        

        
    }

    //falta hacer el numero random del numero de facturaa
    //cambiar el color 
    // toodos tiene que quedar numero de orden