import { Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const SpotlightStep = ({ nextStep, prevStep }) => {
  const form = useForm({
    initialValues: {
      SpotlightTitle: "",
      SpotlightDescription: "",
    },

    validate: {
      SpotlightTitle: (value) => {
        if (!value) return "this field is required";
      },
      SpotlightDescription: (value) => {
        if (!value) return "this field is required";
      },
    },
  });

  const elements = [
    {
      desc: "24 hrs service",
    },
    {
      desc: "25 hrs service",
    },
    {
      desc: "26 hrs service",
    },
    {
      desc: "27 hrs service",
    },
    {
      desc: "28 hrs service",
    },
  ];

  return (
    <form
      onSubmit={form.onSubmit(console.log)}
      className="mt-3 flex flex-col text-sm"
    >
      <div className="grid grid-cols-2 gap-5">
        <TextInput
          withAsterisk
          label="Title"
          placeholder="eg. Service"
          {...form.getInputProps("SpotlightTitle")}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="eg. Cash on delivery"
          {...form.getInputProps("SpotlightDescription")}
        />
      </div>

      <div className="self-end ">
        <div className="p-2 bg-blue-500 w-fit rounded-md mt-4  text-white shadow-md cursor-pointer">
          <IoMdAddCircle size={20} />
        </div>
      </div>

      <div className="">
        <p className="font-semibold border-b-2 py-2 mt-4">Preview</p>
        <div className="md:h-fit overflow-auto thin-scrollbar">
          {[1, 2].map((i) => (
            <div key={i} className=" border-b py-2">
              <div className="flex items-center gap-x-2 ">
                <p className="py-2 text-gray-800 font-semibold">Service</p>
                <MdDelete size={18} className="cursor-pointer text-gray-400" />
              </div>

              <Table horizontalSpacing={"xs"}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Desc</Table.Th>
                    <Table.Th>Remove</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {elements.map((element) => (
                    <Table.Tr className="text-gray-800" key={element.desc}>
                      <Table.Td>{element.desc}</Table.Td>
                      <Table.Td>
                        <RxCross2 className=" cursor-pointer" />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          ))}
        </div>
      </div>

      <div className="self-end py-4 flex items-center gap-4 float-end">
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="bg-white px-4 py-2 text-gray-500 border-[1.5px] text-sm font-semibold shadow-md rounded-sm "
            onClick={nextStep}
          >
            Skip
          </button>
        </div>
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 text-white text-sm font-semibold shadow-md rounded-sm "
            onClick={prevStep}
          >
            Previous
          </button>
        </div>
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 text-white text-sm font-semibold shadow-md rounded-sm "
            onClick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default SpotlightStep;
