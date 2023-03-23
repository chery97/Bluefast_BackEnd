import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from "typeorm";

@Entity()
@Index(['userId', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  userSno: number;

  @Column({ length: 40, unique: true })
  userId: String;

  @Column({ length: 256, nullable: false })
  password: string;

  @Column({ length: 40 })
  name: String;

  @Column({ length: 15 })
  phone: String;

  @Column({ length: 40, unique: true })
  email: String;

  @CreateDateColumn()
  createdAt: Date;
}