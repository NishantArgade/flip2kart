import ContactForm from "./ContactForm"
import Map from "./Map"

const ContactUs = () => {
  return (
    <div className="container mx-auto mb-4 mt-2 rounded-sm bg-white shadow-md ">
      {/** Office Locations */}
      <div className="flex flex-col items-center justify-center gap-2 p-1">
        {/** Office Locations Map */}
        <Map />
        {/** Contact Form */}
        <ContactForm />
      </div>
    </div>
  )
}

export default ContactUs
