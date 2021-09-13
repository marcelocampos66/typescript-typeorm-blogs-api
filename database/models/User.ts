import { Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
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

  @OneToMany(() => BlogPost, (posts: BlogPost) => posts.userId)
  @JoinColumn({ name: "posts", referencedColumnName: "userId" })
  posts: Array<BlogPost>;

}
