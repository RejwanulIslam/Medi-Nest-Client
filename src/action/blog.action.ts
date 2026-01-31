"use server";

import { medicineService } from "@/service/medicine.service";
import { CreateMedicineInput } from "@/types";

export const getMedicine = async () => {
  try {
    const res = await medicineService.getMedicine();
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    console.error("Failed to fetch medicines:", error.message);
    return null;
  }
};

export const createMedicine = async (data: CreateMedicineInput) => {
  try {
    const res = await medicineService.createMedicine(data);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    console.error("Failed to create medicine:", error.message);
    return null;
  }
};

export const updateMedicine = async ( data: any,id: string,) => {
  try {
    const res = await medicineService.updateMedicine( data,id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    console.error(`Failed to update medicine ${id}:`, error.message);
    return null;
  }
};