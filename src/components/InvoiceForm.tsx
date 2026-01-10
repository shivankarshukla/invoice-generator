import { useState, useEffect } from 'react';
import { InvoiceData, LineItem } from '../types/invoice';

interface InvoiceFormProps {
  onGenerate: (data: InvoiceData) => void;
  initialData?: Partial<InvoiceData> | null;
}

const defaultFormData: Partial<InvoiceData> = {
  fromCompany: 'Vedant Enterprises',
  fromGST: '29BMXPK4818G2ZD',
  billNumber: '',
  year: '25-26',
  date: new Date().toISOString().split('T')[0],
  toCompany: '',
  toAddress: '',
  toGSTIN: '',
  project: '',
    lineItems: [
      { description: 'RA 01 Bill for Painting work as per the attached Annexure', sacCode: '995473', amount: 0 }
    ],
  taxType: 'CGST+SGST',
  taxRate: 18
};

export default function InvoiceForm({ onGenerate, initialData }: InvoiceFormProps) {
  const [formData, setFormData] = useState<Partial<InvoiceData>>(
    initialData ? { ...defaultFormData, ...initialData } : defaultFormData
  );

  // Update form data when initialData changes (when coming back from preview)
  useEffect(() => {
    if (initialData) {
      setFormData({ ...defaultFormData, ...initialData });
    }
  }, [initialData]);

  const updateField = (field: keyof InvoiceData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...(formData.lineItems || [])];
    newItems[index] = { ...newItems[index], [field]: value };
    updateField('lineItems', newItems);
  };

  const addLineItem = () => {
    const newItems = [...(formData.lineItems || [])];
    newItems.push({ description: '', sacCode: '', amount: 0 });
    updateField('lineItems', newItems);
  };

  const removeLineItem = (index: number) => {
    const newItems = [...(formData.lineItems || [])];
    newItems.splice(index, 1);
    updateField('lineItems', newItems);
  };

  const calculateTotals = () => {
    const items = formData.lineItems || [];
    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const taxAmount = subtotal * ((formData.taxRate || 0) / 100);
    const grandTotal = subtotal + taxAmount;

    return { subtotal, taxAmount, grandTotal };
  };

  const handleGenerate = () => {
    const { subtotal, taxAmount, grandTotal } = calculateTotals();
    const invoiceData: InvoiceData = {
      fromCompany: formData.fromCompany || 'Vedant Enterprises',
      fromGST: formData.fromGST || '29BMXPK4818G2ZD',
      billNumber: formData.billNumber || '',
      year: formData.year || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      toCompany: formData.toCompany || '',
      toAddress: formData.toAddress || '',
      toGSTIN: formData.toGSTIN || '',
      project: formData.project || '',
      lineItems: formData.lineItems || [],
      taxType: formData.taxType || 'IGST',
      taxRate: formData.taxRate || 18,
      subtotal,
      taxAmount,
      grandTotal
    };
    onGenerate(invoiceData);
  };

  const { subtotal, taxAmount, grandTotal } = calculateTotals();

  return (
    <div className="bg-white/95 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-2xl max-w-4xl mx-auto pb-12 md:pb-4 animate-slide-in border border-white/20">
      <div className="flex flex-row items-center justify-between gap-2 mb-2 pb-2 border-b border-gray-200">
        <h2 className="text-base md:text-lg font-bold gradient-text whitespace-nowrap">Invoice Generator</h2>
        <div className="text-xs md:text-sm font-semibold text-purple-600 whitespace-nowrap">Vedant Enterprises</div>
      </div>
      
      <div className="space-y-2">
        {/* From Section */}
        <div className="border-b border-gradient-to-r from-purple-200 to-pink-200 pb-2">
          <h3 className="font-semibold text-sm md:text-base mb-1.5 text-purple-500">From (Company Details)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Company Name</label>
              <input
                type="text"
                value={formData.fromCompany}
                onChange={(e) => updateField('fromCompany', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">GST Number</label>
              <input
                type="text"
                value={formData.fromGST}
                onChange={(e) => updateField('fromGST', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Bill Details */}
        <div className="border-b border-gradient-to-r from-blue-200 to-cyan-200 pb-2">
          <h3 className="font-semibold text-sm md:text-base mb-1.5 text-blue-500">Bill Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Bill Number</label>
              <input
                type="text"
                value={formData.billNumber}
                onChange={(e) => updateField('billNumber', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                placeholder="Enter bill number"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => updateField('year', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                placeholder="25-26"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateField('date', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* To Section */}
        <div className="border-b border-gradient-to-r from-green-200 to-emerald-200 pb-2">
          <h3 className="font-semibold text-sm md:text-base mb-1.5 text-green-500">To (Billing Party)</h3>
          <div className="space-y-2">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Company Name</label>
              <input
                type="text"
                value={formData.toCompany}
                onChange={(e) => updateField('toCompany', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Address</label>
              <textarea
                value={formData.toAddress}
                onChange={(e) => updateField('toAddress', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">GSTIN</label>
              <input
                type="text"
                value={formData.toGSTIN}
                onChange={(e) => updateField('toGSTIN', e.target.value)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Project */}
        <div className="border-b border-gradient-to-r from-orange-200 to-yellow-200 pb-2">
          <label className="block text-xs md:text-sm font-medium mb-0.5 text-orange-500">Project</label>
          <input
            type="text"
            value={formData.project}
            onChange={(e) => updateField('project', e.target.value)}
            className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Line Items */}
        <div className="border-b border-gradient-to-r from-indigo-200 to-purple-200 pb-2">
          <h3 className="font-semibold text-sm md:text-base mb-1.5 text-indigo-500">Line Items</h3>
          <div className="space-y-2">
            {(formData.lineItems || []).map((item, index) => (
              <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-2">
                <div className="sm:col-span-7 flex flex-col">
                  <label className="block text-xs font-medium mb-0.5">Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm resize-y min-h-[2.25rem] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                    rows={1}
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col">
                  <label className="block text-xs font-medium mb-0.5">SAC Code</label>
                  <input
                    type="text"
                    value={item.sacCode}
                    onChange={(e) => updateLineItem(index, 'sacCode', e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-lg text-sm h-[2.25rem] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                    maxLength={10}
                  />
                </div>
                <div className="sm:col-span-3 flex flex-col">
                  <label className="block text-xs font-medium mb-0.5">Amount</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="0.01"
                      value={item.amount || ''}
                      onChange={(e) => updateLineItem(index, 'amount', parseFloat(e.target.value) || 0)}
                      className="flex-1 px-2 py-1.5 border border-gray-300 rounded-lg text-sm h-[2.25rem] focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
                    />
                    <button
                      onClick={() => removeLineItem(index)}
                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all focus:outline-none focus:ring-2 focus:ring-red-300 flex-shrink-0"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-end">
            <button
              onClick={addLineItem}
              className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-md hover:shadow-lg transition-all"
            >
              + Add Item
            </button>
          </div>
        </div>

        {/* Tax Details */}
        <div className="border-b border-gradient-to-r from-pink-200 to-rose-200 pb-2">
          <h3 className="font-semibold text-sm md:text-base mb-1.5 text-pink-500">Tax Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Tax Type</label>
              <select
                value={formData.taxType}
                onChange={(e) => updateField('taxType', e.target.value as 'IGST' | 'CGST+SGST')}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              >
                <option value="CGST+SGST">CGST + SGST</option>
                <option value="IGST">IGST</option>
              </select>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium mb-0.5">Tax Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={formData.taxRate}
                onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
                className="w-full px-2 py-1.5 md:px-3 md:py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Totals Preview */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-2 md:p-3 rounded-lg border-2 border-purple-200 shadow-md">
          <div className="space-y-1.5 text-right">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Subtotal:</span>
              <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {formData.taxType === 'CGST+SGST' ? (
              <>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">CGST ({(formData.taxRate || 0) / 2}%):</span>
                  <span>₹{(taxAmount / 2).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">SGST ({(formData.taxRate || 0) / 2}%):</span>
                  <span>₹{(taxAmount / 2).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-sm">
                <span className="font-medium">{formData.taxType} ({formData.taxRate || 0}%):</span>
                <span>₹{taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="flex justify-between text-base md:text-lg font-bold border-t border-gray-300 pt-1.5 mt-1.5">
              <span>Grand Total:</span>
              <span>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full px-4 py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 font-semibold text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-green-300 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
        >
          ✨ Generate Invoice
        </button>
      </div>
    </div>
  );
}

