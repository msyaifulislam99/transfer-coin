import React, { Fragment, useRef, useState } from 'react';

interface IData {
  message: string;
  title: string;
  hash: string;
}
interface TransferFormProps {
  state: boolean;
  data: IData;
}

const TransferForm: React.FC<TransferFormProps> = (props) => {

  return (
    <>
      { props.state ? (

      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{props.data.title}</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{props.data.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-20 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                <div className="bg-green-100">
                  <p className="text-sm text-gray-500">hash: {props.data.hash}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : null }
    </>

  );
};

export default TransferForm;
