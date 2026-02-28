import React, { useState } from "react";
import styles from "./TableView.module.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import SelectionToolBar from "../SelectionToolBar/SelectionToolBar";
import {
  InProgressComponent,
  PendingComponent,
  CanceledComponent,
  CompletedComponent,
} from "@/components/common/StatusComponent/StatusComponent";
import OverlayBookingDetails from "../OverlayBookingDetails/OverlayBookingDetails";
import Booking from "@/domain/entities/Booking";
import { Columns } from "lucide-react";
import ColumnSelectionBar from "../ColumnSelectionBar/ColumnSelectionBar";

const renderStatusComponent = (status: string) => {
  switch (status) {
    case "In-Progress":
      return <InProgressComponent />;
    case "Pending":
      return <PendingComponent />;
    case "Cancelled":
      return <CanceledComponent />;
    case "Completed":
      return <CompletedComponent />;
    default:
      return <span>{status}</span>;
  }
};

interface TableViewProps {
  bookings: Booking[];
}

export default function TableView({ bookings }: TableViewProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedBookings, setSelectedBookings] = useState<Set<string>>(
    new Set(),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [goToPageInput, setGoToPageInput] = useState("");
  const [openBooking, setOpenBooking] = useState<Booking | null>(null);

  const totalItems = bookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  const handleSelectAll = () => {
    if (isChecked) {
      setSelectedBookings(new Set());
    } else {
      setSelectedBookings(new Set(currentBookings.map((b) => b.id)));
    }
    setIsChecked(!isChecked);
  };

  const handleSelectBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedBookings);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedBookings(newSelected);
    setIsChecked(newSelected.size === currentBookings.length);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  const handleGoToPage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = parseInt(goToPageInput);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        setGoToPageInput("");
      }
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      {openBooking && (
        <OverlayBookingDetails
          booking={openBooking}
          onClose={() => setOpenBooking(null)}
        />
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.idColumn}>
                <input
                  className={styles.checkBox}
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleSelectAll}
                />
                ID
              </th>
              <th>Service Name</th>
              <th>Car Owner</th>
              <th>Car Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th className={styles.addColumn}>+</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr
                key={booking.id}
                className={`${styles.clickableRow} ${selectedBookings.has(booking.id) ? styles.isSelected : ""}`}
                onClick={() => setOpenBooking(booking)}
              >
                <td>
                  <div className={styles.idColumn}>
                    <input
                      className={styles.checkBox}
                      type="checkbox"
                      checked={selectedBookings.has(booking.id)}
                      onChange={() => {}}
                      onClick={(e) => handleSelectBooking(booking.id, e)}
                    />
                    {booking.id}
                  </div>
                </td>
                <td>
                  <div className={styles.services}>
                    <div className={styles.serviceName}>
                      <img src={booking.serviceIcon} alt="" />
                      <p>{booking.serviceName}</p>
                    </div>
                  </div>
                </td>
                <td>{booking.name}</td>
                <td>{booking.carType}</td>
                <td>{booking.startDate}</td>
                <td>{booking.endDate}</td>
                <td>{renderStatusComponent(booking.status)}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ColumnSelectionBar></ColumnSelectionBar>
      <SelectionToolBar
        selectedCount={selectedBookings.size}
        onClearSelection={() => {
          setSelectedBookings(new Set());
          setIsChecked(false);
        }}
        onDelete={() => console.log("Delete", [...selectedBookings])}
        onChangeStatus={(status) =>
          console.log("Change to", status, [...selectedBookings])
        }
      />

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={styles.chooseNumber}>
          <span>Showing per page</span>
          <input
            type="number"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            min="1"
          />
        </div>
        <div className={styles.pageNumbers}>
          <div className={styles.icon} onClick={goToFirstPage}>
            <MdKeyboardDoubleArrowLeft />
          </div>
          <div className={styles.icon} onClick={goToPreviousPage}>
            <MdKeyboardArrowLeft />
          </div>
          {getPageNumbers().map((page, index) => (
            <div
              key={index}
              className={`${styles.pageNumber} ${page === currentPage ? styles.activePage : ""} ${page === "..." ? styles.dots : ""}`}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
            >
              {page}
            </div>
          ))}
          <div className={styles.icon} onClick={goToNextPage}>
            <MdKeyboardArrowRight />
          </div>
          <div className={styles.icon} onClick={goToLastPage}>
            <MdKeyboardDoubleArrowRight />
          </div>
        </div>
        <div className={styles.chooseNumber}>
          <span>Go To Page</span>
          <input
            type="number"
            value={goToPageInput}
            onChange={(e) => setGoToPageInput(e.target.value)}
            onKeyDown={handleGoToPage}
            placeholder={`1-${totalPages}`}
            min="1"
            max={totalPages}
          />
        </div>
      </div>
    </>
  );
}
