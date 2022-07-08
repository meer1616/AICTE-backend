import { Cells } from './../Entities/Cells';
import { Request, Response } from 'express';
import { AppDataSource } from '../../ormconfig';

export const getAllCells = async (req: Request, res: Response) => {
    // console.log("req", req);

    try {

        const allCells = await
            AppDataSource.getRepository(Cells)
                .createQueryBuilder("cells")
                .leftJoinAndSelect("cells.employees", "employees")
                .getMany();


        // const allCells = await Cells.find();
        if (!allCells) return res.status(204).json({ message: "No Cell found" });
        return res.status(200).json({ length: allCells.length, allCells });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}

export const RegisterCells = async (req: Request, res: Response) => {
    try {
        const { cellName, cellEmail, cellCode, contactNumber, imageUrl, ManagerId, addressLine, city, pincode, state, employees } = req.body

        console.log({ cellName, cellEmail, cellCode, contactNumber, imageUrl, ManagerId, addressLine, city, pincode, state, employees });

        if (!cellName || !cellEmail || !cellCode || !contactNumber || !imageUrl || !ManagerId || !addressLine || !city || !pincode || !state || !employees) return res.status(400).json({ message: "Enter the required field" })

        const duplicateCell = await Cells.findOne({ where: { cellEmail } })
        if (duplicateCell) return res.status(409).json({ message: "Cell has been already registered " })

        // const date = new Date().toLocaleDateString()
        // const time = new Date().toLocaleTimeString()

        const cell = new Cells()
        cell.cellName = cellName
        cell.cellEmail = cellEmail
        cell.cellCode = cellCode
        cell.contactNumber = contactNumber
        cell.imageUrl = imageUrl
        cell.ManagerId = ManagerId
        // cell.addressLine = addressLine
        // cell.city = city
        // cell.pincode = pincode
        // cell.state = state
        cell.employees = employees
        // cell.createdAt = `${date} ${time}`

        const newCell = await cell.save().catch((err) => {
            res.json({ error: err })
        })
        return res.status(201).json({ success: true, newCell });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteCell = async (req: Request, res: Response) => {
    try {
        if (!req?.body?.id)
            return res.status(400).json({ message: "user id required" });
        const cell = await Cells.findOne({ where: { id: req.body.id } });
        if (!cell)
            return res.status(204).json({ message: `no cell with id ${cell} found` });
        const result = await Cells.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getCellById = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id)
            return res.status(400).json({ message: "cell id required" });
        const cell = await Cells.findOne({ where: { id: req.params.id } });
        if (!cell)
            return res.status(204).json({ message: `no cell with id ${cell} found` });
        // const result = await Cells.delete({ id: req.body.id });
        return res.status(200).json({ message: "getById successfully ", cell });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateCell = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { cellName, cellEmail, cellCode, contactNumber, imageUrl, ManagerId, addressLine, city, pincode, state, employees } = req.body;
        if (!id) return res.status(204).json({ message: `id not found` });
        const cellId = await Cells.findOne({ where: { id: id } });
        if (!cellId)
            return res.json({ message: `no cell with id ${id} found` }).status(204);
        if (cellName || cellEmail || cellCode || contactNumber || imageUrl || ManagerId || addressLine || city || pincode || state || employees) {
            await AppDataSource.createQueryBuilder()
                .update(Cells)
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
};


