"use client";
import { useContext, useState } from "react";
import styles from "./sellNFT.module.css";
import Header from "../components/header/Header";
import { useRouter } from "next/navigation";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import marketplace from "./../marketplace.json";
import { ethers } from "ethers";
import { WalletContext } from "@/context/wallet";
import { toast } from 'react-toastify';

export default function SellNFT() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState();
  const [message, updateMessage] = useState("");
  const [btn, setBtn] = useState(false);
  const [btnContent, setBtnContent] = useState("List NFT");
  const router = useRouter();
  const { isConnected, signer } = useContext(WalletContext);

  async function onFileChange(e) {
    try {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.warning("File size should be less than 10MB");
        return;
      }
      
      const data = new FormData();
      data.set("file", file);
      setBtn(false);
      updateMessage("🚀 Uploading image... Please hold on!");
      
      const timeoutDuration = 30000;
      const uploadPromise = uploadFileToIPFS(data);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Upload timed out')), timeoutDuration)
      );
      
      const response = await Promise.race([uploadPromise, timeoutPromise]);
      if (response.success === true) {
        setBtn(true);
        updateMessage("");
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      setBtn(false);
      updateMessage("");
      toast.error("Error during file upload. Please try again with a smaller file.");
      console.error(e);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    if (!name || !description || !price || !fileURL) {
      updateMessage("⚠️ Please complete all fields!");
      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Error uploading JSON metadata: ", e);
    }
  }

  async function listNFT(e) {
    try {
      setBtnContent("Processing...");
      updateMessage("📝 Preparing metadata...");
      
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      updateMessage("🖼️ Creating NFT... Please wait (this may take a few minutes)");

      let contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );
      const price = ethers.parseEther(formParams.price);

      const estimatedGas = await contract.createToken.estimateGas(metadataURL, price);
      const gasLimit = BigInt(Math.floor(Number(estimatedGas) * 1.2));
      
      let transaction = await contract.createToken(metadataURL, price, {
        gasLimit: gasLimit
      });
      
      updateMessage("⏳ Confirming transaction...");
      await transaction.wait();

      setBtnContent("List NFT");
      setBtn(false);
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      toast.success("🎉 Successfully listed your NFT!");
      router.push("/marketplace");
    } catch (e) {
      setBtnContent("List NFT");
      updateMessage("");
      toast.error("❗Upload error: " + (e.message || "Transaction failed"));
      console.error(e);
    }
  }

  return (
    <>
    <Header />
    <div className={styles.container}>
      <div className={styles.hero}>
        {isConnected ? (
          <>
            <div className={styles.heroText}>
              <h3 className={styles.heading}>NFT Marketplace Insights 📊</h3>
              <ul className={styles.description}>
                <li>🌐 Over 50,000 NFTs are listed daily worldwide.</li>
                <li>📈 NFTs have generated over $20 billion in sales to date.</li>
                <li>🖼️ Unique digital items are becoming top investments for collectors.</li>
                <li>🔒 NFTs ensure authenticity and ownership through blockchain.</li>
                <li>💸 Creators earn royalties on every resale of their NFTs!</li>
                <li>🎨 Many renowned artists and musicians are creating exclusive NFTs.</li>
                <li>💡 NFTs are leading the way in exploring decentralized ownership and value.</li>
                <li>🌎 NFTs offer creators a global audience and direct engagement with fans.</li>
                <li>📚 NFTs are extending beyond art, including literature, music, and real estate.</li>
                <li>📊 NFT marketplaces are booming, with new platforms emerging every month.</li>
                <li>💻 Virtual worlds and metaverses are utilizing NFTs for digital assets and avatars.</li>
                <li>🎥 Movie studios and entertainment companies are releasing NFT-based collectibles.</li>
              </ul>
            </div>

            <div className={styles.content}>
              <h2 className={styles.heading}>Upload your NFT</h2>
              <div className={styles.Form}>
                <div className={styles.FormContent}>
                  <label className={styles.Label}>NFT Name</label>
                  <input
                    type="text"
                    className={styles.Input}
                    value={formParams.name}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, name: e.target.value })
                    }
                  />
                </div>
                <div className={styles.FormContent}>
                  <label className={styles.Label}>NFT Description</label>
                  <textarea
                    type="text"
                    className={`${styles.Input} ${styles.TextArea}`}
                    value={formParams.description}
                    onChange={(e) =>
                      updateFormParams({
                        ...formParams,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={styles.FormContent}>
                  <label className={styles.Label}>Price (in ETH)</label>
                  <input
                    type="number"
                    className={styles.Input}
                    value={formParams.price}
                    onChange={(e) =>
                      updateFormParams({ ...formParams, price: e.target.value })
                    }
                  />
                </div>
                <div className={styles.FormContent}>
                  <label className={styles.Label}>Upload Image</label>
                  <input
                    type="file"
                    className={styles.Input}
                    onChange={onFileChange}
                  />
                </div>
                <div className={styles.msg}>{message}</div>
                <button
                  onClick={listNFT}
                  type="submit"
                  className={
                    btn
                      ? `${styles.btn} ${styles.activebtn}`
                      : `${styles.btn} ${styles.inactivebtn}`
                  }
                >
                  {btnContent}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.notConnected}>
            Connect Your Wallet to Continue...
          </div>
        )}
      </div>
    </div>
    </>
  );
}
