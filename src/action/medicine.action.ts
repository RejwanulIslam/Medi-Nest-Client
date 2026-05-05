"use server";

import { cardService } from "@/service/card.service";
import { categoryService } from "@/service/category.service";
import { medicineService } from "@/service/medicine.service";
import { orderService } from "@/service/orderservices";
import { reviewService } from "@/service/review.service";
import { userService } from "@/service/user.service";
import { CreateMedicineInput } from "@/types";

export const getSeation = async () => {
  try {
    const res = await userService.getSeation();
    if (res.error) {
      console.warn("Session error:", res.error.message);
      return null;
    }
    return res.data;
  } catch (error: any) {
    console.error("Get session error:", error.message);
    return null;
  }
};

export const getMedicine = async (params?: any) => {
  try {
    const res = await medicineService.getMedicine(params);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};




export const createMedicine = async (data: CreateMedicineInput) => {
  console.log(data)
  try {
    const res = await medicineService.createMedicine(data);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};
export const deleteMedicine = async (id: string) => {
  try {
    const res = await medicineService.deleteMedicine(id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};


export const updateMedicine = async (data: any, id: string,) => {
  try {
    const res = await medicineService.updateMedicine(data, id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};

export const addCard = async (data: any) => {
  try {
    const res = await cardService.addCard(data);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};
export const deleteCard = async (data: string[]) => {
  try {
    const res = await cardService.deleteCard(data);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};


export const crateOrder = async (data: any) => {
  try {
    const res = await orderService.CreateOrder(data);
    return res;
    // if (res.error) throw new Error(res.error.message);
    return res;
  } catch (error: any) {
    return null;
  }
};
export const getAllOrder = async () => {
  try {
    const res = await orderService.getAllOrder();
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};
export const updateOrder = async (status: string, id: string) => {
  try {
    const res = await orderService.uppdateOrder(status, id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
};
export const addReview = async (data: any) => {
  try {
    const res = await reviewService.addReview(data);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }

};

export const getReview = async (id: string) => {
  try {
    const res = await reviewService.getReview(id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
}
export const updateUserStatus = async (status: string, id: string) => {
  try {
    const res = await userService.updateUserStatus(status, id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
}
export const manageUser = async (data: any, id: string) => {
  try {
    const res = await userService.manageProfile(data, id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
}

export const getCategory = async () => {
  try {
    const res = await categoryService.getCategory();
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
}
export const addCategory = async (data: any) => {
  try {
    const res = await categoryService.addCategory(data);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
}
export const deleteCategory = async (id: string) => {
  try {
    const res = await categoryService.deleteCategory(id);
    if (res.error) throw new Error(res.error.message);
    return res.data;
  } catch (error: any) {
    return null;
  }
}