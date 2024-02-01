import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Chatboat from "./Chatboat";

const ChatSupport = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 container mx-auto">
      {/** Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-x-2 py-2 px-1 text-gray-500 "
      >
        <IoMdArrowRoundBack />
        <p className="text-xs">Back</p>
      </button>
      <div className="bg-white shadow-md  ">
        <div className="text-md pb-4 flex items-center justify-start gap-x-4 pt-4 px-2 border border-b-4">
          <img
            src="/flipkart-icon.svg"
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <span>Flip2kart Support</span>
        </div>

        <div className="h-96 bg-green-40 p-2 bg-green-200">
          <Chatboat />
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
