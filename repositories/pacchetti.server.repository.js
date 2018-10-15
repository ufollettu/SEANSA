const db = require('../models');

class Repository {

    findAll() {
        return db.pacchetti.findAll()
    }

    create(data) {
        return db.pacchetti.create(data)
    }

    findById(id) {
        return db.pacchetti.findById(id)
    }

    findOne(data) {
        return db.pacchetti.findOne(data);
    }

    destroy(id) {
        return db.pacchetti.destroy({
            where: {
                SPK_ID: id
            }
        })
    }

}

var repository = new Repository();

module.exports = repository;