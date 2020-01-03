//import {request} from 'supertest';
const request = require('supertest');
//import {app} from '../server/server_app' -> trowing error : "Cannot read property address of undefined"
const app = require('../server/server_app');

describe('test the root path',() => {
  test('It should response the GET method',(done) => {
      request(app).get('/test').then((response)=>{
          expect(response.statusCode).toBe(200);
          expect(response.body.title).toEqual("testing");
          done();
      })
  })
});