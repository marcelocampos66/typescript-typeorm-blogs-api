import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { BlogPost } from "./BlogPost";

@Entity('categories')
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => BlogPost, (post: BlogPost) => post.categories)
  posts: Array<BlogPost>;

}
