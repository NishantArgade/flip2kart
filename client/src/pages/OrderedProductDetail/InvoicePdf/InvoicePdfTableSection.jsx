/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from "@react-pdf/renderer"

/** PDF Document Styling */
const styles = StyleSheet.create({
  table: {
    width: "100%",
    marginTop: "15px",
    marginBottom: "15px",
    fontSize: "8px",
    border: "0.6px solid black",
  },

  header: {
    borderBottom: "none",
    color: "black",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
  },

  rowData: {
    width: "8%",
    paddingLeft: "10px",
    display: "flex",
    flexWrap: "wrap",
  },

  rowDataBig: {
    width: "25%",
    paddingLeft: "10px",
  },

  fontBold: {
    fontWeight: "bold",
  },

  borderBottom: {
    borderBottom: "0.6px solid black",
  },

  tableFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "0.6px solid black",
    padding: "8px 10px",
  },
})

const InvoicePdfTableSection = ({ tableHeader, tableBody }) => {
  return (
    <View style={styles.table}>
      <View
        style={[
          styles.row,
          styles.fontBold,
          styles.header,
          styles.borderBottom,
        ]}
      >
        {tableHeader?.map((header, i) => (
          <Text
            key={header.value + i}
            style={
              ["product", "description"].includes(header.value)
                ? styles.rowDataBig
                : styles.rowData
            }
          >
            {header.label}
          </Text>
        ))}
      </View>
      {tableBody?.map((row, i) => (
        <View key={i} style={styles.row} wrap={false}>
          {Object.entries(row)?.map(([key, value], i) =>
            tableHeader?.find((header) => header.value === key) ? (
              <Text
                key={i}
                style={
                  ["product", "description"].includes(key)
                    ? styles.rowDataBig
                    : styles.rowData
                }
              >
                {value}
              </Text>
            ) : null
          )}
        </View>
      ))}
      <View style={styles.tableFooter}>
        <Text style={styles.fontBold}>TOTAL QTY: 3</Text>
        <Text style={styles.fontBold}>TOTAL PRICE: 432.00</Text>
      </View>
    </View>
  )
}

export default InvoicePdfTableSection
