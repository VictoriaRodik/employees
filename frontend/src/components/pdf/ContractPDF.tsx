import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ContractInterface } from "../../types/contract";
import { moneyToWords } from "../../utils/numberToWords";

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
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    textAlign: "justify",
    lineHeight: 1.25,
  },
  decoratedText: {
    fontWeight: "bold",
  },
  signatures: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  signatureBlock: {
    width: "45%",
  },
  signatureSign: {
    marginTop: 30,
    fontSize: 10,
    textAlign: "right",
  },
  signatureLine: {
    borderTop: "1px solid black",
    marginTop: 2,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    textAlign: "center",
  },
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
          {"\n"}про надання послуг
        </Text>
        <View style={styles.subtitle}>
          <Text>м. Рівне</Text>
          <Text>
            "{new Date(contract.contractDate).getDate()}"{" "}
            {new Date(contract.contractDate).toLocaleString("uk-UA", {
              month: "long",
            })}{" "}
            {new Date(contract.contractDate).getFullYear()} року
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          Комунальний заклад "Рівненська обласна філармонія" Рівненської
          обласної ради, в особі директора{" "}
          <Text style={styles.decoratedText}>
            Стеценко Елеонори Анатоліївни
          </Text>
          , що діє на підставі Статуту (надалі - Замовник), з однієї сторони, та
          громадянин(ка){" "}
          <Text style={styles.decoratedText}>{contract.fullName}</Text>, (надалі
          - Виконавець), з другої сторони, разом іменовані Сторони, уклали цей
          договір (надалі - Договір) про наступне:
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. ПРЕДМЕТ ДОГОВОРУ</Text>
        <Text style={styles.paragraph}>
          1.1. Замовник доручає, а Виконавець бере на себе зобов'язання надати
          послуги {contract.contractContent}.
        </Text>
        <Text style={styles.paragraph}>
          1.2. Замовник зобов'язується своєчасно прийняти та оплатити такі
          послуги.
        </Text>
        <Text style={styles.paragraph}>
          1.3. Виконавець надає послуги особисто.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. РОЗМІР ТА ПОРЯДОК ОПЛАТИ</Text>
        <Text style={styles.paragraph}>
          2.1. За надану послугу Замовник сплачує Виконавцеві винагороду у
          розмірі{" "}
          <Text style={styles.decoratedText}>
            {(Number(contract.contractAmount) / 0.77).toFixed(2)} грн.{" "}
          </Text>
          (
          {moneyToWords(
            Number((Number(contract.contractAmount) / 0.77).toFixed(2))
          )}
          ).
        </Text>
        <Text style={styles.paragraph}>
          2.2. Виплата винагороди Виконавцеві Замовником здійснюється не пізніше
          20 банківських днів після підписання Акта приймання отриманих послуг.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. ВІДПОВІДАЛЬНІСТЬ СТОРІН</Text>
        <Text style={styles.paragraph}>
          3.1. Сторони несуть матеріальну відповідальність за невиконання або
          неналежне виконання покладених на них зобов'язань за цією угодою
          ідповідно до чинного законодавсиа України.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. ДОСТРОКОВЕ РОЗІРВАННЯ УГОДИ</Text>
        <Text style={styles.paragraph}>
          4.1. Угоду може бути розірвано за погодженням Сторін.
        </Text>
        <Text style={styles.paragraph}>
          4.2. У разі порушення однією із Сторін зобов'язань за угодою інша
          Сторона може розірвати угоду в одностронньому порядку.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. ІНШІ УМОВИ</Text>
        <Text style={styles.paragraph}>
          5.1. У випадку змін податкового законодавства, яке впливає на розмір
          винагороди, її сума може бути переглянута за взаємною згодою сторін.
        </Text>
        <Text style={styles.paragraph}>
          5.2. Цивільно-правову угоду укладено в двох примірниках по одному
          екземпляру для Замовника і Виконавця, кожен з яких має однакову
          юридичну силу.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. ВІДПОВІДАЛЬНІСТЬ СТОРІН</Text>
        <Text style={styles.paragraph}>
          5.1. За невиконання або неналежне виконання зобов'язань за цим
          договором Сторони несуть відповідальність згідно з чинним
          законодавством України.
        </Text>
        <Text style={styles.paragraph}>
          5.2. У разі порушення строків надання послуг Виконавець сплачує
          Замовнику пеню у розмірі 0,1% від суми договору за кожен день
          прострочення.
        </Text>
        <Text style={styles.paragraph}>
          5.3. У разі порушення строків оплати Замовник сплачує Виконавцю пеню у
          розмірі 0,1% від несплаченої суми за кожен день прострочення.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. ПОРЯДОК ВИРІШЕННЯ СПОРІВ</Text>
        <Text style={styles.paragraph}>
          6.1. Усі спори, що виникають з цього договору або пов'язані з ним,
          вирішуються у порядку, встановленому законодавством України.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. СТРОК ДІЇ ДОГОВОРУ</Text>
        <Text style={styles.paragraph}>
          7.1. Термін дії Договору з{" "}
          {new Date(contract.contractDate).toLocaleDateString("uk-UA")} по
          {new Date(contract.contractEndDate).toLocaleDateString("uk-UA")}.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          8. ЮРИДИЧНІ АДРЕСИ ТА БАНКІВСЬКІ РЕКВІЗИТИ СТОРІН
        </Text>
        <View style={styles.signatures}>
          <View style={styles.signatureBlock}>
            <Text>ЗАМОВНИК:</Text>
            <Text>КЗ "Рівненська обласна філармонія" РОР</Text>
            <Text>ЄДРПОУ: 02225683</Text>
            <Text>Адреса: м. Рівне, вул. Драгоманова,20</Text>
            <Text>р/р: UA</Text>
            <Text>Банк: КБ "Укрсиббанк"</Text>
            <Text> </Text>
            {contract.address ? <Text> </Text> : <Text></Text>}
            <Text style={styles.signatureSign}>Елеонора СТЕЦЕНКО</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>підпис / М.П.</Text>
          </View>

          <View style={styles.signatureBlock}>
            <Text>ВИКОНАВЕЦЬ:</Text>
            <Text>{contract.fullName}</Text>
            <Text>ІПН: {contract.taxId}</Text>
            <Text>
              {contract.passportSeries ? (
                <Text>Паспорт серії {contract.passportSeries}</Text>
              ) : (
                <Text>ID-картка</Text>
              )}{" "}
              № {contract.passportNumber}
            </Text>
            <Text>
              Дата видачі:{" "}
              {new Date(contract.passportIssueDate).toLocaleDateString("uk-UA")}
            </Text>
            <Text>Орган, що видав: {contract.passportIssuedBy}</Text>
            <Text>
              {contract.passportSeries ? <Text></Text> : <Text> </Text>}
            </Text>
            {contract.address ? (
              <Text>Адреса: {contract.address}</Text>
            ) : (
              <Text> </Text>
            )}
            <Text style={styles.signatureSign}> </Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>підпис, прізвище</Text>
          </View>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Акт приймання-передачі послуг № {contract.contractNumber}
          {"\n"}згідно цивільно-правової угоди № {contract.contractNumber} від{" "}
          {new Date(contract.contractEndDate).toLocaleDateString("uk-UA")}
        </Text>
        <View style={styles.subtitle}></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          {" "}
          Замовник Комунальний заклад "Рівненська обласна філармонія"
          Рівненської обласної ради, в особі директора{" "}
          <Text style={styles.decoratedText}>
            Стеценко Елеонори Анатоліївни
          </Text>
          , що діє на підставі Статуту, з однієї сторони, та Виконавець{" "}
          <Text style={styles.decoratedText}>{contract.fullName}</Text>, з
          другої сторони, уклали цей акт приймання-передачі послуг про наступне:
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.paragraph}>
          1. Виконавець передає, а Замовник приймає наступні послуги{" "}
          {contract.contractContent}.
        </Text>
        <Text style={styles.paragraph}>
          1.1. Дата складання акту приймання-передачі послуг{" "}
          {new Date(contract.contractEndDate).toLocaleDateString("uk-UA")}.
        </Text>
        <Text style={styles.paragraph}>
          1.2. Загальна сума послуг складає:{" "}
          <Text style={styles.decoratedText}>
            {(Number(contract.contractAmount) / 0.77).toFixed(2)} грн.{" "}
          </Text>
          (
          {moneyToWords(
            Number((Number(contract.contractAmount) / 0.77).toFixed(2))
          )}
          ).
        </Text>
        <Text style={styles.paragraph}>
          1.3. Підписанням даного Акту Сторони підтверджують факт належного
          надання послуг Виконавцем відповідно до положення Договору.
        </Text>
        <Text style={styles.paragraph}>
          1.4. Замовник не має претензій до Виконавцястосовно наданих послуг,
          вказаних у п. 1 цього Акту..
        </Text>
      </View>

      <View style={styles.signatures}>
        <View style={styles.signatureBlock}>
          <Text>ЗАМОВНИК:</Text>
          <Text>КЗ "Рівненська обласна філармонія" РОР</Text>
          <Text>ЄДРПОУ: 02225683</Text>
          <Text>Адреса: м. Рівне, вул. Драгоманова,20</Text>
          <Text>р/р: UA</Text>
          <Text>Банк: КБ "Укрсиббанк"</Text>
          <Text> </Text>
          {contract.address ? <Text> </Text> : <Text></Text>}
          <Text style={styles.signatureSign}>Елеонора СТЕЦЕНКО</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>підпис / М.П.</Text>
        </View>

        <View style={styles.signatureBlock}>
          <Text>ВИКОНАВЕЦЬ:</Text>
          <Text>{contract.fullName}</Text>
          <Text>ІПН: {contract.taxId}</Text>
          <Text>
            {contract.passportSeries ? (
              <Text>Паспорт серії {contract.passportSeries}</Text>
            ) : (
              <Text>ID-картка</Text>
            )}{" "}
            № {contract.passportNumber}
          </Text>
          <Text>
            Дата видачі:{" "}
            {new Date(contract.passportIssueDate).toLocaleDateString("uk-UA")}
          </Text>
          <Text>Орган, що видав: {contract.passportIssuedBy}</Text>
          <Text>
            {contract.passportSeries ? <Text></Text> : <Text> </Text>}
          </Text>
          {contract.address ? (
            <Text>Адреса: {contract.address}</Text>
          ) : (
            <Text> </Text>
          )}
          <Text style={styles.signatureSign}> </Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>підпис, прізвище</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ContractPDF;
