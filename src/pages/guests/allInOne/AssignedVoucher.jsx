import React, { useEffect, useState } from "react";
import { Button, FormGroup, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailOfAssignedVoucher,
  removeAssignedVoucherDetail,
  unAssignVoucher,
} from "../voucher/store/voucherSlice";
import DataTable from "../../../components/DataTable";

const AssignedVoucher = ({
  showVoucherModal,
  handleVoucherHideModal,
  selectedItem,
}) => {
  const dispatch = useDispatch();
  const [viewVoucher, setViewVoucher] = useState(false);
  const { voucher_assign } = selectedItem;
  const { assignedVoucherDetail } = useSelector((state) => state.vouchers);

  const columns = [
    {
      key: "coupon_id",
      label: "Voucher",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.voucher.coupon_id || ""}</div>
      ),
    },
    {
      key: "coupon_expiry_date",
      label: "Voucher Expiry Date",
      cell: (row) => (
        <div className={"text-capitalize"}>
          {row.voucher.coupon_expiry_date || ""}
        </div>
      ),
    },

    {
      key: "user.name",
      label: "Assignor Name",
      cell: (row) => (
        <div className={"text-capitalize"}>{row.user.name || ""}</div>
      ),
    },
    {
      key: "user.email",
      label: "Assignor Email",
      cell: (row) => <div>{row.user.email || ""}</div>,
    },
  ];

  const handleView = (voucher) => {
    setViewVoucher(true);

    let payload = {
      voucher_id: voucher,
    };
    dispatch(getDetailOfAssignedVoucher(payload));
  };

  const handleUnAssign = (voucher) => {
    let obj = {
      voucher_id: voucher,
      customerhash: selectedItem.customerhash,
    };
    dispatch(unAssignVoucher(obj));
    handleVoucherHideModal();
  };

  return (
    <>
      <Modal
        size="xl"
        show={viewVoucher}
        onHide={() => {
          setViewVoucher(false);
          dispatch(removeAssignedVoucherDetail());
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Voucher Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {assignedVoucherDetail && assignedVoucherDetail.length ? (
            <div className="table-wrapper">
              <div className="table-wrapper table-responsive">
                <DataTable data={assignedVoucherDetail} columns={columns} />
              </div>
            </div>
          ) : (
            "Loading"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-dark"
            onClick={() => {
              setViewVoucher(false);
              dispatch(removeAssignedVoucherDetail());
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={showVoucherModal} onHide={handleVoucherHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>View Vouchers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Vouchers</th>
                <th className="text-center">View</th>
                <th className="text-center">UnAssign</th>
              </tr>
            </thead>
            <tbody>
              {voucher_assign && JSON.parse(voucher_assign).length > 0 ? (
                JSON.parse(voucher_assign).map((voucher, index) => (
                  <tr key={index}>
                    <td className="text-center">{voucher}</td>
                    <td className="text-center">
                      <Button
                        title="View"
                        className="ms-2"
                        size="sm"
                        variant="outline-dark"
                        onClick={() => handleView(voucher)}
                      >
                        View
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        title="Unassign"
                        className="ms-2"
                        size="sm"
                        variant="outline-dark"
                        onClick={() => handleUnAssign(voucher)}
                      >
                        Unassign
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No vouchers Assigned
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleVoucherHideModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignedVoucher;
