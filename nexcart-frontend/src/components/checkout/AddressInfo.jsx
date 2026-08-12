import React, { useState } from 'react';
import Skeleton from '../shared/Skeleton';
import { FaAddressBook } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import toast from 'react-hot-toast';
import { deleteUserAddress } from '../../store/actions';

const AddressInfo = ({ address }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const dispatch = useDispatch();

  const { isLoading, btnLoader } = useSelector((state) => state.errors);

  const addNewAddressHandler = () => {
    setSelectedAddress('');
    setOpenAddressModal(true);
  };

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal)
    );
  };

  const noAddressExist = !address || address.length === 0;

  return (
    <div className="pt-6">
      {noAddressExist ? (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto flex flex-col items-center justify-center text-center">
          <FaAddressBook size={50} className="text-gray-400 mb-4" />
          <h1 className="mb-2 text-slate-900 font-semibold text-2xl">
            No Address Added Yet
          </h1>
          <p className="mb-6 text-slate-600">
            Please add your address to complete your purchase.
          </p>

          <button
            onClick={addNewAddressHandler}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-md shadow hover:from-blue-700 hover:to-blue-900 transition-all"
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h1 className="text-slate-900 text-center font-bold text-2xl">
            Select Address
          </h1>

          {isLoading ? (
            <div className="py-4 px-8">
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="space-y-4 pt-6">
                <AddressList
                  addresses={address}
                  setSelectedAddress={setSelectedAddress}
                  setOpenAddressModal={setOpenAddressModal}
                  setOpenDeleteModal={setOpenDeleteModal}
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={addNewAddressHandler}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-md shadow hover:from-blue-700 hover:to-blue-900 transition-all"
                >
                  Add More
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modals */}
      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>

      <DeleteModal
        open={openDeleteModal}
        loader={btnLoader}
        setOpen={setOpenDeleteModal}
        title="Delete Address"
        onDeleteHandler={deleteAddressHandler}
      />
    </div>
  );
};

export default AddressInfo;
