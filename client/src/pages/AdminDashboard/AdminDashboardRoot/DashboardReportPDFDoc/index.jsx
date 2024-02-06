import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import moment from "moment"
import DashboardReportProductSection from "./DashboardReportPdfSection"

const DashboardReportPDFDoc = () => {
  /** PDF Document Styling */
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
        <DashboardReportProductSection
          heading={"Product Information"}
          subHeading={"Product By Categories"}
          tableHeader={[
            { label: "Category", value: "category" },
            { label: "Count", value: "count" },
          ]}
          tableBody={[
            {
              category: "Electronics",
              count: 10000,
            },
            {
              category: "Food",
              count: 1200,
            },
            {
              category: "Clothes",
              count: 3000,
            },
          ]}
          tableSummaryText={"Total Amount: 1000"}
          growthInfoText={"8% increase since last month"}
        />
        <DashboardReportProductSection
          heading={"Customer Information"}
          subHeading={"Customers by Role"}
          tableHeader={[
            { label: "Role", value: "role" },
            { label: "Count", value: "count" },
          ]}
          tableBody={[
            {
              role: "User",
              count: 100,
            },
            {
              role: "Admin",
              count: 5,
            },
            {
              role: "Operator",
              count: 3,
            },
            {
              role: "Manager",
              count: 2,
            },
          ]}
          tableSummaryText={"Total Customers: 18,000"}
          growthInfoText={"1% increase since last month"}
        />
        <DashboardReportProductSection
          heading={"Transaction Information"}
          subHeading={"Transaction by Status"}
          tableHeader={[
            { label: "Status", value: "status" },
            { label: "Count", value: "count" },
          ]}
          tableBody={[
            {
              status: "Delivered",
              count: 10,
            },
            {
              status: "Processing",
              count: 40,
            },
            {
              status: "Failed",
              count: 3,
            },
            {
              status: "Returned",
              count: 1,
            },
          ]}
          tableSummaryText={"Total Transactions: 230"}
          growthInfoText={"2% increase since last month"}
          breakPage={true}
        />
        <DashboardReportProductSection
          heading={"Revenue Information"}
          subHeading={"Month wise Revenue"}
          tableHeader={[
            { label: "Month", value: "month" },
            { label: "Unit Sale", value: "unitSale" },
            { label: "Revenue", value: "revenue" },
          ]}
          tableBody={[
            {
              month: "Jan",
              unitSale: 12,
              revenue: 10,
            },
            {
              month: "Feb",
              unitSale: 23,
              revenue: 22,
            },
            {
              month: "Mar",
              unitSale: 34,
              revenue: 34,
            },
          ]}
          tableSummaryText={"Total Revenue: $1040000, Total Unit Sale: 440"}
          growthInfoText={"5% increase since last month"}
        />
      </Page>
    </Document>
  )
}

export default DashboardReportPDFDoc
