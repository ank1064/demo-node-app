const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /', () => {
  it('should return hello message', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Hello from Harness CI!');
        expect(res.body.app).to.equal('demo-node-app');
        done();
      });
  });
});

describe('GET /greet', () => {
  it('should return default greeting', (done) => {
    chai.request(app)
      .get('/greet')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.greeting).to.equal('Hello, World!');
        done();
      });
  });

  it('should return custom greeting', (done) => {
    chai.request(app)
      .get('/greet?name=Harness')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.greeting).to.equal('Hello, Harness!');
        done();
      });
  });
});

describe('GET /health', () => {
  it('should return UP status', (done) => {
    chai.request(app)
      .get('/health')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equal('UP');
        done();
      });
  });
});
