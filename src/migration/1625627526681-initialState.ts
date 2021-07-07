import {MigrationInterface, QueryRunner} from "typeorm";

export class initialState1625627526681 implements MigrationInterface {
    name = 'initialState1625627526681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `fullName` varchar(100) NOT NULL, `username` varchar(20) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(120) NOT NULL, `roles` text NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `createdAt` timestamp NOT NULL, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `products` (`id` int NOT NULL AUTO_INCREMENT, `category` varchar(100) NOT NULL, `name` varchar(50) NOT NULL, `weight` varchar(10) NOT NULL, `price` varchar(255) NOT NULL, `amount` int NOT NULL, `imageUrl` varchar(200) NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `author` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `products` ADD CONSTRAINT `FK_116bb258fab793012cf02709acf` FOREIGN KEY (`author`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `products` DROP FOREIGN KEY `FK_116bb258fab793012cf02709acf`");
        await queryRunner.query("DROP TABLE `products`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
