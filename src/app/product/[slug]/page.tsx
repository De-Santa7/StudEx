// src/app/product/[slug]/page.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Star, ChevronLeft } from "lucide-react";

export default function ProductPage() {
  return (
    <>
      {/* Top Bar */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="flex items-center justify-between p-4">
          <button className="p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Product Details</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* Product Image */}
        <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-64" />

        {/* Title & Rating */}
        <div>
          <h1 className="text-2xl font-bold">iPhone 16 Pro Max</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-muted">By Apple</p>
            <span className="text-muted">•</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted">(2.2k)</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">$1399.99</span>
          <span className="text-lg text-muted line-through">$1499.99</span>
          <Badge className="bg-accent text-white">-7%</Badge>
        </div>

        {/* Color Options */}
        <div>
          <h3 className="font-medium mb-3">Color</h3>
          <RadioGroup defaultValue="natural" className="flex gap-3">
            {["Desert Titanium", "Natural Titanium", "White Titanium", "Black Titanium"].map((color) => (
              <div key={color} className="flex items-center space-x-2">
                <RadioGroupItem value={color.toLowerCase().replace(/\s+/g, "-")} id={color} />
                <Label htmlFor={color} className="cursor-pointer text-sm">
                  {color}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Storage */}
        <div>
          <h3 className="font-medium mb-3">Storage</h3>
          <div className="flex gap-2">
            {["256 GB", "512 GB", "1 TB"].map((size) =>izer) => (
              <Button
                key={size}
                variant={size === "512 GB" ? "default" : "outline"}
                className={`rounded-full ${
                  size === "512 GB"
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border-primary text-primary hover:bg-primary/5"
                }`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-4 right-4 flex gap-3">
          <Button variant="outline" className="flex-1 rounded-full h-12 border-primary text-primary">
            Add to Cart
          </Button>
          <Button className="flex-1 rounded-full h-12 bg-primary text-white">
            Buy Now
          </Button>
        </div>
      </div>
    </>
  );
}