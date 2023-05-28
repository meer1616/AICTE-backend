import { Request, Response } from "express";
import { AppDataSource } from "../../ormconfig";
import { Order } from "../Entities/Order";
import { AuthRequest } from "../types/AuthRequest";

export const registerOrder = async (req: AuthRequest, res: Response) => {
    try {
        const { foodItems, description, orderedBy, orderNo, type, totalAmount, address } = req.body
        console.log(req.body);

        if (!foodItems || !description || !type || !orderedBy || !orderNo || !totalAmount || !address) return res.status(400).json({ message: "Enter the required field" })

        const duplicateCell = await Order.findOne({ where: { orderNo } })
        if (duplicateCell) return res.status(409).json({ message: "Food Item has been already ordered " })

        // const date = new Date().toLocaleDateString()
        // const time = new Date().toLocaleTimeString()

        const restaurant = new Order()
        restaurant.foodItems = foodItems
        restaurant.description = description
        restaurant.type = type
        restaurant.orderNo = orderNo
        restaurant.totalAmount = totalAmount
        restaurant.address = address
        restaurant.orderedBy = orderedBy

        // restaurant.createdAt = `${date} ${time}`

        const newFood = await restaurant.save().catch((err) => {
            res.json({ error: err })
        })
        return res.status(201).json({ success: true, newFood });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const food = await Order.find();
        if (!food) return res.status(204).json({ message: "No FoodItem found" });
        return res.status(200).json({ length: food.length, food });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteOrder = async (req: Request, res: Response) => {

    try {
        if (!req?.body?.id)
            return res.status(400).json({ message: "order id required" });
        const food = await Order.findOne({ where: { id: req.body.id } });
        if (!food)
            return res.status(204).json({ message: `no order with id ${food} found` });
        const result = await Order.delete({ id: req.body.id });
        return res.status(200).json({ message: "Deleted successfully ", result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { foodItems, description, orderedBy, orderNo, type, totalAmount, address } = req.body
        if (!id) return res.status(204).json({ message: `id not found` });
        const restaurantId = await Order.findOne({ where: { id } });
        if (!restaurantId)
            return res.json({ message: `no food item with id ${id} found` }).status(204);
        if (foodItems || description || type || orderedBy || orderNo || totalAmount || address) {
            await AppDataSource.createQueryBuilder()
                .update(Order)
                .set(req.body)
                .where("id = :id", { id })
                .execute()
                .catch((err) => {
                    res.json({ error: err.detail });
                });
            return res.json({
                success: true,
                message: "Order updated successfully",
            });
        }
        else {
            return res.status(400).json({ message: `body not found` });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getSingleOrder = async (req: Request, res: Response) => {
    try {
        if (!req.params?.id)
            return res.status(400).json({ message: "Order id required" });
        const food = await Order.findOne({ where: { id: req.params.id } });
        if (!food)
            return res.status(204).json({ message: `no Order with id ${food} found` });
        // const result = await Cells.delete({ id: req.body.id });
        return res.status(200).json({ message: "getById successfully ", food });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}