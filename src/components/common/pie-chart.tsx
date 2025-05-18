import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

const COLORS = ["#02369C", "#CC1010"];
export default function PieCharts({
  correctValue,
  wrongValue,
  totalValue  
}: {
  correctValue: number;
  wrongValue: number;
  totalValue?: string
}) {
  const data = [
    { name: "Correct", value: correctValue },
    { name: "In correct", value: wrongValue },
  ];


  return (
    <PieChart width={300} height={170}>
      <Pie
        data={data}
        cx={120}
        cy={80}
        innerRadius={70}
        outerRadius={80}
        fill="#000"
        paddingAngle={20}
        dataKey="value"
        cornerRadius={45}
      >
      {totalValue && 
        <Label value={totalValue} position="center" className="text-dark-900" />
      }
        
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
