const db = require('../models');

class Repository {

    findAll() {
        return db.matricole.findAll()
    }

    create(data) {
        return db.matricole.create(data)
    }

    findById(id) {
        return db.matricole.findById(id)
    }

    findOne(data) {
        return db.matricole.findOne(data);
    }

    destroy(id) {
        return db.matricole.destroy({
            where: {
                sm_id: id
            }
        })
    }

}

var repository = new Repository();

module.exports = repository;