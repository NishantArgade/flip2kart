import { MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

const OfferStep = ({ nextStep, prevStep }) => {
  const form = useForm({
    initialValues: {
      offer: "",
    },
  });

  const [searchValue, setSearchValue] = useState("");
  const optionsFilter = ({ options, search }) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    );

    filtered.sort((a, b) => a.label.localeCompare(b.label));
    return filtered;
  };
  return (
    <form onSubmit={form.onSubmit(console.log)} className="mt-3">
      <MultiSelect
        label="Select Offer"
        placeholder="Pick Offer"
        data={[
          {
            value: "react",
            label:
              "React lorem2 ffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          },
          {
            value: "ng",
            label:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, vel incidunt. Ipsa, omnis veniam cupiditate placeat enim deserunt non dolor!",
          },
          {
            value: "svelte",
            label:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, vel incidunt. Ipsa, omnis veniam cupiditate placeat enim deserunt non dolor!",
          },
          {
            value: "vue",
            label:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, vel incidunt. Ipsa, omnis veniam cupiditate placeat enim deserunt non dolor!",
          },
          {
            value: "ember",
            label:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, vel incidunt. Ipsa, omnis veniam cupiditate placeat enim deserunt non dolor!",
          },
          { value: "marko", label: "Marko" },
          { value: "mithril", label: "Mithril" },
          { value: "backbone", label: "Backbone" },
          { value: "hyperapp", label: "Hyperapp" },
          { value: "preact", label: "Preact" },
          { value: "inferno", label: "Inferno" },
          { value: "angularjs", label: "AngularJS" },
          { value: "aurelia", label: "Aurelia" },
          { value: "knockout", label: "Knockout" },
          { value: "marionette", label: "Marionette" },

          { value: "polymer", label: "Polymer" },
          { value: "ractive", label: "Ractive" },
          { value: "riot", label: "Riot" },
          { value: "vanilla", label: "Vanilla" },
        ]}
        {...form.getInputProps("category")}
        clearable
        searchable
        filter={optionsFilter}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        nothingFoundMessage="Category not found..."
        checkIconPosition="left"
        comboboxProps={{ shadow: "xs" }}
        className="w-full"
        // hidePickedOptions={true}
        height={4}
      />

      <div className="flex py-4 items-center gap-4 float-end">
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

export default OfferStep;
