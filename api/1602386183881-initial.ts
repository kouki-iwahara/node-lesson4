import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1602386183881 implements MigrationInterface {
    name = 'initial1602386183881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `title` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `content`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `title`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `user_id`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `user_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `title` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `content` varchar(255) NOT NULL");
        await queryRunner.query("DROP TABLE `post`");
    }

}
