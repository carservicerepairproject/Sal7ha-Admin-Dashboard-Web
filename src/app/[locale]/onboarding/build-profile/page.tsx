"use client";

import React, { useState } from "react";
import FormRow from "@/components/form/FormRow/FormRow";
import Field from "@/components/form/Field/Field";
import SelectField from "../../../../components/form/SelectField/SelectField";
import TextareaField from "@/components/form/TextareaField/TextareaField";
import ChoiceList from "@/components/form/ChoiceList/ChoiceList";
import ChoiceBox from "../../../../components/form/ChoiceBox/ChoiceBox";
import { FaUser, FaUsers } from "react-icons/fa";
import styles from "./BuildProfile.module.css";
import FormButton from "../../../../components/form/FormButton/FormButton";
import { useRouter } from "next/navigation";
import { getNextHref } from "../steps";
import LocationPicker from "@/components/form/LocationPicker/LocationPicker";

export default function BuildProfileView() {
  const [businessType, setBusinessType] = useState("service");
  const [numberOfEmployees, setNumberOfEmployees] = useState("store");
  const router = useRouter();

  return (
    <section className={styles.level}>
      <h1>Build your business</h1>

      <div className={styles.content}>
        {/* Business Name Row */}
        <FormRow label="Your business name">
          <Field span={12} type="text" placeholder="Text Input" />
        </FormRow>
        <FormRow label="">
          <LocationPicker></LocationPicker>
        </FormRow>
      </div>
    </section>
  );
}
