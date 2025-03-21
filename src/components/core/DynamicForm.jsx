
// DynamicForm.jsx - Modern rewrite of c.java
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const DynamicForm = ({ 
  fields, 
  onSubmit, 
  submitText = "Submit", 
  className = "",
  buttonVariant = "default",
  resetOnSubmit = true
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label || field.name} is required`;
        isValid = false;
      }
      
      if (field.validate && formData[field.name]) {
        const error = field.validate(formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      if (resetOnSubmit) {
        setFormData({});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", className)}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          {field.label && (
            <Label htmlFor={field.name}>{field.label}</Label>
          )}
          <Input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            placeholder={field.placeholder || ""}
            value={formData[field.name] || ""}
            onChange={handleChange}
            className={errors[field.name] ? "border-destructive" : ""}
            autoComplete={field.autoComplete || "off"}
          />
          {errors[field.name] && (
            <p className="text-sm text-destructive">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <Button type="submit" variant={buttonVariant}>
        {submitText}
      </Button>
    </form>
  );
};

export default DynamicForm;
