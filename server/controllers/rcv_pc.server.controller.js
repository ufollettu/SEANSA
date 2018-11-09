const superActivator = require("../helpers/superactivator");
const requestIp = require("request-ip");

const switchMode = async (req, res) => {
  // console.log(req.body);
  const ip = requestIp.getClientIp(req);
  const tipo = req.body.tipo;
  const modo = req.body.modo;
  const license = req.body.lic;
  const hwId = req.body.hwid;
  const oem = req.body.oem;
  const expire = req.body.expire;
  const nowDate = req.body.nowdate;
  const reqCode = req.body.reqkey;
  const customerName = req.body.SC_NOME;
  const referenteName = req.body.SC_REFERENTE_NOME;
  const referentePhone = req.body.SC_TEL_REFERENTE;
  const allowedSerials = req.body.alloweds;
  // const rnd = req.body.rnd;

  switch (tipo) {
    case "1": {
      if (modo == "1") {
        superActivator.checkLicense(
          license,
          hwId,
          oem,
          expire,
          nowDate,
          ip,
          allowedSerials
        ).then(checkRes => {
          res.send(checkRes);
        }).catch(err => err.errors);
      } else if (modo == "2") {
        superActivator.generateLicense(
          license,
          hwId,
          reqCode,
          nowDate,
          ip
        ).then(checkRes => {
          res.send(checkRes);
        }).catch(err => err.errors);
      } else if (modo == "3") {
        superActivator.registerLicense(
          license,
          hwId,
          reqCode,
          nowDate,
          customerName,
          referenteName,
          referentePhone,
          ip
        ).then(checkRes => {

          res.send(checkRes);
        }).catch(err => err.errors);
      }
      break;
    }
  }
};

module.exports.switchMode = switchMode;
