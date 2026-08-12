import React from 'react';
import {
  FaBuilding,
  FaCheckCircle,
  FaEdit,
  FaStreetView,
  FaTrash,
} from 'react-icons/fa';
import { MdLocationCity, MdPinDrop, MdPublic } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCheckoutAddress } from '../../store/actions';

const AddressList = ({
  addresses,
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const onEditButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const onDeleteButtonHandler = (address) => {
    setSelectedAddress(address);
    setOpenDeleteModal(true);
  };

  const handleAddressSelection = (address) => {
    dispatch(selectUserCheckoutAddress(address));
  };

  return (
    <div className="space-y-4">
      {addresses.map((address) => {
        const isSelected =
          selectedUserCheckoutAddress?.addressId === address.addressId;

        return (
          <div
            key={address.addressId}
            onClick={() => handleAddressSelection(address)}
            className={`p-5 rounded-lg shadow-md cursor-pointer relative transition-all border ${
              isSelected
                ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-400'
                : 'bg-white hover:shadow-lg hover:border-blue-300'
            }`}
          >
            {/* Address details */}
            <div className="space-y-2">
              <div className="flex items-center">
                <FaBuilding size={16} className="mr-2 text-gray-600" />
                <p className="font-semibold text-slate-800">
                  {address.buildingName}
                </p>
                {isSelected && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>

              <div className="flex items-center text-slate-700">
                <FaStreetView size={16} className="mr-2 text-gray-600" />
                <p>{address.street}</p>
              </div>

              <div className="flex items-center text-slate-700">
                <MdLocationCity size={18} className="mr-2 text-gray-600" />
                <p>
                  {address.city}, {address.state}
                </p>
              </div>

              <div className="flex items-center text-slate-700">
                <MdPinDrop size={18} className="mr-2 text-gray-600" />
                <p>{address.pincode}</p>
              </div>

              <div className="flex items-center text-slate-700">
                <MdPublic size={18} className="mr-2 text-gray-600" />
                <p>{address.country}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditButtonHandler(address);
                }}
                className="p-2 rounded-full bg-teal-50 hover:bg-teal-100 transition"
              >
                <FaEdit size={18} className="text-teal-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteButtonHandler(address);
                }}
                className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 transition"
              >
                <FaTrash size={17} className="text-rose-600" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddressList;
