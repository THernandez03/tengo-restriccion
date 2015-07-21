import {cleanUpAfterEach} from '../../utils/testDbHelper.js';
import chai from 'chai';
import * as User from '../../models/User.js';
import {app} from '../../../server.js';
import request from 'supertest-as-promised';
chai.should();


describe('userController', () => {

  cleanUpAfterEach(User.model);

  describe('create', () => {

    it('should register a valid user', done => {
      const usuarioValido = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

      request(app.listen())
        .put('/users')
        .send(usuarioValido)
        .expect(201)
        .end(done);
    });

    it('should not register with an used email', done => {
      const usuarioValido = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

      request(app.listen())
        .put('/users')
        .send(usuarioValido)
        .expect(201)
        .then( () => {
          request(app.listen())
            .put('/users')
            .send(usuarioValido)
            .expect(409)
            .end(done);
        });
    });

    it('should not register an invalid user', done => {
      const usuarioInvalido = { email: 'oneil.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

      request(app.listen())
        .put('/users')
        .send(usuarioInvalido)
        .expect(409)
        .end(done);
    });
  });

});
