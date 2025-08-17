import { Ionicons } from "@expo/vector-icons";

const IconCheck = (p) => <Ionicons name="checkmark-circle-outline" {...p} />;
const IconClock = (p) => <Ionicons name="time-outline" {...p} />;
const IconRefresh = (p) => <Ionicons name="refresh-outline" {...p} />;
const IconUserAdd = (p) => <Ionicons name="person-add-outline" {...p} />;

export function getConnectionButtonState(status) {
  switch (status) {
    case "accepted":
      return {
        label: "Connected",
        disabled: true,
        className: "bg-gray-600 text-white opacity-60",
        Icon: IconCheck,
      };
    case "pending":
      return {
        label: "Pending Approval",
        disabled: true,
        className: "bg-yellow-500 text-white opacity-60",
        Icon: IconClock,
      };
    case "rejected":
      return {
        label: "Connect Again",
        disabled: false,
        className:
          "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600",
        Icon: IconRefresh,
      };
    default:
      return {
        label: "Connect",
        disabled: false,
        className:
          "bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600",
        Icon: IconUserAdd,
      };
  }
}
