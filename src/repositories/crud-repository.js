const { StatusCodes } = require('http-status-codes');
const { AppError } = require('../utils/common');
const { Logger } = require('../config')

class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            Logger.error({
                label: 'crud-repository.js',
                message: 'Something went wrong in crud-repo : create',
            });
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: id,
                }
            });
            return response;
        } catch (error) {
            Logger.error({
                label: 'crud-repository.js',
                message: 'Something went wrong in crud-repo : delete',
            });
            throw error;
        }
    }

    async update(id, data) {  //data must be a object
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id,
                }
            });
            return response;
        } catch (error) {
            Logger.error({
                label: 'crud-repository.js',
                message: 'Something went wrong in crud-repo : update',
            });
            throw error;
        }
    }

    async findAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error({
                label: 'crud-repository.js',
                message: 'Something went wrong in crud-repo : findAll',
            });
            throw error;
        }
    }

    async findOne(id) {
        try {
            const response = await this.model.findByPk(id);
            if(!response){
                throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
            }
            return response;
        } catch (error) {
            Logger.error({
                label: 'crud-repository.js',
                message: 'Something went wrong in crud-repo : update',
            });
            throw error;
        }
    }

}

module.exports = CrudRepository;