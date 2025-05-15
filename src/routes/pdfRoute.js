const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();

// Ruta para generar el reporte en PDF
router.get('/reporte', async (req, res) => {
  try {
    const doc = new PDFDocument();

    // Cabeceras para que el navegador entienda que es un PDF descargable
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte.pdf');

    doc.pipe(res);

    // Contenido del PDF (puedes reemplazar esto con datos reales)
    doc.fontSize(22).fillColor('#007acc').text('Reporte de Reseñas', {
      align: 'center',
    });

    doc.moveDown();
    doc.fontSize(14).fillColor('#000').text('Este es un ejemplo de PDF generado desde el backend.');

    // Finaliza y envía el PDF
    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Error al generar PDF' });
  }
});

module.exports = router;
