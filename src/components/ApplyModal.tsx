"use client";

import { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeApplyModal } from "@/store/slices/uiSlice";
import ContactForm from "./ContactForm";

/** Bannerdəki "Müraciət et" düyməsi ilə açılan forma */
export default function ApplyModal() {
  const open = useAppSelector((s) => s.ui.applyModalOpen);
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeApplyModal());

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dispatch(closeApplyModal());
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dispatch]);

  if (!open) return null;

  return (
    <div className="modal" onClick={close} role="dialog" aria-modal="true" aria-labelledby="apply-title">
      <div className="modal__dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={close} aria-label="Bağla">
          <FaXmark />
        </button>
        <div className="modal__head">
          <h3 id="apply-title">Müraciət et</h3>
          <p>Məlumatlarınızı qeyd edin, mütəxəssisimiz qısa zamanda sizinlə əlaqə saxlayacaq.</p>
        </div>
        <div className="modal__body">
          <ContactForm source="banner" defaultSubject="Müraciət" onSuccess={close} />
        </div>
      </div>
    </div>
  );
}
