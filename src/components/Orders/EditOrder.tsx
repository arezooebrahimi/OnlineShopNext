import React, { useState } from "react";
import toast from "react-hot-toast";

const EditOrder = ({ order, toggleModal }: any) => {
  const [currentStatus, setCurrentStatus] = useState(order?.status);
  const handleChanege = (e: any) => {
    setCurrentStatus(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!currentStatus) {
      toast.error("Please select a status");
      return;
    }

    toggleModal(false);
  };

  return (
    <div className="w-full px-10">
      <p className="pb-2 font-medium text-dark">وضعیت سفارش</p>
      <div className="w-full">
        <select
          className="w-full rounded-[10px] border border-gray-3 bg-gray-1 text-dark py-3.5 px-5 text-custom-sm"
          name="status"
          id="status"
          required
          onChange={handleChanege}
        >
          <option value="processing">در حال پردازش</option>
          <option value="on-hold">در انتظار</option>
          <option value="delivered">تحویل داده شده</option>
          <option value="cancelled">لغو شده</option>
        </select>

        <button
          className="mt-5 w-full rounded-[10px] border border-blue-1 bg-blue-1 text-white py-3.5 px-5 text-custom-sm bg-blue"
          onClick={handleSubmit}
        >
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
};

export default EditOrder;
