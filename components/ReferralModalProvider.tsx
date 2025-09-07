"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ReferralModal from "./ReferralModal";

interface ReferralModalContextType {
  openReferralModal: () => void;
  closeReferralModal: () => void;
  isReferralModalOpen: boolean;
}

const ReferralModalContext = createContext<ReferralModalContextType | undefined>(undefined);

export function useReferralModal() {
  const context = useContext(ReferralModalContext);
  if (context === undefined) {
    throw new Error("useReferralModal must be used within a ReferralModalProvider");
  }
  return context;
}

interface ReferralModalProviderProps {
  children: ReactNode;
}

export function ReferralModalProvider({ children }: ReferralModalProviderProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);

  const openReferralModal = () => setIsReferralModalOpen(true);
  const closeReferralModal = () => setIsReferralModalOpen(false);

  return (
    <ReferralModalContext.Provider value={{ openReferralModal, closeReferralModal, isReferralModalOpen }}>
      {children}
      <ReferralModal isOpen={isReferralModalOpen} onClose={closeReferralModal} />
    </ReferralModalContext.Provider>
  );
}

