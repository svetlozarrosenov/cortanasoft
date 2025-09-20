'use client';
import { useParams } from 'next/navigation';
import { useOrders } from '../../orders/hooks';
import { useClients } from '../../clients/hooks';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  src: '/fonts/roboto/static/Roboto-Regular.ttf', // Локален файл
});
Font.register({
  family: 'Roboto',
  src: '/fonts/roboto/static/Roboto-Bold.ttf', // Локален файл
  fontWeight: 'bold',
});

// Хифен callback-ът остава същият
Font.registerHyphenationCallback((word) => {
  if (word.length <= 10) return [word];
  return [word.slice(0, 10), word.slice(10)];
});

// Интерфейси
interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

interface OrderProduct {
  productId: string;
  lotId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  lotNumber: string;
  expiryDate?: string;
}

interface Order {
  _id: string;
  clientId: string;
  clientName: string;
  products: OrderProduct[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Функция за форматиране на цена в евро
const formatPrice = (price: number) => {
  return price.toLocaleString('bg-BG', { style: 'currency', currency: 'EUR' }).replace('EUR', 'EUR');
};

// Генериране на случаен номер на фактура
const generateInvoiceNumber = (orderId: string) => {
  const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-цифрен случаен номер
  return `FAK-${orderId}-${randomNum}`;
};

// Стилове за PDF
const pdfStyles:any = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 40,
    fontFamily: 'Roboto', // ТУК СЕ ИЗПОЛЗВА ШРИФТЪТ Roboto
    fontSize: 10,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e40af',
  },
  section: {
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  table: {
    // display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f3f4f6',
    padding: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d1d5db',
    padding: 8,
    textAlign: 'center',
  },
  footer: {
    textAlign: 'right',
    marginTop: 20,
  },
  signature: {
    borderTopWidth: 1,
    borderTopColor: '#000',
    width: 200,
    textAlign: 'center',
    marginTop: 20,
    paddingTop: 5,
    marginLeft: 'auto',
  },
}) as any;

// Компонент за PDF документа
const InvoiceDocument = ({ order, client, invoiceNumber }: { order: Order; client: Client; invoiceNumber: string }) => {
  const sellerName = 'CortanaSoft EOOD';
  const sellerAddress = 'гр. София, ул. Примерна 1';
  const sellerEIK = '123456789';
  const sellerVAT = 'BG123456789';
  const issueDate = new Date().toLocaleDateString('bg-BG');
  const ddsRate = 0.20;
  const subtotal = order.products.reduce((sum, p) => sum + p.quantity * p.productPrice, 0);
  const ddsAmount = subtotal * ddsRate;
  const totalWithDDS = subtotal + ddsAmount;
  const logoUrl = '/images/ai-assistant-background.png';

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          {logoUrl && <Image src={logoUrl} style={pdfStyles.logo} />}
          <Text style={pdfStyles.title}>ФАКТУРА</Text>
        </View>
        <View style={pdfStyles.details}>
          <View style={pdfStyles.section}>
            <Text>Доставчик:</Text>
            <Text>{sellerName}</Text>
            <Text>{sellerAddress}</Text>
            <Text>ЕИК: {sellerEIK}</Text>
            <Text>ДДС №: {sellerVAT}</Text>
          </View>
          <View style={pdfStyles.section}>
            <Text>Получател:</Text>
            <Text>{`${client.firstName} ${client.lastName || ''}`}</Text>
            <Text>{`${client.city}, ${client.email}, ${client.phone}`}</Text>
            <Text>ЕИК: Няма (физическо лице)</Text>
            <Text>ДДС №: Няма</Text>
          </View>
        </View>
        <View style={pdfStyles.section}>
          <Text>Номер на фактурата: {invoiceNumber}</Text>
          <Text>Дата на издаване: {issueDate}</Text>
          <Text>Място на сделката: София, България</Text>
          <Text>Начин на плащане: По банков път</Text>
          <Text>Падеж на плащане: 30 дни от датата на издаване</Text>
          <Text>Дата на данъчно събитие: {new Date(order.createdAt).toLocaleDateString('bg-BG')}</Text>
        </View>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableRow}>
            <Text style={pdfStyles.tableColHeader}>Наименование</Text>
            <Text style={pdfStyles.tableColHeader}>Количество</Text>
            <Text style={pdfStyles.tableColHeader}>Единична цена (EUR, без ДДС)</Text>
            <Text style={pdfStyles.tableColHeader}>Стойност (EUR, без ДДС)</Text>
          </View>
          {order.products.map((p, index) => (
            <View key={index} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableCol}>{p.productName}</Text>
              <Text style={pdfStyles.tableCol}>{p.quantity}</Text>
              <Text style={pdfStyles.tableCol}>{formatPrice(p.productPrice)}</Text>
              <Text style={pdfStyles.tableCol}>{formatPrice(p.quantity * p.productPrice)}</Text>
            </View>
          ))}
        </View>
        <View style={pdfStyles.footer}>
          <Text>Данъчна основа: {formatPrice(subtotal)}</Text>
          <Text>Ставка ДДС: 20%</Text>
          <Text>Сума ДДС: {formatPrice(ddsAmount)}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Обща сума за плащане: {formatPrice(totalWithDDS)}</Text>
          <Text>Основание за неначисляване на ДДС: Няма (стандартна ставка 20%)</Text>
        </View>
        <View style={pdfStyles.signature}>
          <Text>Съставил: ________________________</Text>
          <Text>Подпис и печат: ________________________</Text>
        </View>
      </Page>
    </Document>
  );
};

// HTML версия на фактурата
const InvoiceHTML = ({ order, client, invoiceNumber }: { order: Order; client: Client; invoiceNumber: string }) => {
  const sellerName = 'CortanaSoft EOOD';
  const sellerAddress = 'гр. София, ул. Примерна 1';
  const sellerEIK = '123456789';
  const sellerVAT = 'BG123456789';
  const issueDate = new Date().toLocaleDateString('bg-BG');
  const ddsRate = 0.20;
  const subtotal = order.products.reduce((sum, p) => sum + p.quantity * p.productPrice, 0);
  const ddsAmount = subtotal * ddsRate;
  const totalWithDDS = subtotal + ddsAmount;
  const logoUrl = '/images/ai-assistant-background.png';

  return (
    <div className="bg-white p-10 shadow-lg max-w-4xl mx-auto font-sans text-sm text-gray-800">
      <div className="flex justify-between items-center mb-5">
        {logoUrl && <img src={logoUrl} alt="Logo" className="w-20 h-20" />}
        <h1 className="text-3xl font-bold text-center text-blue-800">ФАКТУРА</h1>
      </div>
      <div className="flex justify-between mb-5">
        <div>
          <p className="font-bold">Доставчик:</p>
          <p>{sellerName}</p>
          <p>{sellerAddress}</p>
          <p>ЕИК: {sellerEIK}</p>
          <p>ДДС №: {sellerVAT}</p>
        </div>
        <div>
          <p className="font-bold">Получател:</p>
          <p>{`${client.firstName} ${client.lastName || ''}`}</p>
          <p>{`${client.city}, ${client.email}, ${client.phone}`}</p>
          <p>ЕИК: Няма (физическо лице)</p>
          <p>ДДС №: Няма</p>
        </div>
      </div>
      <div className="mb-5">
        <p>Номер на фактурата: {invoiceNumber}</p>
        <p>Дата на издаване: {issueDate}</p>
        <p>Място на сделката: София, България</p>
        <p>Начин на плащане: По банков път</p>
        <p>Падеж на плащане: 30 дни от датата на издаване</p>
        <p>Дата на данъчно събитие: {new Date(order.createdAt).toLocaleDateString('bg-BG')}</p>
      </div>
      <table className="w-full border-collapse border border-gray-300 mb-5">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-center font-bold">Наименование</th>
            <th className="border border-gray-300 p-2 text-center font-bold">Количество</th>
            <th className="border border-gray-300 p-2 text-center font-bold">Единична цена (EUR, без ДДС)</th>
            <th className="border border-gray-300 p-2 text-center font-bold">Стойност (EUR, без ДДС)</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2 text-center">{p.productName}</td>
              <td className="border border-gray-300 p-2 text-center">{p.quantity}</td>
              <td className="border border-gray-300 p-2 text-center">{formatPrice(p.productPrice)}</td>
              <td className="border border-gray-300 p-2 text-center">{formatPrice(p.quantity * p.productPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right">
        <p>Данъчна основа: {formatPrice(subtotal)}</p>
        <p>Ставка ДДС: 20%</p>
        <p>Сума ДДС: {formatPrice(ddsAmount)}</p>
        <p className="text-base font-bold">Обща сума за плащане: {formatPrice(totalWithDDS)}</p>
        <p>Основание за неначисляване на ДДС: Няма (стандартна ставка 20%)</p>
      </div>
      <div className="border-t border-black w-48 text-center mt-5 pt-1 ml-auto">
        <p>Съставил: ________________________</p>
        <p>Подпис и печат: ________________________</p>
      </div>
    </div>
  );
};

export default function InvoicePage() {
  const params = useParams();
  const orderId = params.id as string;
  const { orders } = useOrders();
  const { clients } = useClients();
  const order = orders?.find((o: any) => o._id === orderId);
  const client = clients?.find((c: any) => c._id === order?.clientId);
  const invoiceNumber = order ? generateInvoiceNumber(order._id) : '';

  if (!order || !client) {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Фактура</h2>
        <p className="text-gray-800">Поръчката или клиентът не са намерени</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto print:max-w-none print:p-0">
        <div className="mb-4 print:hidden">
          <PDFDownloadLink
            document={<InvoiceDocument order={order} client={client} invoiceNumber={invoiceNumber} />}
            fileName={`invoice-${invoiceNumber}.pdf`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200 flex items-center gap-2"
          >
            {({ loading }) =>
              loading ? (
                'Зареждане...'
              ) : (
                <>
                  <span className="inline-block w-4 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyMS4zNUwxMC41OSAxOS45NEwxNi4xNyAxMS41TDkuNTkgMy40NkwxMiAyLjA0bDguNDggMTEuNUwxMiAyMS4zNVoiLz48cGF0aCBkPSJNMTIuMDAgMTUuNzVsLTIuNS0yLjVsLTIuNS0yLjVsMi41IDIuNSAyLjUgMi41WiIvPjwvc3ZnPg==')] bg-center bg-no-repeat bg-contain" />
                  Изтегли като PDF
                </>
              )
            }
          </PDFDownloadLink>
        </div>
        <InvoiceHTML order={order} client={client} invoiceNumber={invoiceNumber} />
      </div>
    </div>
  );
}