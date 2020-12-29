exports.sendJson = function sendJson (statusCode = 200, response) {
  var status = (statusCode >= 200 && statusCode < 300) ? true : false;

  if (!(typeof response == "object" && response.message && response.data)){
    response = (typeof response == "string") ? { status, message : response }:{ status, data: response};
  }
  return this.status(statusCode).json(response);
  
}


exports.sendRender = function sendRender (template,success = null , error = null, oldValues = null) {
  let response = {};
 //let status = success ? 200 : 300;
  response.success = success;
  response.error = error;
  response.oldValues = oldValues;
  console.log(template);
  //return this.status(status).render(template, response);
  return this.render(template,response);
}
