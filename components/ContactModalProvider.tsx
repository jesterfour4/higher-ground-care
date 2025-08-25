"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ContactModal from "./ContactModal";

interface ContactModalContextType {
  openContactModal: () => void;
  closeContactModal: () => void;
  isContactModalOpen: boolean;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (context === undefined) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}

interface ContactModalProviderProps {
  children: ReactNode;
}

export function ContactModalProvider({ children }: ContactModalProviderProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <ContactModalContext.Provider value={{ openContactModal, closeContactModal, isContactModalOpen }}>
      {children}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  );
}
