import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from "typeorm";

@Entity()
@Index(['userId', 'email'])
export class User {
  @PrimaryGeneratedColumn()
  userSno: number;

  @Column({ length: 40, unique: true })
  userId: string;

  @Column({ length: 256, nullable: false })
  password: string;

  @Column({ length: 40 })
  name: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ length: 40, unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}