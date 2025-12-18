// src/app/pdf/pdf-fonts.config.ts
import pdfMake from 'pdfmake/build/pdfmake';
import { customVfs } from './.custom-vfs';

// 直接用自己轉出來的 vfs（不理內建 Roboto）
(pdfMake as any).vfs = customVfs;

// 字型設定：名字叫 NotoSansTC
(pdfMake as any).fonts = {
  NotoSansTC: {
    normal: 'NotoSansTC-Regular.ttf',
    bold: 'NotoSansTC-Regular.ttf',
    italics: 'NotoSansTC-Regular.ttf',
    bolditalics: 'NotoSansTC-Regular.ttf'
  }
};
