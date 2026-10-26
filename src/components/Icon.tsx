import {
  FaAppleWhole,
  FaAward,
  FaBoxOpen,
  FaClock,
  FaFaceSmile,
  FaGlobe,
  FaHandshake,
  FaHeart,
  FaLeaf,
  FaSeedling,
  FaShieldHalved,
  FaStar,
  FaSun,
  FaTruckFast,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { IconName } from "@/types";

const MAP: Record<IconName, IconType> = {
  leaf: FaLeaf,
  apple: FaAppleWhole,
  users: FaUsers,
  box: FaBoxOpen,
  truck: FaTruckFast,
  globe: FaGlobe,
  award: FaAward,
  shield: FaShieldHalved,
  heart: FaHeart,
  handshake: FaHandshake,
  sun: FaSun,
  star: FaStar,
  clock: FaClock,
  warehouse: FaWarehouse,
  seedling: FaSeedling,
  smile: FaFaceSmile,
};

export default function Icon({ name }: { name: IconName | string }) {
  const Cmp = MAP[name as IconName] ?? FaLeaf;
  return <Cmp aria-hidden />;
}
