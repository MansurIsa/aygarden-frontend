import Link from "next/link";
import { Empty, PageHero } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <PageHero title="404" description="Səhifə tapılmadı" crumbs={[{ label: "404" }]} />
      <section className="section">
        <Empty title="Axtardığınız səhifə mövcud deyil">
          <Link href="/" className="btn btn--primary">
            Ana səhifəyə qayıt
          </Link>
        </Empty>
      </section>
    </>
  );
}
