import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Address } from './address.entity';
import { Category } from './category.entity';
import { Schedules } from './schedules.entity';


@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    sold: boolean;

    @Column()
    value: number;

    @Column()
    size: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Address) @JoinColumn()
    address: Address;

    @ManyToOne(() => Category, category => category.id)
    category: Category;

    @OneToMany(() => Schedules, schedules => schedules.id)
    schedules: Schedules[];
}