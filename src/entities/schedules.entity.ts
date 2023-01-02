import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user.entity';
import { Property } from './property.entity';

@Entity('schedulers_users_properties')
export class Schedules {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    date: Date;

    @Column()
    hour: string;

    @ManyToOne(() => Property, property => property.id)
    propertyId: string;

    @ManyToOne(() => User, user => user.id)
    userId: string;

}