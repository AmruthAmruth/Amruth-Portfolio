import { FormData } from '@/types';

/**
 * Generates a mailto link from form data
 * @param formData - The contact form data
 * @param recipientEmail - The recipient email address
 * @returns A mailto URL string
 */
export function generateMailtoLink(
    formData: FormData,
    recipientEmail: string
): string {
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
