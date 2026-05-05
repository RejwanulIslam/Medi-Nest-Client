"use client";

import { useForm } from "@tanstack/react-form";
import { createMedicine } from "@/action/medicine.action";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pill,
  Building2,
  Tag,
  DollarSign,
  Package,
  Image as ImageIcon,
  FileText,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function FieldWrapper({
  label,
  icon: Icon,
  error,
  children,
  required,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
        <Icon className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" strokeWidth={2} />
        {label}
        {required && <span className="text-red-400 text-xs">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1 text-xs text-red-500 dark:text-red-400"
          >
            <AlertCircle className="w-3 h-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = cn(
  "w-full h-10 px-3.5 rounded-xl text-sm outline-none transition-all duration-200",
  "bg-slate-50 dark:bg-slate-900/60",
  "border border-slate-200 dark:border-white/10",
  "text-slate-900 dark:text-slate-100",
  "placeholder-slate-400 dark:placeholder-slate-500",
  "focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 dark:focus:border-emerald-500",
  "hover:border-slate-300 dark:hover:border-white/20"
);

const selectCls = cn(inputCls, "cursor-pointer appearance-none bg-right pr-9");

// ─── Section card ────────────────────────────────────────────────────────────
function Section({
  title,
  subtitle,
  children,
  index,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: "easeOut" }}
      className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-slate-900/50 p-5 sm:p-6 space-y-4"
    >
      <div>
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">{subtitle}</p>
      </div>
      <div className="h-px bg-slate-100 dark:bg-white/[0.06]" />
      {children}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const AddMedicineForm = ({
  categories,
  userId,
}: {
  categories: any;
  userId: string;
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

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
      setSubmitting(true);
      const info = {
        medicineName: value.medicineName,
        manufacturer: value.manufacturer,
        categorieId: value.categorieId,
        price: value.price,
        stock: value.stock,
        image: value.image,
        detels: value.detels,
        sellerId: userId,
      };
      const data = await createMedicine(info);
      console.log(data, "data");
      if (data) {
        toast.success("Medicine added successfully!");
        form.reset();
        setImagePreview("");
      } else {
        toast.error("Failed to add medicine. Please try again.");
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
            <Pill className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Add New Medicine
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Fill in the details below to list a new product
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Form ── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Section 1 – Basic Info */}
        <Section
          index={0}
          title="Basic Information"
          subtitle="Core product identity fields"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Medicine Name */}
            <form.Field
              name="medicineName"
              validators={{ onBlur: ({ value }) => !value ? "Medicine name is required" : undefined }}
            >
              {(field) => (
                <FieldWrapper label="Medicine Name" icon={Pill} error={field.state.meta.errors[0]?.toString()} required>
                  <input
                    id="medicine-name-input"
                    className={inputCls}
                    placeholder="e.g. Paracetamol 500mg"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FieldWrapper>
              )}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => (
                <FieldWrapper label="Manufacturer" icon={Building2}>
                  <input
                    id="medicine-manufacturer-input"
                    className={inputCls}
                    placeholder="e.g. Square Pharmaceuticals"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </FieldWrapper>
              )}
            </form.Field>

            {/* Category */}
            <form.Field
              name="categorieId"
              validators={{ onBlur: ({ value }) => !value ? "Category is required" : undefined }}
            >
              {(field) => (
                <FieldWrapper label="Category" icon={Tag} error={field.state.meta.errors[0]?.toString()} required>
                  <div className="relative">
                    <select
                      id="medicine-category-select"
                      className={selectCls}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    >
                      <option value="">Select a category…</option>
                      {categories?.map((cat: any) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.categorieName}
                        </option>
                      ))}
                    </select>
                    <Tag className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.75} />
                  </div>
                </FieldWrapper>
              )}
            </form.Field>
          </div>
        </Section>

        {/* Section 2 – Pricing & Inventory */}
        <Section
          index={1}
          title="Pricing & Inventory"
          subtitle="Set the price and available stock quantity"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Price */}
            <form.Field name="price">
              {(field) => (
                <FieldWrapper label="Price (BDT)" icon={DollarSign}>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 dark:text-slate-500">
                      ৳
                    </span>
                    <input
                      id="medicine-price-input"
                      type="number"
                      min={0}
                      step="0.01"
                      className={cn(inputCls, "pl-8")}
                      placeholder="0.00"
                      value={field.state.value || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                  </div>
                </FieldWrapper>
              )}
            </form.Field>

            {/* Stock */}
            <form.Field name="stock">
              {(field) => (
                <FieldWrapper label="Stock Quantity" icon={Package}>
                  <div className="relative">
                    <input
                      id="medicine-stock-input"
                      type="number"
                      min={0}
                      className={cn(inputCls, "pr-12")}
                      placeholder="0"
                      value={field.state.value || ""}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 dark:text-slate-500">
                      units
                    </span>
                  </div>
                </FieldWrapper>
              )}
            </form.Field>
          </div>
        </Section>

        {/* Section 3 – Media */}
        <Section
          index={2}
          title="Product Image"
          subtitle="Provide a public URL for the medicine image"
        >
          <form.Field name="image">
            {(field) => (
              <FieldWrapper label="Image URL" icon={ImageIcon}>
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    <input
                      id="medicine-image-input"
                      className={inputCls}
                      placeholder="https://example.com/medicine.png"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                    />
                  </div>
                  {/* Live preview */}
                  <div className="w-16 h-16 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">
                    <AnimatePresence mode="wait">
                      {imagePreview ? (
                        <motion.img
                          key="preview"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={() => setImagePreview("")}
                        />
                      ) : (
                        <motion.span key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Eye className="w-5 h-5 text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </FieldWrapper>
            )}
          </form.Field>
        </Section>

        {/* Section 4 – Description */}
        <Section
          index={3}
          title="Product Description"
          subtitle="Provide usage instructions, dosage info, and other relevant details"
        >
          <form.Field name="detels">
            {(field) => (
              <FieldWrapper label="Description" icon={FileText}>
                <textarea
                  id="medicine-description-textarea"
                  rows={5}
                  className={cn(
                    inputCls,
                    "h-auto resize-none py-2.5 leading-relaxed"
                  )}
                  placeholder="Describe the medicine — dosage, usage, side effects, warnings…"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </FieldWrapper>
            )}
          </form.Field>
        </Section>

        {/* ── Submit Button ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <button
            id="add-medicine-submit-btn"
            type="submit"
            disabled={submitting}
            className={cn(
              "w-full flex items-center justify-center gap-2.5 h-12 rounded-xl text-sm font-semibold transition-all duration-200",
              "bg-gradient-to-r from-emerald-500 to-teal-600",
              "text-white shadow-lg shadow-emerald-500/25",
              "hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/40",
              "active:scale-[0.99]",
              "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-emerald-500/25"
            )}
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Adding Medicine…
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                Add Medicine
              </>
            )}
          </button>
        </motion.div>
      </form>
    </div>
  );
};

export default AddMedicineForm;