/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from "@react-pdf/renderer"

const TableSection = ({
  heading,
  subHeading,
  tableSummaryText,
  growthInfoText,
  tableHeader,
  tableBody,
  breakPage = undefined,
}) => {
  /** PDF Document Styling */
  const styles = StyleSheet.create({
    section: {
      fontSize: "10px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      paddingBottom: "30px",
      marginBottom: "40px",
      borderBottom: "1px solide #e3e3e3",
    },
    heading: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "12px",
    },
    subHeading: {
      fontSize: "12px",
      fontWeight: "semibold",
      color: "rgb(66, 66, 66)",
    },
    tatalCountText: {
      marginTop: "2px",
      fontSize: "12px",
      marginBottom: "8px",
      fontWeight: "normal",
    },
    totalAmountText: {
      fontWeight: "demibold",
    },
    infoText: {
      fontSize: "10px",
      color: "rgb(66, 66, 66)",
    },

    table: {
      width: "100%",
      marginTop: "15px",
      marginBottom: "15px",
    },
    header: {
      borderBottom: "none",
      backgroundColor: "rgba(99, 130, 129, 0.95)",
      color: "white",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderBottom: "0.9px solid #e3e3e3",
      paddingTop: 8,
      paddingBottom: 8,
      backgroundColor: "rgb(243, 250, 250)",
    },
    rowData: {
      width: "100%",
      paddingLeft: "5px",
    },

    bold: {
      fontWeight: "bold",
    },
  })

  return (
    <View style={styles.section} break={breakPage}>
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subHeading}>{subHeading}</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.bold, styles.header]}>
          {tableHeader?.map((header, i) => (
            <Text key={header.value + i} style={styles.rowData}>
              {header.label}
            </Text>
          ))}
        </View>
        {tableBody?.map((row, i) => (
          <View key={i} style={styles.row} wrap={false}>
            {Object.entries(row)?.map(([key, value], i) =>
              tableHeader?.find((header) => header.value === key) ? (
                <Text key={i} style={styles.rowData}>
                  {value}
                </Text>
              ) : null
            )}
          </View>
        ))}
      </View>
      <Text style={styles.tatalCountText}>{tableSummaryText}</Text>
      <Text style={styles.infoText}>{growthInfoText}</Text>
    </View>
  )
}

export default TableSection
