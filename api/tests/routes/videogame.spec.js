/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn, Genre } = require('../../src/db.js');
const { v1: uuid, v1 } = require('uuid');


const agent = session(app);
const videogame = {
  id: v1(),
  name: 'Super Mario Bros',
  description: 'Italian men save the princess',
  platforms: ['Playstation 4', 'Xbox-360']
};

xdescribe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame))); 
    
  describe('GET /videogames', (done) => {
    it('should get 200', () =>
      agent.get('/videogames')
      .then(res => expect(res.length).to.be.equal(95))
     
      );
      
  });
});
describe('Genres router', () =>{
  before(()=> conn.authenticate()
  .catch((err)=>{
    console.error('Unable to connect to the database:', err);
  }))

beforeEach(()=> Genre.sync({ force: true }))

describe('GET /genres', ()=>{
  it('should return an object with the genres', () =>{
    agent.get('/genres').expect(200)
  })
  it('should have id, name, createdAt and updatedAt properties on each object', () =>{
    agent.get('/genres')
    .then(res => expect(res[0]).to.have.all.keys(['id', 'name', 'createdAt', 'updatedAt']))
  })
  it('should have 19 objects/genres on the array', () =>{
    agent.get('/genres')
    .then(res => expect(res.length).to.be.equal(19))
  })
})

})
