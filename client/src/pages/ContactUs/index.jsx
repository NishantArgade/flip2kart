import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import ContactForm from "./ContactForm";
import Map from "./Map";

const ContactUs = () => {
  return (
    <div className="container mx-auto bg-white mt-2 mb-4 rounded-sm shadow-md ">
      {/** Office Locations */}
      <div className="flex flex-col items-center justify-center gap-2 p-1">
        {/** Office Locations Map */}
        <Map />
        {/** Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
