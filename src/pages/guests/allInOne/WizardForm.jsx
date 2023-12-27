import { Modal } from "react-bootstrap"
import WizardForm from "../../../components/WizardForm"
import Step1 from "./AddAll/AddGuest"
import Step2 from "./AddAll/AddVoucher"
import Step3 from "./AddAll/AddVehicle"

const MultiStepper = ({
  showModal,
  handleAddHideModal,
  selectedItem,
  setSelectedItem,
}) => {
  const steps = [
    {
      id: 1,
      name: "Guest",
      component: Step1,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
    {
      id: 2,
      name: "Voucher",
      component: Step2,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
    {
      id: 3,
      name: "Vehicle",
      component: Step3,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
  ]
  return (
    <Modal size="xl" show={showModal} onHide={handleAddHideModal}>
      <br />
      <WizardForm steps={steps} />
    </Modal>
  )
}

export default MultiStepper
