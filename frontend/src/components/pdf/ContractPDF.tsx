import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ContractInterface } from '../../types/contract';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    width: 200,
  },
  value: {
    fontFamily: 'Roboto',
    flex: 1,
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  signatures: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLine: {
    borderTop: '1px solid black',
    marginTop: 40,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center',
  }
});

interface ContractPDFProps {
  contract: ContractInterface;
}

const ContractPDF: React.FC<ContractPDFProps> = ({ contract }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>ДОГОВІР ПІДРЯДУ № {contract.contractNumber}</Text>
        <Text style={styles.subtitle}>
          м. Рівне {new Date(contract.contractDate).toLocaleDateString('uk-UA')}
        </Text>
      </View>

      {/* Parties Information */}
      <View style={styles.section}>
        <Text style={styles.content}>
          Товариство з обмеженою відповідальністю "Назва Компанії", в особі директора ПІБ,
          що діє на підставі Статуту (далі - Замовник), з однієї сторони, та
        </Text>
        <Text style={styles.content}>
          {contract.fullName}, паспорт серії {contract.passportSeries} № {contract.passportNumber},
          виданий {contract.passportIssuedBy} {new Date(contract.passportIssueDate).toLocaleDateString('uk-UA')},
          що проживає за адресою: _______________, реєстраційний номер облікової картки платника податків {contract.taxId}
          (далі - Виконавець), з іншої сторони, уклали цей договір про наступне:
        </Text>
      </View>

      {/* Contract Content */}
      <View style={styles.section}>
        <Text style={styles.content}>
          {contract.contractContent}
        </Text>
      </View>

      {/* Contract Amount */}
      <View style={styles.section}>
        <Text style={styles.content}>
          Вартість робіт за цим договором становить {contract.contractAmount} грн.
        </Text>
      </View>

      {/* Contract Period */}
      <View style={styles.section}>
        <Text style={styles.content}>
          Термін дії договору: з {new Date(contract.contractDate).toLocaleDateString('uk-UA')} 
          по {new Date(contract.contractEndDate).toLocaleDateString('uk-UA')}.
        </Text>
      </View>

      {/* Signatures */}
      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>ЗАМОВНИК:</Text>
          <Text>ТОВ "Назва Компанії"</Text>
          <Text>ЄДРПОУ: xxxxxxxxxx</Text>
          <Text>Адреса: м. Рівне, вул. ______</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>підпис</Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text>ВИКОНАВЕЦЬ:</Text>
          <Text>{contract.fullName}</Text>
          <Text>ІПН: {contract.taxId}</Text>
          <Text>Паспорт: {contract.passportSeries} {contract.passportNumber}</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>підпис</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ContractPDF;