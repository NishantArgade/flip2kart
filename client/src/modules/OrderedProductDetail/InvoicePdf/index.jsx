import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import InvoicePdfTableSection from "./InvoicePdfTableSection"
// import PaymentDetails from "./InvoicePdfSection"

/** PDF Document Styling */
const style = StyleSheet.create({
  page: {
    marginTop: "10px",
    marginBottom: "10px",
    padding: "10px",
    fontSize: "10px",
    fontFamily: "Open Sans",
  },

  creditNote: {
    fontSize: "12px",
    textAlign: "center",
    marginBottom: "10px",
    fontWeight: 700,
  },

  addressesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  addressesSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    rowGap: "4px",
    marginBottom: "10px",
    padding: "10px",
    borderBottom: "1px solid rgb(230, 230, 230)",
  },

  hBorder: {
    borderLeft: "1px solid rgb(230, 230, 230)",
    borderRight: "1px solid rgb(230, 230, 230)",
  },

  fontBold: { fontWeight: 700 },

  paymentAddressDetailContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "10px",
    padding: "10px",
    gap: "10px",
  },

  paymentAddressDetailSec: {
    width: "30%",
    fontSize: "10px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: "4px",
  },

  sellerInfoContainer: {
    fontSize: "8px",
    padding: "0 8px",
  },

  orderThroughSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "10px",
    margin: "40px 0",
    padding: "0 8px",
    fontSize: "10px",
  },

  orderThroughName: {
    fontSize: "11px",
  },

  logo: {
    width: "60px",
  },
})

const InvoicePDF = () => {
  return (
    <Document>
      <Page size={"A4"} style={style.page}>
        {/** Header */}
        <Text style={style.creditNote}>Tax Invoice</Text>

        {/** Payment Detail */}
        <View style={style.addressesContainer}>
          <View style={style.addressesSection}>
            <Text>
              Order Id: <Text style={style.fontBold}>OD429468363371391100</Text>
            </Text>
            <Text>Order Date: 21-10-2023, 12:28 AM</Text>
          </View>
          <View style={[style.hBorder, style.addressesSection]}>
            <Text>
              Invoice No: <Text style={style.fontBold}>FAKOJ82400009919</Text>
            </Text>
            <Text>Invoice Date: 21-10-2023, 06:44 AM</Text>
          </View>
          <View style={style.addressesSection}>
            <Text> GSTIN: 36ABBCS9028B1ZI</Text>
            <Text> PAN: ABBCS9028B</Text>
          </View>
        </View>

        {/** Payment Address Details */}
        <View style={style.paymentAddressDetailContainer}>
          <View style={style.paymentAddressDetailSec}>
            <Text style={style.fontBold}>Sold By</Text>
            <Text>
              SRI SAMBRAMA 99 HEALTH CARE, 1-6-46 3a indira nagar colony, ,
              RANGAREDDY - 500060{" "}
            </Text>
          </View>

          <View style={style.paymentAddressDetailSec}>
            <Text style={style.fontBold}>Shipping ADDRESS</Text>
            <Text>Nishant Vilas Argade</Text>
            <Text>
              Office No: 520, Amanora chamber, Hadapsar, Amanora Mall, Amanora
              chamber. Pune 411028 Maharashtra Phone: xxxxxxxxxx
            </Text>
          </View>
          <View style={style.paymentAddressDetailSec}>
            <Text style={style.fontBold}>Billing Address</Text>
            <Text>Nishant Vilas Argade</Text>
            <Text>
              Office No: 520, Amanora chamber, Hadapsar, Amanora Mall, Amanora
              chamber. Pune 411028 Maharashtra Phone: xxxxxxxxxx
            </Text>
          </View>
        </View>

        {/** Payment Amount Calculation Table */}
        <InvoicePdfTableSection
          tableHeader={[
            { label: "Product", value: "product" },
            { label: "Description ", value: "description" },
            { label: "Qty", value: "qty" },
            { label: "Gross Amount", value: "gross" },
            { label: "Discount", value: "discount" },
            { label: "Taxable Value", value: "taxable" },
            { label: "IGST", value: "igst" },
            { label: "Total", value: "total" },
          ]}
          tableBody={[
            {
              product:
                "ALLEN A84 Lipoma Drops 30 | allen lipoma 1 | IMEI/SrNo: [[]] HSN: 3004 | IGST: 12%",
              description: "HSN: 3004 | IGST: 12%",
              qty: 3,
              gross: 432.0,
              discount: -0.0,
              taxable: 385.71,
              igst: 46.29,
              total: 432.0,
            },
            {
              product: " ",
              description: "Shipping and Handling Charges",
              qty: 3,
              gross: 0.0,
              discount: 0,
              taxable: 0.0,
              igst: 0.0,
              total: 0.0,
            },
          ]}
        />

        {/** Seller Info */}
        <View style={style.sellerInfoContainer}>
          <Text style={style.fontBold}>Seller Registered Address:</Text>
          <Text>
            SRI SAMBRAMA 99 HEALTH CARE, SRI SAMBRAMA 99 HEALTH CARE,
            Saroornagar, Hyderabad - 500060. Declaration
          </Text>
          <Text style={style.fontBold}>Declaration</Text>
          <Text>
            The goods sold are intended for end user consumption and not for
            resale.
          </Text>
        </View>

        {/** Order Thorough Section */}
        <View style={style.orderThroughSection}>
          <Image style={style.logo} src={"/flipkart-logo.png"} />
          <View>
            <Text>Ordered Through</Text>
            <Text style={style.orderThroughName}>
              SRI SAMBRAMA 99 HEALTH CARE
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default InvoicePDF
