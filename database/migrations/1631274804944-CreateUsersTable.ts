import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1631274804944 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'users',
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
				{
					name: 'email',
					type: 'varchar',
					isUnique: true,
					isNullable: false,
				},
				{
					name: 'password',
					type: 'varchar',
					isUnique: true,
					isNullable: false,
				},
			],
		}));
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}

}
