"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./bookings.module.css";
import { HiOutlineTableCells } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { FaSortAmountDown } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { CgExport } from "react-icons/cg";
import { RiSearch2Line } from "react-icons/ri";
import { BsKanban } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import TableView from "@/components/bookings/TableView/TableView";
import ListView from "@/components/bookings/ListView/ListView";

interface Booking {
  id: string;
  serviceName: string;
  serviceIcon: string;
  carType: string;
  startDate: string;
  endDate: string;
  status: string;
}

const VIEW_OPTIONS = [
  { label: "Table View", icon: <HiOutlineTableCells /> },
  { label: "Kanban View", icon: <BsKanban /> },
  { label: "List View", icon: <FaListUl /> },
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

  for (let i = 1; i <= 10; i++) {
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
      carType: carType,
      startDate: `${startDay} ${startDayNum}`,
      endDate: `${endDay} ${endDayNum}`,
      status: status,
    });
  }

  return bookings;
};

export default function BookingsView() {
  const [showStats, setShowStats] = useState(false);
  const [bookings] = useState<Booking[]>(generateMockData());
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);
  const [selectedView, setSelectedView] = useState(VIEW_OPTIONS[0]);
  const viewSwitcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        viewSwitcherRef.current &&
        !viewSwitcherRef.current.contains(e.target as Node)
      ) {
        setViewDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          {/* View Switcher Dropdown */}
          <div className={styles.viewSwitcherWrapper} ref={viewSwitcherRef}>
            <div
              className={styles.viewSwitcher}
              onClick={() => setViewDropdownOpen((prev) => !prev)}
            >
              {selectedView.icon}
              <span>{selectedView.label}</span>
              <IoIosArrowDown
                className={`${styles.viewArrow} ${viewDropdownOpen ? styles.viewArrowOpen : ""}`}
              />
            </div>

            {viewDropdownOpen && (
              <div className={styles.viewDropdown}>
                {VIEW_OPTIONS.map((option) => (
                  <div
                    key={option.label}
                    className={`${styles.viewDropdownItem} ${
                      selectedView.label === option.label
                        ? styles.viewDropdownItemActive
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedView(option);
                      setViewDropdownOpen(false);
                    }}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.separator} />
          <div className={styles.actionButton}>
            <FiFilter />
            <span>Filter</span>
          </div>
          <div className={styles.actionButton}>
            <FaSortAmountDown />
            <span>Sort</span>
          </div>
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

      {/* View Content */}
      {renderView()}
    </div>
  );
}
