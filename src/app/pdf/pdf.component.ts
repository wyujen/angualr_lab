import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import './../tool/pdf/pdf-fonts.config';
@Component({
  selector: 'app-pdf',
  imports: [],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.scss'
})
export class PdfComponent {
  createPdf() {
    const doc = {
      content: [
        { text: 'rrrrrrrr', fontSize: 20, bold: true },
        { text: '這是一段測試中文，用 NotoSansTC 字型。', margin: [0, 10, 0, 0] }
      ],
      // ⭐ 這裡指定整份 PDF 預設用 NotoSansTC
      defaultStyle: {
        font: 'NotoSansTC',
        fontSize: 12
      }
    };

    pdfMake.createPdf(doc).open();
  }

}
