import { calculateVat, formatPrice, priceWithoutVat } from '@/utils/helpers';
import { Document, Page, Text, View, StyleSheet, pdf, Font, Image } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: '/fonts/Roboto/static/Roboto-Regular.ttf',
      fontWeight: 400,
    },
    {
      src: '/fonts/Roboto/static/Roboto-Bold.ttf',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: { 
    padding: 30, 
    fontSize: 12, 
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 180,
    height: 'auto',
  },
  invoiceInfo: {
    textAlign: 'right',
    fontSize: 14,
  },
  title: { 
    fontSize: 28, 
    marginBottom: 10, 
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold' as const,
    color: '#333',
  },
  original: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  companyClient: {
    flexDirection: 'row',
    marginBottom: 20,
    border: '1px solid #ddd',
  },
  companyBox: {
    width: '50%',
    padding: 10,
    borderRight: '1px solid #ddd',
  },
  clientBox: {
    width: '50%',
    padding: 10,
  },
  boxTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    marginBottom: 5,
  },
  boxText: {
    fontSize: 11,
    marginBottom: 2,
  },
  table: { 
    marginTop: 10,
    border: '1px solid #ddd',
    borderRadius: 4,
  },
  tableHeader: { 
    flexDirection: 'row', 
    backgroundColor: '#f0f0f0', 
    padding: 8, 
    fontWeight: 'bold' as const,
    fontFamily: 'Roboto',
    borderBottom: '1px solid #ddd',
  },
  tableRow: { 
    flexDirection: 'row', 
    padding: 8, 
    borderBottom: '1px solid #ddd',
    fontFamily: 'Roboto',
  },
  colProduct: { width: '30%', fontSize: 11 },  // Увеличена ширина за по-добър изглед
  colQty: { width: '10%', textAlign: 'center' as const, fontSize: 11 },
  colPrice: { width: '15%', textAlign: 'right' as const, fontSize: 11 },
  colVat: { width: '25%', textAlign: 'right' as const, fontSize: 11 },
  colTotal: { width: '20%', textAlign: 'right' as const, fontSize: 11 },
  paymentSection: {
    marginTop: 20,  // Повече пространство
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    border: '1px solid #ddd',  // Добавена граница за по-добър стил
  },
  paymentTitle: {
    fontWeight: 'bold' as const,
    marginBottom: 5,
    fontSize: 13,  // Леко увеличен шрифт
  },
  paymentText: {
    marginBottom: 3,
    fontSize: 11,
  },
  footer: { 
    marginTop: 20, 
    textAlign: 'right' as const, 
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  totals: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    width: 150,
    fontWeight: 'bold' as const,
  },
  totalValue: {
    width: 100,  // Увеличена ширина за по-дълги стойности
    textAlign: 'right' as const,
    fontWeight: 'bold' as const,
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    borderTop: '1px solid #ddd',
    paddingTop: 10,
  },
  sigBox: {
    width: '45%',
    textAlign: 'center',
    fontSize: 10,
  },
  sigLine: {
    borderBottom: '1px solid #000',
    height: 20,
    marginBottom: 5,
  },
  legalNote: {
    marginTop: 20,
    fontSize: 10,
    textAlign: 'center',
    color: '#666',
  },
});

interface InvoicePdfProps {
  order: {
    invoiceNumber: string;
    createdAt: string;
    clientName: string;
    clientAddress: string;
    clientEik: string;
    clientVatNumber?: string;
    client: any;
    lots: Array<{
      name: string;
      model: string;
      quantity: number;
      totalSalePrice: number;
      vatRate: number;
    }>;
    totalPrice: number;
  };
  company: {
    name: string;
    address: string;
    eik: string;
    vatNumber: string;
    eori?: string;
    iban: string;
    logo?: string;
    currency?: any;
  };
}

export const InvoicePdf = ({ order, company }: InvoicePdfProps) => {
  console.log('crb_company', company);
  console.log('crb_order', order);

  // Пресмятане на тоталите динамично
  const subtotal = order.lots.reduce((sum, lot) => sum + priceWithoutVat(lot.totalSalePrice, lot.vatRate), 0);
  const totalVat = order.lots.reduce((sum, lot) => sum + calculateVat(lot.totalSalePrice, lot.vatRate), 0);
  const grandTotal = subtotal + totalVat;  // Трябва да съвпада с order.totalPrice

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {company.logo && <Image style={styles.logo} src={company.logo} />}
          <View style={styles.invoiceInfo}>
            <Text>Фактура № {order.invoiceNumber}</Text>
            <Text>Дата: {new Date(order.createdAt).toLocaleDateString('bg-BG')}</Text>
          </View>
        </View>

        <Text style={styles.title}>ФАКТУРА</Text>
        <Text style={styles.original}>ОРИГИНАЛ</Text>

        <View style={styles.companyClient}>
          <View style={styles.companyBox}>
            <Text style={styles.boxTitle}>ДОСТАВЧИК</Text>
            <Text style={styles.boxText}>Фирма: {company.name}</Text>
            <Text style={styles.boxText}>Адрес: {company.address}</Text>
            <Text style={styles.boxText}>ЕИК/БУЛСТАТ: {company.eik}</Text>
            {company.vatNumber && <Text style={styles.boxText}>ДДС №: {company.vatNumber}</Text>}
            {company.eori && <Text style={styles.boxText}>ЕОРИ: {company.eori}</Text>}
          </View>
          <View style={styles.clientBox}>
            <Text style={styles.boxTitle}>ПОЛУЧАТЕЛ</Text>
            <Text style={styles.boxText}>Клиент: {order.clientName}</Text>
            <Text style={styles.boxText}>Адрес: {`${order?.client?.city || ''}, ${order?.client?.country || ''}, ${order?.client?.address || ''}`}</Text>
            {order.client?.eik && <Text style={styles.boxText}>ЕИК/БУЛСТАТ: {order.client.eik}</Text>}
            {order.clientVatNumber && <Text style={styles.boxText}>ДДС №: {order.clientVatNumber}</Text>}
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colProduct}>Продукт/услуга</Text>
            <Text style={styles.colQty}>Кол.</Text>
            <Text style={styles.colPrice}>Цена без ДДС</Text>
            <Text style={styles.colVat}>ДДС</Text>
            <Text style={styles.colTotal}>Общо с ДДС</Text>
          </View>

          {order.lots?.map((lot: any, i: number) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colProduct}>{lot.name} {lot.model}</Text>
              <Text style={styles.colQty}>{lot.quantity}</Text>
              <Text style={styles.colPrice}>{formatPrice(priceWithoutVat(lot.totalSalePrice, lot.vatRate), company?.currency)}</Text>
              <Text style={styles.colVat}>{formatPrice(calculateVat(lot.totalSalePrice, lot.vatRate), company?.currency)} ({(lot.vatRate)}%)</Text>
              <Text style={styles.colTotal}>{formatPrice(lot.totalSalePrice, company?.currency)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Начин на плащане: По банка</Text>
          <Text style={styles.paymentText}>IBAN: {company.iban}</Text>
          <Text style={styles.paymentText}>Срок: 14 дни от дата на фактурата</Text>
          {!company.vatNumber && <Text style={styles.paymentText}>Oснование на сделка по ЗДДС: чл.113, ал.9 от ЗДДС – лицето не е регистрирано по ЗДДС</Text>}
        </View>

        <View style={styles.footer}>
          <View style={styles.totals}>
            <Text style={styles.totalLabel}>Данъчна основа:</Text>
            <Text style={styles.totalValue}>{formatPrice(subtotal, company.currency)}</Text>
          </View>
          <View style={styles.totals}>
            <Text style={styles.totalLabel}>{company.vatNumber ? 'ДДС:' : 'ДДС 0%:'}</Text>
            <Text style={styles.totalValue}>{formatPrice(company.vatNumber ? totalVat : 0, company.currency)}</Text>
          </View>
          <View style={styles.totals}>
            <Text style={styles.totalLabel}>Сума за плащане:</Text>
            <Text style={styles.totalValue}>{formatPrice(grandTotal, company.currency)}</Text>
          </View>
        </View>

        <View style={styles.signatures}>
          <View style={styles.sigBox}>
            <View style={styles.sigLine} />
            <Text>Подпис на продавача</Text>
            <Text>{company.name}</Text>
          </View>
          <View style={styles.sigBox}>
            <View style={styles.sigLine} />
            <Text>Подпис на клиента</Text>
            <Text>{order.clientName}</Text>
          </View>
        </View>

        <Text style={styles.legalNote}>Съгласно чл.6, ал 1 от Закона за счетоводството, чл.114 от ЗДДС и чл.78 от ППЗДДС печатът и подписът не са задължителни реквизити на фактурата.</Text>
      </Page>
    </Document>
  );
};

export const generateAndOpenPdf = async (order: any, company: any) => {
  try {
    const preparedOrder = {
      ...order.data,
      invoiceNumber: order.data.invoiceNumber || '0000000001',
      clientAddress: order.data.clientAddress || '',
      clientEik: order.data.clientEik || '',
      clientVatNumber: order.data.clientVatNumber || '',
    };

    const blob = await pdf(<InvoicePdf order={preparedOrder} company={company} />).toBlob();
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');

    if (newWindow) {
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } else {
      console.warn('Popup blocked. Please allow popups for PDF generation.');
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Грешка при генериране на PDF:', error);
  }
};