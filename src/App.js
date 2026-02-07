import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Form from "./Components/Form";
import DataList from "./Components/DataList";

const getInitialData = () => {
  try {
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

function App() {
  const [data, setData] = useState(getInitialData);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("userData", JSON.stringify(data));
    }
  }, [data]);

  const addData = (newData) => {
    setData((prev) => [...prev, newData]);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "user_data.xlsx");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>User Management</h1>
            <p style={styles.subtitle}>
              Data is stored locally and persists after refresh
            </p>
          </div>

          <button style={styles.primaryBtn} onClick={() => setShowForm(true)}>
            + Add New
          </button>
        </div>

        {data.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No data available</p>
          </div>
        ) : (
          <>
            <DataList data={data} />
            <button style={styles.secondaryBtn} onClick={downloadExcel}>
              Download Excel
            </button>
          </>
        )}
      </div>

      {showForm && (
        <Form onAdd={addData} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: 40,
    fontFamily: "Inter, Arial, sans-serif"
  },
  card: {
    maxWidth: 900,
    margin: "auto",
    background: "#ffffff",
    borderRadius: 14,
    padding: 30,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  },
  title: {
    margin: 0,
    fontSize: 26
  },
  subtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: 14
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600
  },
  secondaryBtn: {
    marginTop: 20,
    background: "#0f172a",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 500
  },
  emptyState: {
    textAlign: "center",
    padding: 40,
    color: "#475569"
  }
};

export default App;
