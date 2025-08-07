import { VALIDATION_RULES } from '@/constants/openStore';

export const validateStoreField = (name: string, value: string | File | null): string => {
  switch (name) {
    case 'storeName':
      if (!value || (typeof value === 'string' && value.trim().length < VALIDATION_RULES.STORE_NAME_MIN_LENGTH)) {
        return `Nama toko minimal ${VALIDATION_RULES.STORE_NAME_MIN_LENGTH} karakter`;
      }
      break;
    case 'category':
      if (!value) {
        return 'Kategori harus dipilih';
      }
      break;
    case 'description':
      if (!value || (typeof value === 'string' && value.trim().length < VALIDATION_RULES.DESCRIPTION_MIN_LENGTH)) {
        return `Deskripsi minimal ${VALIDATION_RULES.DESCRIPTION_MIN_LENGTH} karakter`;
      }
      break;
    case 'profileImage':
      if (!value) {
        return 'Foto profil toko wajib diupload';
      }
      break;
    case 'address':
      if (!value || (typeof value === 'string' && value.trim().length < VALIDATION_RULES.ADDRESS_MIN_LENGTH)) {
        return `Alamat lengkap minimal ${VALIDATION_RULES.ADDRESS_MIN_LENGTH} karakter`;
      }
      break;
    case 'whatsapp':
      if (!value || (typeof value === 'string' && !VALIDATION_RULES.WHATSAPP_PATTERN.test(value.replace(/\s/g, '')))) {
        return 'Nomor WhatsApp harus dimulai dengan 08 dan 10-13 digit';
      }
      break;
  }
  return '';
};
