# Tax Invoice Generator

A web-based invoice generator application compatible with mobile devices. Generate professional tax invoices in the same format as your company's standard invoices.

## Features

- 📱 **Mobile Responsive**: Works seamlessly on mobile devices and desktops
- 🧾 **Professional Invoice Format**: Matches your company's invoice layout
- ✏️ **Customizable Fields**: 
  - Bill counter and year
  - Bill number
  - Billing party details (name, address, GSTIN)
  - Line items with description, SAC code, and amount
  - Tax type selection (IGST or CGST+SGST)
  - Tax rate
- 💰 **Auto Calculations**: Automatic subtotal, tax, and grand total calculations
- 📝 **Amount in Words**: Automatically converts amount to words
- 🖨️ **Print Ready**: Optimized for A4 paper printing with header space for company letterhead

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

1. Fill in the invoice details in the form
2. The "From" section is pre-filled with Vedant Enterprises details (customizable)
3. Update the "To" section with billing party details
4. Add line items with descriptions, SAC codes, and amounts
5. Select tax type (IGST or CGST+SGST) and enter tax rate
6. Click "Generate Invoice" to preview
7. Use the "Print" button to print the invoice

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling

## Default Company Details

- **Company Name**: Vedant Enterprises
- **GST Number**: 29BMXPK4818G2ZD

These can be customized in the form before generating the invoice.

