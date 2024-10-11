import {
    Controller,
    Get,
    Post
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get('all')
    getAll(): Promise<Customer[]> {
        return this.customersService.getAll();
    };

    // @Post('create')
    // create(): Promise<void> {
    //     try {
            
    //     } catch (error) {

    //     };
    // };

}
