import React, { useState } from "react";
import InvoicePDF from "./components/invoice/Invoice";
import InvoicePreview from "./components/invoice preview/InvoicePreview";
import { url } from "./api/api";

const App = () => {
  const [invoiceData, setInvoiceData] = useState(null);
  const [logo, setLogo] = useState(null);
  const [signature, setSignature] = useState(null);

  // Mock API call to fetch invoice data (we can replace this with a real API call)
  const fetchInvoiceData = async () => {
    const data = await fetch(url); 
    const json = await data.json();
    setInvoiceData(json);
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result);
    reader.readAsDataURL(file);
  };

  // Handle signature upload
  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setSignature(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Invoice Generator</h1>

      {/* Upload section for Logo and Signature */}
      <div className="mb-4">
        <label className="block mb-2">Upload Logo:</label>
        <input type="file" onChange={handleLogoUpload} accept="image/*" />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Upload Signature:</label>
        <input type="file" onChange={handleSignatureUpload} accept="image/*" />
      </div>

      {/* Button to fetch Invoice Data */}
      <button
        onClick={fetchInvoiceData}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Fetch Invoice Data
      </button>

      {/* Render Invoice Preview */}
      {invoiceData && (
        <div>
          <InvoicePreview
            invoiceData={invoiceData}
            logo={logo}
            signature={signature}
          />

          {/* PDF Generation Button */}
          <InvoicePDF
            invoiceData={invoiceData}
            logo={logo}
            signature={signature}
          />
        </div>
      )}
    </div>
  );
};

export default App;
