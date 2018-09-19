let nodemailer = require('nodemailer');

module.exports.enviar_correo = function(req, res) {  
  let contenido = '';
  let subject = ' ';

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xxxxxxxxx',
      pass: 'xxxxxx'
    },
    tls: {
      ejectUnauthorized: false
    }
  });

  if (req.body.temporal) {
    subject = 'Contraseña temporal de Correos de Costa Rica';
    contenido = '<div>'+
                  '<div style="width: 100%;background: #21578f;background-image: linear-gradient(to right, #001a23, #21578f 60%);padding: 40px 10px;">'+
                    '<a href="#"><img style="width: 225px;height: auto;" src="http://res.cloudinary.com/app-correos-costarica/image/upload/v1524102690/logo_correoscr_qzmdpp.png" alt=""></a>'+
                  '</div>'+
                  '<h1 style="font-weight: bold;font-size: 28px;margin: 40px 40px;color: #ef5b13;border-bottom: 2px solid #d35011;padding-bottom: 10px;">Notiﬁcación de contraseña temporal.</h1>'+
                  '<p style="margin: 10px 60px;font-size: 18px;margin-bottom: 40px;">Estimado(a) '+req.body.nombre+':</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;">Correos de Costa Rica le comunica que se ha creado una contraseña temporal asociado a su corrreo electrónico.</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;"><strong>Contraseña temporal: '+req.body.temporal+'</strong></p>'+
                  '<p style="margin: 50px 60px;font-size: 18px;margin-bottom: 100px;">Muchas Gracias.</p>'+
                  '<div style="width: 100%;background: #21578f;background-image: linear-gradient(to right, #001a23, #21578f 60%);height: 150px;padding: 40px;color: #fff;">'+
                    '<p style="margin-bottom: 20px;opacity: .8;">Este mensaje es generado por un sistema automático, agradecemos no responder a este correo.</p>'+
                    '<p style="opacity: .8;">Si necesita ayuda por favor dirija su consulta a servicio al cliente, teléfono 2295-9797.</p>'+
                  '</div>'+
                '</div>';
  }

  if (req.body.numeroFactura) {
    subject = 'Factura de Correos de Costa Rica';
    contenido = '<div>'+
                  '<div style="width: 100%;background: #21578f;background-image: linear-gradient(to right, #001a23, #21578f 60%);padding: 40px 10px;">'+
                    '<a href="#"><img style="width: 225px;height: auto;" src="http://res.cloudinary.com/app-correos-costarica/image/upload/v1524102690/logo_correoscr_qzmdpp.png" alt=""></a>'+
                  '</div>'+
                  '<h1 style="font-weight: bold;font-size: 28px;margin: 40px 40px;color: #ef5b13;border-bottom: 2px solid #d35011;padding-bottom: 10px;">Factura de paquete.</h1>'+
                  '<p style="margin: 10px 60px;font-size: 18px;margin-bottom: 40px;">Estimado(a) '+req.body.nombreCliente+':</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;">Gracias por elegir los servicios de Correos de Costa Rica. A continuación esta el desglose de la factura del paquete N.'+req.body.numeroTracking+'</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;"><strong>Fecha de entrega: </strong>'+req.body.fechaEntrega+'</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;"><strong>Sucursal: </strong>'+req.body.sucursal+'</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;"><strong>Cliente: </strong>'+req.body.nombreCliente+'</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;"><strong>Correo electrónico: </strong>'+req.body.correo+'</p>'+
                  '<p style="margin: 10px 60px;font-size: 18px;"><strong>Dirección: </strong>'+req.body.direccion+'</p>'+
                  '<p style="font-size: 20px;margin: 10px 40px;color: #ef5b13;border-bottom: 2px solid #d35011;"><strong>Tarifas</strong></p>'+
                  '<p style="margin: 10px 60px;font-size: 16px;"><strong>Precio inicial: </strong>'+req.body.precioInicial+' colones</p>'+
                  '<p style="margin: 10px 60px;font-size: 14px;"><i>Costo por impuesto: '+req.body.impuesto+'</i>%</p>'+
                  '<p style="margin: 10px 60px;font-size: 16px;"><strong>Peso: </strong>'+req.body.peso+' k</p>'+
                  '<p style="margin: 10px 60px;font-size: 14px;"><i>Costo por peso: '+req.body.costoPeso+'</i> colones</p>'+
                  '<p style="margin: 10px 60px;font-size: 16px;"><strong>Distancia de entrega: </strong>'+req.body.distancia+' km</p>'+
                  '<p style="margin: 10px 60px;font-size: 14px;"><i>Costo por kilometro: '+req.body.costoKilometro+' colones</i></p>'+
                  '<p style="margin: 10px 60px;font-size: 20px;"><strong>Total: '+req.body.precioFinal+' colones</strong></p>'+
                  '<p style="margin: 50px 60px;font-size: 18px;margin-bottom: 100px;">Muchas Gracias.</p>'+
                  '<div style="width: 100%;background: #21578f;background-image: linear-gradient(to right, #001a23, #21578f 60%);height: 150px;padding: 40px;color: #fff;">'+
                    '<p style="margin-bottom: 20px;opacity: .8;">Este mensaje es generado por un sistema automático, agradecemos no responder a este correo.</p>'+
                    '<p style="opacity: .8;">Si necesita ayuda por favor dirija su consulta a servicio al cliente, teléfono 2295-9797.</p>'+
                  '</div>'+
                '</div>';
  }
  
  const mailOptions = {
    from: 'cloaizar@ucenfotec.ac.cr',
    to: 'karolina801chan@gmail.com',
    subject: subject,
    html: contenido
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      res.json(400, { success: false, msg: 'Ha ocurrido un error con el envio del email' + err });
    } else {
      res.json({ success: true, msg: info });
    }
  });
};