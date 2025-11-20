import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { Product } from "./types";
import config from "@/config";

interface AddProductProps {
  onAdd: (product: Omit<Product, "id">) => void;
  onCancel: () => void;
}

const AddProduct = ({ onAdd, onCancel }: AddProductProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    type: "",
    description: "",
    price: "",
    actual_price: "",
    image: "",
    points: "",
    features: [""],
    specifications: [{ label: "", value: "" }],
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const features = [...formData.features];
    features[index] = value;
    handleChange("features", features);
  };

  const addFeature = () => {
    handleChange("features", [...formData.features, ""]);
  };

  const removeFeature = (index: number) => {
    handleChange(
      "features",
      formData.features.filter((_, i) => i !== index)
    );
  };

  const handleSpecChange = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const specs = [...formData.specifications];
    specs[index] = { ...specs[index], [field]: value };
    handleChange("specifications", specs);
  };

  const addSpecification = () => {
    handleChange("specifications", [
      ...formData.specifications,
      { label: "", value: "" },
    ]);
  };

  const removeSpecification = (index: number) => {
    handleChange(
      "specifications",
      formData.specifications.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload = {
      ...formData,
      images: [
        formData.image ||
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      ],
    };

    try {
      const res = await fetch(`${config.apiBaseUrl}/admin/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      const data = await res.json();
      console.log("Server response:", data);

      // ✅ Refresh the page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Add New Product
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => handleChange("category", e.target.value)}
              required
              placeholder="e.g., Electronics"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
              required
              placeholder="e.g., Headphones"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="actual_price">Actual Price ($) *</Label>
            <Input
              id="actual_price"
              type="number"
              step="0.01"
              value={formData.actual_price}
              onChange={(e) => handleChange("actual_price", e.target.value)}
              required
              placeholder="Cost price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="points">Commission Points *</Label>
            <Input
              id="points"
              type="number"
              value={formData.points}
              onChange={(e) => handleChange("points", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            required
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => handleChange("image", e.target.value)}
            placeholder="https://..."
          />
        </div>
        {/* Features Section */}
        <div className="space-y-2">
          <Label>Features</Label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Enter feature"
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>

        {/* Specifications Section */}
        <div className="space-y-2">
          <Label>Specifications</Label>
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={spec.label}
                onChange={(e) =>
                  handleSpecChange(index, "label", e.target.value)
                }
                placeholder="Label (e.g., Weight)"
                className="flex-1"
              />
              <Input
                value={spec.value}
                onChange={(e) =>
                  handleSpecChange(index, "value", e.target.value)
                }
                placeholder="Value (e.g., 250g)"
                className="flex-1"
              />
              {formData.specifications.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSpecification}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Specification
          </Button>
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Add Product
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddProduct;
