import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"

@Entity('meeting')
export class Meeting extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        nullable: true
    })
    zoomUrl: string

    @ManyToMany(() => User, attendees => attendees.meetings)
    attendees: User[]

    @CreateDateColumn()
    createdAt: Date


    @UpdateDateColumn()
    updateAt: Date

}