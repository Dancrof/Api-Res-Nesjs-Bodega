import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product {
    
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({type: 'varchar', length: 100, nullable: false})
    category: string;
    
    @Column({type: 'varchar', length: 50})
    name!: string;
    
    @Column({type: 'varchar', length: 10})
    weight!: string;
    
    @Column({type: 'varchar'})
    price!: string;
    
    @Column({type: 'int'})
    amount!: number;
    
    @Column({type: 'varchar', length: 200})
    imageUrl!: string;
    
    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

    @ManyToOne(_ => User, (user) => user.products, {eager: true})
    @JoinColumn({name: 'author'})
    author: User;
}
