import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { StoreFormData, StoreFormErrors, StoreFormTouched } from '@/types/openStore';
import { INITIAL_FORM_DATA, INITIAL_ERRORS, INITIAL_TOUCHED } from '@/constants/openStore';
import { validateStoreField } from '@/utils/storeValidation';

export const useStoreForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<StoreFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<StoreFormErrors>(INITIAL_ERRORS);
  const [touched, setTouched] = useState<StoreFormTouched>(INITIAL_TOUCHED);

  const handleFieldChange = (name: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field if it has been touched
    if (touched[name as keyof StoreFormTouched]) {
      const error = validateStoreField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    let value: string | File | null;
    
    if (name === 'profileImage') {
      value = formData.profileImage;
    } else if (name in formData && typeof formData[name as keyof StoreFormData] === 'string') {
      value = formData[name as keyof StoreFormData] as string;
    } else {
      value = null;
    }
    
    const error = validateStoreField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFieldChange('profileImage', file);
    }
  };

  const handleOperatingHoursChange = (type: 'start' | 'end', value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      operatingHours: { ...prev.operatingHours, [type]: value }
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: StoreFormErrors = {
      storeName: validateStoreField('storeName', formData.storeName),
      category: validateStoreField('category', formData.category),
      description: validateStoreField('description', formData.description),
      profileImage: validateStoreField('profileImage', formData.profileImage),
      address: validateStoreField('address', formData.address),
      whatsapp: validateStoreField('whatsapp', formData.whatsapp)
    };

    setErrors(newErrors);
    setTouched({
      storeName: true,
      category: true,
      description: true,
      profileImage: true,
      address: true,
      whatsapp: true
    });

    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form tidak valid",
        description: "Silakan periksa kembali semua field yang wajib diisi.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('hasStore', 'true');
    toast({
      title: "Toko berhasil didaftarkan!",
      description: "Toko Anda akan diaktifkan dalam 24 jam setelah verifikasi."
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return {
    formData,
    errors,
    touched,
    handleFieldChange,
    handleFieldBlur,
    handleImageUpload,
    handleOperatingHoursChange,
    handleSubmit
  };
};
