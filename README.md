# Invoice Generation Program

## Objective

Developed a programmatic way of generating invoices for orders placed on an e-commerce platform. The invoice should match the provided format as closely as possible, including placeholders for company logos, signature images, and detailed order information.

## Features

- Generate invoices in PDF format.
- Include placeholders for company logos and signatures.
- Compute and display item details, taxes, and total amounts.
- Handle different tax types based on place of supply and delivery.
- Convert total amounts to words.
- Validate input parameters and handle potential errors.

## Requirements

- **Seller Details**: Name, Address, (City, State, Pincode), PAN No., GST Registration No.
- **Place of Supply**
- **Billing Details**: Name, Address, (City, State, Pincode), State/UT Code
- **Shipping Details**: Name, Address, (City, State, Pincode), State/UT Code
- **Place of Delivery**
- **Order Details**: Order No., Order Date
- **Invoice Details**: Invoice No., Invoice Details, Invoice Date
- **Reverse Charge**: Yes/No
- **Item Details**: Description, Unit Price, Quantity, Discount, Net Amount, Tax Rate
- **Signature Image**

## Computed Parameters

- **Net Amount**: Unit Price * Quantity - Discount
- **Tax Type**: CGST & SGST (9% each) if Place of Supply = Place of Delivery; IGST (18%) otherwise.
- **Tax Amount**: Net Amount * Tax Rate
- **Total Amount**: Net Amount + Tax Amount
- **Amount in Words**

## Implementation Approaches

- **Custom HTML Approach**: Build an HTML file to match the invoice format and convert it to PDF.

## Installation

To set up the project, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/invoice-generator.git
   cd invoice-generator

2. **Installation**
   ```bash
   npm i

3. **Running the project**
   ```bash
   npm run dev

## Explaination

- This implementation utilizes a mock API that provides dummy data for generating the invoice. You can replace this mock API with a real API to fetch live data.
- The fields in the invoice components are configurable and can be modified to suit specific requirements or changes in the invoice format.
- The system supports uploading both a company logo and a signature image, which are included in the generated invoice.
