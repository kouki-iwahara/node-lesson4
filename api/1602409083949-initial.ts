import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1602409083949 implements MigrationInterface {
    name = 'initial1602409083949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `like` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `post_id` int NOT NULL, `is_liked` int NOT NULL DEFAULT 0, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `like`");
    }

}
