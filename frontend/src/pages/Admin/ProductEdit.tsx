import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Save, 
  X,
  Plus,
  Package,
  CheckCircle2
} from "lucide-react";
import { Product } from "./types";

interface ProductEditProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductEdit = ({ product, onSave, onCancel }: ProductEditProps) => {
  const [formData, setFormData] = useState<Product>(product);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setFormData(product);
    setSelectedImage(product.image);
  }, [product]);

  const handleChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const features = [...(formData.features || [])];
    features[index] = value;
    handleChange('features', features);
  };

  const addFeature = () => {
    const features = [...(formData.features || []), ""];
    handleChange('features', features);
  };

  const removeFeature = (index: number) => {
    const features = formData.features?.filter((_, i) => i !== index) || [];
    handleChange('features', features);
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', value: string) => {
    const specs = [...(formData.specifications || [])];
    specs[index] = { ...specs[index], [field]: value };
    handleChange('specifications', specs);
  };

  const addSpecification = () => {
    const specs = [...(formData.specifications || []), { label: "", value: "" }];
    handleChange('specifications', specs);
  };

  const removeSpecification = (index: number) => {
    const specs = formData.specifications?.filter((_, i) => i !== index) || [];
    handleChange('specifications', specs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  // Initialize features and specifications if they don't exist
  useEffect(() => {
    if (!formData.features || formData.features.length === 0) {
      setFormData(prev => ({
        ...prev,
        features: [
          "Premium Quality Materials",
          "Fast Shipping Available",
          "30-Day Money Back Guarantee",
          "Secure Payment Processing",
          "24/7 Customer Support",
          "Eco-Friendly Packaging"
        ]
      }));
    }
    if (!formData.specifications || formData.specifications.length === 0) {
      setFormData(prev => ({
        ...prev,
        specifications: [
          { label: "Material", value: "Premium Quality" },
          { label: "Dimensions", value: "Standard Size" },
          { label: "Weight", value: "Lightweight" },
          { label: "Warranty", value: "1 Year" },
          { label: "Shipping", value: "Worldwide" },
          { label: "Return Policy", value: "30 Days" }
        ]
      }));
    }
  }, []);

  const defaultFeatures = formData.features || [];
  const defaultSpecs = formData.specifications || [];

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Product</h1>
            <p className="text-muted-foreground">Update product details and information</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <Card className="overflow-hidden p-4">
            <Label htmlFor="image" className="mb-2 block">Product Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => {
                handleChange('image', e.target.value);
                setSelectedImage(e.target.value);
              }}
              placeholder="https://..."
              className="mb-4"
            />
            <div className="aspect-square w-full rounded-lg overflow-hidden bg-muted">
              {!imageError && selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt={formData.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Package className="w-16 h-16" />
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  className="text-2xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  required
                  rows={4}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Price Section */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
                  required
                  className="text-3xl font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="points">Commission Points *</Label>
                <Input
                  id="points"
                  type="number"
                  value={formData.points}
                  onChange={(e) => handleChange('points', parseInt(e.target.value) || 0)}
                  required
                />
              </div>
            </div>
          </div>

          <Separator />
        </div>
      </div>

      {/* Features Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Key Features</h2>
          <Button type="button" variant="outline" size="sm" onClick={addFeature}>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>
        <div className="space-y-3">
          {defaultFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              <Input
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="Enter feature"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Description Section */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Product Description</h2>
        <div className="space-y-4">
          <Textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={6}
            placeholder="Enter detailed product description..."
          />
        </div>
      </Card>

      {/* Specifications Section */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Specifications</h2>
          <Button type="button" variant="outline" size="sm" onClick={addSpecification}>
            <Plus className="w-4 h-4 mr-2" />
            Add Specification
          </Button>
        </div>
        <div className="space-y-4">
          {defaultSpecs.map((spec, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 items-center">
              <Input
                value={spec.label}
                onChange={(e) => handleSpecChange(index, 'label', e.target.value)}
                placeholder="Specification label"
              />
              <div className="flex gap-2">
                <Input
                  value={spec.value}
                  onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                  placeholder="Specification value"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pb-8">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProductEdit;

