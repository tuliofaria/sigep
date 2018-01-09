var client = require('./client')
var soap = require('soap')
var sinon = require('sinon')
var expect = require('chai').expect

describe('testing client', () => {
  it('returns a new soap client', (done) => {
    var urlWS = 'url1'
    sinon.stub(soap, 'createClient').callsFake((url, cb) => {
      expect(url).to.equal(urlWS)
      cb(null, {})
    })
    var fakeSigepClient = sinon.stub()
    fakeSigepClient.returns({})
    client(soap, urlWS, fakeSigepClient)
      .then( sigepClient => {
        expect(sigepClient).to.be.an('object')
        soap.createClient.restore()
        done()
      })
  })
  it('returns reject if soap fails', (done) => {
    var urlWS = 'url1'
    sinon.stub(soap, 'createClient').callsFake((url, cb) => {
      expect(url).to.equal(urlWS)
      cb({ error: true })
    })
    var fakeSigepClient = sinon.stub()
    fakeSigepClient.returns({})
    client(soap, urlWS, fakeSigepClient)
      .then( sigepClient => {
      })
      .catch( error => {
        expect(error).to.be.an('object')
        done()
      })
  })
})