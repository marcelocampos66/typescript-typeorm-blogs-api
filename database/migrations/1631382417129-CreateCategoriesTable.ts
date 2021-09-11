import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCategoriesTable1631382417129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(new Table({
				name: 'categories',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						generationStrategy: 'increment',
					},
					{
						name: 'name',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
				],
			}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable('categories');
    }

}
