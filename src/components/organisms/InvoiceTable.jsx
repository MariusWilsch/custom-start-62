import React, { useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import StatusBadge from '../molecules/StatusBadge';
import ActionButtons from '../molecules/ActionButtons';
import { useLanguage } from '../../contexts/LanguageContext';

const InvoiceTable = ({ invoices, onViewDetails, onDelete, onStamp }) => {
  const { language } = useLanguage();

  const translations = {
    en: {
      vendorName: 'Vendor/Supplier Name / Email',
      dateIssued: 'Date Issued',
      dueDate: 'Due Date',
      invoiceNumber: 'Invoice Number',
      grossAmount: 'Gross Amount',
      status: 'Status',
      actions: 'Actions',
      total: 'Total',
    },
    de: {
      vendorName: 'Absender',
      dateIssued: 'Ausstellungsdatum',
      dueDate: 'Fälligkeitsdatum',
      invoiceNumber: 'Rechnungsnummer',
      grossAmount: 'Bruttobetrag',
      status: 'Status',
      actions: 'Aktionen',
      total: 'Gesamt',
    },
  };

  const t = translations[language];
  const renderSender = (sender) => {
    if (Array.isArray(sender) && sender.length > 1) {
      return (
        <div className="flex flex-col">
          <span>{sender[0]}</span>
          <span className="text-sm text-gray-500">{sender.slice(1).join(', ')}</span>
        </div>
      );
    }
    return Array.isArray(sender) ? sender.join(', ') : sender;
  };

  const renderAmount = (amount) => {
    if (typeof amount === 'object' && amount !== null && 'gross_amount' in amount && 'currency' in amount) {
      return `${amount.gross_amount} ${amount.currency}`;
    }
    return amount || 'N/A';
  };

  const totalGrossAmount = useMemo(() => {
    return invoices.reduce((total, invoice) => {
      const amount = invoice.amount && invoice.amount.gross_amount
        ? parseFloat(invoice.amount.gross_amount)
        : 0;
      return total + amount;
    }, 0);
  }, [invoices]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4">{t.vendorName}</TableHead>
          <TableHead className="w-1/8 whitespace-nowrap">{t.dateIssued}</TableHead>
          <TableHead className="w-1/8 whitespace-nowrap">{t.dueDate}</TableHead>
          <TableHead className="w-1/8 whitespace-nowrap">{t.invoiceNumber}</TableHead>
          <TableHead className="w-1/8 whitespace-nowrap">{t.grossAmount}</TableHead>
          <TableHead className="w-1/8">{t.status}</TableHead>
          <TableHead className="w-1/8">{t.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice, index) => (
          <TableRow key={invoice.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <TableCell className="w-1/4">{renderSender(invoice.sender)}</TableCell>
            <TableCell className="w-1/8 whitespace-nowrap">{invoice.invoice_date || 'N/A'}</TableCell>
            <TableCell className="w-1/8 whitespace-nowrap">{invoice.faellig_am || 'N/A'}</TableCell>
            <TableCell className="w-1/8 whitespace-nowrap">{invoice.invoice_number || 'N/A'}</TableCell>
            <TableCell className="w-1/8 whitespace-nowrap">{renderAmount(invoice.amount)}</TableCell>
            <TableCell className="w-1/8">
              <StatusBadge status={invoice.status} />
            </TableCell>
            <TableCell className="w-1/8">
              <ActionButtons
                invoice={invoice}
                onViewDetails={onViewDetails}
                onDelete={onDelete}
                onStamp={onStamp}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="bg-muted/50 font-medium">
          <TableCell colSpan={4}>{t.total}</TableCell>
          <TableCell className="text-right">
            {new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', {
              style: 'currency',
              currency: invoices[0]?.amount?.currency || 'EUR'
            }).format(totalGrossAmount)}
          </TableCell>
          <TableCell colSpan={2} />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default InvoiceTable;
