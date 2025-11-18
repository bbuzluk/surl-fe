import { useState, useCallback } from 'react';

export const useForm = <T>(initialValues: T) => {
  
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,          
      [name]: value,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return { formData, handleChange, resetForm, setFormData };
};