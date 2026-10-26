"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearSearch, runSearch } from "@/store/slices/searchSlice";
import { imageOr } from "@/lib/images";

/** Navbardakı axtarış: ikona basanda input animasiya ilə açılır, yazdıqca nəticələr göstərilir. */
export default function SearchBox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { results, status, query } = useAppSelector((s) => s.search);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  // yazmağı bitirdikdən 350ms sonra axtarış
  useEffect(() => {
    const q = value.trim();
    if (q.length < 2) {
      dispatch(clearSearch());
      return;
    }
    const t = setTimeout(() => dispatch(runSearch(q)), 350);
    return () => clearTimeout(t);
  }, [value, dispatch]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setValue("");
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`/axtaris?q=${encodeURIComponent(q)}`);
    close();
  };

  const hasResults =
    results && (results.products.length || results.categories.length || results.news.length);
  const showDropdown = open && value.trim().length >= 2 && query === value.trim();

  return (
    <div ref={boxRef} className={`search ${open ? "is-open" : ""}`}>
      <form className="search__form" onSubmit={submit} role="search">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Məhsul, kateqoriya axtar..."
          aria-label="Axtarış"
        />
        {value && (
          <button type="button" className="icon-btn search__close" onClick={() => setValue("")} aria-label="Təmizlə">
            <FaXmark />
          </button>
        )}
        <button type="submit" aria-label="Axtar">
          <FaMagnifyingGlass />
        </button>
      </form>

      <button
        type="button"
        className="icon-btn search__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Axtarışı bağla" : "Axtarışı aç"}
      >
        {open ? <FaXmark /> : <FaMagnifyingGlass />}
      </button>

      {showDropdown && (
        <div className="search__dropdown">
          {status === "loading" && <span className="search__empty">Axtarılır...</span>}
          {status === "succeeded" && !hasResults && (
            <span className="search__empty">“{value}” üzrə nəticə tapılmadı</span>
          )}
          {status === "succeeded" && results && (
            <>
              {results.products.length > 0 && <div className="search__group-title">Məhsullar</div>}
              {results.products.slice(0, 5).map((p) => (
                <Link key={p.id} href={`/mehsullar/${p.slug}`} className="search__item" onClick={close}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageOr(p.image, p.id)} alt={p.name} />
                  <div>
                    <strong>{p.name}</strong>
                    <small>{p.category.name}</small>
                  </div>
                </Link>
              ))}
              {results.categories.length > 0 && <div className="search__group-title">Kateqoriyalar</div>}
              {results.categories.map((c) => (
                <Link key={c.id} href={`/mehsullar?kateqoriya=${c.slug}`} className="search__item" onClick={close}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageOr(c.image, c.id + 3)} alt={c.name} />
                  <div>
                    <strong>{c.name}</strong>
                    <small>{c.product_count} məhsul</small>
                  </div>
                </Link>
              ))}
              {results.news.length > 0 && <div className="search__group-title">Xəbərlər</div>}
              {results.news.slice(0, 3).map((n) => (
                <Link key={n.id} href={`/xeberler/${n.slug}`} className="search__item" onClick={close}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageOr(n.image, n.id + 5)} alt={n.title} />
                  <div>
                    <strong>{n.title}</strong>
                  </div>
                </Link>
              ))}
              {hasResults ? (
                <Link href={`/axtaris?q=${encodeURIComponent(value.trim())}`} className="search__all" onClick={close}>
                  Bütün nəticələrə bax →
                </Link>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
}
