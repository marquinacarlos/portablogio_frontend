import api from "../lib/axios";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  message: string;
  id?: string;
}

export const contactService = {
  /**
   * Enviar mensaje de contacto
   */
  send: async (data: ContactFormData): Promise<ContactResponse> => {
    const response = await api.post<ContactResponse>("/contact", data);
    return response.data;
  },
};
