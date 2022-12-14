import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptOrRejectKyc, getAllKyc } from "../../../actions/adminActions";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { logout } from "../../../actions/UserAction";
import { flexbox } from "@mui/system";
import Alert from "@mui/material/Alert";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomSpinner from "../../customSpinner/CustomSpinner";

const AdminAllKyc = ({ kycRequest }) => {
  const dispatch = useDispatch();
  const kyc = useSelector((state) => state.allKyc);

  const [aathar, setAathar] = useState("");
  const [aatharSelfie, setAatharSelfie] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGst] = useState("");
  const [id, setId] = useState("");
  const kycStatus = useSelector((state) => state.kycReq);

  
  const [ed, setEd] = useState(false);

  return (
    <div>
      {kycStatus?.loading ? (
        <Alert style={{}} className="m-1" severity="info">
          Processing !
        </Alert>
      ) : (
        ""
      )}

      {kycRequest ? (
        kycRequest?.map((el) => {
          return (
            <div key={el?.owner?._id} className="allkyc-box">
              <div>
                <p>{el?.owner?.name}</p>
                <p style={{ marginTop: "-20px" }}>
                  {" "}
                  <strong>{el?.owner?.email}</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  setEd(true);
                  setAathar(el?.aatharImage);
                  setAatharSelfie(el?.aatharSelfie);
                  setPan(el?.panImage);
                  setGst(el?.gstNumber);
                  setId(el?.owner?._id);
                }}
              >
                <VisibilityIcon />
              </button>
            </div>
          );
        })
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {kyc?.loading ? (
            <div>
              <CustomSpinner />
            </div>
          ) : (
            <img
              style={{ width: "300px" }}
              src="https://cdn.dribbble.com/users/888330/screenshots/2653750/empty_data_set.png"
              alt=""
            />
          )}
        </div>
      )}

      {ed ? (
        <div className="admin-kyc-show">
          <div>
            <CancelIcon
              onClick={(e) => setEd(false)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                color: "#3ccf4e",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            />
            <img src={aathar} alt="" />
            <img src={aatharSelfie} alt="" />
            <img src={pan} alt="" />
            <h2 style={{ marginTop: "10px", color: "white" }} className="mt-5">
              {" "}
              GST: <strong>{gst}</strong>{" "}
            </h2>
          </div>

          <div
            style={{ display: "flex", width: "400px", flexDirection: "row" }}
            className="bfsa"
          >
            <button
              style={{ backgroundColor: "#3CCF4E" }}
              onClick={() => {
                dispatch(acceptOrRejectKyc(id, "accept"));
                setEd(false);
              }}
            >
              Accept
            </button>
            <button
              style={{ backgroundColor: "#FF5454" }}
              onClick={() => {
                dispatch(acceptOrRejectKyc(id, "reject"));
                setEd(false);
              }}
              className="mx-3"
            >
              Reject
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminAllKyc;
