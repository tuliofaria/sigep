module.exports = function(soap, url, sigepClient){
  return new Promise(function(resolve, reject){
    soap
      .createClient(url, function(err, client){
        if(err){
          reject(err)
        }else{
          resolve(sigepClient(client))
        }
      })
  })
}