"use client";

import { useForm } from "@tanstack/react-form";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createMedicine } from "@/action/blog.action";



const AddMedicineForm = ({categories,userId}:{categories:any,userId:string}) => {
  const form = useForm({
    defaultValues: {
      medicineName: "",
      manufacturer: "",
      categorieId: "",
      price: 0,
      stock: 0,
      image: "",
      detels: "",
      sellerId: "",
    },

    onSubmit: async ({ value }) => {
      const info={
           medicineName: value.medicineName,
      manufacturer: value.manufacturer,
      categorieId:value.categorieId,
      price: value.price,
      stock: value.stock,
      image: value.image,
      detels:value.detels,
      sellerId: userId
      }
    const data=  await createMedicine(info);
    console.log(data)
    },
  });

  return (
    <div className="mx-auto max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">➕ Add Medicine</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* ===== BASIC INFO ===== */}
            <div className="grid md:grid-cols-2 gap-4">
              <form.Field name="medicineName" validators={{
                onBlur: ({ value }) => !value && "Medicine name required"
              }}>
                {(field) => (
                  <div>
                    <Label>Medicine Name</Label>
                    <Input
                      value={field.state.value}
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
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </div>
                )}
              </form.Field>

              {/* CATEGORY DROPDOWN */}
              <form.Field name="categorieId" validators={{
                onBlur: ({ value }) => !value && "Category required"
              }}>
                {(field) => (
                  <div>
                    <Label>Category</Label>
                    <select
                      className="w-full border rounded-md px-3 py-2"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat:any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categorieName}
                        </option>
                      ))}
                    </select>
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
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
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
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="image">
                {(field) => (
                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={field.state.value}
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
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <Button className="w-full" size="lg">
              ✅ Add Medicine
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMedicineForm;