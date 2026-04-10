import { useCallback } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export function useExportPDF() {
  const exportPDF = useCallback(async (elementId, filename = 'my-cv.pdf') => {
    const element = document.getElementById(elementId)
    if (!element) return

    try {
      // 1. Capture the HTML element as a high-quality canvas
      const canvas = await html2canvas(element, {
        scale: 2,           
        useCORS: true,      
        logging: false,
        backgroundColor: '#ffffff'
      })

      // 2. Convert canvas to image data
      const imgData = canvas.toDataURL('image/jpeg', 1.0)

      // 3. Setup the PDF document (A4 size)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      // 4. Calculate dimensions to fit exactly
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      // 5. Build and trigger the download natively
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(filename)
      
    } catch (err) {
      console.error('PDF generation error:', err)
      throw err
    }
  }, [])

  return { exportPDF }
}
