function getListaEncAduanas()
{
    let ListaEncAduanas = JSON.parse(localStorage.getItem('ListaEncAduanasLS'));

    if(ListaEncAduanas==null)
    {
        ListaEncAduanas=[];
    }
    return ListaEncAduanas;
    
}


function setListaEncAduanas(pinfoAduanas)
{
    let ListaEncAduanas = getListaEncAduanas();
    ListaEncAduanas.push(pinfoAduanas);

    localStorage.setItem('ListaEncAduanasLS',JSON.stringify(ListaEncAduanas));

}

///////////////////////////////////////////////////////////////////////////////////

function buscarEncargadoAduana(pNombre)
{
    let ListaEncAduanas=getListaEncAduanas();
    let encAduanaEncontrado=[];
    for(let i=0;i<ListaEncAduanas.length;i++)
    {
        if(pNombre == ListaEncAduanas[i][0])
        {
            encAduanaEncontrado=ListaEncAduanas[i];
        }
    }
    return encAduanaEncontrado;
}





function setTempEncAdu(data)
{
    localStorage.setItem('tempAduanaLs', JSON.stringify(data));
}

function getTempEncAdu()
{
    return JSON.parse(localStorage.getItem('tempAduanaLs'));
}

function removeTemp()
{
   localStorage.removeItem('tempAduanaLs');
}


function actualizarListaEncAduanas(pinfoAduanas)
{
    let ListaEncAduanas=getListaEncAduanas();
    for(let i=0;i<ListaEncAduanas.length;i++)
    {
        if(ListaEncAduanas[i][5]==pinfoAduanas[5])
        {
            ListaEncAduanas[i]=pinfoAduanas;
            localStorage.setItem('ListaEncAduanasLS',JSON.stringify(ListaEncAduanas));
        }
    }
}