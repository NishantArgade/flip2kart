import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import InvoicePdfTableSection from "./InvoicePdfTableSection"
import moment from "moment"
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
    rowGap: "2px",
    marginBottom: "10px",
    padding: "2px 4px 10px 4px",

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

const generateGSTIN = () =>
  `${Math.floor(10 + Math.random() * 90)}${Array.from({ length: 10 }, () => String.fromCharCode(65 + Math.random() * 26)).join("")}${Math.floor(1000 + Math.random() * 9000)}Z${Math.floor(1 + Math.random() * 9)}`

const InvoicePDF = ({ data }) => {
  return (
    <Document>
      <Page size={"A4"} style={style.page}>
        {/** Header */}
        <Text style={style.creditNote}>Tax Invoice</Text>

        {/** Payment Detail */}
        <View style={style.addressesContainer}>
          <View style={style.addressesSection}>
            <Text>
              Order Id: <Text style={style.fontBold}>{data?.order?._id}</Text>
            </Text>
            <Text>
              Order Date:{" "}
              {moment(data?.order?.created_at).format("DD-MM-YYYY, hh:mm A")}
            </Text>
          </View>
          <View style={[style.hBorder, style.addressesSection]}>
            <Text>
              Invoice No:{" "}
              <Text style={style.fontBold}>
                invoice#
                {moment().format("YYYYMMDDHHmm")}
              </Text>
            </Text>
            <Text>Invoice Date: {moment().format("DD-MM-YYYY, hh:mm A")}</Text>
          </View>
          <View style={style.addressesSection}>
            <Text> GSTIN: {generateGSTIN()}</Text>
          </View>
        </View>

        {/** Payment Address Details */}
        <View style={style.paymentAddressDetailContainer}>
          <View style={style.paymentAddressDetailSec}>
            <Text style={style.fontBold}>Sold By</Text>
            <Text>
              {data?.product?.seller}, {data?.product?.seller_address}
            </Text>
          </View>

          <View style={style.paymentAddressDetailSec}>
            <Text style={style.fontBold}>Shipping ADDRESS</Text>
            <Text>{data?.order?.shipping_to_user}</Text>
            <Text>
              {data?.order?.shipping_address}, Phone:{" "}
              {data?.order?.shipping_user_phone}
            </Text>
          </View>
          <View style={style.paymentAddressDetailSec}>
            <Text style={style.fontBold}>Billing Address</Text>
            <Text>{data?.order?.billing_user}</Text>
            <Text>
              {data?.order?.shipping_address}, Phone:{" "}
              {data?.order?.shipping_user_phone}
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
            { label: "Total", value: "total" },
          ]}
          tableBody={[
            {
              product: data?.product?.name,
              description: data?.product?.description,
              qty: data?.product?.quantity,
              gross: data?.product?.price * data?.product?.quantity,
              discount: `- ${data?.product?.discount * data?.product?.quantity}`,
              total:
                (data?.product?.price - data?.product?.discount) *
                data?.product?.quantity,
            },
            {
              product: " ",
              description: "Shipping and Handling Charges",
              qty: data?.product?.quantity,
              gross: data?.order?.shipping_charges,
              discount: 0,
              total: data?.order?.shipping_charges * data?.product?.quantity,
            },
            {
              product: " ",
              description: "Packging Charges",
              qty: data?.product?.quantity,
              gross: data?.order?.packing_charges,
              discount: 0,
              total: data?.order?.packing_charges,
            },
          ]}
          data={data}
        />

        {/** Seller Info */}
        <View style={style.sellerInfoContainer}>
          <Text style={style.fontBold}>Seller Registered Address:</Text>
          <Text>
            {data?.product?.seller}, {data?.product?.seller_address}
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
            <Text style={style.orderThroughName}>Flip2kart</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default InvoicePDF
