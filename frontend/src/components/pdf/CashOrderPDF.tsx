import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ContractInterface } from "../../types/contract";
import { moneyToWords } from "../../utils/numberToWords";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Roboto",
  },
  organizationHeader: {
    marginBottom: 10,
  },
  documentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  documentTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    padding: 3,
  },
  cellBorder: {
    border: "1px solid grey",
  },
  sectionCenter: {
    textAlign: "center",
    fontSize: 8,
    marginBottom: 5,
  },
  sectionBorder: {
    marginBottom: 5,
    fontSize: 12,
    fontStyle: "italic", 
    borderBottom: "1px solid grey",
  },

  signatures: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: "45%",
  },
  signatureLine: {
    borderTop: "1px solid grey",
    marginTop: 10,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 8,
    textAlign: "center",
  },
  signatureTextRight: {
    fontSize: 10,
    textAlign: "right",
  },
  stamp: {
    marginTop: 10,
    marginLeft: 40,
  },
});

interface CashOrderPDFProps {
  contract: ContractInterface;
  orderNumber?: string;
}

const CashOrderPDF: React.FC<CashOrderPDFProps> = ({
  contract,
  orderNumber = "___",
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.documentHeader}>
        <View style={styles.organizationHeader}>
          <Text>КЗ "Рівненська обласна філармонія" РОР</Text>
          <Text>ЄДРПОУ 02225683</Text>
        </View>
        <View>
          <Text>Типова форма № КО-2</Text>
          <Text>Затверджена наказом Міністерства фінансів України</Text>
          <Text>від 13 грудня 2022 року № 414</Text>
        </View>
      </View>

      <View style={styles.documentTitle}>
        <Text>ВИДАТКОВИЙ КАСОВИЙ ОРДЕР №{orderNumber}</Text>
        <Text>від _______________ 2025 року</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <View style={[styles.cell, styles.cellBorder, { width: "12%" }]}>
            <Text>Номер документа</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "12%" }]}>
            <Text>Дата складання</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "7%" }]}>
            <Text></Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "20%" }]}>
            <Text>Кореспондуючий рахунок, субрахунок</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "15%" }]}>
            <Text>Код аналітичного рахунку</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "10%" }]}>
            <Text>Сума, грн</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "15%" }]}>
            <Text>Код цільового призначення</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "10%" }]}>
            <Text></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.cell, styles.cellBorder, { width: "12%" }]}>
            <Text></Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "12%" }]}>
            <Text></Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "7%" }]}>
            <Text></Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "20%" }]}>
            <Text>663</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "15%" }]}>
            <Text></Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "10%" }]}>
            <Text>{contract.contractAmount}</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "15%" }]}>
            <Text></Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: "10%" }]}>
            <Text></Text>
          </View>
        </View>
      </View>

      <View style={styles.sectionBorder}>
        <Text>Видати: {contract.fullName}</Text>
      </View>
      <View style={styles.sectionCenter}>
        <Text>(прізвище, ім'я, по батькові)</Text>
      </View>

      <View style={styles.sectionBorder}>
        <Text>
          Підстава: винагорода за договором № {contract.contractNumber} від{" "}
          {new Date(contract.contractDate).toLocaleDateString("uk-UA")}
        </Text>
      </View>

      <View style={styles.sectionBorder}>
        <Text>Сума {contract.contractAmount} грн. </Text>
      </View>
      <View style={styles.sectionBorder}>
        <Text>{moneyToWords(Number(contract.contractAmount))}</Text>{" "}
      </View>
      <View style={styles.sectionCenter}>
        <Text>(словами)</Text>
      </View>

      <View style={styles.sectionBorder}>
        <Text>Додатки:</Text>
      </View>

      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>Керівник</Text>
          <Text style={styles.signatureTextRight}>Стеценко Е. А.</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>(підпис)</Text>
        </View>
        <View style={styles.signatureBlock}>
          <Text>Головний бухгалтер</Text>
          <Text style={styles.signatureTextRight}>Клепач Є. В.</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>(підпис)</Text>
        </View>
      </View>

      <View style={styles.sectionBorder}>
        <Text>Одержав:</Text>
      </View>

      <View>
        <Text>__________________________ 2025 року</Text>
      </View>

      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>Підпис одержувача</Text>
          <View style={styles.signatureLine} />
        </View>
        <View style={styles.signatureBlock}>
          <Text>
            {contract.passportSeries ? (
              <Text>За паспортом серії {contract.passportSeries}</Text>
            ) : (
              <Text>За ID-карткою</Text>
            )}{" "}
            № {contract.passportNumber}
          </Text>
          <Text>
            виданим {contract.passportIssuedBy} {contract.passportIssueDate}
          </Text>
        </View>
      </View>

      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>Видав касир</Text>
          <Text style={styles.signatureTextRight}>Парійчук В. В.</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>(підпис)</Text>
        </View>
      </View>

      <View style={styles.stamp}>
        <Text>М.П.</Text>
      </View>
    </Page>
  </Document>
);

export default CashOrderPDF;
