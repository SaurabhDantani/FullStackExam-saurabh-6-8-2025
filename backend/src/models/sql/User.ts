// src/entities/User.ts
import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Order } from './Order';
import { ObjectId } from 'bson';

@Entity({ name: 'User', synchronize: true })
export class User {
  @PrimaryColumn({ type: 'varchar', length: 24 })
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ unique: true, type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  }

  @BeforeInsert()
  generateId() {
    this.id = new ObjectId().toHexString(); // 24-character hex string
  }
}
