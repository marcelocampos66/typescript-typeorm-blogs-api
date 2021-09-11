import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBlogPostTable1631382465674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.createTable(new Table({
				name: 'blogposts',
				columns: [
					{
						name: 'id',
						type: 'integer',
						isPrimary: true,
						generationStrategy: 'increment',
					},
					{
						name: 'title',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'content',
						type: 'varchar',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'userId',
						type: 'integer',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'published',
						type: 'date',
						isUnique: true,
						isNullable: false,
					},
					{
						name: 'updated',
						type: 'date',
						isUnique: true,
						isNullable: false,
					},
				],
			}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
			await queryRunner.dropTable('blogposts');
    }

}
