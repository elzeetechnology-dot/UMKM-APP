import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import type { Transaction } from '../stores/transaction'

export const exportToPDF = (transactions: Transaction[]) => {
  const doc = new jsPDF()

  doc.setFontSize(14)
  doc.text('Laporan Transaksi UMKM', 14, 15)

  autoTable(doc, {
    startY: 25,
    head: [['Tanggal', 'Jumlah Item', 'Total']],
    body: transactions.map(tx => [
      new Date(tx.date).toLocaleString('id-ID'),
      tx.items.length,
      `Rp ${tx.total.toLocaleString()}`,
    ]),
  })

  doc.save('laporan-transaksi.pdf')
}

export const exportToExcel = (transactions: Transaction[]) => {
  const worksheet = XLSX.utils.json_to_sheet(
    transactions.map(tx => ({
      Tanggal: new Date(tx.date).toLocaleString('id-ID'),
      Item: tx.items.length,
      Total: tx.total,
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transaksi')

  XLSX.writeFile(workbook, 'laporan-transaksi.xlsx')
}
