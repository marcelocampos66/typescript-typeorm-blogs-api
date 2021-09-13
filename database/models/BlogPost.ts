import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class BlogPost {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  // @ManyToOne(() => User, (user: User) => user.id)
  @ManyToOne(() => User)
  @JoinColumn({ name: "user", referencedColumnName: "id" })
  user: User;

  @CreateDateColumn()
  published: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToMany(() => Category, (categories: Category) => categories.id)
  @JoinTable()
  categories: Array<Category>;

}
