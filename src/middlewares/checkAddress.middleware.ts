import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";
import { addressRepository } from "../data-source";
addressRepository

export default async function checkAddress(req: Request, res: Response, next: NextFunction) {

    try {
        const address = req.body.address;
        const addressFind = await addressRepository.find({ where: { zipCode: address.zipCode } });
        addressFind.find((address) => {
            if (address.district === req.body.address.district &&
                address.number === req.body.address.number &&
                address.zipCode === req.body.address.zipCode) {
                throw new AppError("Address already exist", 409);
            }
        });
        return next();
    } catch (err) {
        return res.status(err.status || 400).json({ message: err.message });
    };
};
