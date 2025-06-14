'use client'

import html2pdf from 'html2pdf.js'

export function exportToPDF(elementId: string, filename = 'document.pdf') {
  const element = document.getElementById(elementId)
  if (!element) return

  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    })
    .save()
}
