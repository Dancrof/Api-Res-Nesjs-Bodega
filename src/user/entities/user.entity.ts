import { hash } from "bcryptjs";
import { Product } from "src/product/entities/product.entity";
import { BeforeInsert, BeforeUpdate, Column, Connection, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({type: 'varchar', length: 100, nullable: false})
    fullName: string;

    @Column({type: 'varchar', unique: true, length: 20, nullable: false})
    username: string;

    @Column({type: 'varchar', unique: true, length: 100, nullable: false})
    email: string;

    @Column({type: 'varchar', length: 120, nullable: false, select: false})
    password: string;

    @Column({type: 'simple-array'})
    roles: string[];

    @Column({type: 'bool', default: true})
    status: boolean;

    @Column({type: 'timestamp'})
    createdAt: Date;

    @BeforeInsert()
    @BeforeUpdate()

    async hashPassword(){
        if(!this.password){
            return;
        }
        this.password = await hash(this.password, 10);
    }; 

    @OneToOne(_ => Product, product => product.author, {cascade: true})
    products: Product;
}
