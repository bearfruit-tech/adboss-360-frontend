"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { mockBrandImagesAPI } from "@/lib/brand-images/mock-api";
import {
  ManualImageEntry,
  IMAGE_TYPES,
  INDUSTRIES,
  STYLE_TAGS,
  DEMOGRAPHICS,
} from "@/types/brand-images";

export default function AdminBrandCurationPage() {
  const [imageData, setImageData] = useState<ManualImageEntry>({
    imageUrl: "",
    title: "",
    source: "",
    sourceUrl: "",
    industry: "",
    imageType: "brand_bento",
    tags: [],
    demographics: [],
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);

  const handleInputChange = (field: keyof ManualImageEntry, value: string) => {
    setImageData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagToggle = (tag: string) => {
    setImageData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleDemographicToggle = (demo: string) => {
    setImageData((prev) => ({
      ...prev,
      demographics: prev.demographics.includes(demo)
        ? prev.demographics.filter((d) => d !== demo)
        : [...prev.demographics, demo],
    }));
  };

  const handleSubmit = async () => {
    if (!imageData.imageUrl || !imageData.title || !imageData.industry) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setSuccess(false);

    try {
      await mockBrandImagesAPI.addManualImage(imageData);
      setSuccess(true);

      // Reset form
      setImageData({
        imageUrl: "",
        title: "",
        source: "",
        sourceUrl: "",
        industry: "",
        imageType: "brand_bento",
        tags: [],
        demographics: [],
        description: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error adding image:", error);
      alert("Error adding image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBulkScrape = async (source: string) => {
    setBulkLoading(true);
    try {
      const result = await mockBrandImagesAPI.bulkScrapeImages(source);
      alert(`${result.message}`);
    } catch (error) {
      console.error("Error scraping images:", error);
      alert("Error scraping images. Please try again.");
    } finally {
      setBulkLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Brand Image Curation Admin
        </h1>
        <p className="mt-2 text-gray-600">
          Manually add and categorize brand images for the visual inspiration
          system.
        </p>
      </div>

      {/* Bulk Scraping Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Collection</CardTitle>
          <CardDescription>
            Automatically scrape images from design sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <button
              onClick={() => handleBulkScrape("rebrand-gallery")}
              disabled={bulkLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {bulkLoading ? "Scraping..." : "Scrape Rebrand Gallery"}
            </button>
            <button
              onClick={() => handleBulkScrape("dribbble")}
              disabled={bulkLoading}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
            >
              {bulkLoading ? "Scraping..." : "Scrape Dribbble"}
            </button>
            <button
              onClick={() => handleBulkScrape("pinterest")}
              disabled={bulkLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {bulkLoading ? "Scraping..." : "Scrape Pinterest"}
            </button>
          </div>
          {bulkLoading && (
            <div className="mt-4 text-sm text-gray-600">
              Please wait while we collect brand images...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manual Entry Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Individual Image</CardTitle>
          <CardDescription>
            Manually curate and categorize a brand image
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="imageUrl">Image URL *</Label>
                <Input
                  id="imageUrl"
                  value={imageData.imageUrl}
                  onChange={(e) =>
                    handleInputChange("imageUrl", e.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={imageData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Healthcare Brand Identity"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source">Source *</Label>
                <Input
                  id="source"
                  value={imageData.source}
                  onChange={(e) => handleInputChange("source", e.target.value)}
                  placeholder="Dribbble, Behance, etc."
                />
              </div>
              <div>
                <Label htmlFor="sourceUrl">Source URL</Label>
                <Input
                  id="sourceUrl"
                  value={imageData.sourceUrl}
                  onChange={(e) =>
                    handleInputChange("sourceUrl", e.target.value)
                  }
                  placeholder="Original post URL"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={imageData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description of the brand image"
              />
            </div>

            {/* Industry Selection */}
            <div>
              <Label htmlFor="industry">Industry *</Label>
              <select
                id="industry"
                value={imageData.industry}
                onChange={(e) => handleInputChange("industry", e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Industry</option>
                {INDUSTRIES.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Type */}
            <div>
              <Label>Image Type *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {IMAGE_TYPES.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={type.id}
                      name="imageType"
                      value={type.id}
                      checked={imageData.imageType === type.id}
                      onChange={(e) =>
                        handleInputChange("imageType", e.target.value)
                      }
                    />
                    <Label htmlFor={type.id} className="text-sm">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Style Tags</Label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                {STYLE_TAGS.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={imageData.tags.includes(tag)}
                      onCheckedChange={() => handleTagToggle(tag)}
                    />
                    <Label
                      htmlFor={`tag-${tag}`}
                      className="text-sm capitalize"
                    >
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Demographics */}
            <div>
              <Label>Demographics & Cultural Relevance</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {DEMOGRAPHICS.map((demo) => (
                  <div key={demo} className="flex items-center space-x-2">
                    <Checkbox
                      id={`demo-${demo}`}
                      checked={imageData.demographics.includes(demo)}
                      onCheckedChange={() => handleDemographicToggle(demo)}
                    />
                    <Label
                      htmlFor={`demo-${demo}`}
                      className="text-sm capitalize"
                    >
                      {demo.replace("_", " ")}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            {imageData.imageUrl && (
              <div>
                <Label>Preview</Label>
                <div className="mt-2 border rounded-lg p-4">
                  <img
                    src={imageData.imageUrl}
                    alt={imageData.title}
                    className="max-w-xs max-h-48 object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex items-center justify-between">
              <div>
                {success && (
                  <p className="text-green-600 text-sm">
                    ✓ Image added successfully!
                  </p>
                )}
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Image"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
