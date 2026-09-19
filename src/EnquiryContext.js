import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

// Lets any section (e.g. a service card's "Enquiry" button) pre-select the
// shoot type in the Contact form and scroll to it.
const EnquiryContext = createContext({ shootType: '', setShootType: () => {}, goToContact: () => {} });

export function EnquiryProvider({ children }) {
  const [shootType, setShootType] = useState('');

  const goToContact = useCallback((type) => {
    if (type) setShootType(type);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const value = useMemo(() => ({ shootType, setShootType, goToContact }), [shootType, goToContact]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export const useEnquiry = () => useContext(EnquiryContext);
