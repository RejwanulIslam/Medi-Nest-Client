export interface IMedicine {
  id: string;
  sellerId: string;
  medicineName: string;
  manufacturer: string;
  categorieId: string;
  price: number;
  stock: number;
  image: string;
  detels: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface CreateMedicineInput {
  medicineName: string;
  manufacturer: string;
  categorieId: string;
  price: number;
  stock: number;
  image?: string;
  detels: string;
}