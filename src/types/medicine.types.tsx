export interface IMedicine {
  id: string;
  medicineName: string;
  price: number;
  image?: string | null;
  stock: number;
  detels: string;
  manufacturer: string;
  sellerId: string;
  categorieId: string;
  createdAt: Date;
  updatedAt: Date;
}