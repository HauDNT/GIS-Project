import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
    constructor (
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { };

    async getAll(): Promise<Customer[]> {
        let customers = await this.customerRepository.find({});

        return customers;
    };
}
