import { IsString, MaxLength, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(4)
  @Column({ length: 16 })
  screenName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Column({ length: 128 })
  password: string;
}
