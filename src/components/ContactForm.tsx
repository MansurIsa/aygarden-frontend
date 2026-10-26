"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FaCircleCheck, FaCircleExclamation, FaPaperPlane } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetContact, sendContact } from "@/store/slices/contactSlice";
import type { ContactPayload } from "@/types";

interface Props {
  source?: ContactPayload["source"];
  defaultSubject?: string;
  onSuccess?: () => void;
}

const EMPTY = { full_name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactForm({ source = "contact", defaultSubject = "", onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((s) => s.contact);
  const [form, setForm] = useState({ ...EMPTY, subject: defaultSubject });

  useEffect(() => {
    dispatch(resetContact());
  }, [dispatch]);

  const set = (k: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await dispatch(sendContact({ ...form, source }));
    if (sendContact.fulfilled.match(res)) {
      setForm({ ...EMPTY, subject: defaultSubject });
      if (onSuccess) setTimeout(onSuccess, 2200);
    }
  };

  return (
    <form onSubmit={submit} className="form-grid">
      <div className="field">
        <label htmlFor={`${source}-name`}>Ad, soyad *</label>
        <input id={`${source}-name`} required value={form.full_name} onChange={set("full_name")} placeholder="Adınız" />
      </div>
      <div className="field">
        <label htmlFor={`${source}-phone`}>Telefon *</label>
        <input id={`${source}-phone`} type="tel" value={form.phone} onChange={set("phone")} placeholder="+994 __ ___ __ __" />
      </div>
      <div className="field">
        <label htmlFor={`${source}-email`}>E-poçt</label>
        <input id={`${source}-email`} type="email" value={form.email} onChange={set("email")} placeholder="mail@example.com" />
      </div>
      <div className="field">
        <label htmlFor={`${source}-subject`}>Mövzu</label>
        <input id={`${source}-subject`} value={form.subject} onChange={set("subject")} placeholder="Müraciətin mövzusu" />
      </div>
      <div className="field full">
        <label htmlFor={`${source}-message`}>Mesaj *</label>
        <textarea id={`${source}-message`} required rows={4} value={form.message} onChange={set("message")} placeholder="Mesajınızı yazın..." />
      </div>

      {message && (
        <div className={`alert full ${status === "succeeded" ? "alert--success" : "alert--error"}`}>
          {status === "succeeded" ? <FaCircleCheck /> : <FaCircleExclamation />} {message}
        </div>
      )}

      <div className="full">
        <button type="submit" className="btn btn--primary" disabled={status === "loading"}>
          {status === "loading" ? "Göndərilir..." : "Göndər"} <FaPaperPlane />
        </button>
      </div>
    </form>
  );
}
