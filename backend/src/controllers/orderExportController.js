import { Document, Packer, Paragraph, TextRun } from "docx";
import * as orderService from "../services/orderService.js";

export const exportOrderDocx = async (req, res) => {
  const id = Number(req.params.id);
  const { order, items } = await orderService.getOrderWithItems(id);

  const title = new Paragraph({
    spacing: { after: 200 },
    children: [
      new TextRun({ text: `НАКАЗ № ${order.order_number}`, bold: true }),
      new TextRun({ text: ` від ${new Date(order.order_date).toLocaleDateString("uk-UA")}`, break: 1 }),
      new TextRun({ text: `${order.order_type_name || ''}`, break: 1 }),
    ],
  });

  const groups = new Map();
  for (const i of items || []) {
    const key = `${i.employee_id}::${i.employee_full_name}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(i);
  }

  const contentParas = [];
  let employeeIndex = 0;
  for (const [key, list] of groups.entries()) {
    employeeIndex += 1;
    const [, employeeName] = key.split("::");
    contentParas.push(new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: `${employeeIndex}. ${employeeName}`, bold: true })] }));
    list.forEach((i, idx) => {
      contentParas.push(
        new Paragraph({
          children: [
            new TextRun({ text: `  ${idx + 1}) ${i.field_definition_name || ""} ${i.value || ""}` }),
          ],
        })
      );
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [title, ...contentParas],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const rawBaseName = `order-${order.order_number || id}`;
  const asciiBaseName = String(rawBaseName).replace(/[^A-Za-z0-9 _.-]+/g, "_").trim() || `order-${id}`;
  const safeAsciiFilename = `${asciiBaseName}.docx`;
  const utf8FilenameStar = `UTF-8''${encodeURIComponent(`${rawBaseName}.docx`)}`;
  res
    .status(200)
    .set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${safeAsciiFilename}"; filename*=${utf8FilenameStar}`,
    })
    .send(buffer);
};

export default { exportOrderDocx };


