import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { EmployeeProfile } from "../../types/employeeProfile";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Roboto" },
  title: { textAlign: "center", fontWeight: "bold", marginBottom: 16 },
  section: { marginBottom: 12 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: { fontWeight: 700 },
});

interface EmployeeProfilePDFProps {
  data: EmployeeProfile;
}

const Row = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text>{value ?? ""}</Text>
  </View>
);

const EmployeeProfilePDF = ({ data }: EmployeeProfilePDFProps) => {
  const { employee } = data;
  const currentYear = new Date().getFullYear();
  type OrderItem = NonNullable<EmployeeProfile["orderItems"]>[number];
  const allItems = (data.orderItems || []) as OrderItem[];
  const byCurrentYear = allItems.filter(
    (oi) => new Date(oi.orderDate).getFullYear() === currentYear
  );
  const itemsToUse = byCurrentYear.length > 0 ? byCurrentYear : allItems;
  const groupedByType: Record<string, OrderItem[]> = {};
  itemsToUse.forEach((oi) => {
    const key = oi.orderTypeName || "Інші";
    if (!groupedByType[key]) groupedByType[key] = [];
    groupedByType[key].push(oi);
  });

  const titleText =
    byCurrentYear.length > 0 ? `Накази за ${currentYear} рік` : "Накази";
  const hasItems = itemsToUse.length > 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Особовий листок працівника</Text>

        <View style={styles.section}>
          <Row label="ПІБ:" value={employee.fullName} />
          <Row label="ІПН:" value={employee.taxId} />
          <Row label="Табельний номер:" value={employee.personnelNumber} />
          <Row label="Адреса:" value={employee.address} />
        </View>

        <View style={styles.section}>
          <Row label="Паспорт серія:" value={employee.passportSeries} />
          <Row label="Паспорт №:" value={employee.passportNumber} />
          <Row
            label="Дата видачі:"
            value={
              employee.passportIssueDate
                ? new Date(employee.passportIssueDate).toLocaleDateString(
                    "uk-UA"
                  )
                : null
            }
          />
          <Row label="Ким виданий:" value={employee.passportIssuedBy} />
        </View>

        <View style={styles.section}>
          <Row label="Підрозділ:" value={data.currentDepartment?.name} />
          <Row label="Посада:" value={data.currentPosition?.name} />
          <Row
            label="Тип зайнятості:"
            value={data.currentEmploymentType?.name}
          />
          <Row
            label="Умови праці:"
            value={data.currentEmploymentCondition?.name}
          />
          <Row label="Графік роботи:" value={data.currentWorkSchedule?.name} />
        </View>

        <View style={styles.section}>
          <Row
            label="Кваліфікаційний розряд:"
            value={data.currentQualification?.grade}
          />
          <Row
            label="Оклад (актуальний):"
            value={data.currentGradeSalary?.baseSalary ?? null}
          />
          <Row
            label="Діє з:"
            value={
              data.currentGradeSalary?.effectiveFrom
                ? new Date(
                    data.currentGradeSalary.effectiveFrom
                  ).toLocaleDateString("uk-UA")
                : null
            }
          />
        </View>

        <View style={styles.section}>
          {hasItems && <Text style={styles.title}>{titleText}</Text>}

          {Object.keys(groupedByType).length > 0 ? (
            Object.keys(groupedByType).map((type) => (
              <View key={type} style={{ marginBottom: 8 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {type}
                </Text>
                {(groupedByType[type] || []).map((oi) => (
                  <Text key={oi.id}>
                    № {oi.orderNumber} від {oi.orderDate ? new Date(oi.orderDate).toLocaleDateString("uk-UA") : ""} — {oi.fieldDefinitionName || ""} {oi.value || ""}
                  </Text>
                ))}
              </View>
            ))
          ) : (
            itemsToUse.map((oi) => (
              <Text key={oi.id}>
                № {oi.orderNumber} від {oi.orderDate ? new Date(oi.orderDate).toLocaleDateString("uk-UA") : ""} — {oi.fieldDefinitionName || ""} {oi.value || ""}
              </Text>
            ))
          )}
        </View>
      </Page>
    </Document>
  );
};

export default EmployeeProfilePDF;
