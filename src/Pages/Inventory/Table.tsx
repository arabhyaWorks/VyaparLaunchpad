import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Text from "../../Bhasini/Text";

interface InventoryItem {
  name: string;
  status: string;
  availableQuantity: string;
  price: string;
  discountPrice: string;
  ean: string;
  netWeight: string;
  unit: string;
}

const TourPackageTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([
    {
      name: "Product 1",
      status: "Active",
      availableQuantity: "10",
      price: " 200",
      discountPrice: "180",
      ean: "123456789",
      netWeight: "1kg",
      unit: "1",
    },
    {
      name: "Product 2",
      availableQuantity: "20",
      price: "300",
      discountPrice: "280",
      ean: "123456789",
      netWeight: "2kg",
      unit: "2",
      status: "Inactive",
    },
    {
      name: "Product 3",
      availableQuantity: "30",
      price: "400",
      discountPrice: "380",
      ean: "123456789",
      netWeight: "3kg",
      status: "Active",
      unit: "3",
    },
  ]);

  const navigate = useNavigate();

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventoryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "inventory_data.xlsx");
  };

  return (
    <div className="rounded-xl border border-stroke bg-[white] px-2 pt-6 pb-2 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-5 xl:pb-1 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-bold mb-0">
          <Text>Inventory Products Details</Text>
        </h2>
        <div className="flex">
          <button onClick={exportToExcel} style={styles.downloadButton}>
            <Text>Download Data</Text>
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="w-full h-auto table-auto">
          <thead>
            <tr className="border-b border-t border-[#CFD3D5] text-left">
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>S.No.</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>Status</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>Name</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>Available Quantity</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>Price</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>Discount Price</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>EAN / Barcode No.</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>Net Weight</Text>
              </th>
              <th className="py-4 text-sm font-bold text-black text-center">
                <Text>Unit</Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {inventoryData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-[#F1F2F4]"
                style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                onClick={() => {}}
              >
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{index.toString() + "1."}</Text>
                  </h5>
                </td>
                <td className="p-3 text-center">
                  <p
                    className="text-[0.875rem] font-semibold"
                    style={{
                      color: "#003406",
                      backgroundColor:
                        item.status === "Active" ? "#c9ffc4" : "#ffdddd",
                      borderRadius: 5,
                      borderColor:
                        item.status === "Active" ? "#56ff50" : "#ff9494",
                      borderWidth: 1.5,
                      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)",
                      padding: "4px 8px",
                    }}
                  >
                    <Text>{item.status}</Text>
                  </p>
                </td>
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{item.name}</Text>
                  </h5>
                </td>
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{item.availableQuantity}</Text>
                  </h5>
                </td>
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{"₹" + item.price}</Text>
                  </h5>
                </td>
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{item.discountPrice}</Text>
                  </h5>
                </td>
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{item.ean}</Text>
                  </h5>
                </td>
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{item.netWeight}</Text>
                  </h5>
                </td>
                <td className="p-3 text-center">
                  <h5 className="text-[0.95rem] text-base text-[#6E7079] font-poppins">
                    <Text>{item.unit}</Text>
                  </h5>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourPackageTable;

const styles = {
  downloadButton: {
    boxShadow: "inset 0px 1px 0px 0px #e184f3",
    background: "linear-gradient(to bottom, #c123de 5%, #a20dbd 100%)",
    backgroundColor: "#c123de",
    borderRadius: "6px",
    border: "1px solid #a511c0",
    display: "inline-block",
    cursor: "pointer",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "bold",
    padding: "6px 24px",
    textDecoration: "none",
    textShadow: "0px 1px 0px #9b14b3",
    margin: "0 0 0 10px",
  },
};
