import { Modal, Radio } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function ChangeAddressModal({ children }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size={340}
        opened={opened}
        onClose={close}
        title="Select Delivery Address"
        centered
      >
        <div className="flex flex-col gap-y-2 text-xs items-start justify-start  h-80 overflow-auto thin-scrollbar">
          {[
            { isActive: false, address: "address1" },
            { isActive: false, address: "address1" },
            { isActive: true, address: "address1" },
          ].map((obj, i) => (
            <div
              key={i}
              className="flex justify-start items-start gap-x-2 py-3"
            >
              <Radio
                onClick={close}
                size="xs"
                checked={obj.isActive}
                onChange={() => {}}
              />
              <div>
                <p className="font-semibold">Nishant Argade, 410501</p>
                <p className="text-gray-600 mt-1">{obj.address}.</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <button onClick={open}>{children}</button>
    </>
  );
}
