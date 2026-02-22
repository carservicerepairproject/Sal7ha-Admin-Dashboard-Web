"use client";

import React, { useState } from "react";
import styles from "./bookings.module.css";
import { HiOutlineTableCells } from "react-icons/hi2";
import { FaSortAmountDown } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { CgExport } from "react-icons/cg";
import { RiSearch2Line } from "react-icons/ri";
import { BsKanban } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { FaSortAlphaDown } from "react-icons/fa";
import TableView from "@/components/bookings/TableView/TableView";
import ListView from "@/components/bookings/ListView/ListView";
import DropdownButton from "@/components/common/DropdownButton/DropdownButton";
import { DropdownOption } from "@/components/common/DropdownButton/DropdownButton";
import OverlayBookingDetails from "@/components/bookings/OverlayBookingDetails/OverlayBookingDetails";

interface Booking {
  id: string;
  serviceName: string;
  serviceIcon: string;
  carType: string;
  startDate: string;
  endDate: string;
  status: string;
}

const VIEW_OPTIONS: DropdownOption[] = [
  { label: "Table View", icon: <HiOutlineTableCells /> },
  { label: "Kanban View", icon: <BsKanban /> },
  { label: "List View", icon: <FaListUl /> },
];

const FILTER_OPTIONS: DropdownOption[] = [
  { label: "Alphabetically", icon: <FaSortAlphaDown /> },
];

const SORT_OPTIONS: DropdownOption[] = [
  { label: "Ascending", icon: <FaSortAmountDown /> },
];

const generateMockData = (): Booking[] => {
  const services = [
    {
      name: "Engine Diagnostics & Checkup",
      icon: "/assets/engine_service.svg",
    },
    {
      name: "Oil Change & Filter Replacement",
      icon: "/assets/engine_service.svg",
    },
    { name: "Brake Inspection & Repair", icon: "/assets/engine_service.svg" },
    { name: "Tire Rotation & Alignment", icon: "/assets/engine_service.svg" },
    { name: "AC System Service", icon: "/assets/engine_service.svg" },
    { name: "Battery Check & Replacement", icon: "/assets/engine_service.svg" },
    { name: "Transmission Service", icon: "/assets/engine_service.svg" },
  ];

  const carTypes = [
    "Nissan",
    "Toyota",
    "Honda",
    "BMW",
    "Mercedes",
    "Audi",
    "Ford",
  ];
  const statuses = ["In-Progress", "Completed", "Pending", "Cancelled"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const bookings: Booking[] = [];

  for (let i = 1; i <= 25; i++) {
    const service = services[Math.floor(Math.random() * services.length)];
    const carType = carTypes[Math.floor(Math.random() * carTypes.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const startDay = days[Math.floor(Math.random() * days.length)];
    const endDay = days[Math.floor(Math.random() * days.length)];
    const startDayNum = Math.floor(Math.random() * 28) + 1;
    const endDayNum = startDayNum + Math.floor(Math.random() * 3) + 1;

    bookings.push({
      id: Math.random().toString(36).substring(2, 8).toUpperCase(),
      serviceName: service.name,
      serviceIcon: service.icon,
      carType,
      startDate: `${startDay} ${startDayNum}`,
      endDate: `${endDay} ${endDayNum}`,
      status,
    });
  }

  return bookings;
};

export default function BookingsView() {
  const [showStats, setShowStats] = useState(false);
  const [bookings] = useState<Booking[]>(generateMockData());
  const [selectedView, setSelectedView] = useState<DropdownOption>(
    VIEW_OPTIONS[0],
  );
  const [selectedFilter, setSelectedFilter] = useState<DropdownOption>(
    FILTER_OPTIONS[0],
  );
  const [selectedSort, setSelectedSort] = useState<DropdownOption>(
    SORT_OPTIONS[0],
  );

  const renderView = () => {
    switch (selectedView.label) {
      case "Table View":
        return <TableView bookings={bookings} />;
      case "List View":
        return <ListView bookings={bookings} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.tools}>
        <div className={styles.toolsLeft}>
          <DropdownButton
            options={VIEW_OPTIONS}
            selected={selectedView}
            onSelect={setSelectedView}
          />
          <div className={styles.separator} />
          <DropdownButton
            options={FILTER_OPTIONS}
            selected={selectedFilter}
            onSelect={setSelectedFilter}
            fixedLabel="Filter"
            fixedIcon={<FiFilter />}
          />
          <DropdownButton
            options={SORT_OPTIONS}
            selected={selectedSort}
            onSelect={setSelectedSort}
            fixedLabel="Sort"
            fixedIcon={<FaSortAmountDown />}
          />
          <div className={styles.separator} />
          <div
            className={styles.showStats}
            onClick={() => setShowStats(!showStats)}
          >
            <span>Show Statistics</span>
            <div className={styles.toggle}>
              <div
                className={`${styles.toggleCircle} ${showStats ? styles.toggleActive : ""}`}
              />
            </div>
          </div>
        </div>

        <div className={styles.toolsRight}>
          <div className={styles.searchBar}>
            <RiSearch2Line />
            <input type="text" placeholder="Search For A Client" />
          </div>
          <div className={styles.separator} />
          <div className={styles.actionButton}>
            <CgExport />
            <span>Export</span>
          </div>
        </div>
      </div>
      {renderView()}
    </div>
  );
}
