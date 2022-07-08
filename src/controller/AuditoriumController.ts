import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Auditorium } from "../Entities/Auditorium";

export const getAllAuditorium = async (req: Request, res: Response) => {
    try {
        // console.log(new Date().toLocaleDateString());
        // console.log(new Date().toLocaleTimeString())

        const allAuditorium = await Auditorium.find();
        if (!allAuditorium) return res.status(204).json({ message: "No Cell found" });
        return res.status(200).json({ length: allAuditorium.length, allAuditorium });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const RegisterAuditorium = async (req: Request, res: Response) => {
    try {
        const { name, ManagerName, email, contactNumber, imageUrl, addressLine, city, pincode, state, capacity, availability, fromDate, toDate, facilities } = req.body
        console.log(req.body);

        if (!name || !ManagerName || !email || !contactNumber || !imageUrl || !addressLine || !city || !pincode || !state || !capacity || !availability || !fromDate || !toDate || !facilities) return res.status(400).json({ message: "Enter the required field" })

        const duplicateCell = await Auditorium.findOne({ where: { email } })
        if (duplicateCell) return res.status(409).json({ message: "Auditorium has been already registered " })

        const date = new Date().toLocaleDateString()
        const time = new Date().toLocaleTimeString()

        const auditorium = new Auditorium()
        auditorium.name = name
        auditorium.ManagerName = ManagerName
        auditorium.email = email
        auditorium.contactNumber = contactNumber
        auditorium.imageUrl = imageUrl
        auditorium.addressLine = addressLine
        auditorium.city = city
        auditorium.pincode = pincode
        auditorium.state = state
        auditorium.capacity = capacity
        auditorium.availability = availability
        auditorium.capacity = capacity
        auditorium.fromDate = fromDate
        auditorium.toDate = toDate
        auditorium.facilities = facilities
        // auditorium.createdAt = `${date} ${time}`

        const newAuditorium = await auditorium.save().catch((err) => {
            res.json({ error: err })
        })
        return res.status(201).json({ success: true, newAuditorium });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteAuditorium = async (req: Request, res: Response) => {
    try {
        if (!req?.body?.id)
            return res.status(400).json({ message: "Auditorium id required" });
        const cell = await Auditorium.findOne({ where: { id: req.body.id } });
        if (!cell)
            return res.status(204).json({ message: `no Auditorium with id ${cell} found` });
        const result = await Auditorium.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateAuditorium = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, ManagerName, email, contactNumber, imageUrl, addressLine, city, pincode, state, capacity, availability, fromDate, toDate, facilities } = req.body;
        if (!id) return res.status(204).json({ message: `id not found` });
        const cellId = await Auditorium.findOne({ where: { id } });
        if (!cellId)
            return res.json({ message: `no cell with id ${Number(id)} found` }).status(204);
        if (name || ManagerName || email || contactNumber || imageUrl || addressLine || city || pincode || state || capacity || availability || fromDate || toDate || facilities) {
            await AppDataSource.createQueryBuilder()
                .update(Auditorium)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                    res.json({ error: err.detail });
                });
            return res.json({
                success: true,
                message: "user updated successfully",
            });
        }
        else {
            return res.status(400).json({ message: `body not found` });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const getAllAuditoriumById = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id)
            return res.status(400).json({ message: "cell id required" });
        const auditorium = await Auditorium.findOne({ where: { id: req.params.id } });
        if (!auditorium)
            return res.status(204).json({ message: `no auditorium with id ${auditorium} found` });
        // const result = await Cells.delete({ id: req.body.id });
        return res.status(200).json({ success: true, auditorium });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}