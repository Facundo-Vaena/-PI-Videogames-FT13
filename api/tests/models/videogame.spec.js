const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { v1: uuid, v1 } = require('uuid');


const videogame = {
  id: v1(),
  name: 'Super Mario Bros',
  description: 'Italian men save the princess',
  platforms: ['Playstation 4', 'Xbox-360']
};


describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' }); 
      });
    });
    describe('description', () => {
      it('should throw an error if description is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid description')))
          .catch(() => done());
      });
      it('should work when its a valid description', () => {
        Videogame.create({ description: 'Italian men save the princess' }); 
      });
    });
    describe('platforms', () => {
      it('should throw an error if platforms is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires valid platforms')))
          .catch(() => done());
      });
      it('should work when there are valid platforms', () => {
        Videogame.create({ platforms: ['Playstation 4', 'Xbox-360'] }); 
      });
    });
    describe('creation', () =>{
      it('should return true when a videogame was created', (done) =>{
        Videogame.create(videogame)
        .then(res => expect(res).to.be.equal(true))
        .catch(()=> done())
        
      })
    })
    describe('database', () =>{
      it('should save the game in the database', (done) =>{
        Videogame.create(videogame)
        .then(() => Videogame.findOne({where:{name: videogame.name}}))
        .then(res => expect(res).to.deep.equal(videogame))
        .catch(()=> done())
        
      })
    })
  });
});
