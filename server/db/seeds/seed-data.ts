import { Warehouse } from "../../src/modules/warehouses/warehouse.entity";
import { Staff } from "../../src/modules/staffs/staff.entity";
import { Customer } from "../../src/modules/customers/customer.entity";
import { RicePlant } from "../../src/modules/riceplants/riceplant.entity";
import { EntityManager } from "typeorm";
import { v4 as uuid4 } from "uuid";
import * as bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";

export const seedData = async (manager: EntityManager): Promise<void> => {
    await seedWarehouses();
    await seedStaffs();
    await seedCustomers();
    await seedRicePlants();

    async function seedWarehouses() {

    }

    async function seedStaffs() {
        
    }

    async function seedCustomers() {
        
    }

    async function seedRicePlants() {
        
    }
}
