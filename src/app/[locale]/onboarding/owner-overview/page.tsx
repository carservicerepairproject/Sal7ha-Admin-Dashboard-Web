"use client";

import React, { useState } from "react";
import FormRow from "@/components/form/FormRow/FormRow";
import Field from "@/components/form/Field/Field";
import SelectField from "../../../../components/form/SelectField/SelectField";
import ChoiceBox from "../../../../components/form/ChoiceBox/ChoiceBox";
import { IoMale, IoFemaleSharp } from "react-icons/io5";

import styles from "./OwnerOverview.module.css";
import FormButton from "../../../../components/form/FormButton/FormButton";
import { getNextHref } from "../steps";
import { useRouter } from "next/navigation";

export default function OwnerOverviewView() {
  const [businessType, setBusinessType] = useState("service");
  const [numberOfEmployees, setNumberOfEmployees] = useState("store");
  const router = useRouter();

  return (
    <section className={styles.level}>
      <h1>About Owner</h1>

      <div className={styles.content}>
        {/* First Name Row */}
        <FormRow label="First name">
          <Field span={12} type="text" placeholder="Ex: John" />
        </FormRow>
        {/* Last Name Row */}
        <FormRow label="Last name">
          <Field span={12} type="text" placeholder="Ex: Doe" />
        </FormRow>
        {/* Personal Email Row */}
        <FormRow label="Personal email">
          <Field span={12} type="text" placeholder="Ex: example@gmail.com" />
        </FormRow>

        {/*  Gender*/}
        <FormRow label="Gender" layout="horizontal">
          <ChoiceBox
            value={numberOfEmployees}
            onChange={setNumberOfEmployees}
            options={[
              { value: "Male", label: "Male", icon: <IoMale size={20} /> },
              {
                value: "Female",
                label: "Female",
                icon: <IoFemaleSharp size={20} />,
              },
            ]}
          />
        </FormRow>

        {/* Personal Address Row */}
        <FormRow label="Personal Address">
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
        <FormButton
          onClick={() =>
            router.push(getNextHref("/onboarding/owner-overview"))
          }
        ></FormButton>
      </div>
    </section>
  );
}
