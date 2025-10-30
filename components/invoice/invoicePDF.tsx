import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 15 },
  row: { flexDirection: 'row', marginBottom: 5 },
  label: { width: 120, fontWeight: 'bold' },
  value: { flex: 1 },
  table: { marginTop: 10 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 5, fontWeight: 'bold' },
  tableRow: { flexDirection: 'row', padding: 5, borderBottom: '1px solid #ddd' },
  colProduct: { width: '40%' },
  colQty: { width: '15%', textAlign: 'center' },
  colPrice: { width: '20%', textAlign: 'right' },
  colTotal: { width: '25%', textAlign: 'right' },
  footer: { marginTop: 30, textAlign: 'right', fontSize: 14 },
});

interface InvoicePdfProps {
  order: any;
  company: any;
}

export const InvoicePdf = ({ order, company }: InvoicePdfProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Фактура</Text>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Фирма:</Text>
          <Text style={styles.value}>{company.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Клиент:</Text>
          <Text style={styles.value}>{order.clientName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Дата:</Text>
          <Text style={styles.value}>{new Date(order.createdAt).toLocaleDateString('bg-BG')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Статус:</Text>
          <Text style={styles.value}>{order.status === 'completed' ? 'Завършена' : 'В процес'}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.colProduct}>Продукт</Text>
          <Text style={styles.colQty}>Кол.</Text>
          <Text style={styles.colPrice}>Цена</Text>
          <Text style={styles.colTotal}>Общо</Text>
        </View>

        {order?.products?.map((p: any, i: any) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.colProduct}>{p.productName}</Text>
            <Text style={styles.colQty}>{p.quantity}</Text>
            <Text style={styles.colPrice}>{p.productPrice.toFixed(2)} лв.</Text>
            <Text style={styles.colTotal}>{(p.quantity * p.productPrice).toFixed(2)} лв.</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>Общо за плащане: {order.totalPrice.toFixed(2)} лв.</Text>
      </View>
    </Page>
  </Document>
);

export const generateAndOpenPdf = async (order: any, company: string) => {
  try {
    const blob = await pdf(<InvoicePdf order={order.data} company={company} />).toBlob();

    const url = URL.createObjectURL(blob);

    const newWindow = window.open(url, '_blank');

    if (newWindow) {
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 5000);

    } else {
      console.warn('Popup blocked. Please allow popups for PDF generation.');
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Грешка при генериране на PDF:', error);
  }
};