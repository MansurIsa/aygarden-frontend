import Link from "next/link";
import { FaArrowRight, FaArrowUp, FaBoxOpen, FaLocationDot, FaRegCalendar, FaStar } from "react-icons/fa6";
import { formatDate, imageOr } from "@/lib/images";
import type { Category, IconItem, NewsItem, Product } from "@/types";
import Icon from "./Icon";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/mehsullar?kateqoriya=${category.slug}`} className="cat-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageOr(category.image, category.id + 3)} alt={category.name} loading="lazy" />
      <span className="cat-card__arrow">
        <FaArrowUp />
      </span>
      <div className="cat-card__body">
        <span className="cat-card__count">{category.product_count} məhsul</span>
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
    </Link>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/mehsullar/${product.slug}`} className="product-card">
      <div className="product-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageOr(product.image, product.id)} alt={product.name} loading="lazy" />
        <span className="product-card__tag">{product.category.name}</span>
        {product.is_featured && (
          <span className="product-card__featured" title="Seçilmiş məhsul">
            <FaStar />
          </span>
        )}
        <span className="product-card__view">
          Ətraflı bax <FaArrowRight />
        </span>
      </div>
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p>{product.short_description}</p>
        <div className="product-card__meta">
          {product.origin && (
            <span className="chip">
              <FaLocationDot /> {product.origin}
            </span>
          )}
          {product.packaging && (
            <span className="chip chip--orange">
              <FaBoxOpen /> {product.packaging}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/xeberler/${item.slug}`} className="news-card">
      <div className="news-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageOr(item.image, item.id + 5)} alt={item.title} loading="lazy" />
        <span className="news-card__date">
          <FaRegCalendar /> {formatDate(item.published_at)}
        </span>
      </div>
      <div className="news-card__body">
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <span className="link-more">
          Ətraflı oxu <FaArrowRight />
        </span>
      </div>
    </Link>
  );
}

export function IconCard({ item, index }: { item: IconItem; index: number }) {
  return (
    <div className="icon-card">
      <span className="icon-card__num">{String(index + 1).padStart(2, "0")}</span>
      <div className="icon-card__icon">
        <Icon name={item.icon} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
}
