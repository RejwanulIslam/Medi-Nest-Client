"use server";

import { OrderItem } from "@/app/payment/payment.interface";
import { paymentService } from "@/service/payment.service";

export const createPayment = async ({
    totalAmount,
    shippingAddress,
    phone,
    name,
    items,
}: {
    items: OrderItem[]
    totalAmount: number
    shippingAddress: string
    phone: string
    name: string
}) => {
    try {
        const res = await paymentService.CreatePayment({
            totalAmount,
            shippingAddress,
            phone,
            name,
            items,
        });
        if (res.error) throw new Error(res.error.message);
        return { data: res.data, status: 200 };
    } catch (error: any) {
        return {
            data: null,
            error: { message: error.message || "Error:Something is worng" }
        }
    }
};