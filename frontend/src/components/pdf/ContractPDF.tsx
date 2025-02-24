import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ContractInterface } from '../../types/contract';

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 1.5,
  },
  signatures: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBlock: {
    width: '45%',
  },
  signatureLine: {
    borderTop: '1px solid black',
    marginTop: 30,
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
      <View style={styles.header}>
        <Text style={styles.title}>
          ДОГОВІР № {contract.contractNumber}
          {'\n'}про надання послуг
        </Text>
        <Text style={styles.subtitle}>
          м. Рівне {new Date(contract.contractDate).toLocaleDateString('uk-UA')}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Товариство з обмеженою відповідальністю "Назва Компанії", в особі директора ПІБ,
          що діє на підставі Статуту (далі - Замовник), з однієї сторони, та
          {contract.fullName}, паспорт серії {contract.passportSeries} № {contract.passportNumber},
          виданий {contract.passportIssuedBy} {new Date(contract.passportIssueDate).toLocaleDateString('uk-UA')},
          що проживає за адресою: _______________, реєстраційний номер облікової картки платника податків {contract.taxId}
          (далі - Виконавець), з іншої сторони, разом іменовані "Сторони", уклали цей договір про наступне:
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. ПРЕДМЕТ ДОГОВОРУ</Text>
        <Text style={styles.paragraph}>
          1.1. Замовник доручає, а Виконавець бере на себе зобов'язання надати послуги {contract.contractContent}, 
          а Замовник зобов'язується прийняти та оплатити такі послуги.
        </Text>
        <Text style={styles.paragraph}>
          1.2. Виконавець надає послуги особисто.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. ПРАВА ТА ОБОВ'ЯЗКИ СТОРІН</Text>
        <Text style={styles.paragraph}>
          2.1. Виконавець зобов'язується:
          {'\n'}- надавати послуги якісно та в строк;
          {'\n'}- дотримуватися конфіденційності інформації, отриманої під час виконання цього договору;
          {'\n'}- своєчасно повідомляти Замовника про неможливість надання послуг.
        </Text>
        <Text style={styles.paragraph}>
          2.2. Замовник зобов'язується:
          {'\n'}- своєчасно оплачувати послуги Виконавця;
          {'\n'}- надавати необхідну інформацію та матеріали для надання послуг;
          {'\n'}- прийняти надані послуги за актом приймання-передачі.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. ВАРТІСТЬ ПОСЛУГ ТА ПОРЯДОК РОЗРАХУНКІВ</Text>
        <Text style={styles.paragraph}>
          3.1. Вартість послуг за цим договором становить {contract.contractAmount} грн.
        </Text>
        <Text style={styles.paragraph}>
          3.2. Оплата здійснюється шляхом безготівкового перерахування коштів на рахунок Виконавця.
        </Text>
        <Text style={styles.paragraph}>
          3.3. Оплата здійснюється в такому порядку:
          {'\n'}- 50% від суми договору - протягом 5 банківських днів після підписання договору;
          {'\n'}- 50% від суми договору - протягом 5 банківських днів після підписання акту приймання-передачі наданих послуг.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. СТРОК ДІЇ ДОГОВОРУ</Text>
        <Text style={styles.paragraph}>
          4.1. Договір набирає чинності з моменту його підписання та діє до {new Date(contract.contractEndDate).toLocaleDateString('uk-UA')}.
        </Text>
        <Text style={styles.paragraph}>
          4.2. Дія договору може бути продовжена за взаємною згодою Сторін шляхом укладення додаткової угоди.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. ВІДПОВІДАЛЬНІСТЬ СТОРІН</Text>
        <Text style={styles.paragraph}>
          5.1. За невиконання або неналежне виконання зобов'язань за цим договором Сторони несуть відповідальність згідно з чинним законодавством України.
        </Text>
        <Text style={styles.paragraph}>
          5.2. У разі порушення строків надання послуг Виконавець сплачує Замовнику пеню у розмірі 0,1% від суми договору за кожен день прострочення.
        </Text>
        <Text style={styles.paragraph}>
          5.3. У разі порушення строків оплати Замовник сплачує Виконавцю пеню у розмірі 0,1% від несплаченої суми за кожен день прострочення.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. ФОРС-МАЖОРНІ ОБСТАВИНИ</Text>
        <Text style={styles.paragraph}>
          6.1. Сторони звільняються від відповідальності за невиконання або неналежне виконання зобов'язань за цим договором у разі виникнення форс-мажорних обставин.
        </Text>
        <Text style={styles.paragraph}>
          6.2. Під форс-мажорними обставинами розуміються: війна, воєнні дії, блокада, ембарго, міжнародні санкції, пожежа, стихійні лиха, акти органів державної влади та інші обставини непереборної сили.
        </Text>
        <Text style={styles.paragraph}>
          6.3. Сторона, для якої виникли форс-мажорні обставини, зобов'язана протягом 3 днів повідомити іншу Сторону про їх виникнення.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. ВИРІШЕННЯ СПОРІВ</Text>
        <Text style={styles.paragraph}>
          7.1. Усі спори, що виникають з цього договору або пов'язані з ним, вирішуються шляхом переговорів між Сторонами.
        </Text>
        <Text style={styles.paragraph}>
          7.2. Якщо відповідний спір неможливо вирішити шляхом переговорів, він вирішується в судовому порядку.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. ІНШІ УМОВИ</Text>
        <Text style={styles.paragraph}>
          8.1. Цей договір складено у двох примірниках, по одному для кожної із Сторін, що мають однакову юридичну силу.
        </Text>
        <Text style={styles.paragraph}>
          8.2. Зміни і доповнення до цього договору вносяться за взаємною згодою Сторін шляхом укладення додаткових угод.
        </Text>
      </View>

      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>ЗАМОВНИК:</Text>
          <Text>ТОВ "Назва Компанії"</Text>
          <Text>ЄДРПОУ: xxxxxxxxxx</Text>
          <Text>Адреса: м. Рівне, вул. ______</Text>
          <Text>р/р: UA________________</Text>
          <Text>Тел.: ______________</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>підпис / М.П.</Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text>ВИКОНАВЕЦЬ:</Text>
          <Text>{contract.fullName}</Text>
          <Text>ІПН: {contract.taxId}</Text>
          <Text>Паспорт: {contract.passportSeries} {contract.passportNumber}</Text>
          <Text>Адреса: _______________</Text>
          <Text>Тел.: ______________</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>підпис</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ContractPDF;