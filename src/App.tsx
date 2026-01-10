import { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { InvoiceData } from './types/invoice';

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [savedFormData, setSavedFormData] = useState<Partial<InvoiceData> | null>(null);

  const handleGenerate = (data: InvoiceData) => {
    setInvoiceData(data);
    // Save the form data (without calculated totals) for when user comes back
    const formDataToSave: Partial<InvoiceData> = {
      fromCompany: data.fromCompany,
      fromGST: data.fromGST,
      billNumber: data.billNumber,
      year: data.year,
      date: data.date,
      toCompany: data.toCompany,
      toAddress: data.toAddress,
      toGSTIN: data.toGSTIN,
      project: data.project,
      lineItems: data.lineItems,
      taxType: data.taxType,
      taxRate: data.taxRate
    };
    setSavedFormData(formDataToSave);
    setShowPreview(true);
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen py-2 px-2 sm:py-4 sm:px-4 md:py-6 md:px-6">
      {!showPreview ? (
        <InvoiceForm onGenerate={handleGenerate} initialData={savedFormData} />
      ) : invoiceData ? (
        <InvoicePreview data={invoiceData} onClose={handleClosePreview} />
      ) : null}
    </div>
  );
}

export default App;

