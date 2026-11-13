import type { PrintItem } from '../types/order';

export const WHATSAPP_PHONE_NUMBER = '5599984398313';

export const generateWhatsAppUrl = (
  items: PrintItem[],
  greeting: string,
): string => {
  if (items.length === 0) return '#';

  let message = `${greeting}\n\n`;

  items.forEach((item, index) => {
    message += `*Item ${index + 1}: ${item.projectName}*\n`;
    message += `• *Material:* ${item.material}\n`;
    message += `• *Color:* ${item.color}\n`;
    message += `• *Quantity:* ${item.quantity}\n`;
    message += `• *File:* ${item.fileUrl}\n`;
    if (item.notes) {
      message += `• *Notes:* ${item.notes}\n`;
    }
    message += `\n`;
  });

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
};

export type SupportIntentId = 'no-model' | 'have-idea' | 'adapt-lab';

export interface SupportRequest {
  intentLabel: string;
  need: string;
  context?: string;
  referenceUrl?: string;
  deadline?: string;
  relatedPiece?: string;
}

export const generateSupportWhatsAppUrl = (
  greeting: string,
  request: SupportRequest,
): string => {
  let message = `${greeting}\n\n`;
  message += `*Tipo de ajuda:* ${request.intentLabel}\n`;
  message += `*O que preciso:* ${request.need}\n`;

  if (request.context?.trim()) {
    message += `*Uso / contexto:* ${request.context.trim()}\n`;
  }
  if (request.relatedPiece?.trim()) {
    message += `*Peça de referência:* ${request.relatedPiece.trim()}\n`;
  }
  if (request.referenceUrl?.trim()) {
    message += `*Link / referência:* ${request.referenceUrl.trim()}\n`;
  }
  if (request.deadline?.trim()) {
    message += `*Prazo:* ${request.deadline.trim()}\n`;
  }

  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
};
