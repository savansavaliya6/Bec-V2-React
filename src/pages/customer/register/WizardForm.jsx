import { Modal } from "react-bootstrap"
import WizardForm from "../../../components/WizardForm"
import Step1 from "./AddAll/Step1"
import Step2 from "./AddAll/Step2"
import Step3 from "./AddAll/Step3"
import Step4 from "./AddAll/Step4"
import Step5 from "./AddAll/Step5"
import { FileProvider } from "./FileContext"

const MultiStepper = ({
  showModal,
  handleAddHideModal,
  selectedItem,
  setSelectedItem,
}) => {
  const steps = [
    {
      id: 1,
      name: "Personal Details",
      component: Step1,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
    {
      id: 2,
      name: "Next of Kin",
      component: Step2,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
    {
      id: 3,
      name: "Interests",
      component: Step3,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
    {
      id: 4,
      name: "Indemnity",
      component: Step4,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
    {
      id: 5,
      name: "T&Cs",
      component: Step5,
      props: { showModal, handleAddHideModal, selectedItem, setSelectedItem },
    },
  ]
  return (
    <Modal size="xl" show={showModal} onHide={handleAddHideModal}>
      <br />
      <FileProvider>
        <WizardForm steps={steps} />
      </FileProvider>
    </Modal>
  )
}

export default MultiStepper
