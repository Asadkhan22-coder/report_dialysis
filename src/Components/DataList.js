import React from "react";
import { FIELDS } from "../constants/fields";

const DataList = ({ data }) => {
  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Sr No</th>
            {FIELDS.map(f => (
              <th key={f.key} style={styles.th}>{f.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={i % 2 ? styles.altRow : null}>
              <td style={styles.td}>{i + 1}</td>
              {FIELDS.map(f => (
                <td key={f.key} style={styles.td}>{row[f.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: {
    overflowX: "auto",
    marginTop: 20,
    border: "1px solid #e5e7eb",
    borderRadius: 8
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    minWidth: 1800,
    fontSize: 12
  },
  th: {
    padding: 10,
    background: "#f1f5f9",
    borderBottom: "1px solid #d1d5db",
    whiteSpace: "nowrap",
    textAlign: "left",
    fontWeight: 600
  },
  td: {
    padding: 10,
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap"
  },
  altRow: {
    background: "#fafafa"
  }
};

export default DataList;
