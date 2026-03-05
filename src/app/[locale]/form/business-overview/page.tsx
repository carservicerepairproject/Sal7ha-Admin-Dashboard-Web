"use client";

import React, { useState } from "react";
import FormRow from "@/components/form/FormRow/FormRow";
import Field from "@/components/form/Field/Field";
import SelectField from "../../../../components/form/SelectField/SelectField";
import TextareaField from "@/components/form/TextareaField/TextareaField";
import ChoiceList from "@/components/form/ChoiceList/ChoiceList";
import ChoiceBox from "../../../../components/form/ChoiceBox/ChoiceBox";
import { FaUser, FaUsers } from "react-icons/fa";
import styles from "./BusinessOverview.module.css";
import FormButton from "../../../../components/form/FormButton/FormButton";

export default function BusinessOverviewView() {
  const [businessType, setBusinessType] = useState("service");
  const [numberOfEmployees, setNumberOfEmployees] = useState("store");

  return (
    <section className={styles.level}>
      <h1>About your business</h1>

      <div className={styles.content}>
        {/* Business Name Row */}
        <FormRow label="Your business name">
          <Field span={12} type="text" placeholder="Text Input" />
        </FormRow>
        {/* Description Textarea Row */}
        <FormRow label="Description of business conducted">
          <TextareaField span={12} placeholder="Describe your business..." />
        </FormRow>

        {/* Business Type Choice List Row */}
        <FormRow label="Business type">
          <ChoiceList
            span={12}
            name="type"
            value={businessType}
            onChange={setBusinessType}
            options={[
              { value: "a", label: "Option A" },
              { value: "b", label: "Option B" },
              { value: "c", label: "Option C" },
            ]}
          />
        </FormRow>

        {/*  */}
        <FormRow label="Number Of Employees" layout="horizontal">
          <ChoiceBox
            value={numberOfEmployees}
            onChange={setNumberOfEmployees}
            options={[
              { value: "1-10", label: "1-10", icon: <FaUser size={20} /> },
              { value: "11-20", label: "11-20", icon: <FaUsers size={20} /> },
              {
                value: "20+",
                label: "20+",
                icon: <FaUsers size={20} />,
              },
            ]}
          />
        </FormRow>

        {/* Business Address Row */}
        <FormRow label="Business Address">
          {/* row 1 */}
          <SelectField span={12} defaultValue="">
            <option value="" disabled>
              Select Country
            </option>
            <option value="eg">Egypt</option>
            <option value="us">United States</option>
          </SelectField>
          {/* row 2 */}
          <Field span={12} type="text" placeholder="Address line 1" />

          {/* row 3 */}
          <Field span={12} type="text" placeholder="Address line 2" />

          {/* row 4: City / State / Zip */}
          <Field span={6} type="text" placeholder="City" />
          <Field span={3} type="text" placeholder="State" />
          <Field span={3} type="text" placeholder="Zip code" />
        </FormRow>
      </div>
      <div className={styles.separator} />
      <div className={styles.centerWrapper}>
        <FormButton></FormButton>
      </div>
    </section>
  );
}
