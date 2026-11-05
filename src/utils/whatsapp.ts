import type { PrintItem } from '../types/order';


const WHATSAPP_PHONE_NUMBER = '5599984398313';

export const generateWhatsAppUrl = (
  items: PrintItem[],
  greeting: string
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

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;
};