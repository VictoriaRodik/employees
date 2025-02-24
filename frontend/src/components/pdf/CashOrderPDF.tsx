import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ContractInterface } from '../../types/contract';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  organizationHeader: {
    marginBottom: 10,
  },
  documentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  documentTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  table: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    paddingVertical: 5,
  },
  cell: {
    padding: 3,
  },
  cellBorder: {
    borderRight: '1px solid black',
  },
  section: {
    marginBottom: 15,
  },
  underline: {
    textDecoration: 'underline',
  },
  signatures: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLine: {
    borderTop: '1px solid black',
    marginTop: 20,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 8,
    textAlign: 'center',
  },
  stamp: {
    marginTop: 20,
    marginLeft: 40,
  }
});

interface CashOrderPDFProps {
  contract: ContractInterface;
  orderNumber?: string;
}

const CashOrderPDF: React.FC<CashOrderPDFProps> = ({ contract, orderNumber = "___" }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.organizationHeader}>
        <Text>ТОВ "Назва Компанії"</Text>
        <Text>ЄДРПОУ xxxxxxxxxx</Text>
      </View>

      <View style={styles.documentHeader}>
        <View>
          <Text>Типова форма № КО-2</Text>
          <Text>Затверджена наказом Міністерства фінансів України</Text>
          <Text>від 13 грудня 2022 року № 414</Text>
        </View>
      </View>

      <View style={styles.documentTitle}>
        <Text>ВИДАТКОВИЙ КАСОВИЙ ОРДЕР №{orderNumber}</Text>
        <Text>від {new Date(contract.contractDate).toLocaleDateString('uk-UA')}</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.row}>
          <View style={[styles.cell, styles.cellBorder, { width: '30%' }]}>
            <Text>Кореспондуючий рахунок</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: '20%' }]}>
            <Text>Код аналітичного рахунку</Text>
          </View>
          <View style={[styles.cell, { width: '50%' }]}>
            <Text>Сума, грн</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.cell, styles.cellBorder, { width: '30%' }]}>
            <Text>685</Text>
          </View>
          <View style={[styles.cell, styles.cellBorder, { width: '20%' }]}>
            <Text></Text>
          </View>
          <View style={[styles.cell, { width: '50%' }]}>
            <Text>{contract.contractAmount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text>Видати {contract.fullName}</Text>
        <Text style={styles.underline}>
          (прізвище, власне ім'я, по батькові (за наявності))
        </Text>
      </View>

      <View style={styles.section}>
        <Text>Підстава: оплата за договором № {contract.contractNumber} від {new Date(contract.contractDate).toLocaleDateString('uk-UA')}</Text>
      </View>

      <View style={styles.section}>
        <Text>Сума {contract.contractAmount} грн. _____ коп.</Text>
        <Text style={styles.underline}>(словами)</Text>
      </View>

      <View style={styles.section}>
        <Text>Додатки: ____________________________________________________</Text>
      </View>

      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>Керівник</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>(підпис)</Text>
        </View>
        <View style={styles.signatureBlock}>
          <Text>Головний бухгалтер</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>(підпис)</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text>Одержав {contract.contractAmount} грн. _____ коп.</Text>
      </View>

      <View style={styles.section}>
        <Text>"{new Date(contract.contractDate).getDate()}" {new Date(contract.contractDate).toLocaleString('uk-UA', { month: 'long' })} {new Date(contract.contractDate).getFullYear()} року</Text>
      </View>

      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>Підпис одержувача</Text>
          <View style={styles.signatureLine} />
        </View>
        <View style={styles.signatureBlock}>
          <Text>За паспортом серії {contract.passportSeries} № {contract.passportNumber}</Text>
          <Text>виданим {contract.passportIssuedBy}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text>Видав касир</Text>
        <View style={styles.signatureLine} />
        <Text style={styles.signatureText}>(підпис)</Text>
      </View>

      <View style={styles.stamp}>
        <Text>М.П.</Text>
      </View>
    </Page>
  </Document>
);

export default CashOrderPDF; 