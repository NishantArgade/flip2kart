import { IoMdArrowRoundBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import Chatboat from "./Chatboat"

const ChatSupport = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto mb-6">
      {/** Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 px-1 py-2 text-gray-500 "
      >
        <IoMdArrowRoundBack />
        <p className="text-xs">Back</p>
      </button>

      <div className="bg-white shadow-md  ">
        {/** Chat Support Heading */}
        <div className="text-md flex items-center justify-start gap-x-4 border border-b-4 px-2 pb-4 pt-4">
          <img
            src="/flipkart-icon.svg"
            className="h-8 w-8 rounded-full"
            alt=""
          />
          <span>Flip2kart Support</span>
        </div>

        {/** Chatboat */}
        <section className="bg-green-40 h-96 bg-green-200 p-2">
          <Chatboat />
        </section>
      </div>
    </div>
  )
}

export default ChatSupport
