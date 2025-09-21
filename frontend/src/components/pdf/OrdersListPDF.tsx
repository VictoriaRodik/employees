import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { OrderInterface } from "../../types/order";

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: "Roboto",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 15,
  },
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000000",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    borderBottomStyle: "solid",
    alignItems: "center",
    minHeight: 30,
  },
  tableCol: {
    width: "33.33%",
    borderRightWidth: 1,
    borderRightColor: "#000000",
    borderRightStyle: "solid",
    padding: 8,
  },
  tableColHeader: {
    width: "33.33%",
    borderRightWidth: 1,
    borderRightColor: "#000000",
    borderRightStyle: "solid",
    padding: 8,
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 10,
    textAlign: "center",
  },
  tableCellHeader: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    fontSize: 10,
  },
});

interface OrdersListPDFProps {
  orders: OrderInterface[];
  filters?: {
    search?: string;
    startDate?: string;
    endDate?: string;
    sort?: string;
  };
}

const OrdersListPDF: React.FC<OrdersListPDFProps> = ({ orders, filters }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA");
  };

  const getPeriodDescription = () => {
    if (filters?.startDate || filters?.endDate) {
      const start = filters.startDate
        ? formatDate(filters.startDate)
        : "початок";
      const end = filters.endDate ? formatDate(filters.endDate) : "сьогодні";
      return `Період: з ${start} по ${end}`;
    }

    if (orders.length > 0) {
      const dates = orders.map((order) => new Date(order.orderDate));
      const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

      return `Період: з ${formatDate(minDate.toISOString())} по ${formatDate(
        maxDate.toISOString()
      )}`;
    }

    return "Період: не визначено";
  };

  const periodDescription = getPeriodDescription();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>СПИСОК НАКАЗІВ</Text>
          <Text style={styles.subtitle}>{periodDescription}</Text>
        </View>

        <View style={styles.table}>
          {/* Header row */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Номер наказу</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Дата</Text>
            </View>
            <View style={[styles.tableColHeader, { borderRightWidth: 0 }]}>
              <Text style={styles.tableCellHeader}>Тип наказу</Text>
            </View>
          </View>

          {/* Data rows */}
          {orders.map((order) => (
            <View key={order.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{order.orderNumber}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {formatDate(order.orderDate)}
                </Text>
              </View>
              <View style={[styles.tableCol, { borderRightWidth: 0 }]}>
                <Text style={styles.tableCell}>{order.orderTypeName}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Всього наказів: {orders.length}</Text>
        </View>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Сторінка ${pageNumber} з ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default OrdersListPDF;
