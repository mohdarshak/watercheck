import { useEffect, useState } from "react"

export default function PurityGridDashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const API_URL = "https://qsh6ornnqxfn4ryi77dsy3sxyi0cbrsb.lambda-url.eu-north-1.on.aws/?device_id=223"

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      const result = await res.json()
      setData(result.payload)
    } catch (err) {
      setError(err.message)
      console.error("Error fetching data:", err)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 5000) // Poll every 5s
    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <div className="p-4 text-red-500 font-bold">Error: {error}</div>
  }

  if (!data) {
    return <div className="p-4 text-gray-600">Loading data...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">💧 Purity Grid Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard label="Temperature (°C)" value={data.temprature} icon="🌡️" />
          <StatCard label="TDS (ppm)" value={data.tds} icon="🧪" />
          <StatCard label="pH Level" value={data.ph} icon="⚗️" />
          <StatCard label="Flow (L/min)" value={data.flow} icon="💧" />
          <StatCard label="Filter Health" value={`${data.filter_health}/10`} icon="🛡️" />
          <StatCard label="Last Updated" value={new Date(data.timestamp).toLocaleString()} icon="⏰" />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-300">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-bold text-blue-700">{value}</div>
    </div>
  )
}
