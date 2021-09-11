import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity('blogposts')
export class BlogPost {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (userId: User) => userId.id)
  userId: User;

  @CreateDateColumn({ name: 'published' })
  published: Date;

  @UpdateDateColumn({ name: 'updated' })
  updated: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Array<Category>;

}
