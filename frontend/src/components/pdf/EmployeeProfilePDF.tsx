import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export interface EmployeeProfileData {
  employee: {
    id: number;
    full_name: string;
    tax_id?: string;
    address?: string;
    passport_series?: string | null;
    passport_number?: string;
    passport_issue_date?: string;
    passport_issued_by?: string;
    personnel_number?: string;
  };
  currentDepartment?: { id: number; name: string; asOfOrder: { id: number; number: string; date: string } } | null;
  currentPosition?: { id: number; name: string; asOfOrder: { id: number; number: string; date: string } } | null;
  currentEmploymentType?: { id: number; name: string; asOfOrder: { id: number; number: string; date: string } } | null;
  currentEmploymentCondition?: { id: number; name: string; asOfOrder: { id: number; number: string; date: string } } | null;
  currentWorkSchedule?: { id: number; name: string; asOfOrder: { id: number; number: string; date: string } } | null;
  currentQualification?: { id: number; grade: string; asOfOrder: { id: number; number: string; date: string } } | null;
  currentGradeSalary?: { base_salary?: number | string; effective_from?: string; grade?: string } | null;
  orderItems?: Array<{
    id: number;
    order_id: number;
    order_number: string;
    order_date: string;
    order_type_name?: string;
    field_definition_name?: string;
    value?: string | null;
    value_id?: number | null;
  }>;
}

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Roboto" },
  title: { textAlign: "center", fontWeight: "bold", marginBottom: 16 },
  section: { marginBottom: 12 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  label: { fontWeight: 700 },
});

interface EmployeeProfilePDFProps {
  data: EmployeeProfileData;
}

const Row = ({ label, value }: { label: string; value?: string | number | null }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text>{value ?? ""}</Text>
  </View>
);

const EmployeeProfilePDF = ({ data }: EmployeeProfilePDFProps) => {
  const { employee } = data;
  const currentYear = new Date().getFullYear();
  type OrderItem = NonNullable<EmployeeProfileData["orderItems"]>[number];
  const groupedByType: Record<string, OrderItem[]> = {};
  (data.orderItems || [])
    .filter((oi) => new Date(oi.order_date).getFullYear() === currentYear)
    .forEach((oi) => {
      const key = oi.order_type_name || "Інші";
      if (!groupedByType[key]) groupedByType[key] = [];
      groupedByType[key].push(oi);
    });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Особовий листок працівника</Text>

        <View style={styles.section}>
          <Row label="ПІБ:" value={employee.full_name} />
          <Row label="ІПН:" value={employee.tax_id} />
          <Row label="Табельний номер:" value={employee.personnel_number} />
          <Row label="Адреса:" value={employee.address} />
        </View>

        <View style={styles.section}>
          <Row label="Паспорт серія:" value={employee.passport_series} />
          <Row label="Паспорт №:" value={employee.passport_number} />
          <Row label="Дата видачі:" value={employee.passport_issue_date ? new Date(employee.passport_issue_date).toLocaleDateString("uk-UA") : null} />
          <Row label="Ким виданий:" value={employee.passport_issued_by} />
        </View>

        <View style={styles.section}>
          <Row label="Підрозділ:" value={data.currentDepartment?.name} />
          <Row label="Посада:" value={data.currentPosition?.name} />
          <Row label="Тип зайнятості:" value={data.currentEmploymentType?.name} />
          <Row label="Умови праці:" value={data.currentEmploymentCondition?.name} />
          <Row label="Графік роботи:" value={data.currentWorkSchedule?.name} />
        </View>

        <View style={styles.section}>
          <Row label="Кваліфікаційний розряд:" value={data.currentQualification?.grade} />
          <Row label="Оклад (актуальний):" value={data.currentGradeSalary?.base_salary ?? null} />
          <Row label="Діє з:" value={data.currentGradeSalary?.effective_from ? new Date(data.currentGradeSalary.effective_from).toLocaleDateString("uk-UA") : null} />
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Накази за {currentYear} рік</Text>
          {Object.keys(groupedByType).map((type) => (
            <View key={type} style={{ marginBottom: 8 }}>
              <Text style={{ fontWeight: "bold", marginBottom: 4 }}>{type}</Text>
              {(groupedByType[type] || []).map((oi) => (
                <Text key={oi.id}>
                  № {oi.order_number} від {new Date(oi.order_date).toLocaleDateString("uk-UA")} — {oi.field_definition_name || ""} {oi.value || ""}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default EmployeeProfilePDF;


