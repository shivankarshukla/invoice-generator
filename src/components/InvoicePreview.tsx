import { InvoiceData } from '../types/invoice';
import { numberToWords } from '../utils/numberToWords';

interface InvoicePreviewProps {
  data: InvoiceData;
  onClose: () => void;
}

export default function InvoicePreview({ data, onClose }: InvoicePreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const billNumberDisplay = data.billNumber ? `${data.billNumber}${data.year ? '/' + data.year : ''}` : (data.year ? data.year : '');

  return (
    <div className="invoice-preview-container fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto print:relative print:inset-auto print:bg-white print:z-auto">
      <div className="min-h-screen py-8 px-4 print:py-0 print:px-0">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl print:shadow-none print:max-w-full print:mx-0 print:rounded-none">
          {/* Header with Print Button */}
          <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10 no-print">
            <h2 className="text-xl font-bold">Invoice Preview</h2>
            <div className="space-x-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Print
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>

          {/* Invoice Content - Print Friendly */}
          <div className="p-6 print:p-8 print:pt-20">
            {/* Header Space for Company Letterhead */}
            <div className="h-20 print:h-28 mb-4 border-b-2 border-gray-300"></div>

            {/* Invoice Title */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold">TAX INVOICE</h1>
            </div>

            {/* From and To Section */}
            <div className="flex flex-col md:flex-row print:flex-row gap-4 mb-4 items-start">
              {/* To Section (Left) */}
              <div className="flex-1 print:flex-1">
                <div className="font-semibold mb-1 text-sm">To:</div>
                <div className="mb-1 font-medium text-sm">{data.toCompany}</div>
                <div className="text-xs whitespace-pre-line mb-1">{data.toAddress}</div>
                <div className="text-xs">
                  <span className="font-semibold">GSTIN:</span> {data.toGSTIN}
                </div>
              </div>

              {/* From Section (Right) */}
              <div className="flex-1 text-right print:flex-1 print:text-right">
                <div className="mb-1">
                  <span className="font-semibold text-sm">From:</span> <span className="text-sm">{data.fromCompany}</span>
                </div>
                <div className="text-xs space-y-0.5">
                  <div>
                    <span className="font-semibold">Date:</span> {formatDate(data.date)}
                  </div>
                  <div>
                    <span className="font-semibold">Bill No.:</span> {billNumberDisplay}
                  </div>
                  <div>
                    <span className="font-semibold">GST:</span> {data.fromGST}
                  </div>
                </div>
              </div>
            </div>

            {/* Project */}
            {data.project && (
              <div className="mb-3">
                <div className="font-semibold text-sm">Project: {data.project}</div>
              </div>
            )}

            {/* Line Items Table */}
            <div className="mb-4 overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-2 py-1 text-left text-xs font-semibold">Sn</th>
                    <th className="border border-gray-400 px-2 py-1 text-left text-xs font-semibold">Description</th>
                    <th className="border border-gray-400 px-2 py-1 text-left text-xs font-semibold">SAC Code</th>
                    <th className="border border-gray-400 px-2 py-1 text-right text-xs font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.lineItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-2 py-1 text-center">
                        {item.description ? index + 1 : ''}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">{item.description}</td>
                      <td className="border border-gray-400 px-2 py-1">{item.sacCode}</td>
                      <td className="border border-gray-400 px-2 py-1 text-right">
                        {item.amount > 0 ? formatCurrency(item.amount) : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Section */}
            <div className="flex justify-end mb-3">
              <div className="w-full md:w-72">
                <div className="border border-gray-400 p-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold text-xs">Total:</span>
                    <span className="font-semibold text-xs">₹{formatCurrency(data.subtotal)}</span>
                  </div>
                  {data.taxType === 'IGST' ? (
                    <div className="flex justify-between">
                      <span className="font-semibold text-xs">IGST {data.taxRate}%:</span>
                      <span className="font-semibold text-xs">₹{formatCurrency(data.taxAmount)}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="font-semibold text-xs">CGST {data.taxRate / 2}%:</span>
                        <span className="font-semibold text-xs">₹{formatCurrency(data.taxAmount / 2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-xs">SGST {data.taxRate / 2}%:</span>
                        <span className="font-semibold text-xs">₹{formatCurrency(data.taxAmount / 2)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between border-t border-gray-400 pt-1 mt-1">
                    <span className="font-bold text-sm">Grand Total:</span>
                    <span className="font-bold text-sm">₹{formatCurrency(data.grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Amount in Words */}
            <div className="mb-4">
              <div className="font-semibold text-sm">
                Amount in word: <span className="font-normal text-xs">{numberToWords(data.grandTotal)}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-300">
              <div className="text-right">
                <div className="font-semibold mb-1 text-sm">For: {data.fromCompany}</div>
                <div className="mt-6">
                  <div className="font-semibold text-sm">Proprietor</div>
                  <div className="mt-4 border-t border-gray-400 w-40 inline-block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

