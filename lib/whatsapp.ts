/* ------------------------------------------------------------------ */
/*  WhatsApp deep-link helpers  (no backend / no database)             */
/* ------------------------------------------------------------------ */

/** Business WhatsApp number in international format, digits only. */
export const WHATSAPP_NUMBER = "94778909277"; // +94 77 890 9277
export const PHONE_DISPLAY = "+94 77 890 9277";
export const PHONE_TEL = "+94778909277";

/** Build a click-to-chat WhatsApp link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** A friendly, pre-filled enquiry for a specific service/offer. */
export function waEnquiry(subject: string): string {
  return waLink(
    `Hi Mr Adventure! 👋 I'm interested in *${subject}*. Could you share availability and the best price?`,
  );
}

/** Compose a structured booking message from the Quick-Book form. */
export function waBooking(fields: {
  name?: string;
  service?: string;
  date?: string;
  guests?: string | number;
  pickup?: string;
  note?: string;
}): string {
  const lines = ["Hi Mr Adventure! 👋 I'd like to make a booking:"];
  if (fields.service) lines.push(`• Service: ${fields.service}`);
  if (fields.date) lines.push(`• Date: ${fields.date}`);
  if (fields.guests) lines.push(`• Guests: ${fields.guests}`);
  if (fields.pickup) lines.push(`• Pickup / route: ${fields.pickup}`);
  if (fields.name) lines.push(`• Name: ${fields.name}`);
  if (fields.note) lines.push(`• Note: ${fields.note}`);
  lines.push("", "Please confirm availability. Thank you!");
  return waLink(lines.join("\n"));
}
