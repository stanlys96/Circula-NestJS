import { Post } from 'src/posts/entities/posts.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  bloodType: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  gpsAllowed: boolean;

  @Column({ nullable: true })
  hasChosenDonateBlood: boolean;

  @Column({ nullable: true })
  hasRegistered: boolean;

  @Column({ nullable: true })
  homeLocation: string;

  @Column({ nullable: true })
  legalDocumentUrl: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  whatsAppNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];
}
