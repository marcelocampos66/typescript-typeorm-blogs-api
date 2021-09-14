import { Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { BlogPost } from "./BlogPost";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BlogPost, (posts: BlogPost) => posts.user)
  @JoinColumn({ name: "posts", referencedColumnName: "user" })
  posts: Array<BlogPost>;

}
