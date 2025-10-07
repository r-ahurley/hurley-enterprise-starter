// frontend/src/dashboard/TelemetryBoard.tsx
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TelemetryRecord {
  deviceId: string;
  timestamp: number;
  speed: number;
  battery: number;
}

export default function TelemetryBoard() {
  const [data, setData] = useState<TelemetryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTelemetry = async () => {
    try {
      const res = await fetch(
        "https://19ay6rk9gc.execute-api.us-east-1.amazonaws.com/prod/telemetry"
      );
      const json = await res.json();

      if (json && json.Items) {
        const formatted = json.Items.map((item: any) => ({
          deviceId: item.deviceId?.S || "unknown",
          timestamp: Number(item.timestamp?.N || 0),
          speed: Number(item.speed?.N || 0),
          battery: Number(item.battery?.N || 0),
        })).sort((a, b) => a.timestamp - b.timestamp);

        setData(formatted);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Error fetching telemetry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 8000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading telemetry…</p>;
  if (data.length === 0)
    return <p className="text-center mt-10 text-gray-400">No telemetry data available yet.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Hurley Enterprise Telemetry</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(t) => new Date(Number(t)).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="speed" stroke="#8884d8" name="Speed" />
          <Line type="monotone" dataKey="battery" stroke="#82ca9d" name="Battery" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

