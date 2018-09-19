function guardarDatoLocal(key, data){
  let setData = obtenerDatoLocal(key);
  setData.push(data);
  
  localStorage.setItem(key, JSON.stringify(setData));
};

function obtenerDatoLocal(key){
  let getData = JSON.parse(localStorage.getItem(key));

  if(getData == null){
    getData = [];
  }

  return getData;
};