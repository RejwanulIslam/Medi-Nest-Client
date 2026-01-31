"use client";

import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { updateMedicine } from "@/action/blog.action";



export const UpdateMedicineForm = ({
  medicine,
  id
}: {medicine:any,id:string}) => {
  const form = useForm({
    defaultValues: {
      medicineName: "",
      manufacturer: "",
      price: 0,
      stock: 0,
      image: "",
      detels: "",
      title: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Submitting updated medicine:", value);
     const res= await updateMedicine(value,id);
     console.log(res)
    },
  });

  // Prefill form values
  useEffect(() => {
    if (medicine) {
      form.reset({
        medicineName: medicine.medicineName,
        manufacturer: medicine.manufacturer,
        price: medicine.price,
        stock: medicine.stock,
        image: medicine.image,
        detels: medicine.detels,
        title: medicine.title || "",
      });
    }
  }, [medicine]);

  return (
    <Card className="max-w-3xl mx-auto mt-10 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">📝 Update Medicine</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* ===== BASIC INFO ===== */}
          <div className="grid md:grid-cols-2 gap-4">
            <form.Field name="medicineName">
              {(field) => (
                <div>
                  <Label>Medicine Name</Label>
                  <Input
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="manufacturer">
              {(field) => (
                <div>
                  <Label>Manufacturer</Label>
                  <Input
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

         
          </div>

          <Separator />

          {/* ===== PRICE & STOCK ===== */}
          <div className="grid md:grid-cols-3 gap-4">
            <form.Field name="price">
              {(field) => (
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    value={field.state.value || 0}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="stock">
              {(field) => (
                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={field.state.value || 0}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="image">
              {(field) => (
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          <Separator />

          {/* ===== DETAILS ===== */}
          <form.Field name="detels">
            {(field) => (
              <div>
                <Label>Description</Label>
                <Textarea
                  rows={5}
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          <Button type="submit" className="w-full">
            ✅ Update Medicine
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};