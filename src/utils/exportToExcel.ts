
import * as XLSX from 'xlsx';

type RecordSummary = {
  month: number;
  year: number;
  total_income: number;
  total_expenses: number;
  total_savings: number;
  budget_utilization_percentage: number;
};

export const exportToExcel = (data: RecordSummary[], fileName: string = 'financial_summary') => {
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(record => ({
      Month: `${getMonthName(record.month)} ${record.year}`,
      'Total Income': record.total_income,
      'Total Expenses': record.total_expenses,
      'Total Savings': record.total_savings,
      'Budget Utilization (%)': record.budget_utilization_percentage.toFixed(2) + '%'
    }))
  );

  // Format headers
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:E1');
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = XLSX.utils.encode_col(C) + '1';
    if (!worksheet[address]) continue;
    worksheet[address].s = {
      font: { bold: true },
      fill: { fgColor: { rgb: 'EEEEEE' } }
    };
  }

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Financial Summary');

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const getMonthName = (monthNumber: number): string => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[monthNumber - 1] || '';
};
