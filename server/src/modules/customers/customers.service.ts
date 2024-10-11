import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';
import { Create_UpdateCustomerDTO } from './dto/create_update-customer.dto';
import { omitFields } from 'src/common/helper/omit_field.helper';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>,
    ) { };

    async getAll(): Promise<Customer[]> {
        let customers = await this.customerRepository.find({});

        customers.forEach((item, index) => {
            customers[index] = omitFields(item, ['imageUrl']);
        });

        return customers;
    };

    async create(data: Create_UpdateCustomerDTO): Promise<Customer> {
        const newCustomer = this.customerRepository.create(data);

        return await this.customerRepository.save(newCustomer);
    };


}
