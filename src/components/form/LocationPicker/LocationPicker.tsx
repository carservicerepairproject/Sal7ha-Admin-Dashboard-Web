"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, X, Search } from "lucide-react";
import styles from "./LocationPicker.module.css";
import type { POI } from "./MapView";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

type LatLng = { lat: number; lng: number };

type SearchResult = {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  address?: Record<string, string>;
};

type Props = {
  span?: number;
  value?: string;
  placeholder?: string;
  onChange?: (location: { address: string; lat: number; lng: number }) => void;
};

export default function LocationPicker({
  span = 12,
  value = "",
  placeholder = "Select a location",
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(value);
  const [center, setCenter] = useState<LatLng>({ lat: 25.2048, lng: 55.2708 });
  const [flyTo, setFlyTo] = useState<LatLng | null>(null);
  const [tempAddress, setTempAddress] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [pois, setPois] = useState<POI[]>([]);
  const geocodeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await res.json();
      return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    } catch {
      return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    }
  }, []);

  // Get user location on first open
  const hasLocated = useRef(false);
  useEffect(() => {
    if (!isOpen || hasLocated.current) return;
    hasLocated.current = true;

    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCenter(latlng);
        setFlyTo({ ...latlng });
        const addr = await reverseGeocode(latlng.lat, latlng.lng);
        setTempAddress(addr);
      },
      () => {
        // Permission denied or error — keep default center
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  }, [isOpen, reverseGeocode]);

  const handleMapMove = useCallback(
    (latlng: LatLng) => {
      setCenter(latlng);
      if (geocodeTimer.current) clearTimeout(geocodeTimer.current);
      geocodeTimer.current = setTimeout(async () => {
        const addr = await reverseGeocode(latlng.lat, latlng.lng);
        setTempAddress(addr);
      }, 400);
    },
    [reverseGeocode]
  );

  const handleDragStart = useCallback(() => setIsDragging(true), []);
  const handleDragEnd = useCallback(() => setIsDragging(false), []);

  // Click on map => snap center to that point
  const handleMapClick = useCallback((latlng: LatLng) => {
    setFlyTo({ ...latlng });
  }, []);

  // Click on a POI => snap to it and show its name
  const handlePoiClick = useCallback((poi: POI) => {
    const latlng = { lat: poi.lat, lng: poi.lng };
    setFlyTo({ ...latlng });
    setTempAddress(poi.name);
  }, []);

  // Debounced search autocomplete
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      setSearchQuery(q);

      if (searchTimer.current) clearTimeout(searchTimer.current);

      if (!q.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      searchTimer.current = setTimeout(async () => {
        try {
          // Bias search to a wide area around the current map center
          const vbox = `${center.lng - 1},${center.lat - 1},${center.lng + 1},${center.lat + 1}`;
          const params = new URLSearchParams({
            format: "json",
            q,
            limit: "6",
            addressdetails: "1",
            viewbox: vbox,
            bounded: "0", // prefer but don't restrict to viewbox
          });
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?${params}`,
            { headers: { "Accept-Language": "en,ar" } }
          );
          const results: SearchResult[] = await res.json();
          setSuggestions(results);
          setShowSuggestions(results.length > 0);
        } catch {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      }, 300);
    },
    []
  );

  const handleSuggestionClick = useCallback((result: SearchResult) => {
    const latlng = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };
    setCenter(latlng);
    setFlyTo({ ...latlng });
    setTempAddress(result.display_name);
    setSearchQuery(result.display_name);
    setShowSuggestions(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (suggestions.length > 0) {
          handleSuggestionClick(suggestions[0]);
        }
      }
      if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    },
    [suggestions, handleSuggestionClick]
  );

  const handleConfirm = useCallback(() => {
    if (tempAddress) {
      setAddress(tempAddress);
      onChange?.({ address: tempAddress, lat: center.lat, lng: center.lng });
    }
    setIsOpen(false);
  }, [center, tempAddress, onChange]);

  const handlePoisLoaded = useCallback((newPois: POI[]) => {
    setPois(newPois);
  }, []);

  // Format suggestion text — show a shorter, cleaner version
  const formatSuggestion = (result: SearchResult) => {
    const parts = result.display_name.split(", ");
    const main = parts[0];
    const secondary = parts.slice(1, 3).join(", ");
    return { main, secondary };
  };

  return (
    <div className={`${styles.wrapper} ${styles[`span${span}`]}`}>
      <input
        type="text"
        className={styles.input}
        value={address}
        placeholder={placeholder}
        readOnly
        onClick={() => setIsOpen(true)}
      />
      <div className={styles.mapIcon} onClick={() => setIsOpen(true)}>
        <MapPin />
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={styles.mapContainer}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Full-bleed map */}
            <div className={styles.mapArea}>
              <MapView
                center={center}
                flyTo={flyTo}
                pois={pois}
                onMove={handleMapMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onMapClick={handleMapClick}
                onPoiClick={handlePoiClick}
                onPoisLoaded={handlePoisLoaded}
              />

              {/* Center pin — circle + line */}
              <div
                className={`${styles.centerPin} ${isDragging ? styles.centerPinLifted : ""}`}
              >
                <div className={styles.centerPinCircle}>
                  <div className={styles.centerPinInnerDot} />
                </div>
                <div className={styles.centerPinLine} />
              </div>
              <div className={`${styles.centerDot} ${isDragging ? styles.centerDotLifted : ""}`} />

              {/* Floating search bar with autocomplete */}
              <div className={styles.searchBar} ref={searchBarRef}>
                <div className={styles.searchIcon}>
                  <Search />
                </div>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search location"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                />
                {searchQuery && (
                  <button
                    className={styles.clearSearch}
                    onClick={() => {
                      setSearchQuery("");
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Suggestions dropdown */}
                {showSuggestions && (
                  <div className={styles.suggestionsDropdown}>
                    {suggestions.map((result) => {
                      const { main, secondary } = formatSuggestion(result);
                      return (
                        <div
                          key={result.place_id}
                          className={styles.suggestionItem}
                          onClick={() => handleSuggestionClick(result)}
                        >
                          <div className={styles.suggestionIcon}>
                            <MapPin size={14} />
                          </div>
                          <div className={styles.suggestionText}>
                            <span className={styles.suggestionMain}>
                              {main}
                            </span>
                            <span className={styles.suggestionSecondary}>
                              {secondary}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Floating close */}
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
              >
                <X />
              </button>
            </div>

            {/* Bottom panel */}
            <div className={styles.bottomPanel}>
              <div className={styles.locationInfo}>
                <span className={styles.locationLabel}>Selected location</span>
                {tempAddress ? (
                  <span className={styles.locationAddress}>{tempAddress}</span>
                ) : (
                  <span className={styles.locationPlaceholder}>
                    Move the map to choose
                  </span>
                )}
              </div>
              <button
                className={styles.confirmButton}
                onClick={handleConfirm}
                disabled={!tempAddress}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
