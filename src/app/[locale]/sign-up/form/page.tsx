"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import FormInput from "@/components/FormInput/FormInput";
import PhoneNumberInput from "@/components/PhoneNumberInput/PhoneNumberInput";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import ErrorAlert from "@/components/CustomAlert/ErrorAlert";
import CustomButton from "@/components/CustomButton/CustomButton";
import { useBusinessSignUp } from "@/infrastructure/context/business-signup.context";
import { useRouter } from "next/navigation";
import z from "zod";

export default function SignUpView() {
  const tOwner = useTranslations("businessOwnerInfo");
  const tBusiness = useTranslations("businessInfo");
  const tTop = useTranslations("topBar");
  const locale = useLocale();
  const router = useRouter();
  const { setData, data } = useBusinessSignUp();

  // Owner state
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerStreetAddress, setOwnerStreetAddress] = useState("");
  const [ownerCountry, setOwnerCountry] = useState("");
  const [ownerCity, setOwnerCity] = useState("");

  // Business state
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessCountry, setBusinessCountry] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [crn, setCrn] = useState("");
  const [tin, setTin] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const formData = {
        name: businessName,
        email: businessEmail,
        phoneNumber: businessPhone,
        country: businessCountry,
        city: businessCity,
        commercialRegistraionNumber: Number(crn),
        taxIdentificationNumber: Number(tin),
        owner: {
          firstName: ownerFirstName,
          lastName: ownerLastName,
          phoneNumber: ownerPhone,
          email: ownerEmail,
          streetAddress: ownerStreetAddress,
          country: ownerCountry,
          city: ownerCity,
        },
      };

      console.log("form data:", formData);
      setData(formData);
      console.log("context data:", data);
      // router.push("/dashboard");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.issues[0]?.message ?? "Validation Error");
      } else {
        setError("Sign Up failed. Please try again.");
      }
    }
  };

  return (
    <section className={styles.formScreen}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <img src="/assets/Dark Themed Logo.svg" alt="" />
        <div className={styles.topBarItems}>
          <span>{tTop("helpCenter")}</span>
          <span>{tTop("login")}</span>
          <LanguageSwitcher />
        </div>
      </div>

      {/* FORM */}
      <form
        className={styles.form}
        dir={locale === "ar" ? "rtl" : "ltr"}
        onSubmit={handleSubmit}
      >
        {error && <ErrorAlert message={error} />}
        <div className={styles.formSections}>
          {/* Business Owner Information */}
          <div className={styles.formSection}>
            <h1>{tOwner("title")}</h1>
            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tOwner("firstName")}
                placeholder={tOwner("firstNamePlaceholder")}
                value={ownerFirstName}
                onChange={(e) => setOwnerFirstName(e.target.value)}
              />
              <FormInput
                className={styles.span5}
                label={tOwner("surname")}
                placeholder={tOwner("surnamePlaceholder")}
                value={ownerLastName}
                onChange={(e) => setOwnerLastName(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <PhoneNumberInput
                className={styles.span5}
                value={ownerPhone}
                onChange={(value: string) => setOwnerPhone(value)}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tOwner("email")}
                placeholder={tOwner("emailPlaceholder")}
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tOwner("streetAddress")}
                placeholder={tOwner("streetAddressPlaceholder")}
                value={ownerStreetAddress}
                onChange={(e) => setOwnerStreetAddress(e.target.value)}
              />
              <FormInput
                className={styles.span3}
                label={tOwner("country")}
                placeholder={tOwner("countryPlaceholder")}
                value={ownerCountry}
                onChange={(e) => setOwnerCountry(e.target.value)}
              />
              <FormInput
                className={styles.span2}
                label={tOwner("city")}
                placeholder={tOwner("cityPlaceholder")}
                value={ownerCity}
                onChange={(e) => setOwnerCity(e.target.value)}
              />
            </div>
          </div>

          <hr className={styles.separator} />

          {/* Business Information */}
          <div className={styles.formSection}>
            <h1>{tBusiness("title")}</h1>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tBusiness("businessName")}
                placeholder={tBusiness("businessNamePlaceholder")}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tBusiness("businessEmail")}
                placeholder={tBusiness("businessEmailPlaceholder")}
                value={businessEmail}
                onChange={(e) => setBusinessEmail(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <PhoneNumberInput
                className={styles.span5}
                value={businessPhone}
                onChange={(value: string) => setBusinessPhone(value)}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tOwner("streetAddress")}
                placeholder={tOwner("streetAddressPlaceholder")}
                value={ownerStreetAddress}
                onChange={(e) => setOwnerStreetAddress(e.target.value)}
              />
              <FormInput
                className={styles.span3}
                label={tBusiness("businessCountry")}
                placeholder={tBusiness("businessCountryPlaceholder")}
                value={businessCountry}
                onChange={(e) => setBusinessCountry(e.target.value)}
              />
              <FormInput
                className={styles.span2}
                label={tBusiness("businessCity")}
                placeholder={tBusiness("businessCityPlaceholder")}
                value={businessCity}
                onChange={(e) => setBusinessCity(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tBusiness("crn")}
                placeholder={tBusiness("crnPlaceholder")}
                value={crn}
                onChange={(e) => setCrn(e.target.value)}
              />
              <FormInput
                className={styles.span5}
                label={tBusiness("tin")}
                placeholder={tBusiness("tinPlaceholder")}
                value={tin}
                onChange={(e) => setTin(e.target.value)}
              />
            </div>
          </div>
        </div>
        <hr className={styles.separator} />
        <div className="mt-8 flex flex-col w-full items-center gap-4">
          <CustomButton type="submit" text="SUBMIT" />
        </div>
      </form>
    </section>
  );
}
