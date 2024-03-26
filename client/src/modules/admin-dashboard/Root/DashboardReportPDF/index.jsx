import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import moment from "moment"
import TableSection from "./TableSection"
import { useMemo } from "react"

const DashboardReportPDF = ({ data, revenueInfo }) => {
  /** PDF Document Styling */
  console.log(revenueInfo)

  const style = StyleSheet.create({
    pageHeadingContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "10px",
      margin: "20px",
    },
    pageHeadingTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "2px",
    },
    pageHeadingSubTitle: {
      fontSize: "14px",
      fontWeight: "semibold",
      color: "rgb(119, 119, 119)",
    },
    pageHeadingDownloadTime: {
      marginTop: "2px",
      fontSize: "10px",
      marginBottom: "15px",
      fontWeight: "normal",
      color: "rgb(119, 119, 119)",
      textAlign: "right",
    },
    hLine: {
      width: "100%",
      height: "1px",
      backgroundColor: "#e3e3e3",
      margin: "10px 0 20px 0",
    },
  })

  // const productData = data?.productData?.productsWithCount.map((item) => ({
  //   category: item._id,
  //   count: item.count,
  // }))
  // const userData = data?.userData?.usersWithCount.map((item) => ({
  //   category: item._id,
  //   count: item.count,
  // }))
  // console.log(userData)

  const unitSold = useMemo(
    () => revenueInfo?.reduce((acc, item) => acc + item.totalQty, 0),
    [revenueInfo]
  )
  console.log(unitSold)
  return (
    <Document>
      <Page
        size={"A4"}
        style={{ marginTop: "20px", marginBottom: "20px", padding: "20px" }}
      >
        <View style={style.pageHeadingContainer}>
          <Text style={style.pageHeadingTitle}>Dashboard Report</Text>
          <Text style={style.pageHeadingSubTitle}>
            Overview of all sections data
          </Text>
        </View>

        <Text style={style.pageHeadingDownloadTime}>
          {moment().format("YYYY/MM/DD hh:mm:ss")}
        </Text>
        <Text style={style.hLine}></Text>
        {/* Sections */}
        <TableSection
          heading={"PRODUCT INFORMATION"}
          subHeading={"Products by category"}
          tableHeader={[
            { label: "Product Category", value: "_id" },
            { label: "No. of Products", value: "count" },
          ]}
          tableBody={data?.productData?.productsWithCount}
          tableSummaryText={`Total number of products: ${data?.productData?.totalProductsCount}`}
        />
        <TableSection
          heading={"CUSTOMER INFORMATION"}
          subHeading={"Customers by role"}
          tableHeader={[
            { label: "Customer Role", value: "_id" },
            { label: "Customer Count", value: "count" },
          ]}
          tableBody={data?.userData?.usersWithCount}
          tableSummaryText={`Total number of customers: ${data?.userData?.totalUsersCount}`}
        />
        <TableSection
          heading={"TRANSACTION INFORMATION"}
          subHeading={"Transactions by status"}
          tableHeader={[
            { label: "Transaction Status", value: "status" },
            { label: "No. of Transaction", value: "count" },
            { label: "Amount", value: "totalPrice" },
          ]}
          tableBody={data?.ordersData?.data?.orders}
          tableSummaryText={`Total number of transactions: ${data?.ordersData?.totalOrderCount} and total amount: $${data?.ordersData?.data?.totalOrderPrice.toLocaleString("en-In")}`}
          breakPage={true}
        />
        <TableSection
          heading={"REVENUE INFORMATION"}
          subHeading={"Current year month wise revenue"}
          tableHeader={[
            { label: "Month", value: "month" },
            { label: "Revenue", value: "totalPrice" },
            { label: "No. of unit Sold", value: "totalQty" },
          ]}
          tableBody={revenueInfo}
          tableSummaryText={`Total revenue: $${data?.totalRevenue?.totalRevenue.toLocaleString("en-In")} and total number of unit sold: ${unitSold}`}
        />
      </Page>
    </Document>
  )
}

export default DashboardReportPDF
