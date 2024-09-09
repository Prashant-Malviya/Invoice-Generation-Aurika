import React from 'react';

const InvoicePreview = ({ invoiceData, logo, signature }) => {
  const {
    sellerDetails,
    billingDetails,
    shippingDetails,
    orderDetails,
    items,
    reverseCharge,
  } = invoiceData;

  console.log(invoiceData,'invoiceData');
  

  const calculateTax = (netAmount, taxRate) => (netAmount * (taxRate / 100)).toFixed(2);
  const calculateNetAmount = (unitPrice, quantity, discount) =>
    (unitPrice * quantity - (discount || 0)).toFixed(2);

  return (
    <div className="border p-4 mt-6">
      {/* Logo */}
      {logo && <img src={logo} alt="Logo" className="w-24 mb-4" />}

      {/* Invoice Header */}
      <h2 className="text-center font-bold text-xl mb-4">
        Tax Invoice/Bill of Supply/Cash Memo
      </h2>
      <h3 className="text-center mb-4">(Original for Recipient)</h3>

      {/* Seller and Buyer Details */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <h4 className="font-bold">Sold By:</h4>
          <p>{sellerDetails.name}</p>
          <p>{sellerDetails.address}</p>
          <p>{sellerDetails.city}, {sellerDetails.state} - {sellerDetails.pin}</p>
          <p>PAN No: {sellerDetails.pan}</p>
          <p>GST Registration No: {sellerDetails.gst}</p>
        </div>
        <div>
          <h4 className="font-bold">Billing Address:</h4>
          <p>{billingDetails.name}</p>
          <p>{billingDetails.address}</p>
          <p>{billingDetails.city}, {billingDetails.state} - {billingDetails.pin}</p>
          <p>State/UT Code: {billingDetails.stateCode}</p>

          <h4 className="font-bold mt-4">Shipping Address:</h4>
          <p>{shippingDetails.name}</p>
          <p>{shippingDetails.address}</p>
          <p>{shippingDetails.city}, {shippingDetails.state} - {shippingDetails.pin}</p>
          <p>State/UT Code: {shippingDetails.stateCode}</p>
        </div>
      </div>

      {/* Order Details */}
      <div className="mb-4">
        <p>Order Number: {orderDetails.orderNo}</p>
        <p>Order Date: {orderDetails.orderDate}</p>
        <p>Invoice No: {orderDetails.invoiceNo}</p>
        <p>Invoice Date: {orderDetails.invoiceDate}</p>
        <p>Reverse Charge: {reverseCharge}</p>
      </div>

      {/* Items Table */}
      <table className="min-w-full table-auto border-collapse border mb-4">
        <thead>
          <tr className="border">
            <th className="border px-2 py-1">Sl. No</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Unit <br /> Price</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Net <br /> Amount</th>
            <th className="border px-2 py-1">Tax <br /> Rate</th>
            <th className="border px-2 py-1">Tax <br /> Amount</th>
            <th className="border px-2 py-1">Total <br /> Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
            const taxAmount = calculateTax(netAmount, item.taxRate);
            const totalItemAmount = (parseFloat(netAmount) + parseFloat(taxAmount)).toFixed(2);

            return (
              <tr key={index} className="border">
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{item.description}</td>
                <td className="border px-2 py-1">₹{item.unitPrice}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">₹{netAmount}</td>
                <td className="border px-2 py-1">{item.taxRate}%</td>
                <td className="border px-2 py-1">₹{taxAmount}</td>
                <td className="border px-2 py-1">₹{totalItemAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Signature */}
      {signature && (
        <div className="flex justify-end mt-6">
          <div>
            <p>For {sellerDetails.name}:</p>
            <img src={signature} alt="Signature" className="w-24 mt-2" />
            <p className="mt-2">Authorized Signatory</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
