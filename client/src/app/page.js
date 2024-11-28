import Image from "next/image";
import Header from "./components/header/Header";
import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heading}>
            Where Art Meets Innovation, Step into NFTstore!
          </h1>
          <p className={styles.description}>
            Enter the nexus of creativity and innovation at NFTstore. Uncover a
            realm of digital marvels, and together, let us redefine the future of
            collectibles.
          </p>
          <div className={styles.btns}>
            <Link href="/marketplace" className={`${styles.btn} ${styles.buyBtn}`}>
              Buy Now!
            </Link>
            <Link href="/sellNFT" className={`${styles.btn} ${styles.listBtn}`}>
              List Now!
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image src="/pic1.png" alt="NFTs" width={700} height={230} />
        </div>
      {/* "What is NFT?" Section */}
        <div className={styles.heroText}>
        <h1 className={styles.heading}>What is NFT?</h1>
        <p className={styles.description}>
              NFTs, or <b>Non-Fungible Tokens</b>, are unique digital assets verified on
              the blockchain, symbolizing ownership of an original piece of digital
              art, music, video, or any other creative work. Unlike cryptocurrencies
              like Bitcoin or Ethereum, which are identical and interchangeable,
              NFTs are one-of-a-kind, offering creators and collectors a way to own
              and trade digital items that retain authenticity and uniqueness.
            </p>
            </div>
            <div className={styles.heroImage}>
          <Image src="/nft_image.jpg" alt="NFTs" width={700} height={150} />
          </div>
            <div className={styles.heroText}>
        <h2 className={styles.heading}>Popularity of NFT</h2>
        <ul className={styles.description}>
          <li>NFT technology has transformed digital ownership, allowing artists to earn royalties and connect with global audiences.</li>
          <li>Several celebrities from Hollywood to sports have joined the NFT trend.</li>
          <li>Musician Grimes sold her NFT art for over <b>$6 million</b>.</li>
          <li><b>Twitters Jack Dorsey </b> auctioned his first tweet as an NFT for <b> $2.9 million</b>.</li>
          <li>Famous personalities like <b>Snoop Dogg</b>, <b>Paris Hilton</b>, and <b> Lionel Messi</b> are actively investing in NFTs.</li>
          <li>The involvement of these public figures contributes to the growth of the digital collectible revolution.</li>
          <li>NFTs represent an exciting new frontier in the digital world!</li>
        </ul>

          </div>
          <div className={styles.heroImage}>
          <Image src="/nft_popular.jpg" alt="NFTs" width={700} height={150} />
          </div>
        </div>
    </div>
  );
}
