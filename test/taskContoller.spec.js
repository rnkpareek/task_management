var mongoose = require("mongoose");
var Task = require('../src/model/task');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Tasks', function() {
    beforeEach( function(done)  {
        Task.remove({}, function(err)  {
            done();
        });
    });

    describe('/GET task', function()  {
        it('it should GET all the task', function(done) {
        chai.request(server)
                .get('/tasks')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST task', function() {
        it('it should not POST a task without name field', function(done) {
            var task = {
                description: "eat healthy breakfast",
                created_by: "testUser"
            }
            chai.request(server)
                .post('/tasks')
                .send(task)
                .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                res.body.errors.should.have.property('name');
                res.body.errors.name.should.have.property('kind').eql('required');
                done();
            });
        });

        it('it should not POST a task without description field', function(done) {
            var task = {
                name: "breakfast",
                created_by: "testUser"
            }
            chai.request(server)
                .post('/tasks')
                .send(task)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('description');
                    res.body.errors.description.should.have.property('kind').eql('required');
                    done();
                });
        });

        it('it should POST a task with all required fields', function(done) {
            var task = {
                name: "breakfast",
                description: "eat healthy breakfast",
                created_by: "testUser"
            }
            chai.request(server)
                .post('/tasks')
                .send(task)
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('created_by');
                    res.body.should.have.property('creation_timestamp');
                    done();
                });
        });

    });

    describe('/GET/:id task', function() {
        it('it should GET a task details by the given id', function(done) {
            var task = new Task({
                name: "breakfast",
                description: "eat healthy breakfast",
                created_by: "testUser"
            });
            task.save(function(err, task) {
                chai.request(server)
                .get('/tasks/' + task['_id'])
                .send(task)
                .end(function(err, res)  {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('description');
                    res.body.should.have.property('created_by');
                    res.body.should.have.property('creation_timestamp');
                    done();
                });
            });

        });
    });

    describe('/PUT/:id task', function() {
        it('it should UPDATE a task details given the id', function(done) {
            var task = new Task({
                name: "breakfast",
                description: "eat healthy breakfast",
                created_by: "testUser"
            });
            task.save(function(err, task){
                chai.request(server)
                .put('/tasks/' + task['_id'])
                .send({name: "dinner", description: "Light food"})
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql("dinner");
                    res.body.should.have.property('description').eql("Light food");
                    done();
                });
            });
        });
    });

    describe('/DELETE/:id task', function() {
        it('it should DELETE a task details given the id', function(done) {
            var task = new Task({
                name: "breakfast",
                description: "eat healthy breakfast",
                created_by: "testUser"
            });
            task.save(function(err, task) {
                chai.request(server)
                .delete('/tasks/' + task['_id'])
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Task deleted!!!!!!!!!');
                    done();
                });
            });
        });
    });

});