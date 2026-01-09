"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import apiClient from "@/libs/api";
import { markEmailProvided } from "@/libs/conversionTracking";

const EmailGateModal = ({ isOpen, onClose, onSuccess }) => {
  const inputRef = useRef(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post("/lead", { email });
      markEmailProvided();
      toast.success("Thanks! Processing your PDF...");
      onSuccess();
    } catch (error) {
      console.error("Email submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-focus bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                <button
                  className="absolute top-4 right-4 btn btn-square btn-ghost btn-sm"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>

                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8 text-primary"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </div>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-xl font-bold text-center mb-2"
                >
                  You&apos;re on a roll!
                </Dialog.Title>

                <p className="text-base-content/70 text-center mb-6">
                  Enter your email to continue converting PDFs for free.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input input-bordered w-full"
                    required
                    autoFocus
                    disabled={isLoading}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Processing...
                      </>
                    ) : (
                      "Continue Converting"
                    )}
                  </button>
                </form>

                <p className="text-xs text-base-content/50 text-center mt-4">
                  No spam, unsubscribe anytime. We respect your privacy.
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EmailGateModal;
