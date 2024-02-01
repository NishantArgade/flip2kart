import { Table, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const SpecificationStep = ({ nextStep, prevStep }) => {
  const form = useForm({
    initialValues: {
      specificationCategory: "",
      specificationTitle: "",
      specificationDescription: "",
    },

    validate: {
      specificationCategory: (value) => {
        if (!value) return "this field is required";
      },
      specificationTitle: (value) => {
        if (!value) return "this field is required";
      },
      specificationDescription: (value) => {
        if (!value) return "this field is required";
      },
    },
  });
  const elements = [
    {
      title: "General",
      category:
        "Lorem10 asdfsdf Desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, at?",
    },

    {
      title: "General1",
      category:
        "Lorem10 asdfsdf Desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, at?",
    },

    {
      title: "General2",
      category:
        "Lorem10 asdfsdf Desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, at?",
    },

    {
      title: "General3",
      category:
        "Lorem10 asdfsdf Desc Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, at?",
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
          label="Category"
          placeholder="eg. General"
          className="col-span-2"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Title"
          placeholder="eg. Display"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="eg. FHD Display"
          {...form.getInputProps("name")}
        />
      </div>

      <div className="self-end ">
        <div className="p-2 bg-blue-500 w-fit rounded-md mt-4  text-white shadow-md cursor-pointer">
          <IoMdAddCircle size={20} />
        </div>
      </div>
      <div>
        <p className="font-semibold border-b-2 py-2 mt-4">Preview</p>
        <div className=" h-[50rem] md:h-fit overflow-auto thin-scrollbar">
          {[1, 2].map((i) => (
            <div key={i} className=" border-b py-2">
              <div className="flex items-center gap-x-2 ">
                <p className="py-2 text-gray-800 font-semibold">General</p>
                <MdDelete size={18} className="cursor-pointer text-gray-400" />
              </div>

              <Table horizontalSpacing={"xs"}>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Category name</Table.Th>
                    <Table.Th>Remove</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {elements.map((element) => (
                    <Table.Tr className="text-gray-800" key={element.title}>
                      <Table.Td>{element.title}</Table.Td>
                      <Table.Td>{element.category}</Table.Td>
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

export default SpecificationStep;
