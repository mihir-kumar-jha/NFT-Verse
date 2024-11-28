import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import styles from "./NFTCard.module.css";


export default function NFTCard({ item }) {
  const IPFSUrl = GetIpfsUrlFromPinata(item.image);

  const limitedDescription =
    item.description.length > 100
      ? item.description.substring(0, 100) + "..."
      : item.description;

  return (
    <div className={styles.tile}>
      <div className={styles.imageContainer}>
        <Image src={IPFSUrl} alt={item.name} layout="fill" objectFit="cover" />
      </div>
      <div className={styles.overlay}>
        <Link href={`/nft/${item.tokenId}`}>
          <div className={styles.text}>
            <strong>{item.name}</strong>
            <p>{limitedDescription}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
