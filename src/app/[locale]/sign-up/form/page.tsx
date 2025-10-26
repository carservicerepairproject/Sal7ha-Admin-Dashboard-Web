"use client";

import React from "react";
import styles from "./page.module.css";
import FormInput from "@/components/FormInput/FormInput";
import PhoneNumberInput from "@/components/PhoneNumberInput/PhoneNumberInput";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";

export default function SignUpView() {
  const tOwner = useTranslations("businessOwnerInfo");
  const tBusiness = useTranslations("businessInfo");
  const tTop = useTranslations("topBar");
  const locale = useLocale();

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
      <div className={styles.form} dir={locale === "ar" ? "rtl" : "ltr"}>
        <div className={styles.topDesign}></div>
        <div className={styles.formSections}>
          {/* Business Owner Information */}
          <div className={styles.formSection}>
            <h1>{tOwner("title")}</h1>
            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tOwner("firstName")}
                placeholder={tOwner("firstNamePlaceholder")}
              />
              <FormInput
                className={styles.span5}
                label={tOwner("surname")}
                placeholder={tOwner("surnamePlaceholder")}
              />
            </div>

            <div className={styles.formRow}>
              <PhoneNumberInput className={styles.span5} />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tOwner("email")}
                placeholder={tOwner("emailPlaceholder")}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tOwner("streetAddress")}
                placeholder={tOwner("streetAddressPlaceholder")}
              />
              <FormInput
                className={styles.span3}
                label={tOwner("country")}
                placeholder={tOwner("countryPlaceholder")}
              />
              <FormInput
                className={styles.span2}
                label={tOwner("city")}
                placeholder={tOwner("cityPlaceholder")}
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
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tBusiness("businessEmail")}
                placeholder={tBusiness("businessEmailPlaceholder")}
              />
            </div>

            <div className={styles.formRow}>
              <PhoneNumberInput className={styles.span5} />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tBusiness("businessStreetAddress")}
                placeholder={tBusiness("businessStreetAddressPlaceholder")}
              />
              <FormInput
                className={styles.span3}
                label={tBusiness("businessCountry")}
                placeholder={tBusiness("businessCountryPlaceholder")}
              />
              <FormInput
                className={styles.span2}
                label={tBusiness("businessCity")}
                placeholder={tBusiness("businessCityPlaceholder")}
              />
            </div>

            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                label={tBusiness("crn")}
                placeholder={tBusiness("crnPlaceholder")}
              />
              <FormInput
                className={styles.span5}
                label={tBusiness("tin")}
                placeholder={tBusiness("tinPlaceholder")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
