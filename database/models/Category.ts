import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { BlogPost } from "./BlogPost";

@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => BlogPost, (post: BlogPost) => post.categories)
  posts: Array<BlogPost>;

}
