import jsPDF from 'jspdf';

const InvoicePDF = ({ invoiceData, logo, signature }) => {
  const {
    sellerDetails,
    billingDetails,
    shippingDetails,
    orderDetails,
    reverseCharge,
    items,
  } = invoiceData;

  const calculateTax = (netAmount, taxRate) => (netAmount * (taxRate / 100)).toFixed(2);
  const calculateNetAmount = (unitPrice, quantity, discount) =>
    (unitPrice * quantity - (discount || 0)).toFixed(2);

  const totalAmount = items.reduce((total, item) => {
    const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
    const taxAmount = calculateTax(netAmount, item.taxRate);
    return total + parseFloat(netAmount) + parseFloat(taxAmount);
  }, 0).toFixed(2);

  const amountInWords = (amount) => {
    return 'One Thousand One Hundred and Ninety-Five only'; 
  };

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4'); 
    
    // Add Logo
    if (logo) {
      doc.addImage(logo, 'JPEG', 40, 30, 100, 50); 
    }

    // Title
    doc.setFontSize(14);
    doc.text('Tax Invoice/Bill of Supply/Cash Memo', 300, 100, { align: 'center' });
    doc.setFontSize(12);
    doc.text('(Original for Recipient)', 300, 120, { align: 'center' });

    // Seller Details (left aligned)
    doc.setFontSize(10);
    doc.text(`Sold By:`, 40, 150);
    doc.text(`${sellerDetails.name}`, 40, 165);
    doc.text(`${sellerDetails.address}`, 40, 180);
    doc.text(`${sellerDetails.city}, ${sellerDetails.state} - ${sellerDetails.pin}`, 40, 195);
    doc.text(`PAN No: ${sellerDetails.pan}`, 40, 210);
    doc.text(`GST Registration No: ${sellerDetails.gst}`, 40, 225);

    // Billing Details (right aligned)
    doc.text(`Billing Address:`, 320, 150);
    doc.text(`${billingDetails.name}`, 320, 165);
    doc.text(`${billingDetails.address}`, 320, 180);
    doc.text(`${billingDetails.city}, ${billingDetails.state} - ${billingDetails.pin}`, 320, 195);
    doc.text(`State/UT Code: ${billingDetails.stateCode}`, 320, 210);

    // Shipping Details (right aligned)
    doc.text(`Shipping Address:`, 320, 230);
    doc.text(`${shippingDetails.name}`, 320, 245);
    doc.text(`${shippingDetails.address}`, 320, 260);
    doc.text(`${shippingDetails.city}, ${shippingDetails.state} - ${shippingDetails.pin}`, 320, 275);
    doc.text(`State/UT Code: ${shippingDetails.stateCode}`, 320, 290);

    // Order Details
    doc.text(`Order Number: ${orderDetails.orderNo}`, 40, 270);
    doc.text(`Order Date: ${orderDetails.orderDate}`, 40, 285);
    doc.text(`Invoice No: ${orderDetails.invoiceNo}`, 40, 300);
    doc.text(`Invoice Date: ${orderDetails.invoiceDate}`, 40, 315);
    doc.text(`Reverse Charge: ${reverseCharge}`, 40, 330);

    // Table Headers
    doc.setFontSize(10);
    doc.text('Sl. No', 40, 350);
    doc.text('Description', 100, 350);
    doc.text('Unit Price', 200, 350);
    doc.text('Qty', 310, 350);
    doc.text('Net Amount', 360, 350);
    doc.text('Tax Rate', 440, 350);
    doc.text('Tax Amount', 500, 350);
    doc.text('Total Amount', 570, 350);

    // Items Table
    let startY = 370;
    items.forEach((item, index) => {
      const netAmount = calculateNetAmount(item.unitPrice, item.quantity, item.discount);
      const taxAmount = calculateTax(netAmount, item.taxRate);
      const totalItemAmount = (parseFloat(netAmount) + parseFloat(taxAmount)).toFixed(2);

      doc.text(`${index + 1}`, 40, startY);
      doc.text(`${item.description}`, 100, startY);
      doc.text(`₹${item.unitPrice}`, 200, startY);
      doc.text(`${item.quantity}`, 310, startY);
      doc.text(`₹${netAmount}`, 360, startY);
      doc.text(`${item.taxRate}%`, 440, startY);
      doc.text(`₹${taxAmount}`, 500, startY);
      doc.text(`₹${totalItemAmount}`, 550, startY);

      startY += 20;
    });

    // Total Section
    startY += 40; 
    doc.setFontSize(12);
    doc.text('TOTAL:', 40, startY);
    doc.text(`₹${totalAmount}`, 570, startY, { align: 'right' });
    doc.text(`Amount in Words: ${amountInWords(totalAmount)}`, 40, startY + 20);

    // Signature

    if (signature) {
      doc.text(`For ${sellerDetails.name}:`, 470, startY + 60);
      doc.addImage(signature, 'JPEG', 470, startY + 70, 100, 50); 
    }
    doc.text('Authorized Signatory', 470, startY + 130);

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF} className="p-2 bg-blue-500 text-white rounded">
        Download Invoice PDF
      </button>
    </div>
  );
};

export default InvoicePDF;
