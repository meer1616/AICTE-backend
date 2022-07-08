import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"

@Entity('contactinfo')
export class ContactInfo extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    contactNumber: number

    // @Column()
    // employeeId: number

    // @OneToOne(() => User, user => user.contactInfo, { onDelete: 'CASCADE' })
    // @JoinColumn()
    // user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

}